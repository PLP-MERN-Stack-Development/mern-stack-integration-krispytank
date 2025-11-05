// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (userData) => {
    await authService.register(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);