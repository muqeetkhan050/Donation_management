const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createCause,
  getCauses,
  updateCause,
  deleteCause,
  donateToCause
} = require('../controllers/causeController');

const router = express.Router();

// Create new cause
router.post('/', protect, createCause);

// Get all causes
router.get('/', getCauses);

// Update cause
router.put('/:id', protect, updateCause);

// Delete cause
router.delete('/:id', protect, deleteCause);

// Donate to cause
router.post('/:id/donate', donateToCause);

module.exports = router;
