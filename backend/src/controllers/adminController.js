const admin = require('firebase-admin');

const getDb = () => (admin.apps.length > 0 && admin.firestore ? admin.firestore() : null);

exports.getStats = async (req, res) => {
  try {
    const [usersResult, projectsResult] = await Promise.all([
      admin.apps.length > 0 ? admin.auth().listUsers(1000) : { users: [] },
      getDb() ? getDb().collection('projects').get() : { size: 0 },
    ]);

    const totalUsers = usersResult.users.length;
    const totalProjects = projectsResult.size || 0;

    // Count by type
    let biodataCount = 0;
    let resumeCount = 0;
    const db = getDb();
    if (db && projectsResult.docs) {
      projectsResult.docs.forEach(doc => {
        const data = doc.data();
        if (data.type === 'biodata') biodataCount++;
        else if (data.type === 'resume') resumeCount++;
      });
    }

    res.json({
      totalUsers,
      totalProjects,
      biodataCount,
      resumeCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('getStats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const listUsersResult = admin.apps.length > 0 ? await admin.auth().listUsers(100) : { users: [] };
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      disabled: user.disabled,
      createdAt: user.metadata.creationTime,
      lastSignIn: user.metadata.lastSignInTime,
      customClaims: user.customClaims,
    }));
    res.json({ users });
  } catch (error) {
    console.error('getUsers error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    if (admin.apps.length > 0) {
      await admin.auth().deleteUser(uid);
    }
    const db = getDb();
    if (db) {
      // Delete user's data
      const projects = await db.collection('projects').where('userId', '==', uid).get();
      const batch = db.batch();
      projects.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.setAdminRole = async (req, res) => {
  try {
    const { uid } = req.params;
    if (admin.apps.length > 0) {
      await admin.auth().setCustomUserClaims(uid, { admin: true });
    }
    res.json({ message: 'Admin role granted successfully' });
  } catch (error) {
    console.error('setAdminRole error:', error);
    res.status(500).json({ error: 'Failed to set admin role' });
  }
};
