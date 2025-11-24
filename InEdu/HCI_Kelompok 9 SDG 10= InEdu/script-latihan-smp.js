// script-latihan-smp.js
// Validasi latihan soal Sains Interaktif (SMP)
function cekJawabanSMP() {
  const kunci = ["B", "A", "C", "B", "D", "B", "B"];
  let benar = 0;
  let total = 7;
  let belum = false;
  for (let i = 1; i <= total; i++) {
    const pilihan = document.querySelector(`input[name='soalSMP${i}']:checked`);
    if (!pilihan) belum = true;
    if (pilihan && pilihan.value === kunci[i - 1]) benar++;
  }
  if (belum) {
    document.getElementById("hasilLatihanSMP").innerHTML =
      '<span style="color:red">Silakan jawab semua soal terlebih dahulu!</span>';
    return;
  }
  let hasil = `Jawaban benar: ${benar} dari 7 soal.`;
  if (benar === 7) {
    hasil +=
      ' Hebat! Semua jawaban benar! <a href="certificate.html?materi=' +
      encodeURIComponent("Sains Interaktif (SMP)") +
      '" class="btn-secondary" style="margin-left:1rem;">Ambil Sertifikat</a>';
  } else if (benar >= 5) {
    hasil += " Bagus, terus tingkatkan!";
  } else {
    hasil += " Yuk, pelajari lagi materinya!";
  }
  document.getElementById("hasilLatihanSMP").innerHTML = hasil;
}
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("btnKirimLatihanSMP");
  if (btn) {
    btn.addEventListener("click", cekJawabanSMP);
  }
});
