const { BlogPost } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newBlogPost);
  } catch (error) {
    res.status(400).json(err);
  }
});



module.exports = router;
