# FerzLogin - Modern Auth App with DaisyUI & MySQL

FerzLogin adalah aplikasi autentikasi modern fullstack berbasis Node.js (Express.js), MySQL, dan frontend interaktif dengan DaisyUI (Tailwind CSS). Dirancang dengan UI/UX super modern, responsif, dan fitur keamanan lengkap.

## Fitur Utama
- Register & Login dengan validasi real-time
- JWT Auth (token di cookie & localStorage)
- Rate Limiting brute force login/register
- CSRF & XSS Protection
- Password Hashing (bcrypt)
- Dashboard interaktif: welcome, avatar, toast, progress bar, ripple, animasi, custom scrollbar
- UI/UX modern: glassmorphism, neon accent, dark mode, responsif, micro-interaction
- Frontend 100% JavaScript

---

## Instalasi & Setup

### 1. Clone Repo
```bash
git clone https://github.com/FerzDevZ/FerzLogin-Daisyui.git
cd FerzLogin-Daisyui
```

### 2. Install Dependency
```bash
npm install
```

### 3. Setup Database
- Import `ferz.sql` ke MySQL Anda:
```bash
mysql -u root -p < ferz.sql
```
- Edit `db/connection.js` jika user/password MySQL Anda berbeda.

### 4. Jalankan Server
```bash
npm start
```
Server berjalan di http://localhost:3000

### 5. Akses Frontend
Buka browser ke http://localhost:3000/login.html

---

## Struktur Project
```
├── controllers/
│   └── authController.js
├── db/
│   └── connection.js
├── middlewares/
│   ├── auth.js
│   ├── rateLimit.js
│   └── validateAndSanitize.js
├── public/
│   ├── dashboard.html / .js
│   ├── login.html / .js
│   ├── register.html / .js
│   └── style.css
├── routes/
│   ├── auth.js
│   └── dashboard.js
├── ferz.sql
├── index.js
└── package.json
```

---

## Penjelasan Fitur & Keamanan
- Rate Limiting: Mencegah brute force login/register (5x/menit/IP)
- CSRF & XSS Protection: Semua input divalidasi & disanitasi
- JWT: Token disimpan di cookie httpOnly & localStorage
- Password: Disimpan hash bcrypt
- Modular: Semua logic terpisah (controller, middleware, route)
- Frontend: Animasi, toast, progress bar, ripple, validasi real-time, show/hide password, layout responsif

---

## Customisasi UI/UX
- Ubah warna, animasi, dan layout di `public/style.css`
- Avatar otomatis (dicebear)
- Semua tombol dan input sudah ada efek interaktif

---

## Kontribusi
Pull request & issue sangat diterima! Silakan fork dan kembangkan fitur baru (profile, dark/light mode, dsb).

---

## Lisensi
MIT

---

**By [FerzDevZ](https://github.com/FerzDevZ)**
# FerzLogin-Daisyui
