const Capsule = require('../models/chronoLock.model.js')

const createCapsule = async (req,res)=>{
    try {
        const {title, content, revealDate} = req.body;

        const capsule = await Capsule.create({
            title,
            content,
            revealDate,
            owner: req.user.userId
        });

        res.status(201).json(capsule)
    } 
    catch(error) {
        res.status(500).json({message: "failed to create capsule", error: error.message})
    }
};

const getCapsule = async (req,res)=>{
    try {
        const capsules = await Capsule.find({owner:req.user.userId});
        res.status(200).json(capsules);
    } 
    catch (error) {
        res.status(500).json({message: 'failed to get capsules', error: error.message});

    }
}


const updateCapsule = async (req,res)=>{
    try {
        const capsuleId = req.params.id;
        const updates = req.body;

        const updatedCapsule = await Capsule.findOneAndUpdate(
            {_id: capsuleId, owner: req.user.userId},
            updates,
            {new:true}
        );
        if (!updatedCapsule) {
            return res.status(404).json({message: 'capsule not found'});
        }

        res.status(200).json(updatedCapsule);
    }
    catch (error) {
        res.status(500).json({message: 'failed to update capsule', error: error.message})
    }
}




module.exports = {
    createCapsule,
    getCapsule,
    updateCapsule
}