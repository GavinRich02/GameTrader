const express=require('express');
const router=express.Router();
const Item=require('../models/item');

//New
router.get('/new', (req,res)=> {
    res.render('./new');
});

//Get all items
router.get('/', async (req,res)=> {
    let items=await Item.find();
    res.render('./index', {items: items});
});

//Get single item
router.get('/:id', async(req,res)=> {
    res.render('./itemView', {item: await Item.findById(req.params.id)});
});

//Create item
router.post('/save', async(req,res)=> {
    let item=new Item({
        "name": req.body.name,
        "desc": req.body.desc,
        "cost": req.body.cost
    })

    await item.save();

    res.redirect('/items/');
});

//Edit item
router.patch('/:id', (req,res)=> {

});

//Delete item
router.delete('/:id', (req, res)=> {

});

module.exports=router;