const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// mongodb connection string
const dbURI = 'mongodb+srv://madarauchiha:mangekyo@cluster0.91jqczd.mongodb.net/basic-blog'
mongoose.connect(dbURI)
    // listen to requests only after the connection with database has been established
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))

// register view engine 
app.set('view engine', 'ejs');

// middleware for static files
app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //a method that we get on mongoose and -1 means the recent object that has been added will be displayed on the top, 'descending order '
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});