const sequelize = require('../config/connection');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User')
const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(Post)
    Post.findAll({
        attributes: [
            'id',
            'title', 
            'content',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            inclide: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        console.log(res)
        res.redirect('/');
        return;
    }
    res.render('login')
   
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {loggedIn: req.session.loggedIn})
})

router.get('/dashboard/new', (req, res) => {
    res.render('new-post', {loggedIn: req.session.loggedIn})
})

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
    {
        model: User,
        attributes: ['username']
    }
    ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id/edit', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'crated_at'],
            include: {
                model: User,
                attributes: ['username'] 
            }
        },
    {
        model: User,
        attributes: ['username']
    }
]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No posts found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });

        res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;