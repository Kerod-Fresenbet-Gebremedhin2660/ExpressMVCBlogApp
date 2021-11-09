const express= require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const app = express()
const bodyParser = require('body-parser')
const BlogPost = require("./models/BlogPost");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(3000, ()=>{
    console.log('Listening on Port 3000')
})

app.get('/', async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/post/:id',async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})
app.get('/post/new',(req,res)=>{
    res.render('create')
})
app.post('/posts/store', async(req,res)=>{
    await BlogPost.create(req.body)
    res.redirect('/')
})

