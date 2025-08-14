// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold">Your apps name</Link>
//       <div>
//         {user ? (
//           <>
//             <Link to="/tasks" className="mr-4">CRUD</Link>
//             <Link to="/profile" className="mr-4">Profile</Link>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="mr-4">Login</Link>
//             <Link
//               to="/register"
//               className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / App Name */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity duration-200"
          >
            Your App Name
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/tasks"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  CRUD
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
