import React from 'react';
import LoginForm from './components/LoginForm';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './utils/auth';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const user_data = isAuthenticated()
    if (user_data) setUser(user_data)
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      {user.username ? (
        <div>
          <p>Welcome {user.username}!</p>
          <button onClick={handleLogOut}>LOG OUT</button>
        </div>
      ) : (
        <div>
          < LoginForm user={user} setUser={setUser} />
          <NavLink to="/register">CREATE ACCOUNT</NavLink>
        </div>
      )}
    </div>
  );
};

export default App;
