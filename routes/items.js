const express=require('express');
const router=express.Router();
const Item=require('../models/item');
const User=require('../models/user');

//New
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

    console.log(owner);

    res.render('./itemView', {item: await Item.findById(req.params.id), isOwner: owner});
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
router.delete('/:id', (req, res)=> {

});

module.exports=router;