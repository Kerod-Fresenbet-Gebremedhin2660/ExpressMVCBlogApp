const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});

let id = "618a9e27432f453336e817ef"

BlogPost.create(
    {
        'title': 'A tale of two chapters',
        'body': 'intriguing book on a tale of two chapters',
        'username': 'Abebe',
        'image': 'about-bg.jpg'
    }
).then(r => console.log(r))