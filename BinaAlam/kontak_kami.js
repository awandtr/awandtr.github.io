// Validasi form kontak

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form-kontak');
    if(form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            var nama = document.getElementById('kontak-nama').value.trim();
            var email = document.getElementById('kontak-email').value.trim();
            var pesan = document.getElementById('kontak-pesan').value.trim();
            var msg = document.getElementById('kontak-msg');
            // Validasi sederhana
            if(!nama || !email || !pesan) {
                msg.textContent = 'Semua field wajib diisi!';
                msg.style.display = 'block';
                msg.style.color = '#e74c3c';
                return false;
            }
            // Validasi email sederhana
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(email)) {
                msg.textContent = 'Format email tidak valid!';
                msg.style.display = 'block';
                msg.style.color = '#e74c3c';
                return false;
            }
            msg.style.display = 'none';
            alert('Pesan berhasil dikirim! Terima kasih atas masukan Anda.');
            form.reset();
            return false;
        };
    }
});
