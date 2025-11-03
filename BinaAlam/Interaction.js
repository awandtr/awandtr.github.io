// Dummy account for login validation
const DUMMY_ACCOUNT = {
    email: 'dummy@email.com',
    password: '123456',
    name: 'Diatra Salsabila',
    email: 'dummy1@email.com',
    password: '1234561',
    name: 'Reynoldo Pratama',
};

// Akun dummy global
const DUMMY_USERS = [
    {
        name: 'Diatar',
        email: 'dummy@email.com',
        password: '123456',
        role: 'pelajar'
    },
    {
        name: 'Reynoldo',
        email: 'dummy1@email.com',
        password: '1234567',
        role: 'pelajar'
    },
    {
        name: 'Rina Mentari',
        email: 'rina.mentor@email.com',
        password: 'mentor123',
        role: 'mentor'
    }
];

// Fungsi login dummy multi user
function loginDummy(email, password) {
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('dummyUser', JSON.stringify(user));
        return true;
    }
    return false;
}

// Fungsi logout dummy
function logoutDummy() {
    localStorage.removeItem('dummyUser');
    location.reload();
}

// Fungsi cek status login dummy
function isDummyLoggedIn() {
    return !!localStorage.getItem('dummyUser');
}

// Fungsi untuk update navbar user (bisa dipanggil di halaman manapun)
function updateNavbarUser() {
    const navList = document.getElementById('list');
    if (!navList) return;
    let user = localStorage.getItem('dummyUser');
    let userObj = user ? JSON.parse(user) : null;
    let userNav = document.getElementById('user-nav');
    if (userObj) {
        if (!userNav) {
            userNav = document.createElement('span');
            userNav.id = 'user-nav';
            navList.appendChild(userNav);
        }
        userNav.textContent = userObj.name || 'User';
        userNav.style.cursor = 'pointer';
        userNav.style.marginLeft = '18px';
        userNav.style.fontWeight = 'bold';
        userNav.style.fontSize = '1.3em';
        userNav.style.color = '#fff';
        userNav.style.background = 'transparent';
        userNav.style.textShadow = '0 1px 4px #2228';
        userNav.onclick = function(e) {
            window.location.href = 'profile.html';
            e.stopPropagation();
        };
        // Tampilkan tombol logout di samping nama user
        let logoutBtn = document.getElementById('nav-logout-btn');
        if (!logoutBtn) {
            logoutBtn = document.createElement('button');
            logoutBtn.id = 'nav-logout-btn';
            logoutBtn.textContent = 'Logout';
            logoutBtn.style.marginLeft = '16px';
            logoutBtn.style.background = '#e74c3c';
            logoutBtn.style.color = '#fff';
            logoutBtn.style.fontWeight = 'bold';
            logoutBtn.style.border = 'none';
            logoutBtn.style.borderRadius = '6px';
            logoutBtn.style.padding = '6px 18px';
            logoutBtn.style.cursor = 'pointer';
            logoutBtn.style.fontSize = '1em';
            logoutBtn.onmouseover = function(){this.style.background='#c0392b';};
            logoutBtn.onmouseout = function(){this.style.background='#e74c3c';};
            logoutBtn.onclick = function(e) {
                e.stopPropagation();
                logoutDummy();
            };
            userNav.after(logoutBtn);
        }
        // Sembunyikan Login/Daftar
        Array.from(navList.querySelectorAll('a')).forEach(a => {
            if (a.textContent.trim() === 'Login' || a.textContent.trim() === 'Daftar') a.style.display = 'none';
        });
    } else {
        if (userNav) userNav.remove();
        let logoutBtn = document.getElementById('nav-logout-btn');
        if (logoutBtn) logoutBtn.remove();
        Array.from(navList.querySelectorAll('a')).forEach(a => {
            if (a.textContent.trim() === 'Login' || a.textContent.trim() === 'Daftar') a.style.display = '';
        });
    }
}

// Auto-login dummy jika belum login (bisa dihapus jika ingin manual)
if (!isDummyLoggedIn()) {
    loginDummy();
}

document.addEventListener('DOMContentLoaded', updateNavbarUser);

// Validasi untuk Login dan Register

document.addEventListener('DOMContentLoaded', function() {
    // Login.html: validasi login
    if (document.getElementById('login-form')) {
        document.querySelector('#login-form form').onsubmit = function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value.trim();
            const error = document.getElementById('login-error');
            const user = DUMMY_USERS.find(u => u.email === email && u.password === pass);
            if(user) {
                error.style.display = 'none';
                localStorage.setItem('dummyUser', JSON.stringify(user));
                alert('Login berhasil! Selamat datang, ' + user.name + '.');
                window.location.href = 'Main.Html'; // redirect ke home
            } else if (!email || !pass) {
                error.textContent = 'Semua field wajib diisi!';
                error.style.display = 'block';
            } else {
                error.textContent = 'Email atau password salah!';
                error.style.display = 'block';
            }
            return false;
        };
    }
    // Login.html: validasi register
    if (document.getElementById('register-form')) {
        document.querySelector('#register-form form').onsubmit = function(e) {
            e.preventDefault();
            const nama = document.getElementById('reg-nama').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-password').value.trim();
            const error = document.getElementById('register-error');
            if(nama && email && pass) {
                error.style.display = 'none';
                alert('Registrasi berhasil! Silakan login dengan akun Anda.');
                if (typeof showLogin === 'function') showLogin();
            } else {
                error.textContent = 'Semua field wajib diisi!';
                error.style.display = 'block';
            }
            return false;
        };
    }
    // Daftar.html: validasi register
    if (document.querySelector('form[onsubmit*="handleRegister"]') && !document.getElementById('login-form')) {
        document.querySelector('form[onsubmit*="handleRegister"]').onsubmit = function(e) {
            e.preventDefault();
            const nama = document.getElementById('reg-nama').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-password').value.trim();
            const error = document.getElementById('register-error');
            if(nama && email && pass) {
                error.style.display = 'none';
                alert('Registrasi berhasil! Silakan login dengan akun Anda.');
                window.location.href = 'Login.html';
            } else {
                error.textContent = 'Semua field wajib diisi!';
                error.style.display = 'block';
            }
            return false;
        };
    }
});

// Galeri Foto Kenangan: Slider Otomatis & Layout Tengah
let gallerySliderInterval = null;
function initGallerySlider(galleryId = 'gallery-list') {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;
    const imgs = Array.from(gallery.querySelectorAll('.gallery-img'));
    if (imgs.length <= 1) return;
    let idx = 0;
    // Atur layout galeri agar gambar besar & di tengah
    gallery.style.display = 'flex';
    gallery.style.justifyContent = 'center';
    gallery.style.alignItems = 'center';
    gallery.style.position = 'relative';
    gallery.style.flexWrap = 'nowrap';
    gallery.style.overflow = 'hidden';
    gallery.style.height = '340px';
    imgs.forEach((img, i) => {
        img.style.width = '320px';
        img.style.height = '320px';
        img.style.objectFit = 'cover';
        img.style.opacity = (i === 0) ? '1' : '0';
        img.style.position = 'absolute';
        img.style.transition = 'opacity 0.7s';
        img.style.left = '50%';
        img.style.top = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.margin = '0';
        img.style.boxShadow = '0 4px 24px #0002';
    });
    function showSlide(n) {
        imgs.forEach((img, i) => {
            img.style.opacity = (i === n) ? '1' : '0';
        });
    }
    function nextSlide() {
        idx = (idx + 1) % imgs.length;
        showSlide(idx);
    }
    function startSlider() {
        if (gallerySliderInterval) clearInterval(gallerySliderInterval);
        gallerySliderInterval = setInterval(nextSlide, 1800);
    }
    function stopSlider() {
        if (gallerySliderInterval) clearInterval(gallerySliderInterval);
    }
    gallery.addEventListener('mouseenter', stopSlider);
    gallery.addEventListener('mouseleave', startSlider);
    startSlider();
}

// Filter fitur ekosistem dan peta (untuk Ruang Ekosistem)
function filterEkosistem(tipe) {
    var info = document.getElementById('ekosistem-info');
    if (info) {
        if (tipe === 'darat') {
            info.innerHTML = 'Ekosistem <b>Darat</b> (SDG 15): Fokus pada pelestarian hutan, reboisasi, keanekaragaman hayati darat, dan aksi lingkungan di wilayah daratan.';
        } else if (tipe === 'laut') {
            info.innerHTML = 'Ekosistem <b>Laut</b> (SDG 14): Fokus pada pelestarian laut, pesisir, sungai, pembersihan sampah laut, dan perlindungan biota laut.';
        } else {
            info.innerHTML = 'Ruang Ekosistem BinaAlam mencakup ekosistem darat (SDG 15) <b>dan ekosistem laut (SDG 14)</b>. Anda dapat berpartisipasi dalam aksi pelestarian hutan, sungai, pesisir, dan laut.';
        }
    }
    // Filter visual section
    var sections = document.querySelectorAll('.eko-section');
    sections.forEach(function(sec) {
        var types = sec.getAttribute('data-ekosistem');
        if (tipe === 'campuran' || (types && types.includes(tipe))) {
            sec.style.display = '';
        } else {
            sec.style.display = 'none';
        }
    });
}

function showMapEkosistem(tipe) {
    var mapLaut = document.getElementById('map-laut');
    var iframeDarat = document.getElementById('iframe-darat');
    if (!mapLaut || !iframeDarat) return;
    if (tipe === 'laut') {
        mapLaut.style.display = '';
        iframeDarat.style.display = 'none';
        if (!mapLaut._leaflet_id) {
            var map = L.map('map-laut').setView([-2.5, 120], 4.5);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap & Leaflet',
                maxZoom: 18
            }).addTo(map);
            L.marker([-5.8, 110]).addTo(map).bindPopup('Aksi Bersih Laut Jawa');
            L.marker([-8.2, 124.5]).addTo(map).bindPopup('Aksi Pantai Flores');
        } else {
            setTimeout(function(){
                if (mapLaut._leaflet_map) mapLaut._leaflet_map.invalidateSize();
            }, 100);
        }
    } else {
        mapLaut.style.display = 'none';
        iframeDarat.style.display = '';
    }
}
