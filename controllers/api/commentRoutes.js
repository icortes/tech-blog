const { Comment } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      //blog_post_id:
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;