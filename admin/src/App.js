import React, { useState } from "react";
import './App.css';
import EventMgmtCard from "./EventMgmtCard";
import EventMgmtDetails from "./EventMgmtDetails";
import Login from "./Login"; // Import the new Login component

function App() {
  const path = window.location.pathname;

  // 1. Check if the user already logged in previously
  const [token, setToken] = useState(localStorage.getItem('admin_token'));

  // 2. Handle logging out
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  // 3. If no token, trap them at the Login screen
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // 4. Authenticated Dashboard (Notice we pass the 'token' down as a prop)
  return (
    <div className="App">
      <header className="header">
  <div className="logo">
    <h2 style={{ color: 'white', margin: 0 }}>Admin Portal</h2>
  </div>

  <nav className="header-menu">
    <ul className="header-menu__list">
      <li>
        <a href="http://localhost:3000/launcher.html" className="portal-home-link">
           Home
        </a>
      </li>

      <li className="header-menu__list-item">
        <a href="/">Dashboard</a>
      </li>
      
      <li className="header-menu__list-item">
        <a href="/details">Create Event</a>
      </li>

      <li>
        <button 
          className="logout-btn" 
          onClick={() => {
            localStorage.removeItem('admin_token'); 
            window.location.href = '/'; 
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  </nav>
</header>

      <section className="main">
        {path === "/" && <EventMgmtCard token={token} />}
        {path === "/details" && <EventMgmtDetails token={token} />}
      </section>
    </div>
  );
}

export default App;