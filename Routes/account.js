import express from 'express';

const router = express.Router();

router.get('/account', (req, res) =>{
    res.render('pages/account', {
        title:'Account'
    })
})

export default router;