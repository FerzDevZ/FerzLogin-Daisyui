function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}
checkAuth();
function getUserNameFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return '';
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username || '';
  } catch {
    return '';
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const dashTitle = document.querySelector('.dash-title');
  if (dashTitle) {
    const name = getUserNameFromToken();
    if (name) dashTitle.textContent = `Welcome, ${name}!`;
  }
});
function showProgressBar() {
  document.getElementById('progressBar').style.display = 'block';
}
function hideProgressBar() {
  document.getElementById('progressBar').style.display = 'none';
}
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showProgressBar();
  setTimeout(() => {
    localStorage.removeItem('token');
    hideProgressBar();
    showToast('Logout berhasil', 'success');
    setTimeout(() => window.location.href = 'login.html', 800);
  }, 900);
});
logoutBtn.addEventListener('mousedown', (e) => {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${e.offsetX}px`;
  ripple.style.top = `${e.offsetY}px`;
  ripple.style.width = ripple.style.height = `${logoutBtn.offsetWidth * 1.2}px`;
  ripple.style.opacity = '0.5';
  logoutBtn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 400);
});
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 animate-slideIn`;
  toast.innerHTML = `<span class="material-icons">${type === 'success' ? 'check_circle' : 'error'}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('animate-slideIn');
    toast.classList.add('animate-slideOut');
    setTimeout(() => toast.remove(), 400);
  }, 1800);
}
const style = document.createElement('style');
style.innerHTML = `
@keyframes slideIn { 0% { opacity:0; transform: translateX(60px);} 100% { opacity:1; transform: translateX(0);} }
@keyframes slideOut { 0% { opacity:1; transform: translateX(0);} 100% { opacity:0; transform: translateX(60px);} }
.animate-slideIn { animation: slideIn 0.4s cubic-bezier(.39,.575,.56,1.000); }
.animate-slideOut { animation: slideOut 0.4s cubic-bezier(.39,.575,.56,1.000); }
`;
document.head.appendChild(style);
