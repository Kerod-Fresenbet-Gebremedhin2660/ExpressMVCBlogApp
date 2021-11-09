const express= require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const app = express()
const bodyParser = require('body-parser')
const BlogPost = require("./models/BlogPost");

const validateMiddleWare = (req, res) => {
    if(req.files == null || req.body.title == null || req.body.body == null){
        return res.redirect('/posts/new')
    }
    next()
}

app.use(fileUpload)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store', validateMiddleWare)

//controllers
const indexController = require('./controllers/indexpage')
const aboutController = require('./controllers/about')
const newPostController = require('./controllers/newPost')
const postStoreController = require('./controllers/postStore')
const getPostController = require('./controllers/getPost')
const contactController = require('./controllers/contact')
//
const dbURL = 'mongodb://localhost/blog'

mongoose.connect(dbURL, {useNewUrlParser: true})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(3000, ()=>{
    console.log('Listening on Port 3000')
})

app.get('/', indexController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.get('/post/:id', getPostController)
app.get('/post/new', newPostController)
app.post('/posts/store', postStoreController )

