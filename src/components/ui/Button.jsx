import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  icon: Icon,
  ...props 
}) => {
  return (
    <motion.button
      className={`button button-${variant}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <motion.div 
          className="button-loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 size={20} />
        </motion.div>
      ) : (
        <>
          {Icon && <Icon size={18} className="button-icon" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
