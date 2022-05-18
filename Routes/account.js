import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import __dirname from '../utils/path.js'

const router = express.Router();

const userAccess = (req, res, next) =>{
    if(req.session.user){
        next();
    }
    else{
        res.sendFile('public/pages/unauthorized.html', { root: __dirname})
    }
}

router.get('/account', userAccess, async (req, res) =>{
    console.log('/account router')

    console.log(req.session.user)
    const accountsData = await db.collection('accounts').find({user:ObjectId(req.session.user._id)}).toArray();

    console.log(accountsData);
    res.sendFile('public/pages/account.html', { root: __dirname})
})


router.get('/api/accounts', async (req, res) =>{
    console.log('/api/accounts')

    console.log(req.session.user)

    const accountsData = await db.collection('accounts').find({user:ObjectId(req.session.user._id)}).toArray();

    res.json(accountsData)

})

export default router;