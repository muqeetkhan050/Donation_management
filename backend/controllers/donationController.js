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

const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this donation' });
    }

    await donation.deleteOne();
    res.json({ message: 'Donation removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDonation,deleteDonation };