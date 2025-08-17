
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


const {
  createCause,
  getMyCauses,
  getCauses,
  getCauseById,
  updateCause,
  deleteCause,
  donateToCause
} = require('../controllers/causeController');

// Public routes
router.get('/', getCauses);
router.get('/:id', getCauseById);
router.post('/:id/donate', donateToCause);


// Protected routes
router.post('/', protect, createCause);
router.put('/:id', protect, updateCause);
router.delete('/:id', protect, deleteCause);
router.post('/', protect, createCause);   // create cause with logged-in user
router.get('/my', protect, getMyCauses); 
// In routes/causeRoutes.js

module.exports = router