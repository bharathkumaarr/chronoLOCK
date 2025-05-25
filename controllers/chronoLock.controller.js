const Capsule = require('../models/chronoLock.model.js')
const User = require('../models/User.js')

const createCapsule = async (req,res)=>{
    try {
        const {title, content, revealDate} = req.body;
        const mediaPath = req.file ? req.file.path :null

        const capsule = await Capsule.create({
            title,
            content,
            revealDate,
            media: mediaPath,
            owner: req.user.userId
        });

        res.status(201).json(capsule)
    } 
    catch(error) {
        res.status(500).json({message: "failed to create capsule", error: error.message})
    }
};

const getCapsule = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    // Get owned and shared capsules in parallel
    const [ownedCapsules, sharedCapsules] = await Promise.all([
      Capsule.find({
        owner: userId,
        revealDate: { $lte: now },
      }).populate('owner', 'email'),

      Capsule.find({
        sharedWith: userId,
      }).populate('owner', 'email'),
    ]);

    // Format owned capsules
    const formattedOwned = ownedCapsules.map((cap) => ({
      ...cap._doc,
      isShared: false,
      sender: cap.owner.email,
    }));

    // Format shared capsules with conditional reveal
    const formattedShared = sharedCapsules.map((cap) => {
      const revealPassed = cap.revealDate <= now;
      return {
        _id: cap._id,
        revealDate: cap.revealDate,
        sender: cap.owner.email,
        isShared: true,
        ...(revealPassed
          ? {
              title: cap.title,
              content: cap.content,
              media: cap.media,
            }
          : {}),
      };
    });

    const allCapsules = [...formattedOwned, ...formattedShared];

    if (allCapsules.length === 0) {
      return res.status(200).json({
        message: 'No accessible capsules found',
        capsules: [],
      });
    }

    res.status(200).json({ capsules: allCapsules });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get capsules', error: error.message });
  }
};

const updateCapsule = async (req,res)=>{
    try {
        const capsuleId = req.params.id;
        const updates = req.body;

        if (req.file && req.file.path) {
            updates.media = req.file.path
        }

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

const shareCapsule = async (req,res)=>{
    try {
        const capsuleId = req.params.id;
        const {email} = req.body;

        const recipient = await User.findOne({email});
        if (!recipient) {
            return res.status(404).json({message: 'receipient user not found'})
        }
        const capsule = await Capsule.findOne({
            _id: capsuleId,
            owner: req.user.userId
        })
        
        if (!capsule) {
            return res.status(404).json({message: 'capsule not found'});
        }
        if (capsule.sharedWith.includes(recipient._id)){
            return res.status(400).json({message: 'capsule already shared'})
        }


        capsule.sharedWith.push(recipient._id);
        await capsule.save()
        ;

        res.status(200).json({message: 'capsule shared successfully'});
    
    }
    catch (error) {
        res.status(500).json({message: 'failed to share capsule', error: error.message})
    }

}






module.exports = {
    createCapsule,
    getCapsule,
    updateCapsule,
    shareCapsule
}