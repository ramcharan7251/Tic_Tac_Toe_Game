let boxes =document.querySelectorAll(".box");
let msgContainer =  document.querySelector(".msg-container");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");

let msg = document.querySelector("#msg");
let turnO =true ;
let turnX=false;//playerX, player0

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]   
];  
const resetGame = () =>{
  turnO=true;
  enableBoxes();
  msgContainer.classList.add("hide");
}
boxes.forEach((box) =>{
box.addEventListener("click",() =>  {

    if(turnO){  //playerO turn
        box.innerText="O";
        turnO= false;
        turnX=  true;
    }
    else{    // player X turn
        box.innerText="X";
        turnX=false;
        turnO=true;
    }
    box.disabled=true;
    checkWinner();
});
});

const disableBoxes = () =>{
      for(let  box of boxes){
        box.disabled=true;
      }
}

const enableBoxes = () =>{
    for(let  box of boxes){
      box.disabled=false;
      box.innerText="";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
}
const checkWinner = () => {
    let draw = true;
    for (let pattern of winPatterns) {
        let pst1Val = boxes[pattern[0]].innerText;
        let pst2Val = boxes[pattern[1]].innerText;
        let pst3Val = boxes[pattern[2]].innerText;
        if (pst1Val !== "" && pst2Val !== "" && pst3Val !== "") {
            if (pst1Val === pst2Val && pst2Val === pst3Val) {
                showWinner(pst1Val);
                return; // Exit function early if winner is found
            }
        }   
    }
     // Check for draw
     for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }
    if (draw) {
        // If all boxes are filled and no winner is found, it's a draw
        showDraw();
    }
}
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame)

