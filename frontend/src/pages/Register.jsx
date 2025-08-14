// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosConfig';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post('/api/auth/register', formData);
//       alert('Registration successful. Please log in.');
//       navigate('/login');
//     } catch (error) {
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20">
//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
//         <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosConfig';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post('/api/auth/register', formData);
//       alert('✅ Registration successful. Please log in.');
//       navigate('/login');
//     } catch (error) {
//       alert('❌ Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-600 mb-1">Full Name</label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 mb-1">Email Address</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="********"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//           >
//             Register
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600 text-sm">
//           Already have an account?{' '}
//           <span
//             onClick={() => navigate('/login')}
//             className="text-green-600 font-medium cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
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
  );
};

export default Register;
