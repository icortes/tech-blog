const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value.trim();
  const content = document.querySelector('#text-area-input').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogpost/', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
    });

    response.ok
      ? document.location.replace('/dashboard')
      : alert('Failed to create blog post.');
  }
};

const deleteButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE'
    });

    response.ok
      ? document.location.replace('/dashboard')
      : alert('Failed to delete post');
  }
};

const editButtonHandler = async (event) => {
  event.preventDefault();
  try {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'GET'
      });

      console.log(response);
      
      response.ok
      ? document.location.replace('/dashboard')
      : alert('Failed to edit post');
    }
  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector('.post-submit')
  .addEventListener('submit', newPostHandler);

document
  .querySelector('.editButton')
  .addEventListener('click', editButtonHandler);

document
  .querySelector('.my-blogposts')
  .addEventListener('click', deleteButtonHandler);
