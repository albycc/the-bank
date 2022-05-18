import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.use(express.json())

router.get('/', (req, res) =>{
    res.render('pages/index', {
        title:'Index'
    })
})

router.post('/api/login', async (req, res) =>{
    console.log('/api/login router')
    const {socialid, password} = req.body;
    console.log(socialid, password)
    const userData = await db.collection('customers').findOne({socialid:socialid});

    console.log(userData)
    const isMatch = await bcrypt.compare(password, userData.password);

    if(userData == null){
        console.log('no such user')
        res.status(401).json({error:'No such user'})
    }

    else if(!isMatch){
        res.status(401).json({error:'wrong password'})
    }
    else{
        req.session.user = userData;
        console.log(req.session.user)
        res.json({user: userData})
    }
})


router.get('/register', (req, res) =>{
    res.render('pages/newcustomer', {
        title:'Register'
    })
})

//create new customer and put in database
router.post('/register-customer', async (req, res) =>{
    console.log('/register-customer router')
    console.log(req.body)

    const customersCollection = await db.collection('customers');
    const customers = await customersCollection.find({}).toArray();

    if(customers.find(c => c.socialid == req.body.socialid)){

        console.log('id already exists');
        res.json({error:'User with that id already exists'})
    }
    else{
        const {name, socialid, password} = req.body;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds)
        const data = await db.collection('customers').insertOne({name, socialid, password:hash});
        console.log(data.insertedId.toString())
        const userData = await db.collection('customers').findOne({_id:ObjectId(data.insertedId.toString())});
        req.session.user = userData;
        console.log(userData)
        res.json({success:true})
    }
})



//TODO TODO TODO TODO

router.get('/api/loggedin', (req, res) =>{
    if(req.session.user){
        res.json({loggedIn:true})
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