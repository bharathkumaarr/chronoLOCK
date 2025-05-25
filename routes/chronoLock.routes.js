const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const upload = require('../middleware/multerConfig')

const router = express.Router();

const {
    createCapsule,
    getCapsule,
    updateCapsule,
    shareCapsule
} = require('../controllers/chronoLock.controller')

router.post('/', protect, upload.single('media'), createCapsule);

router.get('/', protect, getCapsule)

router.put('/:id', protect, upload.single('media'), updateCapsule)

router.post('/:id/share', protect, shareCapsule)
module.exports = router
