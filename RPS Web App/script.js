// Variables
let yourChoice = "";
let computerChoice = "";
let yourScore = 0;
let computerScore = 0;

const choices = ["Rock", "Paper", "Scissors"];

// Button Elements
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

const submitBtn = document.getElementById("submit-button");
const resetBtn = document.getElementById("reset-button");

// Output Elements
const yourChoiceText = document.getElementById("your-choice");
const computerChoiceText = document.getElementById("computer-choice");
const outcomeText = document.getElementById("outcome");

const yourScoreText = document.getElementById("your-score");
const computerScoreText = document.getElementById("computer-score");

// Event Listener 
rockBtn.addEventListener("click", function() {
    yourChoice = "Rock";
    setActive(rockBtn);
});

paperBtn.addEventListener("click", function() {
    yourChoice = "Paper";
    setActive(paperBtn);
});

scissorsBtn.addEventListener("click", function() {
    yourChoice = "Scissors";
    setActive(scissorsBtn);
});

// Set Active Button
function setActive(activeButton) {
    rockBtn.classList.remove("active");
    paperBtn.classList.remove("active");
    scissorsBtn.classList.remove("active");

    activeButton.classList.add("active");
}

// Event Listener Submit
submitBtn.addEventListener("click", function() {
    if (yourChoice === "") {
        alert("Invalid choice! Please select your choice first!");
        return;
    }

    let randomNumber = Math.floor(Math.random() * choices.length);

    switch (randomNumber) {
        case 0:
            computerChoice = "Rock";
            break;
        case 1:
            computerChoice = "Paper";
            break;
        case 2:
            computerChoice = "Scissors";
            break;
    }

    yourChoiceText.textContent= "Your Choice: " + yourChoice;
    computerChoiceText.textContent = "Computer's Choice: " + computerChoice;

    // Logic
    // Win
    if ((yourChoice === "Rock" && computerChoice === "Scissors") || 
        (yourChoice === "Paper" && computerChoice === "Rock") || 
        (yourChoice === "Scissors" && computerChoice === "Paper")) 
    {
        outcomeText.textContent = "Outcome: You Win!";
        yourScore++;
    }

    // Draw
    else if (yourChoice === computerChoice) {
        outcomeText.textContent = "Outcome: Draw!";
    }

    // Lose
    else {
        outcomeText.textContent = "Outcome: You Lose!";
        computerScore++;
    }

    // Update Score
    yourScoreText.textContent = "Your Score: " + yourScore;
    computerScoreText.textContent = "Computer's Score: " + computerScore;
});

// Event Listener Reset
resetBtn.addEventListener("click", () => {
    yourChoice = "";
    computerChoice = "";
    yourScore = 0;
    computerScore = 0;

    yourChoiceText.textContent = "Your Choice: ";
    computerChoiceText.textContent = "Computer's Choice: ";
    outcomeText.textContent = "Outcome: ";
    yourScoreText.textContent = "Your Score: 0";
    computerScoreText.textContent = "Computer's Score: 0";

    rockBtn.classList.remove("active");
    paperBtn.classList.remove("active");
    scissorsBtn.classList.remove("active"); 
});