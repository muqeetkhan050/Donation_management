const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);


