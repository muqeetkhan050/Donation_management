
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// module.exports = { protect };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received:', token.substring(0, 20) + '...'); // Debug log
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decoded:', decoded); // Debug log
            
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            console.log('User found:', req.user ? req.user.email : 'null'); // Debug log
            
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message); // Debug log
            return res.status(401).json({ message: 'Not authorized, token failed' }); // Added return
        }
    } else {
        console.log('No authorization header or invalid format'); // Debug log
        return res.status(401).json({ message: 'Not authorized, no token' }); // Added return and moved to else
    }
};

module.exports = { protect };