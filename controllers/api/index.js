const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/blogpost', blogPostRoutes);
router.use('/users', userRoutes);
router.use('/comment', commentRoutes);

module.exports = router;