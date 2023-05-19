"use strict";
const title = document.createElement("h1");
title.setAttribute("class", "title");
title.innerHTML = "Minesweeper";

const page = document.createElement("div");
page.setAttribute("class", "page");

const box = document.createElement("div");
box.setAttribute("class", "box");

const body = document.getElementById("root");
body.appendChild(title);
body.appendChild(page);
page.appendChild(box);

startGame(10, 10, 10);
function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
  const cellsCount = WIDTH * HEIGHT;
  box.innerHTML = "<button></button>".repeat(cellsCount);
}
