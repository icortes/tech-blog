const { BlogPost, User } = require('../models');
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

module.exports = router;
