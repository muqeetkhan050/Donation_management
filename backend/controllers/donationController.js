const Donation=require('../models/Donation')

const addDonation=async (req,res)=>{
    try{
        const {title,description, amount }=req.body
        const donation=await Donation.create({
            title,
            description,
            amount,
            createdBy:req.user.id
        })
        res.status(201).json(donation)
    }catch(error){
        res.status(500).json({message:error.message}    )
    }

}

module.exports = { addDonation };