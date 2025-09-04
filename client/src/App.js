import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './style.scss';
import { useContext, useEffect } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext, AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function AppRoutes() {
  const { currentUser, isLoading } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
  }, [currentUser]);
  const Layout = () => (
    <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );

  // Only allow access to children if logged in
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
    }
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Only allow access to children if NOT logged in
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
    }
    if (currentUser) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} pauseOnFocusLoss={false}  />
    </BrowserRouter>
  );
}

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
