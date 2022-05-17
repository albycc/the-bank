import express from 'express';
import session from 'express-session'

import accountRouter from './Routes/account.js';
import loginRouter from './Routes/login.js';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'secret message',
    cookie:{
        maxAge: 5 * 60 * 1000
    }
}))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(loginRouter)
app.use(accountRouter)

app.listen(port, ()=>{
    console.log('Server running on', port)
})