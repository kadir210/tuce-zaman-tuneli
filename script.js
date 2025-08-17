document.addEventListener("DOMContentLoaded", function(){

  const stages = document.querySelectorAll(".stage");
  const unlockBtns = document.querySelectorAll(".unlockBtn");
  const triesSpan = document.getElementById("tries");
  let currentStage = 1;
  let attemptsLeft = 3;

  // Başlangıçta sadece stage1 aktif
  stages.forEach(s => s.classList.remove("active"));
  document.getElementById("stage1").classList.add("active");

  // Stage butonları
  document.querySelectorAll(".nextBtn").forEach(btn => {
    btn.addEventListener("click", function(){
      const stageNum = parseInt(btn.dataset.stage);
      if(stageNum === 1){
        checkAnswer("answer1", "sincap gözlerin", stageNum);
      } else if(stageNum === 3){
        checkAnswer("answer3", "romantik", stageNum);
      } else {
        moveNext(stageNum);
      }
    });
  });

  // Enter tuşu ile geçiş
  ["answer1","answer3","pwd"].forEach(id => {
    const input = document.getElementById(id);
    if(input){
      input.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
          e.preventDefault();
          if(currentStage === 4){
            unlockBtns[0].click();
          } else {
            const btn = document.querySelector(`#stage${currentStage} .nextBtn`);
            if(btn) btn.click();
          }
        }
      });
    }
  });

  // Şifreli butonlar
  unlockBtns.forEach(btn => {
    btn.addEventListener("click", function(){
      const entered = normalize(document.getElementById("pwd").value.trim());
      const key = normalize(btn.dataset.key);
      const status4 = document.getElementById("status4");

      if(entered === key){
        btn.textContent = "🔓 Açıldı!";
        btn.classList.add("active");
        status4.textContent = "Doğru şifre!";

        // Tüm butonlar aktif ise Stage5'e geç
        const allActive = Array.from(unlockBtns).every(b => b.classList.contains("active"));
        if(allActive){
          document.getElementById("stage4").classList.remove("active");
          document.getElementById("stage5").classList.add("active");
          currentStage = 5;
        }

      } else {
        attemptsLeft--;
        triesSpan.textContent = attemptsLeft;
        const pwdInput = document.getElementById("pwd");
        pwdInput.style.animation = "shake 0.3s";
        setTimeout(()=>{ pwdInput.style.animation=""; },300);
        status4.textContent = attemptsLeft <=0 ? "Tüm haklar bitti!" : "Yanlış şifre!";
        if(attemptsLeft <=0){
          unlockBtns.forEach(b => b.disabled = true);
        }
      }
    });
  });

  function checkAnswer(inputId, correct, stageNum){
    const ans = normalize(document.getElementById(inputId).value.trim());
    if(ans === normalize(correct)){
      moveNext(stageNum);
    } else {
      wrongAnswer(stageNum);
    }
  }

  function moveNext(stageNum){
    document.getElementById("stage"+stageNum).classList.remove("active");
    const nextStage = stageNum + 1;
    const nextEl = document.getElementById("stage"+nextStage);
    if(nextEl) nextEl.classList.add("active");
    currentStage = nextStage;
  }

  function wrongAnswer(stageNum){
    const status = document.getElementById("status"+stageNum);
    status.textContent = "Yanlış cevap!";
    const input = document.querySelector("#stage"+stageNum+" input");
    if(input){
      input.style.animation = "shake 0.3s";
      setTimeout(()=>{ input.style.animation=""; },300);
    }
  }

  function normalize(str){
    return str.toLowerCase()
      .replace(/ç/g,'c').replace(/ğ/g,'g')
      .replace(/ı/g,'i').replace(/ö/g,'o')
      .replace(/ş/g,'s')
      .replace(/ü/g,'u');
  }

});
