const router = require('express').Router();
const blogPostRoutes = require('./blogPostRoutes');

router.use('/blogpost', blogPostRoutes);
module.exports = router;