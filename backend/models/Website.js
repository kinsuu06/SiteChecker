import mongoose from 'mongoose';

const websiteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  isActive: {
    type: Boolean,
  },
}, {
  timestamps: true,
});

const websiteModel = mongoose.models.Website || mongoose.model('Website', websiteSchema);
export default websiteModel;
