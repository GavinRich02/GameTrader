require('dotenv').config();

const express = require('express');
const app=express();

const mongoose=require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL,{useNewURLParser: true});

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const itemRouter=require('./routes/items');
const userRouter=require('./routes/users');
app.use('/items',itemRouter);
app.use('/users',userRouter);

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res)=> {
    res.render("login");
});

app.get("/signup", (req, res)=> {
    res.render("signup");
});

app.listen(3000);

