const loginEventHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#signInEmail').value.trim();
  const password = document.querySelector('#signInPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'content-Type': 'application/json' }
    });

    response.ok ? document.location.replace('/') : alert(response.statusText);
  }
};
