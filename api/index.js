// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const cors = require('cors');
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const User = require('./models/User.js');
// eslint-disable-next-line no-undef
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-undef
const CookieParser = require('cookie-parser')
// eslint-disable-next-line no-undef
require('dotenv').config()

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r54r3wq45wd';

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
})

app.post('/register', async(req, res) => {
    const {name,email,password} = req.body; 

    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
    
        res.json(userDoc);
    }catch(e){
        res.status(422).json(e);
    }
})

app.post('/login', async(req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email:email})
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            jwt.sign({email:userDoc.email, id:userDoc._id, name:userDoc.name}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json('pass OK')
            })
        }else{
            res.status(422).json(userDoc)
        }
    }else{
        res.json('not found');
    }

})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }else {
        res.json(null);
    }
    res.json({token});
})

app.listen(4000);