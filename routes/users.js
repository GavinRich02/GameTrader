const express=require('express');
const router=express.Router();
const User=require('../models/user');

let userSignIn;

//Get all users
router.get('/', async (req,res)=> {
    let users=await User.find();
});

//Login Check
router.post('/login', async (req,res)=> {
    let user=await User.find({"username": req.body.username, "password": req.body.password});

    if(user==String([])) {
        res.redirect('/');
    }
    else {
        userSignIn=user;
        console.log(userSignIn);
        res.redirect('/items/');
    }
});

//Signup
router.post('/userCheck', async (req,res)=> {
    let user=await User.find({"username": req.body.username});

    if(user!=String([])) {
        res.redirect('/');
    }
    else {
        let newUser=new User({
            "name": req.body.name,
            "username": req.body.username,
            "password": req.body.password
        });

        userSignIn=newUser;
        console.log(userSignIn);

        await newUser.save();

        res.redirect('/items/');
    }
});

//Get single user
router.get('/:id', async (req,res)=> {
});

//Create user
router.post('/addUser', async(req,res)=> {
    
});

//Edit user
router.patch('/:id', (req,res)=> {

});

//Delete user
router.delete('/:id', (req, res)=> {

});

module.exports=router;