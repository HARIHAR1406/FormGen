import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchUserProfile = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const createUserDocument = async (firebaseUser, additionalData = {}) => {
    const docRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: firebaseUser.displayName || additionalData.name || '',
        email: firebaseUser.email || '',
        phone: firebaseUser.phoneNumber || '',
        photoURL: firebaseUser.photoURL || '',
        role: 'user',
        createdAt: serverTimestamp(),
        ...additionalData,
      });
    }
    await fetchUserProfile(firebaseUser.uid);
  };

  // ─── Google Sign-In ───────────────────────────────────────────
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserDocument(result.user);
      toast.success(`Welcome, ${result.user.displayName}! 🎉`);
      return result.user;
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error('Google sign-in failed. Please try again.');
      }
      throw error;
    }
  };

  // ─── Email Sign-Up ────────────────────────────────────────────
  const signUpWithEmail = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await createUserDocument(result.user, { name });
      toast.success(`Account created! Welcome, ${name}! 🎉`);
      return result.user;
    } catch (error) {
      const msg = {
        'auth/email-already-in-use': 'This email is already registered. Please sign in.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
      }[error.code] || 'Registration failed. Please try again.';
      toast.error(msg);
      throw error;
    }
  };

  // ─── Email Sign-In ────────────────────────────────────────────
  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back! 👋`);
      return result.user;
    } catch (error) {
      const msg = {
        'auth/user-not-found': 'No account found with this email. Please register.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
      }[error.code] || 'Sign-in failed. Please try again.';
      toast.error(msg);
      throw error;
    }
  };

  // ─── Password Reset ───────────────────────────────────────────
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      toast.error('Failed to send reset email. Check the email address.');
      throw error;
    }
  };

  // ─── Sign Out ─────────────────────────────────────────────────
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully.');
    } catch (error) {
      toast.error('Sign-out failed.');
    }
  };

  // ─── Update Profile ───────────────────────────────────────────
  const updateUserProfile = async (data) => {
    try {
      if (user) {
        await updateProfile(user, {
          displayName: data.name || user.displayName,
          photoURL: data.photoURL || user.photoURL,
        });
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
        await fetchUserProfile(user.uid);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile.');
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
