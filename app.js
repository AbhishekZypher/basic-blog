const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine 
app.set('view engine', 'ejs');

// listen for requests 
app.listen(3000);

// middleware for static files
app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        { title: 'fjasdhfjkadshfj', snippet: 'ashdfjksadlkkjca sbfsdffdshisao  iasufo ashfsdjd' },
        { title: 'fjasdhfjkahdsjf', snippet: 'ashdfjksadlkkjca sbfsdffdshisao ashfsdjdfkadsjfh' },
        { title: 'kadshfjkahdsjf', snippet: 'ashdfjksadlkkjca sbfsdffdshisao  iasufo ashadsjfh' }
    ];
    res.render('index', { blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});