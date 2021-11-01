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

router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        { model: Comment, include: [{ model: User, attributes: ['name'] }] },
        { model: User, attributes: ['name'] }
      ]
    });
    const blog = await blogData.get({ plain });
    console.log(blog);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
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

    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
