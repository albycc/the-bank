import express from 'express';
import db from '../db/connect.js'

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('pages/index', {
        title:'Index'
    })
})

router.post('/api/login', async (req, res) =>{
    const {socialid, password} = req.body;
    const userData = await db.collection('users').findOne({socialid:socialid});

    
    console.log(userData)
    
    if(!userData){
        res.status(401).json({error:'No such user'})
    }
    if(password !== userData.password){
        res.status(401).json({error:'wrong password'})
    }
    const id = userData._id.toString();
    req.session.user = id;
    res.json({userid: id})
})

export default router;