import React from 'react';
import Auth from './components/Auth';
import './App.css'; // Global styles can go here if needed, or in Auth.css

function App() {
  return (
    <div className="App">
      {/* App component renders the Auth component */}
      <Auth />
    </div>
  );
}

export default App;