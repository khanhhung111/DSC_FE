// components/GoogleCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      toast.error(error);
      navigate('/login');
      return;
    }

    if (token) {
      // Lưu token vào localStorage
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/'); // Redirect to home page
    } else {
      toast.error('Login failed');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>Processing login...</div>
    </div>
  );
}

export default GoogleCallback;