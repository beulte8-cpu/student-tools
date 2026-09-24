/* =========================
   다크모드
========================= */

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkModeBtn.textContent = "☀️";
    localStorage.setItem("darkMode", "true");
  } else {
    darkModeBtn.textContent = "🌙";
    localStorage.setItem("darkMode", "false");
  }
});

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkModeBtn.textContent = "☀️";
}


/* =========================
   일반 계산기
========================= */

const calculatorInput =
  document.getElementById("calculatorInput");

const calculateBtn =
  document.getElementById("calculateBtn");

const calculatorResult =
  document.getElementById("calculatorResult");

calculateBtn.addEventListener("click", () => {

  const expression = calculatorInput.value.trim();

  if (!expression) {
    calculatorResult.textContent = "계산식을 입력해주세요.";
    return;
  }

  /*
    안전성을 위해 숫자와 기본 연산자만 허용
  */

  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    calculatorResult.textContent =
      "숫자와 + - × ÷ ( ) %만 사용할 수 있습니다.";
    return;
  }

  try {

    const result = Function(
      `"use strict"; return (${expression})`
    )();

    if (!Number.isFinite(result)) {
      throw new Error();
    }

    calculatorResult.textContent =
      `결과: ${result}`;

  } catch {
    calculatorResult.textContent =
      "올바른 계산식을 입력해주세요.";
  }
});


/* =========================
   백분율 계산기
========================= */

const percentNumber =
  document.getElementById("percentNumber");

const percentValue =
  document.getElementById("percentValue");

const percentBtn =
  document.getElementById("percentBtn");

const percentResult =
  document.getElementById("percentResult");

percentBtn.addEventListener("click", () => {

  const number = Number(percentNumber.value);
  const percent = Number(percentValue.value);

  if (
    percentNumber.value === "" ||
    percentValue.value === ""
  ) {
    percentResult.textContent =
      "숫자와 퍼센트를 입력해주세요.";
    return;
  }

  const result = number * percent / 100;

  percentResult.textContent =
    `${number}의 ${percent}% = ${result}`;
});


/* =========================
   글자 수 계산기
========================= */

const textInput =
  document.getElementById("textInput");

const charCount =
  document.getElementById("charCount");

const noSpaceCount =
  document.getElementById("noSpaceCount");

textInput.addEventListener("input", () => {

  const text = textInput.value;

  charCount.textContent = text.length;

  noSpaceCount.textContent =
    text.replace(/\s/g, "").length;
});


/* =========================
   공부 타이머
========================= */

let totalSeconds = 25 * 60;
let timerInterval = null;

const timerDisplay =
  document.getElementById("timer");

const startTimer =
  document.getElementById("startTimer");

const pauseTimer =
  document.getElementById("pauseTimer");

const resetTimer =
  document.getElementById("resetTimer");


function updateTimer() {

  const minutes =
    Math.floor(totalSeconds / 60);

  const seconds =
    totalSeconds % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


startTimer.addEventListener("click", () => {

  if (timerInterval !== null) {
    return;
  }

  timerInterval = setInterval(() => {

    if (totalSeconds <= 0) {

      clearInterval(timerInterval);
      timerInterval = null;

      alert("공부 시간이 끝났어요! 🎉");

      return;
    }

    totalSeconds--;
    updateTimer();

  }, 1000);
});


pauseTimer.addEventListener("click", () => {

  clearInterval(timerInterval);
  timerInterval = null;

});


resetTimer.addEventListener("click", () => {

  clearInterval(timerInterval);
  timerInterval = null;

  totalSeconds = 25 * 60;

  updateTimer();
});


/* =========================
   길이 변환기
========================= */

const meterInput =
  document.getElementById("meterInput");

const unitSelect =
  document.getElementById("unitSelect");

const convertBtn =
  document.getElementById("convertBtn");

const convertResult =
  document.getElementById("convertResult");


convertBtn.addEventListener("click", () => {

  const value = Number(meterInput.value);

  if (meterInput.value === "") {

    convertResult.textContent =
      "숫자를 입력해주세요.";

    return;
  }

  let result;

  if (unitSelect.value === "mToKm") {

    result = value / 1000;

    convertResult.textContent =
      `${value} m = ${result} km`;

  } else {

    result = value * 1000;

    convertResult.textContent =
      `${value} km = ${result} m`;
  }
});


/* =========================
   Enter 키로 계산
========================= */

calculatorInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    calculateBtn.click();
  }

});


/* 초기 타이머 표시 */

updateTimer();
