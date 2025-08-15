import mongoose from 'mongoose';

const causeSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},    
    totalDonations:{type:Number,default:0},
},{timestamps:true})

export default mongoose.model('Cause',causeSchema);
