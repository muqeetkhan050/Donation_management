

const mongoose = require('mongoose');

const causeSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    targetAmount: { 
      type: Number, 
      required: true 
    },
    currentAmount: { 
      type: Number, 
      default: 0 
    },
    category: { 
      type: String 
    },
    imageUrl: { 
      type: String 
    },
    endDate: { 
      type: Date 
    },
    creator: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    donations: [{
      amount: { type: Number, required: true },
      donorName: { type: String, default: 'Anonymous' },
      donorEmail: { type: String },
      date: { type: Date, default: Date.now }
    }],
    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model('Cause', causeSchema);