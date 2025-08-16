const Cause = require('../models/Cause');

// Create a new cause
const createCause = async (req, res) => {
  try {
    // Requires auth middleware to set req.user
    const cause = await Cause.create({
      title: req.body.title,
      description: req.body.description,
      goalAmount: req.body.goalAmount,
      currentAmount: 0,
      createdBy: req.user._id, // link to logged-in user
    });

    // Return the newly created cause for immediate frontend display
    res.status(201).json(cause);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create cause' });
  }
};

// Get all causes (newest first)
const getCauses = async (req, res) => {
  try {
    const causes = await Cause.find().sort({ createdAt: -1 });
    res.json(causes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get causes' });
  }
};

// Update a cause (only by creator)
const updateCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) return res.status(404).json({ message: 'Cause not found' });

    // Authorization: only creator can update
    if (cause.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    cause.title = req.body.title || cause.title;
    cause.description = req.body.description || cause.description;
    cause.goalAmount = req.body.goalAmount || cause.goalAmount;

    const updatedCause = await cause.save();
    res.json(updatedCause);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update cause' });
  }
};

// Delete a cause (only by creator)
const deleteCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) return res.status(404).json({ message: 'Cause not found' });

    // Authorization: only creator can delete
    if (cause.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await cause.remove();
    res.json({ message: 'Cause deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to delete cause' });
  }
};

// Donate to a cause
const donateToCause = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Donation must be positive' });

    const cause = await Cause.findById(req.params.id);
    if (!cause) return res.status(404).json({ message: 'Cause not found' });

    cause.currentAmount += amount;
    await cause.save();

    res.json(cause); // return updated cause so frontend can update immediately
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to donate' });
  }
};

module.exports = {
  createCause,
  getCauses,
  updateCause,
  deleteCause,
  donateToCause,
};
