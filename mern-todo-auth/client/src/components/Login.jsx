import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import API from '../utils/api';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', data);
      login(res.data.token);
      toast.success("Logged in successfully");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input type="email" placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
