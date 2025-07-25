let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],
    [2,5,8],[2,4,6],[3,4,5],[6,7,8]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const newGame = () => {
    msgContainer.classList.add("hide");
    resetGame();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "X";
            turn0 = false;
        } else {
            box.innerText = "O";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let isWinner = false;
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                isWinner = true;
                break;
            }
        }
    }

    if (!isWinner) {
        let allFilled = [...boxes].every(box => box.innerText !== "");
        if (allFilled) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);
