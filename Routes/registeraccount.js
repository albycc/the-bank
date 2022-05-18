import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';

const router = express.Router();

router.get('/register-account', (req, res) =>{
    res.render('pages/registeraccount', {
        title: 'Register account'
    })
})

export default router;