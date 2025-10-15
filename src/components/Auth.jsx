import React, { useState } from 'react';
import './Auth.css'; // Import the specific styles for Auth
import supabase from './supabaseClient'; // Import the Supabase client
import logo from '../assets/logo.png'; // Import the logo image
import toast from 'react-hot-toast'
// SVG for the coin (example - you can use a more detailed one)
const CoinIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" />
    <path d="M12 6v12M8 9l4 3 4-3" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Auth = () => {
  const [activeTab, setActiveTab] = useState('register'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [agreeTerms, setAgreeTerms] = useState(false); // State for terms agreement
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // For toast messages

  // Function to calculate password strength (simple example)
  const calculatePasswordStrength = (pwd) => {
    if (pwd.length === 0) return '';
    if (pwd.length < 8) return 'Too Short';
    let strength = 0;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    if (strength < 2) return 'Weak';
    if (strength < 3) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setMessage({ type: '', text: '' }); // Clear message on tab switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Basic validation for registration
    if (activeTab === 'register') {
      if (!agreeTerms) {
        setMessage({ type: 'error', text: 'You must agree to the Terms of Service and Privacy Policy.' });
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match!' });
        setLoading(false);
        return;
      }
      if (password.length < 8) { // Updated min length requirement
        setMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
        setLoading(false);
        return;
      }
    }

    try {
      if (activeTab === 'login') {
        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          // Login successful
          setMessage({ type: 'success', text: 'Login successful!' });
          // Optionally redirect or clear form here after success
          // window.location.href = '/dashboard'; // Or use React Router
        }
      } else if (activeTab === 'register') {
        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              name: name,
              phone: phone,
              // We cannot store referral_code or referred_by_id here
              // because Supabase Auth user metadata is separate from our custom users table.
              // We need to insert into our 'users' table *after* successful auth.
            }
          }
        });

        if (authError) {
          setMessage({ type: 'error', text: authError.message });
        } else {
          // Supabase Auth successful (user created in Auth system)
          // Now, insert user details into our custom 'users' table
          const userId = authData.user.id; // Get the new user's ID from Supabase Auth
          // Generate a unique referral ID for the new user (simple example using crypto.randomUUID)
          // In a real app, you might want a more robust ID generation strategy.
          const newReferralId = crypto.randomUUID().substring(0, 8); // Example: use first 8 chars

          const { error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  id: userId, // Use the ID from Supabase Auth
                  name: name,
                  email: email,
                  phone: phone,
                  referral_id: newReferralId, // Generated unique ID
                  referred_by: null // For now, set to null. You would need to implement referral code checking here.
                }
              ]);

          if (insertError) {
            console.error('Error inserting into users table:', insertError);
            // If inserting into custom table fails, the user might be partially created.
            // You might want to handle this differently (e.g., rollback auth, show specific message).
            setMessage({ type: 'error', text: 'Registration successful, but there was an issue with your profile. Please contact support.' });
          } else {
            // Both Auth and custom table insertion successful
            setMessage({ type: 'success', text: 'Registration successful! Please check your email to confirm your account.' });
            // Optionally, redirect to login or body.html after confirmation
            // window.location.href = 'body.html'; // Only if confirmed immediately
            // For now, just show alert and clear form
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setReferralCode('');
            setAgreeTerms(false); // Clear terms agreement
          }
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setMessage({ type: 'error', text: 'An unexpected error occurred during authentication.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Animated Background */}
      <div className="animated-background">
        {[...Array(15)].map((_, i) => (
          <CoinIcon key={i} className="falling-coin" />
        ))}
      </div>

      {/* Auth Container */}
      <div className="auth-container">
        {/* Header with Logo */}
        <div className="auth-header">
          <div className="logo-container">
            <img src={logo} alt="CrypNix Logo" className="logo-image" />
          </div>
          <h1 className="app-title">CRYPNIX</h1>
          <h2 className="subtitle">
            {activeTab === 'login' ? 'Sign In to Your Account' : 'Create Your Trading Account'}
          </h2>
        </div>

        {/* Security Trust Elements */}
        <div className="security-trust">
          <p><span className="icon">🔒</span> Your data is secured with bank-level encryption</p>
          <p><span className="icon">🔑</span> 2-Factor Authentication required for all accounts</p>
          <p><span className="icon">🛡️</span> SSL Secured Connection</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('login')}
          >
            Sign In
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </>
          )}
          <div className="input-group">
            <label htmlFor="email">{activeTab === 'login' ? 'Email Address *' : 'Email Address *'}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'login' ? "Enter your email" : "Enter your email address"}
              required
            />
          </div>
          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label htmlFor="password">{activeTab === 'login' ? 'Password *' : 'Password *'}</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type
                id="password"
                value={password}
                onChange={handlePasswordChange} // Use updated handler
                placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
                required
              />
              <div className="password-strength-indicator">
                <span className={`strength ${passwordStrength.toLowerCase()}`}>{passwordStrength}</span>
              </div>
              <button
                type="button"
                className="toggle-password-button"
                onClick={() => setShowPassword(!showPassword)} // Toggle state
              >
                {showPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icons */}
              </button>
            </div>
            <p className="password-requirements">• Must be 8+ characters with numbers & symbols</p>
          </div>

          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password *</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange} // Use updated handler
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle state
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icons */}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="referral">Referral Code (Optional)</label>
                <input
                  type="text"
                  id="referral"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code"
                />
              </div>
            </>
          )}

          {activeTab === 'register' && (
            <div className="terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <span className="checkmark"></span>
                <span>I agree to <a href="#" target="_blank">Terms of Service</a> & <a href="#" target="_blank">Privacy Policy</a></span>
              </label>
              <p className="risk-warning">⚠️ Trading involves risk - only invest what you can afford to lose</p>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="loading-text">Processing...</span>
            ) : activeTab === 'login' ? (
              'Sign In'
            ) : (
              'Create Secure Account 🔐' // Updated button text
            )}
          </button>
        </form>

        {/* Trust Pilot Link */}
        <div className="trustpilot-link">
          <a href="" target="_blank" rel="noopener noreferrer">Leave a Review on Trustpilot</a>
        </div>

        {/* Toast Message Display */}
        {message.text && (
          <div className={`toast ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;