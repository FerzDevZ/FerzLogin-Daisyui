const registerForm = document.getElementById('registerForm');
const registerMsg = document.getElementById('registerMsg');

async function getCsrfToken() {
  const res = await fetch('/api/csrf-token', { credentials: 'same-origin' });
  const data = await res.json();
  return data.csrfToken;
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} fixed bottom-4 right-4 z-50`;
  toast.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

const passwordInput = document.getElementById('registerPassword');
const toggleBtn = document.createElement('button');
toggleBtn.type = 'button';
toggleBtn.tabIndex = -1;
toggleBtn.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 focus:outline-none';
toggleBtn.innerHTML = `<svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`;
passwordInput.parentNode.style.position = 'relative';
passwordInput.parentNode.appendChild(toggleBtn);
let show = false;
toggleBtn.onclick = (e) => {
  e.preventDefault();
  show = !show;
  passwordInput.type = show ? 'text' : 'password';
  toggleBtn.innerHTML = show
    ? `<svg id="eyeOffIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5c1.772 0 3.366-.344 4.74-.927M6.228 6.228A10.45 10.45 0 0112 4.5c6 0 9.75 7.5 9.75 7.5a17.478 17.478 0 01-3.478 4.772M6.228 6.228L3 3m3.228 3.228l12.544 12.544" /></svg>`
    : `<svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>`;
};

const usernameInput = document.getElementById('registerUsername');
function validateRegisterForm() {
  let valid = true;
  if (usernameInput.value.length < 4 || usernameInput.value.length > 20 || !/^[a-zA-Z0-9_]+$/.test(usernameInput.value)) {
    usernameInput.classList.add('input-error');
    valid = false;
  } else {
    usernameInput.classList.remove('input-error');
  }
  if (passwordInput.value.length < 6 || passwordInput.value.length > 32) {
    passwordInput.classList.add('input-error');
    valid = false;
  } else {
    passwordInput.classList.remove('input-error');
  }
  return valid;
}
usernameInput.addEventListener('input', validateRegisterForm);
passwordInput.addEventListener('input', validateRegisterForm);

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateRegisterForm()) {
    showToast('Username/password tidak valid', 'error');
    return;
  }
  registerMsg.textContent = '';
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  registerMsg.innerHTML = '<span class="loading loading-spinner loading-md"></span>';
  const csrfToken = await getCsrfToken();
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CSRF-Token': csrfToken },
    credentials: 'same-origin',
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    registerMsg.innerHTML = '<span class="text-success">' + data.message + '</span>';
    showToast('Register berhasil', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
  } else {
    registerMsg.innerHTML = '<span class="text-error">' + (data.message || (data.errors && data.errors[0].msg)) + '</span>';
    showToast(data.message || 'Terjadi kesalahan', 'error');
  }
});
