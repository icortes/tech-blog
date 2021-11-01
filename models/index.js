const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
  foreignKey: 'user_id'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blog_post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blog_post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, BlogPost, Comment };
