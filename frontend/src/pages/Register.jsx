

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('✅ Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Registration Form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100 px-8">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Right side - Heading & Info */}
      <div className="w-1/2 bg-blue-400 text-white flex flex-col justify-center items-center p-12">
  <h2 className="text-4xl font-bold mb-4 text-center">Create and Manage Donations</h2>
  <p className="text-lg text-center max-w-md">
    Easily create donation causes, track contributions, and help make an impact. Join our community to
    make every donation count!
  </p>
</div>
    </div>
  );
};

export default Register;

