

const Cause = require('../models/Cause');

// @desc    Get all causes
// @route   GET /api/causes
// @access  Public
const getCauses = async (req, res) => {
  try {
    const causes = await Cause.find({}).populate('creator', 'name email'); // include creator info
    res.json(causes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single cause by ID
// @route   GET /api/causes/:id
// @access  Public
const getCauseById = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id).populate('creator', 'name email');
    if (cause) {
      res.json(cause);
    } else {
      res.status(404).json({ message: 'Cause not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new cause
// @route   POST /api/causes
// @access  Private
// const createCause = async (req, res) => {
//   try {
//     const { title, description, targetAmount, category, imageUrl, endDate } = req.body;

//     const cause = new Cause({
//       title,
//       description,
//       targetAmount,
//       category,
//       imageUrl,
//       endDate,
//       creator: req.user._id // use logged-in user ID from protect middleware
//     });

//     const createdCause = await cause.save();
//     res.status(201).json(createdCause);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
const createCause = async (req, res) => {
  try {
    const { title, description, targetAmount } = req.body;

    if (!title || !description || !targetAmount) {
      return res.status(400).json({ message: 'Title, description, and target amount are required' });
    }

    const newCause = new Cause({
      title,
      description,
      targetAmount: Number(targetAmount),
      currentAmount: 0,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      creator: req.user._id,
    });

    await newCause.save();
    res.status(201).json(newCause);

  } catch (error) {
    console.error('Create cause error:', error);
    res.status(500).json({ message: 'Failed to create cause' });
  }
};
// @desc    Update a cause by ID
// @route   PUT /api/causes/:id
// @access  Private
const updateCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);

    if (!cause) return res.status(404).json({ message: 'Cause not found' });

    if (cause.creator.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this cause' });
    }

    // update fields
    cause.title = req.body.title || cause.title;
    cause.description = req.body.description || cause.description;
    cause.targetAmount = req.body.targetAmount || cause.targetAmount;
    cause.category = req.body.category || cause.category;
    cause.imageUrl = req.body.imageUrl || cause.imageUrl;
    cause.endDate = req.body.endDate || cause.endDate;

    const updatedCause = await cause.save();
    res.json(updatedCause);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a cause by ID
// @route   DELETE /api/causes/:id
// @access  Private
const deleteCause = async (req, res) => {
  try {
    const cause = await Cause.findById(req.params.id);

    if (!cause) return res.status(404).json({ message: 'Cause not found' });

    if (cause.creator.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this cause' });
    }

    await Cause.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cause removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Donate to a cause
// @route   POST /api/causes/:id/donate
const donateToCause = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid donation amount' });
    }

    const cause = await Cause.findById(id);
    if (!cause) {
      return res.status(404).json({ message: 'Cause not found' });
    }

    cause.currentAmount = (cause.currentAmount || 0) + amount;
    await cause.save();

    return res.status(200).json(cause);
  } catch (error) {
    console.error('Donation error:', error);
    return res.status(500).json({ message: 'Failed to process donation' });
  }
};


const getMyCauses = async (req, res) => {
  try {
    const userId = req.user._id; // set by auth middleware
    const myCauses = await Cause.find({ creator: userId }).sort({ createdAt: -1 });
    res.status(200).json(myCauses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch your causes' });
  }
};

module.exports = {
  getCauses,
  getCauseById,
  createCause,
  updateCause,
  deleteCause,
  donateToCause,
  getMyCauses
};
