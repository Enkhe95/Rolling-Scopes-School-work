"use strict";
const title = document.createElement("h1");
title.setAttribute("class", "title");
title.innerHTML = "Minesweeper";

const page = document.createElement("div");
page.setAttribute("class", "page");

const box = document.createElement("div");
box.setAttribute("class", "box");

const data = document.createElement("div");

const newGame = document.createElement("button");
newGame.setAttribute("class", "new-game");
newGame.innerHTML = "New Game";

const flagsNumber = document.createElement("div");
flagsNumber.setAttribute("class", "flags-number");
flagsNumber.innerHTML = "Flag: <span id='flags'></span>";

const timer = document.createElement("div");
timer.setAttribute("class", "timer");
timer.innerHTML = "Time: <span id='time'>0</span>";

const clickCounter = document.createElement("div");
clickCounter.setAttribute("class", "click-counter");
clickCounter.innerHTML = "Clicks: <span id='clicks'>0</span>";

const clickSound = new Audio("sounds/click.mp3");
const flagSound = new Audio("sounds/flag.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

const body = document.getElementById("root");
body.appendChild(title);
body.appendChild(data);
body.appendChild(newGame);
body.appendChild(flagsNumber);
body.appendChild(timer);
body.appendChild(clickCounter);
body.appendChild(page);
page.appendChild(box);

let WIDTH;
let HEIGHT;
let BOMBS_COUNT;
startGame(10, 10, 10);

let isSoundEnabled = true;
let gameOverSoundEnabled = true;

function startGame(width, height, bombsCount) {
  WIDTH = width;
  HEIGHT = height;
  BOMBS_COUNT = bombsCount;

  const cellsCount = WIDTH * HEIGHT;
  box.innerHTML = "<button></button>".repeat(cellsCount);
  const cells = [...box.children];

  let closedCount = cellsCount;
  let timerInterval;
  let elapsedTime = 0;
  let clickCount = 0;
  let firstClick = true; // Переменная для отслеживания первого клика

  // Индексы мин
  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS_COUNT);

  let flags = [];

  // Действия при клике
  box.addEventListener("mousedown", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    const index = cells.indexOf(event.target);
    const column = index % WIDTH;
    const row = Math.floor(index / WIDTH);

    if (event.button === 0) {
      // Левая кнопка мыши
      if (firstClick) {
        // Запуск таймера только при первом клике
        startTimer();
        firstClick = false;
      }
      open(row, column);
      updateClickCounter();
      playSound(clickSound); // Воспроизведение звука при клике
    } else if (event.button === 2) {
      // Правая кнопка мыши
      event.preventDefault(); // Отменить контекстное меню
      toggleFlag(index);
      updateFlagCounter();
      updateClickCounter();
      playSound(flagSound); // Воспроизведение звука при установке флага
    }
  });

  box.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  function isValid(row, column) {
    return row >= 0 && row < HEIGHT && column >= 0 && column < WIDTH;
  }

  function getMinesCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }
    return count;
  }

  function open(row, column) {
    if (!isValid(row, column)) {
      return;
    }

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell && cell.disabled === true) return;

    cell.disabled = true;

    if (isBomb(row, column)) {
      cell.innerHTML = "💣";
      stopTimer();
      const result = confirm("Извините, вы проиграли. Еще раз?");
      if (result) {
        restartGame();
      }
      if (gameOverSoundEnabled) {
        playSound(loseSound); // Воспроизведение звука при проигрыше
      }
      return;
    }

    closedCount--;
    if (closedCount <= BOMBS_COUNT) {
      stopTimer();
      if (confirm("Вы выиграли! Не хотите повторить?")) {
        restartGame();
      }
      if (gameOverSoundEnabled) {
        playSound(winSound); // Воспроизведение звука при выигрыше
      }
      return;
    }

    const count = getMinesCount(row, column);
    if (count !== 0) {
      cell.innerHTML = count;
      cell.style.color = getNumberColor(count);
      return;
    }

    // Перебор всех соседних ячеек
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) {
      return false;
    }
    const index = row * WIDTH + column;
    return bombs.includes(index);
  }

  function toggleFlag(index) {
    if (flags.includes(index)) {
      flags = flags.filter((item) => item !== index);
      cells[index].innerHTML = "";
    } else {
      flags.push(index);
      cells[index].innerHTML = "🚩";
    }
  }

  function numberOfBombs() {
    return bombs.filter((item) => !flags.includes(item)).length;
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      elapsedTime++;
      const timeElement = document.getElementById("time");
      timeElement.textContent = elapsedTime;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function updateClickCounter() {
    clickCount++;
    const clickElement = document.getElementById("clicks");
    clickElement.textContent = clickCount;
  }

  function getNumberColor(count) {
    switch (count) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "red";
      case 4:
        return "brown";
      default:
        return "black";
    }
  }

  function updateFlagCounter() {
    const flagElement = document.getElementById("flags");
    flagElement.textContent = numberOfBombs();
  }

  function restartGame() {
    stopTimer();
    startGame(WIDTH, HEIGHT, BOMBS_COUNT);
    updateClickCounter();
  }

  function playSound(sound) {
    if (isSoundEnabled) {
      sound.play();
    }
  }

  newGame.addEventListener("click", () => {
    stopTimer();
    startGame(WIDTH, HEIGHT, BOMBS_COUNT);
    updateClickCounter();
  });

  updateFlagCounter();
}
