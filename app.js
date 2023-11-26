const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// mongodb connection string
const dbURI = 'mongodb+srv://madarauchiha:Hiddenleafvillage@cluster0.mtrjqvu.mongodb.net/'
mongoose.connect(dbURI)
    // ! listen to requests only after the connection with database has been established
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))

// register view engine 
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/blogs')
});

// blog routes
app.use('/blogs', blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});