import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-brand">
              <Link to="/" className="nav-brand">
               PLP Academy Blog
              </Link>
            </div>
            <div className="nav-links">
              {user ? (
                <>
                  <span>Welcome, {user.username}</span>
                  <Link
                    to="/create"
                    className="btn btn-primary"
                  >
                    Create Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
