const Blog = require('../models/blog');

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // ! a method that we get on mongoose and -1 means the recent object that has been added will be displayed on the top, 'descending order '
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((error) => {
            res.render('404', { title: 'Blog not found' });
        })
};

const blog_details = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog details' });
        })
        .catch((error) => {
            res.render('404', { title: 'Blog not found' });
        })
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((error) => {
            res.render('404', { title: 'Blog not found' });
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((error) => {
            res.render('404', { title: 'Blog not found' });
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}