// Şifreler ve videolar
const passwords = {
  "tuce2025": "https://example.com/video.mp4",
  "flower33": "https://example.com/another.mp4"
};

let attemptsLeft = 3;
const pwdInput    = document.getElementById("pwd");
const unlockBtn   = document.getElementById("unlockBtn");
const triesSpan   = document.getElementById("tries");
const modal       = document.getElementById("modal");
const videoPlayer = document.getElementById("videoPlayer");

// Buton tıklama
unlockBtn.addEventListener("click", function() {
  const value = pwdInput.value.trim();

  if (passwords[value]) {
    unlockBtn.textContent = "🔓 Açıldı";
    unlockBtn.classList.add("active");
    videoPlayer.src = passwords[value];
    modal.style.display = "flex";  // popup aç
  } 
  else {
    attemptsLeft--;
    triesSpan.textContent = attemptsLeft;

    // Titreşim animasyonu
    pwdInput.style.animation = "shake 0.3s";
    setTimeout(() => { pwdInput.style.animation = ""; }, 300);

    if (attemptsLeft <= 0) {
      unlockBtn.disabled = true;
      alert("Tüm haklar bitti!");
    } 
    else {
      alert("Şifre yanlış!");
    }
  }
});

// Modal kapatma
modal.addEventListener("click", function(e){
  if (e.target === modal) {
    modal.style.display = "none";
    videoPlayer.pause();
  }
});
