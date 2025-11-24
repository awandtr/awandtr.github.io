function changeFontSize() {
  const fontSize = document.getElementById("fontSize").value;
  document.body.style.fontSize = fontSize + "px";
  localStorage.setItem("fontSize", fontSize);
}

function changeColorTheme() {
  const theme = document.getElementById("colorTheme").value;
  document.body.classList.remove("light", "dark", "sepia");
  if (theme !== "light") {
    document.body.classList.add(theme);
  }
  localStorage.setItem("colorTheme", theme);
}

function changeColorBlindMode() {
  const mode = document.getElementById("colorBlindMode").value;
  document.body.classList.remove(
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "gray"
  );
  if (mode !== "normal") {
    document.body.classList.add(mode);
  }
  localStorage.setItem("colorBlindMode", mode);
}

// Multi-language support using Google Translate widget
function loadGoogleTranslate() {
  if (
    !window.location.pathname.endsWith("index.html") &&
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html"
  )
    return;
  var gtScript = document.createElement("script");
  gtScript.type = "text/javascript";
  gtScript.async = true;
  gtScript.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(gtScript);
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "id",
      includedLanguages:
        "id,en,ms,su,ban,bug,ace,mad,min,bjn,bew,ja,th,fr,tl,ceb",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

// Save language preference
function saveLanguagePref(lang) {
  localStorage.setItem("inedu_lang", lang);
}

// Restore language preference
function restoreLanguagePref() {
  var lang = localStorage.getItem("inedu_lang");
  if (
    lang &&
    window.google &&
    window.google.translate &&
    window.google.translate.TranslateElement
  ) {
    var select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  }
}

// Listen for language change
function listenTranslateChange() {
  document.body.addEventListener(
    "change",
    function (e) {
      if (e.target && e.target.className === "goog-te-combo") {
        saveLanguagePref(e.target.value);
      }
    },
    true
  );
}

document.addEventListener("DOMContentLoaded", function () {
  loadGoogleTranslate();
  setTimeout(listenTranslateChange, 2000);
  setTimeout(restoreLanguagePref, 2500);
});

// Text-to-Speech feature
function speakTextPanduanAkses() {
  const lang = document.getElementById("ttsLanguage")
    ? document.getElementById("ttsLanguage").value
    : "id";
  let text = "";
  if (lang === "id") {
    text =
      "Selamat datang di halaman aksesibilitas. Anda dapat mengatur ukuran font, tema warna, mode buta warna, dan menggunakan fitur teks ke suara.";
  } else {
    text =
      "Welcome to the accessibility page. You can adjust font size, color theme, color blindness mode, and use the text-to-speech feature.";
  }
  speakText(text, lang);
}

function speakText(text, lang) {
  if ("speechSynthesis" in window) {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || "id";
    // Pilih voice yang sesuai bahasa
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang.startsWith(lang));
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-Speech tidak didukung di browser ini.");
  }
}

function stopSpeak() {
  if ("speechSynthesis" in window && speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
}

const dummyUsers = [
  {
    name: "Alibaba",
    email: "user1@example.com",
    password: "password1",
    completedMaterials: ["Matematika Dasar (SD)", "Sains Interaktif (SMP)"],
    progress: "2 dari 10 materi",
    certificates: [
      { title: "Sertifikat Matematika Dasar", date: "2025-05-01" },
      { title: "Sertifikat Sains Interaktif", date: "2025-05-10" },
    ],
  },
  {
    name: "Labubu",
    email: "user2@example.com",
    password: "password2",
    completedMaterials: ["Bahasa Indonesia Dasar"],
    progress: "1 dari 10 materi",
    certificates: [
      { title: "Sertifikat Bahasa Indonesia Dasar", date: "2025-04-20" },
    ],
  },
];

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  );
  const messageEl = document.getElementById("loginMessage");
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    messageEl.style.color = "green";
    messageEl.textContent = "Login berhasil! Mengalihkan...";
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1500);
  } else {
    messageEl.style.color = "red";
    messageEl.textContent = "Email atau password salah.";
  }
  return false;
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const messageEl = document.getElementById("registerMessage");

  // Validasi nama
  if (!name) {
    messageEl.style.color = "red";
    messageEl.textContent = "Nama tidak boleh kosong.";
    return false;
  }
  // Validasi email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    messageEl.style.color = "red";
    messageEl.textContent = "Format email tidak valid.";
    return false;
  }
  // Validasi password
  if (!password || password.length < 6) {
    messageEl.style.color = "red";
    messageEl.textContent = "Password minimal 6 karakter.";
    return false;
  }
  if (dummyUsers.find((u) => u.email === email)) {
    messageEl.style.color = "red";
    messageEl.textContent = "Email sudah terdaftar.";
    return false;
  }
  dummyUsers.push({ name, email, password });
  messageEl.style.color = "green";
  messageEl.textContent = "Pendaftaran berhasil! Silakan masuk.";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
  return false;
}

function getLoggedInUser() {
  const userStr = localStorage.getItem("loggedInUser");
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function updateProgressTracking(materialTitle) {
  const userStr = localStorage.getItem("loggedInUser");
  if (!userStr) return;
  const user = JSON.parse(userStr);
  if (!user.completedMaterials) user.completedMaterials = [];
  if (!user.completedMaterials.includes(materialTitle)) {
    user.completedMaterials.push(materialTitle);
    // Update progress
    user.progress = user.completedMaterials.length + " dari 10 materi";
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }
}

// Tambahkan fungsi loadCertificates agar error tidak muncul
function loadCertificates() {
  // Fungsi ini bisa dikembangkan untuk menampilkan sertifikat di halaman certificate.html
  // Saat ini dibiarkan kosong agar tidak error
}

function downloadCertificate(title, name, date) {
  var win = window.open("", "_blank", "width=600,height=400");
  if (!win) {
    alert("Popup diblokir. Izinkan popup untuk mendownload sertifikat.");
    return;
  }
  win.document.write(`
  <html><head><title>Sertifikat</title></head><body style='font-family:sans-serif;text-align:center;padding:2rem;'>
  <h2>Sertifikat Penyelesaian</h2>
  <p>Dengan ini menyatakan bahwa</p>
  <h3>${name}</h3>
  <p>telah menyelesaikan</p>
  <h3>${title}</h3>
  <p>Pada tanggal: ${date}</p>
  <br><br>
  <button onclick='window.print()' style='padding:0.5rem 1rem;border-radius:4px;background:#1a73e8;color:#fff;border:none;'>Cetak/Download PDF</button>
  </body></html>
  `);
  win.document.close();
}

function updateNavbarAuth() {
  const user = getLoggedInUser();
  const nav = document.querySelector(".navbar nav ul");
  if (!nav) return;
  // Hapus tombol logout jika sudah ada
  const existingLogout = document.getElementById("logoutNavBtn");
  if (existingLogout) existingLogout.remove();
  // Hapus nama user jika sudah ada
  const existingUser = document.getElementById("navbarUserName");
  if (existingUser) existingUser.remove();
  // Hapus tombol login jika sudah ada
  const loginBtn = nav.querySelector("a.btn-primary");
  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    // Tambah nama user (bold, link ke profile)
    const liUser = document.createElement("li");
    const userLink = document.createElement("a");
    userLink.innerHTML = `<b>${user.name}</b>`;
    userLink.href = "profile.html";
    userLink.id = "navbarUserName";
    userLink.style.marginRight = "0.5rem";
    userLink.style.fontWeight = "bold";
    userLink.style.color = "#1a237e";
    userLink.style.textDecoration = "none";
    liUser.appendChild(userLink);
    nav.appendChild(liUser);
    // Tambah tombol logout
    const li = document.createElement("li");
    const btn = document.createElement("a");
    btn.textContent = "Keluar";
    btn.className = "btn-secondary";
    btn.id = "logoutNavBtn";
    btn.style.cursor = "pointer";
    btn.onclick = function (e) {
      e.preventDefault();
      logout();
    };
    li.appendChild(btn);
    nav.appendChild(li);
  } else {
    if (loginBtn) loginBtn.style.display = "";
  }
  // Atur jarak antar item nav agar lebih lega
  nav.style.gap = "1.2rem";
}

document.addEventListener("DOMContentLoaded", () => {
  // Load saved accessibility settings
  const savedFontSize = localStorage.getItem("fontSize");
  const savedColorTheme = localStorage.getItem("colorTheme");
  const savedColorBlindMode = localStorage.getItem("colorBlindMode");

  if (savedFontSize) {
    document.body.style.fontSize = savedFontSize + "px";
    const fontSizeSelect = document.getElementById("fontSize");
    if (fontSizeSelect) fontSizeSelect.value = savedFontSize;
  }

  if (savedColorTheme) {
    document.body.classList.remove("light", "dark", "sepia");
    if (savedColorTheme !== "light") {
      document.body.classList.add(savedColorTheme);
    }
    const colorThemeSelect = document.getElementById("colorTheme");
    if (colorThemeSelect) colorThemeSelect.value = savedColorTheme;
  } else {
    // Default to light theme
    document.body.classList.add("light");
  }

  if (savedColorBlindMode) {
    document.body.classList.remove(
      "protanopia",
      "deuteranopia",
      "tritanopia",
      "gray"
    );
    if (savedColorBlindMode !== "normal") {
      document.body.classList.add(savedColorBlindMode);
    }
    const colorBlindSelect = document.getElementById("colorBlindMode");
    if (colorBlindSelect) colorBlindSelect.value = savedColorBlindMode;
  }

  // Add click event listeners to all "Masuk / Daftar" buttons to ensure navigation
  const loginButtons = document.querySelectorAll("a.btn-primary");
  loginButtons.forEach((button) => {
    if (button.textContent.trim() === "Masuk / Daftar") {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html";
      });
    }
  });

  loadGoogleTranslate();
  loadCertificates();
  updateNavbarAuth();

  // Forum: Tampilkan form buat forum jika user login
  if (window.location.pathname.includes("forum.html")) {
    const user = getLoggedInUser();
    const createForumContainer = document.getElementById(
      "createForumContainer"
    );
    if (createForumContainer) {
      createForumContainer.style.display = user ? "block" : "none";
    }
    // Handle submit form forum baru
    const createForumForm = document.getElementById("createForumForm");
    if (createForumForm) {
      createForumForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("forumTitle").value.trim();
        const desc = document.getElementById("forumDesc").value.trim();
        if (!title || !desc) return;
        const forumListSection = document.getElementById("forumListSection");
        if (forumListSection) {
          const article = document.createElement("article");
          article.style.backgroundColor = "#ffffff";
          article.style.padding = "1rem";
          article.style.borderRadius = "8px";
          article.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          article.style.marginBottom = "1rem";
          article.style.cursor = "pointer";
          article.innerHTML = `<h2 style='color:#1a237e'>${title}</h2><p style='color:#555'>${desc}</p>`;
          forumListSection.insertBefore(article, forumListSection.firstChild);
        }
        createForumForm.reset();
      });
    }
  }
});

// Save TTS language preference
function saveTTSLanguage(lang) {
  localStorage.setItem("tts_lang", lang);
}

// Restore TTS language preference
function restoreTTSLanguage() {
  var lang = localStorage.getItem("tts_lang");
  var ttsSelect = document.getElementById("ttsLanguage");
  if (lang && ttsSelect) {
    ttsSelect.value = lang;
  }
}

window.addEventListener("beforeunload", function () {
  stopSpeak && stopSpeak();
});

document.addEventListener("DOMContentLoaded", function () {
  // Restore TTS language
  restoreTTSLanguage();
  // Listen for TTS language change
  var ttsSelect = document.getElementById("ttsLanguage");
  if (ttsSelect) {
    ttsSelect.addEventListener("change", function () {
      saveTTSLanguage(ttsSelect.value);
    });
  }
});
