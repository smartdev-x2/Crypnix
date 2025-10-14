import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, Gift, Shield, Zap, TrendingUp } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import Input from './ui/Input';
import Button from './ui/Button';
import Toast from './ui/Toast';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import './Auth.css';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  });

  const { loading, toast, login, register, closeToast } = useAuth();
  const { errors, validateField, clearError, clearAllErrors } = useFormValidation();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    clearAllErrors();
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      referralCode: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
    clearError('phone');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValid = true;

    if (activeTab === 'register') {
      isValid = validateField('name', formData.name) && isValid;
      isValid = validateField('email', formData.email) && isValid;
      isValid = validateField('phone', formData.phone) && isValid;
      isValid = validateField('password', formData.password) && isValid;
      isValid = validateField('confirmPassword', formData.confirmPassword, formData.password) && isValid;
    } else {
      isValid = validateField('email', formData.email) && isValid;
      isValid = validateField('password', formData.password) && isValid;
    }

    if (!isValid) return;

    if (activeTab === 'login') {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });
      
      if (result.success) {
        console.log('Login successful:', result.data);
      }
    } else {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        referralCode: formData.referralCode,
      });
      
      if (result.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          referralCode: '',
        });
      }
    }
  };

  const features = [
    { icon: Shield, text: 'Bank-level encryption' },
    { icon: Zap, text: 'Instant transactions' },
    { icon: TrendingUp, text: 'Smart mining pools' },
  ];

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </motion.div>

      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="auth-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="auth-title">
            <span className="gradient-text">CrypNix</span>
          </h1>
          <p className="auth-subtitle">Next-Gen Crypto Mining Platform</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <feature.icon size={16} />
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Login
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Register
          </button>
          <motion.div
            className="tab-indicator"
            animate={{ x: activeTab === 'login' ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <AnimatePresence mode="wait">
            {activeTab === 'register' ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  icon={User}
                  error={errors.name}
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  icon={Mail}
                  error={errors.email}
                />

                <div className="input-wrapper">
                  <label className="input-label">Phone Number</label>
                  <div className="phone-input-container">
                    <Phone className="phone-icon" size={20} />
                    <PhoneInput
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      defaultCountry="us"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="input-error-message">{errors.phone}</p>
                  )}
                </div>

                <Input
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  icon={Lock}
                  error={errors.password}
                  showPasswordToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  icon={Lock}
                  error={errors.confirmPassword}
                  showPasswordToggle
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                <Input
                  label="Referral Code (Optional)"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder="Enter referral code"
                  icon={Gift}
                />
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  icon={Mail}
                  error={errors.email}
                />

                <Input
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  icon={Lock}
                  error={errors.password}
                  showPasswordToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button type="submit" isLoading={loading}>
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <motion.p 
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            className="auth-link"
            onClick={() => handleTabSwitch(activeTab === 'login' ? 'register' : 'login')}
          >
            {activeTab === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </motion.p>
      </motion.div>

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default Auth;
