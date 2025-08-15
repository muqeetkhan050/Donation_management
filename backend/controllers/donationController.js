// const Donation=require('../models/Donation')

// const addDonation=async (req,res)=>{
//     try{
//         const {title,description, amount }=req.body
//         const donation=await Donation.create({
//             title,
//             description,
//             amount,
//             createdBy:req.user.id
//         })
//         res.status(201).json(donation)
//     }catch(error){
//         res.status(500).json({message:error.message}    )
//     }

// }

// const deleteDonation = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);

//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     if (donation.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ message: 'Not authorized to delete this donation' });
//     }

//     await donation.deleteOne();
//     res.json({ message: 'Donation removed' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { addDonation,deleteDonation };

const Cause = require('../models/causeModel');

// Create a new cause
const createCause = async (req, res) => {
  try {
    const cause = await Cause.create({
      title: req.body.title,
      description: req.body.description,
      goalAmount: req.body.goalAmount,
      currentAmount: 0,
      createdBy: req.user._id
    });
    res.status(201).json(cause);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create cause', error });
  }
};

// Get all causes
const getCauses = async (req, res) => {
  try {
    const causes = await Cause.find();
    res.json(causes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get causes', error });
  }
};

// Update a cause
const updateCause = async (req, res) => {
  try {
    const cause = await Cause.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cause);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update cause', error });
  }
};

// Delete a cause
const deleteCause = async (req, res) => {
  try {
    await Cause.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cause deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete cause', error });
  }
};

// Donate to a cause
const donateToCause = async (req, res) => {
  try {
    const { amount } = req.body;
    const cause = await Cause.findById(req.params.id);
    if (!cause) return res.status(404).json({ message: 'Cause not found' });

    cause.currentAmount += amount;
    await cause.save();
    res.json(cause);
  } catch (error) {
    res.status(400).json({ message: 'Failed to donate', error });
  }
};

module.exports = {
  createCause,
  getCauses,
  updateCause,
  deleteCause,
  donateToCause
};
