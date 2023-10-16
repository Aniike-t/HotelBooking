import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rePassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.rePassword) {
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          username: formData.username,
          password: formData.password,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="rePassword"
          placeholder="Re-enter Password"
          value={formData.rePassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
