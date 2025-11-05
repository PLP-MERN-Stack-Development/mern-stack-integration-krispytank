import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (form) => {
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <AuthForm onSubmit={handleLogin} title="Login" />
      <p className="auth-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
}
