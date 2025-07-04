const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginMsg.textContent = '';
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!username || !password) {
    loginMsg.textContent = 'Username and password required.';
    loginMsg.className = 'text-error';
    return;
  }
  loginMsg.textContent = 'Loading...';
  loginMsg.className = 'text-info';
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      loginMsg.textContent = data.message || 'Login failed.';
      loginMsg.className = 'text-error';
    }
  } catch {
    loginMsg.textContent = 'Network error.';
    loginMsg.className = 'text-error';
  }
});
