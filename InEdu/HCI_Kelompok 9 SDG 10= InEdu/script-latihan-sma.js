// script-latihan-sma.js
// Validasi latihan soal Matematika Lanjutan (SMA)
function cekJawabanSMA() {
  const kunci = ["B", "B", "B", "B", "B", "A", "D"];
  let benar = 0;
  let total = 7;
  let belum = false;
  for (let i = 1; i <= total; i++) {
    const pilihan = document.querySelector(`input[name='soalSMA${i}']:checked`);
    if (!pilihan) belum = true;
    if (pilihan && pilihan.value === kunci[i - 1]) benar++;
  }
  if (belum) {
    document.getElementById("hasilLatihanSMA").innerHTML =
      '<span style="color:red">Silakan jawab semua soal terlebih dahulu!</span>';
    return;
  }
  let hasil = `Jawaban benar: ${benar} dari 7 soal.`;
  if (benar === 7) {
    hasil +=
      ' Hebat! Semua jawaban benar! <a href="certificate.html?materi=' +
      encodeURIComponent("Matematika Lanjutan (SMA)") +
      '" class="btn-secondary" style="margin-left:1rem;">Ambil Sertifikat</a>';
  } else if (benar >= 5) {
    hasil += " Bagus, terus tingkatkan!";
  } else {
    hasil += " Yuk, pelajari lagi materinya!";
  }
  document.getElementById("hasilLatihanSMA").innerHTML = hasil;
}

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("btnKirimLatihanSMA");
  if (btn) {
    btn.addEventListener("click", cekJawabanSMA);
  }
});
