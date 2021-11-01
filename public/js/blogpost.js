const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.getElementById('new-comment').value.trim();
    console.log(content);
  if (content) {
      const url = location.href.split('/');
      const blog_post_id = url[url.length -1];
      console.log(blog_post_id);
    const response = await fetch('/api/comment/', {
      method: 'POST',
      body: JSON.stringify({ content, blog_post_id }),
      headers: { 'Content-Type': 'application/json' }
    });

    response.ok ? document.location.reload() : alert('Failed to save comment');
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
