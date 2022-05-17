import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';

const router = express.Router();

const userAccess = (req, res, next) =>{
    if(req.session.user){
        next();
    }
    else{
        res.redirect('/')
    }
}

router.get('/account', userAccess, async (req, res) =>{
    console.log('/account router')

    console.log(req.session.user)
    const accountsData = await db.collection('accounts').find({user:ObjectId(req.session.user._id)}).toArray();

    console.log(accountsData);
    res.render('pages/account', {
        title:'Account',
        accountsData,
        username: req.session.user.name
    })
})


router.get('/api/accounts', async (req, res) =>{
    console.log('/api/accounts')

    const accountsData = await db.collection('accounts').find().toArray();

    res.json(accountsData)

})

export default router;