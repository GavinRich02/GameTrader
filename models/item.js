const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model("Item",itemSchema);