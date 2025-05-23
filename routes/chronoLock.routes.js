const express = require('express')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

const {
    createCapsule,
    getCapsule,
    updateCapsule
} = require('../controllers/chronoLock.controller')

router.post('/', protect, createCapsule);

router.get('/', protect, getCapsule)

router.put('/:id', protect, updateCapsule)


module.exports = router
