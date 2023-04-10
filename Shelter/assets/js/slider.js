"use strict"
// на размер экрана desktop
const container = document.querySelector('.pets__container');
const cards = document.querySelectorAll('.pets__card');
const leftArrow = document.querySelector('#leftArrow');
const rightArrow = document.querySelector('#rightArrow');
const breakpoint1 = 1280;
const breakpoint2 = 769;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function handleCardClick(e) {
  const width = window.innerWidth;
  let offset = 0;
  if (width >= breakpoint1) {
    offset = 3;
  } else if (width >= breakpoint2) {
    offset = 2;
  } else {
    offset = 1;
  }

  const currentCard = e.currentTarget;
  const currentIndex = Array.from(cards).indexOf(currentCard);
  const nextIndex = (currentIndex + offset) % cards.length;
  const nextCard = cards[nextIndex]
  container.insertBefore(nextCard, cards[0]);
  if (width >= breakpoint1) {
    const shuffledCards = shuffle(Array.from(cards));
    shuffledCards.forEach(card => container.appendChild(card));
  }
}

leftArrow.addEventListener('click', () => {
  handleCardClick(event);
});
rightArrow.addEventListener('click', () => {
  handleCardClick(event);
});

//на размер экрана планшет









