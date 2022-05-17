import express from 'express';
import db from '../db/connect.js'

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('pages/index', {
        title:'Index'
    })
})

router.post('/api/login', async (req, res) =>{
    console.log('/api/login router')
    const {socialid, password} = req.body;
    const userData = await db.collection('customers').findOne({socialid:socialid});

    console.log(userData)

    if(userData == null){
        console.log('no such user')
        res.status(401).json({error:'No such user'})
    }
    else if(password !== userData.password){
        res.status(401).json({error:'wrong password'})
    }
    else{
        req.session.user = userData;
        console.log(req.session.user)
        res.json({user: userData})
    }
})

router.get('/api/loggedin', (req, res) =>{
    if(req.session.socialid){

    }


})

export default router;