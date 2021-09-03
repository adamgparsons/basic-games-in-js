import blank from "./images/blank.png";
import cheeseburger from "./images/cheeseburger.png";
import fries from "./images/fries.png";
import hotdog from "./images/hotdog.png";
import icecream from "./images/ice-cream.png";
import milkshake from "./images/milkshake.png";
import pizza from "./images/pizza.png";
import white from "./images/white.png";

document.addEventListener("DOMContentLoaded", () => {
  // card options
  const cardArray = [
    {
      name: "fries",
      img: fries,
    },
    {
      name: "fries",
      img: fries,
    },
    {
      name: "cheeseburger",
      img: cheeseburger,
    },
    {
      name: "cheeseburger",
      img: cheeseburger,
    },
    {
      name: "hotdog",
      img: hotdog,
    },
    {
      name: "hotdog",
      img: hotdog,
    },
    {
      name: "ice-cream",
      img: icecream,
    },
    {
      name: "ice-cream",
      img: icecream,
    },
    {
      name: "milkshake",
      img: milkshake,
    },
    {
      name: "milkshake",
      img: milkshake,
    },
    {
      name: "pizza",
      img: pizza,
    },
    {
      name: "pizza",
      img: pizza,
    },
  ];

  let cardsChosen = [];
  let cardsChosenId = [];

  let currentScore = 0;

  const scoreboard = document.querySelector("#result");
  const grid = document.querySelector(".grid");
  const endGameDisplay = document.querySelector("#end-game");
  const newGameButton = document.querySelector("#new-game");
  newGameButton.onclick = newGame;

  function shuffleCards(array) {
    var currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // create board
  function createBoard() {
    const shuffledCards = shuffleCards(cardArray);
    shuffledCards.forEach((_, index) => {
      const card = document.createElement("img");
      card.setAttribute("src", blank);
      card.className = "card";
      card.setAttribute("data-id", index);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    });
    scoreboard.innerText = currentScore;
    endGameDisplay.style.display = "none";
  }

  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionOneCard = document.querySelector(
      `img[data-id='${optionOneId}']`
    );

    const optionTwoId = cardsChosenId[1];
    const optionTwoCard = document.querySelector(
      `img[data-id='${optionTwoId}']`
    );

    const isMatch = cardArray[optionOneId].name === cardArray[optionTwoId].name;
    if (isMatch) {
      currentScore = currentScore + 1;
      console.log("currentScore", currentScore);
      scoreboard.innerText = currentScore;
      optionOneCard.setAttribute("src", white);
      optionOneCard.removeEventListener("click", flipCard);
      optionOneCard.classList.remove("card");

      optionTwoCard.setAttribute("src", white);
      optionTwoCard.removeEventListener("click", flipCard);
      optionTwoCard.classList.remove("card");
    } else {
      optionOneCard.setAttribute("src", blank);
      optionTwoCard.setAttribute("src", blank);
    }

    if (currentScore == 6) {
      endGameDisplay.style.display = "block";
    }

    cardsChosen = [];
    cardsChosenId = [];
  }

  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    console.log(cardsChosen);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  function newGame() {
    grid.remove();
    currentScore = 0;
    createBoard();
    endGameDisplay.style.display = "none";
  }
  createBoard();
});
