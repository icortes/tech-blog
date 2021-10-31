const loginEventHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#signInEmail').value.trim();
  const password = document.querySelector('#signInPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    response.ok ? document.location.replace('/') : alert(response.statusText);
  }
};

const signUpHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#signUpUsername').value.trim();
  const email = document.querySelector('#signUpEmail').value.trim();
  const password = document.querySelector('#signUpPassword').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    response ? document.location.replace('/') : alert(response.statusText);
  }
};

console.log(document.querySelector('.singin-form'));
document.querySelector('#signin-form').addEventListener('submit', loginEventHandler);
document.querySelector('.signup-form').addEventListener('submit', signUpHandler);