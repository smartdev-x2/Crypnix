# CrypNix - Modern Crypto Mining Platform

## Overview

A professional React authentication application built with Vite, featuring a world-class UI with modern animations, glassmorphic design, and responsive layouts. The application implements proper React patterns with custom hooks, reusable components, and clean architecture. It communicates with a remote PHP backend API for user authentication operations.

**Last Updated**: October 14, 2025

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 19.2.0** - Latest version of React for building the user interface
- **Vite 7.1.10** - Modern build tool for fast development and optimized builds
- **JSX/JavaScript** - JavaScript for simpler development workflow

**UI & Animations**
- **Framer Motion 12.0.0-alpha.0** - Advanced animation library for smooth transitions, micro-interactions, and page transitions
- **Lucide React 0.468.0** - Modern icon library for consistent SVG icons (Mail, Lock, User, Phone, Shield, Zap, etc.)
- **Glassmorphic Design** - Modern UI with backdrop-blur effects, gradient backgrounds, and animated orbs
- **Responsive Design** - Mobile-first approach with breakpoints at 640px and 480px

**Form Management & Validation**
- **React Hook Form 7.54.2** - Installed but using custom state management for flexibility
- **React International Phone 4.6.0** - International phone number input with country selection
- **Custom Validation** - `useFormValidation` hook with email, password, phone, and field-level validation

**Component Architecture**
```
src/
├── components/
│   ├── Auth.jsx              # Main authentication container
│   └── ui/                   # Reusable UI components
│       ├── Input.jsx         # Custom input with icons, validation, password toggle
│       ├── Button.jsx        # Animated button with loading states
│       └── Toast.jsx         # Toast notification system
├── hooks/
│   ├── useAuth.js           # Authentication logic (login, register, API calls)
│   └── useFormValidation.js # Form validation rules and error management
├── App.jsx                   # Main app component
└── main.jsx                  # Entry point
```

**Design Features**
- Animated gradient orb backgrounds with floating animation
- Glassmorphic auth container with backdrop-blur
- Feature badges showcasing key platform benefits
- Smooth tab transitions with animated indicator
- Input fields with icons and real-time validation
- Password visibility toggle
- Loading states and animations
- Toast notification system for feedback

### Backend Integration

**API Communication**
- RESTful API pattern using native Fetch API
- Backend endpoint: `https://qfspayx-backend.42web.io/index.php`
- JSON-based request/response format
- Action-based API design (actions: 'login', 'register')

**Authentication Flow**
1. Client-side validation via `useFormValidation` hook
2. API call through `useAuth` hook (login or register)
3. Server-side authentication via PHP backend
4. Toast notification system for success/error feedback
5. Loading states managed during async operations
6. Form reset after successful registration

**Request Format**
```javascript
// Login
{ action: 'login', email: string, password: string }

// Register
{ 
  action: 'register', 
  name: string, 
  email: string, 
  phone: string, 
  password: string,
  referral?: string 
}
```

### Development Environment

**Code Quality**
- ESLint 9.36.0 with React-specific plugins
- React Hooks linting rules enforced
- React Refresh plugin for fast development updates
- Custom rules for unused variables

**Development Server**
- Configured for Replit hosting environment
- Port 5000 with host exposure enabled
- Allowed hosts: `.replit.dev`, `.repl.co` for preview functionality

## React Patterns & Best Practices

### Custom Hooks
1. **useAuth** - Centralizes authentication logic
   - Handles login and register API calls
   - Manages loading states
   - Controls toast notifications
   - Returns: `{ loading, toast, login, register, closeToast }`

2. **useFormValidation** - Reusable validation logic
   - Email format validation
   - Password strength (min 8 characters)
   - Phone number validation
   - Password confirmation matching
   - Returns: `{ errors, validateField, clearError, clearAllErrors }`

### Component Composition
- **Input Component** - Reusable input with icons, validation, password toggle using forwardRef
- **Button Component** - Animated button with loading spinner and icon support
- **Toast Component** - Auto-dismissing notifications with animations using AnimatePresence

### State Management
- Local state with `useState` for form data and UI state
- Custom hooks for business logic separation
- Proper cleanup and reset on tab switch
- No global state needed (auth is stateless for now)

## External Dependencies

### Backend Services
- **PHP Backend API** - Hosted at `https://qfspayx-backend.42web.io/index.php`
  - Handles user authentication (login/register)
  - JSON-based communication
  - Returns success/error messages with status

### Third-Party Libraries
- **framer-motion** - UI animation and gesture library
- **lucide-react** - Icon component library  
- **react-hook-form** - Form state management (installed, ready for future use)
- **react-international-phone** - International phone number input

### Development Tools
- **Vite plugins** - @vitejs/plugin-react for React Fast Refresh
- **ESLint plugins** - react-hooks and react-refresh for code quality

### Hosting & Deployment
- **Replit** - Primary development and hosting environment
- Custom Vite configuration for Replit preview compatibility
- No database dependencies in frontend (auth handled by external PHP backend)
- Free domain during development, will upgrade for production launch

## Future Enhancements

### Security (Post-Launch)
- Multi-factor authentication (2FA)
- Email/phone verification
- Session/token management with JWT
- Password strength requirements (uppercase, lowercase, numbers, special chars)
- CAPTCHA for bot protection
- Rate limiting on API calls

### Features
- Post-auth navigation and session handling
- Remember me functionality
- Social login options
- Password reset flow
- Account recovery options

### Technical Improvements
- Automated testing (unit/integration) for hooks and components
- Enhanced validation rules based on business requirements
- Error boundary implementation
- Analytics integration
