const express=require('express');
const router=express.Router();
const Item=require('../models/item');
const User=require('../models/user');

let active;

//New Item
router.get('/new/:id', async(req,res)=> {
    res.render('./new', {user: await User.findById(req.params.id)});
});

//Get all items
router.get('/user=:id', async (req,res)=> {
    active=req.params.id;

    let items=await Item.find();
    res.render('./index', {items: items, user: await User.findById(req.params.id)});
});

//Get single item
router.get('/view/:id', async(req,res)=> {
    let item=await Item.findById(req.params.id);

    try {
        if(item.createdBy==String(active)) {
            owner=true;
        }
        else {
            owner=false;
        }
    } catch {
        owner=false;
    }

    res.render('./itemView', {item: await Item.findById(req.params.id), user: await User.findById(active), isOwner: owner});
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
router.patch('/:id', async(req,res)=> {
    let item=await Item.findById(req.params.id);
    let views=item.views;

    views++;
    console.log(views);

    if(item.createdBy!=active) {
        try {
            item.views=views;
            const complete=await item.save();
        } catch {console.log("Oof");};
    }

    res.redirect('/items/view/'+req.params.id);
});

//Delete item
router.delete('/:id', async(req, res)=> {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items/user='+active);
});

module.exports=router;