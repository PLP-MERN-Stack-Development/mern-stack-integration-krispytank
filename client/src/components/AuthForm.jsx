import { useState } from 'react';

export default function AuthForm({ onSubmit, title }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {title === 'Register' && (
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className="auth-button"
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
}
