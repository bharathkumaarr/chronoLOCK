const mongoose = require('mongoose')

const capsuleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        revealDate: {
            type: Date,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        media: {
            type: String,
            default: null
        },
        sharedWith: {
            type: [{
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }],
            default: []
        },
        notified: {
            type: Boolean,
            default: false
        },
        opened: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    }
)

const Capsule = mongoose.model('Capsule', capsuleSchema)
module.exports = Capsule