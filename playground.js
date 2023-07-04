const cards = [
  {
    order: 1,
    term: "AX",
    definition: "Linear, 180, S",
    _id: "649e53f6d32ee3d3984d6ceb",
  },
  {
    order: 2,
    term: "AX2",
    definition: "Linear, 180, SP",
    _id: "649e53f6d32ee3d3984d6cec",
  },
  {
    order: 3,
    term: "AX3",
    definition: "Trigonal Planar, 120",
    _id: "649e53f6d32ee3d3984d6cec",
  },
  {
    order: 4,
    term: "AX2E",
    definition: "Bent Trigonal Planar, 120",
    _id: "649e53f6d32ee3d3984d6cec",
  },
  {
    order: 5,
    term: "AXE2",
    definition: "Linear Trigonal Planar, 120",
    _id: "649e53f6d32ee3d3984d6cec",
  },
  {
    order: 6,
    term: "AX4",
    definition: "Tetrahedral, 109.5",
    _id: "649e53f6d32ee3d3984d6cec",
  },
];

let currentCard = 1;
let cardContent = "term";
let cardMode = {
  orders: Array.from({ length: cards.length }, (_, i) => i + 1),
  mode: "shuffle",
};

const getCard = (currentCard) => {
  let tempCard = cardMode.orders[currentCard-1];
  return cards.find((card) => {
    return card.order === tempCard;
  });
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

if (cardMode.mode === "shuffle") {
  shuffleArray(cardMode.orders);
}

console.log(getCard(6).term);
console.log(cardMode.orders);
