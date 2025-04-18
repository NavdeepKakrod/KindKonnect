import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post' 
  },
  amount: {
    type:Number,
  },
  paymentStatus: { 
    type: String, enum: ['success', 'failed'], 
    default: 'success' 
  },
}, { timestamps: true }
); 

const Transaction = mongoose.model("Transaction",transactionSchema);

export default Transaction;