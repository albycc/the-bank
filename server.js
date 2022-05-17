import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', './public');

app.get('/', (req, res) =>{
    res.render('pages/index', {
        title:'Index'
    })
})

app.listen(port, ()=>{
    console.log('Server running on', port)
})