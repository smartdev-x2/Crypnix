import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validatePhone = (phone) => {
    return phone && phone.length >= 10;
  };

  const validateField = (name, value, confirmValue = null) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value)) error = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== confirmValue) error = 'Passwords do not match';
        break;
      case 'name':
        if (!value) error = 'Full name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!validatePhone(value)) error = 'Invalid phone number';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const clearError = (name) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    clearError,
    clearAllErrors,
  };
};
