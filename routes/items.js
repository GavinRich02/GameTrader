const express=require('express');
const router=express.Router();
const Item=require('../models/item');
const User=require('../models/user');

//New Item
router.get('/new/:id', async(req,res)=> {
    res.render('./new', {user: await User.findById(req.params.id)});
});

//Get all items
router.get('/user=:id', async (req,res)=> {
    let items=await Item.find();
    res.render('./index', {items: items, user: await User.findById(req.params.id)});
});

//Get single item
router.get('/:id-:uId', async(req,res)=> {
    let item=await Item.findById(req.params.id);

    try {
        if(item.createdBy==req.params.uId) {
            owner=true;
        }
        else {
            owner=false;
        }
    } catch {
        owner=false;
    }

    res.render('./itemView', {item: await Item.findById(req.params.id), user: await User.findById(req.params.uId), isOwner: owner});
});

//Create item
router.post('/save/:id', async(req,res)=> {
    let item=new Item({
        "name": req.body.name,
        "desc": req.body.desc,
        "cost": req.body.cost,
        "createdBy": req.params.id
    })

    await item.save();

    res.redirect('/items/user='+req.params.id);
});

//Edit item
router.patch('/:id', (req,res)=> {

});

//Delete item
router.delete('/:id-:uId', async(req, res)=> {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items/user='+req.params.uId);
});

module.exports=router;