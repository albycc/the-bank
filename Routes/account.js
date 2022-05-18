import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import __dirname from '../utils/path.js'
import { generateAccountNumber } from '../utils/accountgenerator.js'

const router = express.Router();

const userAccess = (req, res, next) =>{
    if(req.session.user){
        next();
    }
    else{
        res.sendFile('public/pages/unauthorized.html', { root: __dirname})
    }
}

//get account html page
router.get('/account', userAccess, async (req, res) =>{
    console.log('/account router')

    res.sendFile('public/pages/account.html', { root: __dirname})
})

//get html page for registering accounts
router.get('/register-account', userAccess, (req, res) =>{
    res.sendFile('public/pages/accountregister.html', { root: __dirname})
})

router.get('/transfer-account', userAccess, (req, res) =>{
    res.sendFile('public/pages/accounttransfer.html', { root: __dirname})
})

router.get('/delete-account', userAccess, (req, res) =>{
    res.sendFile('public/pages/accountdelete.html', { root: __dirname})
})


//api call: get users accounts
router.get('/api/accounts', userAccess, async (req, res) =>{
    console.log('/api/accounts')

    console.log(req.session.user)

    const accountsData = await db.collection('accounts').find({user:ObjectId(req.session.user._id)}).toArray();

    res.json(accountsData)

})

//api post: create bank account
router.post('/api/accounts',  async (req, res) =>{
    console.log('/api/account post router')

    const accountData = req.body;

    accountData.balance = +(accountData.balance)

    accountData.user = ObjectId(req.session.user._id);
    accountData.number = generateAccountNumber()

    console.log(req.body)
    const data = await db.collection('accounts').insertOne(accountData);

    console.log(data);

    res.json({inserted:true})

})

router.post('/api/delete', async (req, res) =>{
    console.log('/api/delete router')

    await db.collection('accounts').deleteOne({_id:ObjectId(req.body)})

    res.json({success:true})
})

router.post('/api/transfer', async (req, res) =>{
    const reqData = req.body;

    const accountsCollection = db.collection('accounts');

    reqData.amount = +(reqData.amount);
    console.log(reqData);

    const fromAccount = await accountsCollection.findOne({number:reqData.from});

    if(reqData.amount > fromAccount.balance){
        res.json({error:'Amount exceeds balance in From account. Transaction canceled.'})
    }
    else{
        await accountsCollection.updateOne({number:reqData.from}, {$inc:{balance: -reqData.amount}});
        await accountsCollection.updateOne({number:reqData.to}, {$inc:{balance: reqData.amount}});
    
        res.json({success:true})
    }
})


export default router;