import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import bcrypt from 'bcrypt';
import __dirname from '../utils/path.js'

const router = express.Router();
router.use(express.json())

router.get('/', (req, res) =>{
    console.log('/ router')
    res.sendFile('public/pages/index.html', { root: __dirname})
})


router.post('/api/login', async (req, res) =>{
    console.log('/api/login router')
    const {socialid, password} = req.body;
    const userData = await db.collection('customers').findOne({socialid:socialid});

    const isMatch = await bcrypt.compare(password, userData.password);

    if(userData == null){
        res.status(401).json({error:'No such user'})
    }

    else if(!isMatch){
        res.status(401).json({error:'wrong password'})
    }
    else{
        req.session.user = userData;
        res.json({user: userData})
    }
})


router.get('/register', (req, res) =>{
    res.sendFile('public/pages/newcustomer.html', { root: __dirname})
})

//create new customer and put in database
router.post('/register-customer', async (req, res) =>{
    console.log('/register-customer router')

    const customersCollection = await db.collection('customers');
    const customers = await customersCollection.find({}).toArray();

    if(customers.find(c => c.socialid == req.body.socialid)){

        res.json({error:'User with that id already exists'})
    }
    else{
        const {name, socialid, password} = req.body;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds)
        const data = await db.collection('customers').insertOne({name, socialid, password:hash});
        const userData = await db.collection('customers').findOne({_id:ObjectId(data.insertedId.toString())});
        await db.collection('accounts').insertOne({name:'Private account', number:generateAccountnumber(), balance:0, user:userData._id})
        req.session.user = userData;
        console.log(userData)
        res.json({success:true})
    }
})

function generateAccountnumber(){
    let format = '1234-';
    for(let i = 1; i < 10; i++){
        const number = Math.floor(Math.random()*9);
        format += number;
    }
    return format;
}


router.get('/api/loggedin', (req, res) =>{
    if(req.session.user){
        res.json({user:req.session.user})
    }
    else{
        res.status(401).json({error:'Unauthorized'})
    }
})

router.post('/api/logout', (req, res) =>{
    req.session.destroy(() =>{
        res.json({loggedIn:false})
    })
})

export default router;