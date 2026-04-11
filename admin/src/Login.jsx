import React, { useState } from 'react';

function Login({ setToken }) {
  const [email, setEmail] = useState(''); // Now using email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // Send the email to Flask
      });

      const data = await response.json();

      // Check for data.token to match your auth_routes.py
      if (response.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token); 
      } else {
        setError(data.error || 'Login failed. Check credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Check your Flask terminal!');
    }
  };

  return (
    <div className="login-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="Email (admin@example.com)" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password (admin123)" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;