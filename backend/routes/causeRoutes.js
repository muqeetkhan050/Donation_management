const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createCause,
  getCauses,
  getCauseById,
  updateCause,
  deleteCause,
  donateToCause
} = require('../controllers/causeController');

// Get all causes
router.get('/causes', getCauses);

// Get a single cause by ID
router.get('/causes/:id', getCauseById);

// Create a new cause (protected)
router.post('/causes', protect, createCause);

// Update a cause by ID (protected)
router.put('/causes/:id', protect, updateCause);

// Delete a cause by ID (protected)
router.delete('/causes/:id', protect, deleteCause);

// Donate to a cause
router.post('/causes/:id/donate', donateToCause);

module.exports = router;
