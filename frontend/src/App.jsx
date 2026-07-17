import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShareView from './pages/ShareView';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import BiodataForm from './pages/BiodataForm';
import ResumeForm from './pages/ResumeForm';
import Editor from './pages/Editor';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';
import RecentWorks from './pages/RecentWorks';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner spinner-lg" />
        <p className="text-muted">Loading Form Generator...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/share/:id" element={<ShareView />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/create" element={
        <ProtectedRoute><Create /></ProtectedRoute>
      } />
      <Route path="/create/biodata" element={
        <ProtectedRoute><BiodataForm /></ProtectedRoute>
      } />
      <Route path="/create/resume" element={
        <ProtectedRoute><ResumeForm /></ProtectedRoute>
      } />
      <Route path="/editor/:id" element={
        <ProtectedRoute><Editor /></ProtectedRoute>
      } />
      <Route path="/templates" element={
        <ProtectedRoute><Templates /></ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute><Favorites /></ProtectedRoute>
      } />
      <Route path="/recent" element={
        <ProtectedRoute><RecentWorks /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute adminOnly><Admin /></ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
