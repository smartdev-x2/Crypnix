
import { useState } from 'react';
import supabase from '../components/supabaseClient';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: '' });
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    closeToast();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showToast('Login successful! Welcome back.', 'success');
      return { success: true, data };
    } catch (error) {
      showToast(error.message || 'Login failed. Please try again.', 'error');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, phone, password, referralCode }) => {
    setLoading(true);
    closeToast();
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            referral_code: referralCode || null,
          },
        },
      });

      if (error) throw error;

      showToast('registertration successfully please login to your account to access your dashboard ', 'success');
      return { success: true, data };
    } catch (error) {
      showToast(error.message || 'Registration failed. Please try again.', 'error');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    toast,
    login,
    register,
    closeToast,
  };
};
