const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    console.log(blogPosts);
    res
      .status(200)
      .render('homepage', { blogPosts, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }]
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', { ...user, logged_in: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: Comment }, { model: User, attributes: ['name'] }]
    });

    const blogpost = blogPostData.get({ plain: true });

    console.log(blogpost);
    res.render('blogpost', {
      ...blogpost,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
