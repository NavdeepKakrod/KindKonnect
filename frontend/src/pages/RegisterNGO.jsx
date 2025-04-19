import { useState } from 'react';
import axios from 'axios';

const RegisterNGO = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register/ngo', formData);
      setMessage('NGO Registered Successfully!');
      console.log(res.data); // token and ngo info
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register NGO</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="NGO Name" onChange={handleChange} required /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} required /><br />
        <input name="address" placeholder="Address" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} /><br />
        <button type="submit">Register</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterNGO;
