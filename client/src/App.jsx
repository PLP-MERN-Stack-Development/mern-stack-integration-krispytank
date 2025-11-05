import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './pages/ProtectedRoute';
import { PostProvider } from './context/PostContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostView />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><PostForm isEdit /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}
