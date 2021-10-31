const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');
const userRoutes = require('./userRoutes');

router.use('/blogpost', blogPostRoutes);
router.use('/users', userRoutes);

module.exports = router;