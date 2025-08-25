// src/pages/Register.js
import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import './register.css';
import axiosInstance from '../../utils/axiosConfig';
import { showToast, showAsyncToast } from '../../utils/Toast';

// API call
const registerUser = async (formData) => {
  let res = await axiosInstance.post('/users/register', formData);
  console.log(res, 'result');
  return res.data;
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showToast('Registered successfully 🎉', 'success');
      resetForm();
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Registration failed ❌', 'error');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePic: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    if (!formData.username.trim()) {
      showToast('Username is required', 'error');
      return false;
    }
    if (formData.username.length < 3) {
      showToast('Username must be at least 3 characters', 'error');
      return false;
    }
    if (!formData.email.trim()) {
      showToast('Email is required', 'error');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showToast('Enter a valid email', 'error');
      return false;
    }
    if (!formData.password) {
      showToast('Password is required', 'error');
      return false;
    }
    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return false;
    }
    if (!formData.name.trim()) {
      showToast('Name is required', 'error');
      return false;
    }
    if (!formData.profilePic) {
      showToast('Profile picture is required', 'error');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      name: '',
      profilePic: null,
    });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const form = new FormData();
    form.append('name', formData.name);
    form.append('username', formData.username);
    form.append('email', formData.email);
    form.append('password', formData.password);
    if (formData.profilePic) {
      form.append('profilePic', formData.profilePic);
    }

    showAsyncToast(mutation.mutateAsync(form), {
      pending: 'Registering...',
      success: 'Registration successful 🎉',
      error: 'Failed to register ❌',
    });
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum, alias totam numquam ipsa exercitationem dignissimos, error nam, consequatur.</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

            {/* Upload Image */}
            <div className="upload-section">
              <input type="file" id="file-upload" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
              {preview && (
                <div className="preview">
                  <img src={preview} alt="Profile Preview" />
                </div>
              )}
            </div>

            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
