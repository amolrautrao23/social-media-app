import { createContext, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const login = async (data) => {
    const res = await axiosInstance.post('/users/login', data);
    setCurrentUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  };

  // Call this to logout (and optionally call backend logout API)
  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout');
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
}
