import React, { useContext, useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axiosInstance from '../../utils/axiosConfig';
import { showToast } from '../../utils/Toast';
import { AuthContext } from "../../context/authContext";

const loginUser = async (data) => {
  return await axiosInstance.post('/users/login', data);
  
};

const Login = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      navigate('/');
      // window.location.reload(); //temp solution

      showToast(res?.message , 'success');
      console.log("testing");
    },
    onError: (error) => {
      showToast(error?.message || 'Login failed ❌', 'error');
    },
  });

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!data.username.trim()) {
      showToast('Username is required', 'error');
      return false;
    }
    if (!data.password) {
      showToast('Password is required', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutateAsync(data)
    // console.log(data)
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={data.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange}/>
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
