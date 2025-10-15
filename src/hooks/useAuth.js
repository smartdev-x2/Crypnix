import { useState } from 'react';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch('https://qfspayx-backend.42web.io/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          action: 'login',
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setToast({ message: result.message || 'Login successful!', type: 'success' });
        return { success: true, data: result };
      } else {
        setToast({ message: result.message || 'Login failed', type: 'error' });
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      setToast({ 
        message: error.message === 'Failed to fetch' 
          ? 'Cannot connect to server. Please check your internet connection.' 
          : 'Network error. Please try again.', 
        type: 'error' 
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch('https://qfspayx-backend.42web.io/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          action: 'register',
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          ...(userData.referralCode && { referral: userData.referralCode }),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setToast({ message: result.message || 'Registration successful!', type: 'success' });
        return { success: true, data: result };
      } else {
        setToast({ message: result.message || 'Registration failed', type: 'error' });
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setToast({ 
        message: error.message === 'Failed to fetch' 
          ? 'Cannot connect to server. Please check your internet connection.' 
          : 'Network error. Please try again.', 
        type: 'error' 
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const closeToast = () => {
    setToast({ message: '', type: '' });
  };

  return {
    loading,
    toast,
    login,
    register,
    closeToast,
  };
};
