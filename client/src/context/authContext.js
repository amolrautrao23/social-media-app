import { createContext } from "react";
import axiosInstance from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  // React Query: fetch current user info using cookie
  const { data: currentUser, isLoading, isError, refetch } = useQuery({
  queryKey: ['currentUser'],
  queryFn: async () => {
    return await axiosInstance.get('/users/me');
  },
  staleTime: 0,
  refetchOnWindowFocus: false,
  retry: false, // only one error shown
});

  // Call this after successful login API (response should have user info)
  const login = async (userData) => {
    refetch(); // Optionally refetch user info
  };

  // Call this to logout (and optionally call backend logout API)
  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout'); // Adjust endpoint as needed
    } catch (err) {}
    refetch(); // Optionally refetch user info
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
}
