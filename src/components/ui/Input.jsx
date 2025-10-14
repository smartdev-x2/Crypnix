import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  error, 
  icon: Icon,
  showPasswordToggle,
  onTogglePassword,
  showPassword,
  ...props 
}, ref) => {
  return (
    <motion.div 
      className="input-wrapper"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <div className="input-container">
        {Icon && <Icon className="input-icon" size={20} />}
        <input
          ref={ref}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          className={`input-field ${error ? 'input-error' : ''} ${Icon ? 'input-with-icon' : ''}`}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="password-toggle"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          className="input-error-message"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';

export default Input;
