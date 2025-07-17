import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import API from '@/utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
       <br />
      <button type="submit">Login</button>

      <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
             <br />
           <button>Register</button>
          </span>
        </p>
    </form>
  );
}
