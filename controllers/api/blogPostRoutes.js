const { BlogPost } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.destroy({
      where: { id: req.params.id, user_id: req.session.user_id }
    });

    if (!blogData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
