import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('fop_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (role, email, additionalInfo = {}) => {
    const userData = {
      id: additionalInfo.id || (role === 'EXPERT' ? 'exp-1' : role === 'INSTITUTION' ? 'inst-1' : 'admin-1'),
      email,
      role,
      name: additionalInfo.name || (role === 'EXPERT' ? 'Arun Kumar' : role === 'INSTITUTION' ? 'Apex Institute' : 'Platform Admin'),
      ...additionalInfo
    };
    setUser(userData);
    localStorage.setItem('fop_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fop_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);