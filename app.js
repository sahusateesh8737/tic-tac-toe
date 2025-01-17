let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const winSound = new Audio('Winning.wav');

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  boxes.forEach((box) => {
    box.classList.remove("celebrate");
  });
  const lines = document.querySelectorAll(".line");
  lines.forEach((line) => line.remove());
};

const checkWin = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      // Apply celebration animation to winning boxes
      boxes[a].classList.add("celebrate");
      boxes[b].classList.add("celebrate");
      boxes[c].classList.add("celebrate");
      msgContainer.classList.remove("hide");
      msg.innerText = `${boxes[a].innerText} Wins!`;
      disableBoxes();
      winSound.play(); // Play winning sound
      drawLine(pattern); // Draw the line
      return true;
    }
  }
  return false;
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.removeEventListener("click", handleBoxClick);
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
    box.classList.remove("celebrate");
    box.innerText = "";
  });
};

const handleBoxClick = (event) => {
  const box = event.target;
  if (box.innerText !== "") return;

  // Add vibration effect
  if (navigator.vibrate) {
    navigator.vibrate(100); // Vibrate for 100 milliseconds
  }

  if (turnO) {
    box.innerText = "O";
  } else {
    box.innerText = "X";
  }

  count++;
  if (checkWin()) return;

  if (count === 9) {
    msgContainer.classList.remove("hide");
    msg.innerText = "It's a Draw!";
  }

  turnO = !turnO;
};

boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

var sound = new Audio();
sound.src = "sound2.mp3";

const drawLine = (pattern) => {
  const [a, b, c] = pattern;
  const boxA = boxes[a].getBoundingClientRect();
  const boxC = boxes[c].getBoundingClientRect();

  const line = document.createElement("div");
  line.classList.add("line");

  const angle = Math.atan2(boxC.top - boxA.top, boxC.left - boxA.left) * 180 / Math.PI;
  const length = Math.sqrt(Math.pow(boxC.top - boxA.top, 2) + Math.pow(boxC.left - boxA.left, 2));

  line.style.width = `${length}px`;
  line.style.transform = `rotate(${angle}deg)`;
  line.style.top = `${boxA.top + boxA.height / 2}px`;
  line.style.left = `${boxA.left + boxA.width / 2}px`;

  document.body.appendChild(line);
};
