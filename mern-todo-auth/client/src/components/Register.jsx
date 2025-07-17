import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        value={formData.username} 
        onChange={handleChange} 
        required 
      />
      <br />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      <br />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
      />
      <br />
      <button type="submit">Register</button>
      <p>Already have an account? 
        <a href="/login">
        <br />
          <button>Login</button>
        </a>
      </p>
    </form>
  );
};

  export default Register;