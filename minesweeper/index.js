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
flagsNumber.innerHTML = "Flag: <span id = 'flags'></span>";

const body = document.getElementById("root");
body.appendChild(title);
body.appendChild(data);
body.appendChild(flagsNumber);
body.appendChild(page);
page.appendChild(box);
body.appendChild(newGame);

startGame(10, 10, 10);
function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
  const cellsCount = WIDTH * HEIGHT;
  box.innerHTML = "<button></button>".repeat(cellsCount);
  const cells = [...box.children];

  let closedCount = cellsCount;

  //индексы мин
  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS_COUNT);

  let flags = [];

  // действия при клике
  box.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    const index = cells.indexOf(event.target);
    const column = index % WIDTH;
    const row = Math.floor(index / WIDTH);
    open(row, column);
  });

  box.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    const index = cells.indexOf(event.target);

    if (cells[index].disabled) {
      return;
    }

    if (flags.includes(index)) {
      flags = flags.filter((item) => item !== index);
      cells[index].innerHTML = "";
    } else {
      flags.push(index);
      cells[index].innerHTML = "🚩";
    }

    const flag = document.getElementById("flags");
    flag.innerHTML = numberOfBombs();
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
      const result = confirm("Извините, вы проиграли. Еще раз?");
      if (result) {
        startGame(WIDTH, HEIGHT, BOMBS_COUNT);
      }
      return;
    }

    closedCount--;
    if (closedCount <= BOMBS_COUNT) {
      if (confirm("Вы выиграли! Не хотите повторить?")) {
        startGame(WIDTH, HEIGHT, BOMBS_COUNT);
      }
      return;
    }

    const count = getMinesCount(row, column);
    if (count !== 0) {
      cell.innerHTML = count;
      cell.style.color = getNumberColor(count);
      return;
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
          return "";
      }
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

  function numberOfBombs() {
    return bombs.filter((item) => !flags.includes(item)).length;
  }

  newGame.addEventListener("click", (event) => {
    return startGame(WIDTH, HEIGHT, BOMBS_COUNT);
  });
}
