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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports=mongoose.model("Item",itemSchema);