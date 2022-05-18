import express from 'express';
import session from 'express-session'

import accountRouter from './Routes/account.js';
import loginRouter from './Routes/login.js';
import __dirname from './utils/path.js'

const app = express();
const port = 3000;

console.log(__dirname + '/public');

app.use(express.static(__dirname + 'public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'secret message',
    cookie:{
        maxAge: 60 * 60 * 1000
    }
}))


// app.set('view engine', 'html');
// app.set('views', './views');

app.use(loginRouter)
app.use(accountRouter)

app.use((req, res, next) =>{
    res.sendFile('public/pages/404.html', { root: __dirname})
})

app.listen(port, ()=>{
    console.log('Server running on', port)
})