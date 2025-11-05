// pages/RegisterPage.jsx
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { AUTH_BASE_URL } from '../apiConfig';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    const res = await fetch(`${AUTH_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) navigate('/login');
    else alert(data.message);
  };

  return (
    <>
      <AuthForm onSubmit={handleRegister} title="Register" />
      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}
