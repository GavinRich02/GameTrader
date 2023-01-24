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
        let link='/items/user='+user[0].id;
        res.redirect(link);
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

        newUser=await newUser.save();

        res.redirect('/items/user=`newUser.id');
    }
});

//Get single user
router.get('/:id', async (req,res)=> {
    res.render('./userPage', {user: await User.findById(req.params.id)});
});

//Edit user
router.patch('/:id', async(req,res)=> {
    let user=await User.findById(req.params.id);

    try {
        user.password=req.body.newPass;
        let complete=await user.save();
    } catch {
        console.log("Ope");
    }

    let link='/users/'+req.params.id;

    res.redirect(link);
});

//Delete user
router.delete('/del/:id', async(req, res)=> {
    const deleted=await User.findByIdAndDelete(req.params.id);

    res.redirect('/');
});

module.exports=router;