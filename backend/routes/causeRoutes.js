
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createCause,
  getCauses,
  getCauseById,
  updateCause,
  deleteCause
} = require('../controllers/causeController');

// Public routes
router.get('/', getCauses);
router.get('/:id', getCauseById);

// Protected routes
router.post('/', protect, createCause);
router.put('/:id', protect, updateCause);
router.delete('/:id', protect, deleteCause);
// In routes/causeRoutes.js

module.exports = router