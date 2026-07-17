import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, limit, serverTimestamp, setDoc, increment
} from 'firebase/firestore';
import { db } from '../firebase';

// ===== PROJECTS =====

export const createProject = async (userId, data) => {
  const ref = await addDoc(collection(db, 'projects'), {
    userId,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

export const getProjects = async (userId) => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    // If index doesn't exist yet, fall back to unordered query
    if (err.code === 'failed-precondition') {
      const q = query(collection(db, 'projects'), where('userId', '==', userId));
      const snap = await getDocs(q);
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort in JS instead
      return docs.sort((a, b) => {
        const aTime = a.updatedAt?.toMillis?.() ?? 0;
        const bTime = b.updatedAt?.toMillis?.() ?? 0;
        return bTime - aTime;
      });
    }
    throw err;
  }
};

export const getProject = async (projectId) => {
  const snap = await getDoc(doc(db, 'projects', projectId));
  if (!snap.exists()) throw new Error('Project not found');
  return { id: snap.id, ...snap.data() };
};

export const updateProject = async (projectId, data) => {
  await updateDoc(doc(db, 'projects', projectId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const updateProjectViews = async (projectId) => {
  await updateDoc(doc(db, 'projects', projectId), {
    views: increment(1)
  });
};

export const deleteProject = async (projectId) => {
  await deleteDoc(doc(db, 'projects', projectId));
};

export const toggleProjectFavorite = async (projectId, currentStatus) => {
  await updateDoc(doc(db, 'projects', projectId), {
    isFavorite: !currentStatus,
    updatedAt: serverTimestamp(),
  });
};

export const duplicateProject = async (userId, projectId) => {
  const original = await getProject(projectId);
  const { id, createdAt, updatedAt, ...rest } = original;
  return createProject(userId, {
    ...rest,
    title: `${rest.title || 'Untitled'} (Copy)`,
  });
};

export const getRecentProjects = async (userId, count = 6) => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
      limit(count)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    // Fallback if Firestore index not ready
    if (err.code === 'failed-precondition') {
      const all = await getProjects(userId);
      return all.slice(0, count);
    }
    throw err;
  }
};

// ===== TEMPLATES =====

export const getTemplates = async (type = null) => {
  let q = collection(db, 'templates');
  if (type) {
    q = query(q, where('type', '==', type));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ===== FAVORITES =====

export const getFavorites = async (userId) => {
  const q = query(collection(db, 'favorites'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addFavorite = async (userId, templateId) => {
  const favId = `${userId}_${templateId}`;
  await setDoc(doc(db, 'favorites', favId), {
    userId,
    templateId,
    addedAt: serverTimestamp(),
  });
};

export const removeFavorite = async (userId, templateId) => {
  const favId = `${userId}_${templateId}`;
  await deleteDoc(doc(db, 'favorites', favId));
};

export const isFavorite = async (userId, templateId) => {
  const favId = `${userId}_${templateId}`;
  const snap = await getDoc(doc(db, 'favorites', favId));
  return snap.exists();
};

// ===== ACTIVITY LOGS =====

export const logActivity = async (userId, action, documentId = null) => {
  try {
    await addDoc(collection(db, 'activityLogs'), {
      userId,
      action,
      documentId,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    // Non-critical — never block the main flow if logging fails
    console.warn('Activity log failed:', err);
  }
};

export const getActivityLogs = async (userId, count = 10) => {
  try {
    const q = query(
      collection(db, 'activityLogs'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(count)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    if (err.code !== 'failed-precondition') {
      console.warn('Activity logs fetch failed:', err);
    }
    return [];
  }
};

// ===== STATS =====

export const getUserStats = async (userId) => {
  try {
    const [projects, favorites, logs] = await Promise.all([
      getProjects(userId),
      getFavorites(userId).catch(() => []),
      getActivityLogs(userId, 5).catch(() => []),
    ]);

    return {
      totalProjects: projects.length,
      totalBiodata: projects.filter(p => p.type === 'biodata').length,
      totalResume: projects.filter(p => p.type === 'resume').length,
      totalFavorites: projects.filter(p => p.isFavorite).length,
      recentActivities: logs,
    };
  } catch (err) {
    console.error('getUserStats error:', err);
    return {
      totalProjects: 0, totalBiodata: 0,
      totalResume: 0, totalFavorites: 0, recentActivities: [],
    };
  }
};
