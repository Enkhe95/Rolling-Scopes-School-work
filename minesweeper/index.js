"use strict";
const title = document.createElement("h1");
title.setAttribute("class", "title");
title.innerHTML = "Minesweeper";

const page = document.createElement("div");
page.setAttribute("class", "page");

const box = document.createElement("div");
box.setAttribute("class", "box");

const data = document.createElement("div");

const body = document.getElementById("root");
body.appendChild(title);
body.appendChild(data);
body.appendChild(page);
page.appendChild(box);

startGame(10, 10, 10);
function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
  const cellsCount = WIDTH * HEIGHT;
  box.innerHTML = "<button></button>".repeat(cellsCount);
  const cells = [...box.children];

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
      cells[index].innerHTML = "⛳️";
    }

    data.innerHTML = numberOfBombs();
  });

  function getMinesCount(row, column) {
    let count = 0;
    let colorNumbers = "";
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }

    //цвет чисел
    if (count === 0) {
      return " ";
    } else if (count === 1) {
      colorNumbers = "blue";
    } else if (count === 2) {
      colorNumbers = "green";
    } else if (count === 3) {
      colorNumbers = "brown";
    } else {
      colorNumbers = "red";
    }
    return (
      '<span class = "number" style="color: ' +
      colorNumbers +
      '">' +
      count +
      "</span>"
    );
  }

  function open(row, column) {
    const index = row * WIDTH + column;
    const cell = cells[index];
    cell.innerHTML = isBomb(row, column) ? "💣" : getMinesCount(row, column);
    cell.disabled = true;
  }

  function isBomb(row, column) {
    const index = row * WIDTH + column;
    return bombs.includes(index);
  }

  function numberOfBombs() {
    return bombs.filter((item) => !flags.includes(item)).length;
  }
}
