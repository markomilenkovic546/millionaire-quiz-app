import * as data from "./data.js";
import { config } from "./data.js";
const DOMSelectors = {
  $startQuiz: document.querySelector(".start-quiz"),
  $answersContainer: document.querySelector(".answers-container"),
  $questionParaprah: document.querySelector(".question"),
  $levelsContainer: document.querySelector(".money-levels"),
  $answerBtn1: document.querySelector("#answer_1"),
  $answerBtn2: document.querySelector("#answer_2"),
  $answerBtn3: document.querySelector("#answer_3"),
  $answerBtn4: document.querySelector("#answer_4"),
  $answerButtons: document.querySelectorAll(".answer"),
  $questionContainer: document.querySelector(".question-container"),
  $message: document.querySelector(".message"),
  $correctAnswerBtn: null,
  $nextQuestionBtn: document.querySelector("#next-question"),
};


// Question data 
let questionData = null;

// Attach event listener to "Start quiz" button
export const onStartQuizClick = () => {
  DOMSelectors.$startQuiz?.addEventListener("click", () => {
    // Draw random questions and store data in appropriate data structure
    questionData = data.drawQuestion();

    // Populate elements content with question data
    DOMSelectors.$questionParaprah.textContent = `${questionData.askedQuestion}`;
    DOMSelectors.$answerBtn1.textContent = `${questionData.options[0]}`;
    DOMSelectors.$answerBtn2.textContent = `${questionData.options[1]}`;
    DOMSelectors.$answerBtn3.textContent = `${questionData.options[2]}`;
    DOMSelectors.$answerBtn4.textContent = `${questionData.options[3]}`;

    DOMSelectors.$answersContainer.style.visibility = "visible";
    DOMSelectors.$questionContainer.style.visibility = "visible";
    DOMSelectors.$levelsContainer.style.visibility = "visible";
    DOMSelectors.$startQuiz.style.visibility = "hidden";
    handleClickOnAnswerButton();
  });
};

// Update UI by displaying new question
export const updateQuestions = () => {
  questionData = data.drawQuestion();
  // Populate elements content with next question data
  DOMSelectors.$questionParaprah.textContent = `${questionData.askedQuestion}`;
  DOMSelectors.$answerBtn1.textContent = `${questionData.options[0]}`;
  DOMSelectors.$answerBtn2.textContent = `${questionData.options[1]}`;
  DOMSelectors.$answerBtn3.textContent = `${questionData.options[2]}`;
  DOMSelectors.$answerBtn4.textContent = `${questionData.options[3]}`;

  // Enable "Answer" buttons once the next question is loaded
  DOMSelectors.$answerButtons.forEach((button) => {
    button.disabled = false;
    button.style.backgroundColor = "";
  });
};

// Attach event listener to "Answer" buttons
export const handleClickOnAnswerButton = () => {
  DOMSelectors.$answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.textContent === questionData.questionAnswer) {
        data.levelUpSum();
        reactToCorrectAnswer(button);
        createNextQuestionButton();
        handleClickOnNextQuestionButton();
      } else {
        DOMSelectors.$correctAnswerBtn = Array.from(DOMSelectors.$answerButtons).find((el) =>
          el.textContent.includes(`${questionData.questionAnswer}`)
        );
        reactToWrongAnswer(button);
      }
    });
  });
};

// Update UI when user answers correctly
export const reactToCorrectAnswer = (button) => {
  button.style.backgroundColor = "green";
  // Call reactToPrizeLadderChange function to hightlight current earnings
  reactToPrizeLadderChange();
  //Call function to show appropriate message when answer is correct
  showMessageWhenUserAnswersCorrectly();
  createNextQuestionButton();

  // Disable "Answer" buttons
  DOMSelectors.$answerButtons.forEach((button) => {
    button.disabled = true;
  });

  // Stores the guaranteed sum if the conditions are met
  data.handleGuaranteedSum();
};
// Call this function to hightlight current prize ladder level
export const reactToPrizeLadderChange = () => {
  const $prizeLadderLevel = document.querySelector(`.money-levels ul li:nth-of-type(${config.currentPrizeLevel})`);
  config.levelPrice = $prizeLadderLevel.value;
  $prizeLadderLevel.style.backgroundColor = "rgb(255, 102, 0)";
  $prizeLadderLevel.style.color = "white";

  if (config.currentPrizeLevel < 15) {
    const $previousPrizeLadderLevel = document.querySelector(`.money-levels ul li:nth-of-type(${config.currentPrizeLevel + 1})`);
    $prizeLadderLevel.style.backgroundColor = "rgb(255, 102, 0)";
    $previousPrizeLadderLevel.style.backgroundColor = "";
    $previousPrizeLadderLevel.style.color = "";
  }
};

// Show approprate message when user answers correctlly
export const showMessageWhenUserAnswersCorrectly = () => {
  // Display message
  DOMSelectors.$message.style.visibility = "visible";
  DOMSelectors.$message.textContent = `Correct! You won ${config.levelPrice} $`;
  //Hide message after 3 seconds
  setTimeout(function () {
    DOMSelectors.$message.style.visibility = "hidden";
  }, 3000);
};

// Show approprate message when user answers incorrectlly
export const showMessageWhenUserAnswersIncorrectly = () => {
  // Display message
  DOMSelectors.$message.style.visibility = "visible";
  DOMSelectors.$message.textContent = `Wrong! You are going home with ${config.guaranteedSum} $`;
  DOMSelectors.$message.style.backgroundColor = "red";
  //Hide message after 6 seconds
  setTimeout(function () {
    DOMSelectors.$message.style.visibility = "hidden";
    window.location.reload();
  }, 6000);
};

// Update UI when user answers incorrectly
export const reactToWrongAnswer = (button) => {
  DOMSelectors.$correctAnswerBtn.style.backgroundColor = "green";
  button.style.backgroundColor = "red";

  DOMSelectors.$answerButtons.forEach((button) => {
    button.disabled = true;
  });
  // Show approprate message when user answers incorrectlly
  showMessageWhenUserAnswersIncorrectly();
};

// Display the "Next question" button
export const createNextQuestionButton = () => {
  // Displau button 3 seconds once the function is called
  setTimeout(function () {
    DOMSelectors.$nextQuestionBtn.style.visibility = "visible";
  }, 3000);
};

// Handle Click on "Next question" button event
const handleClickOnNextQuestionButton = () => {
  const handleNextQuestionClick = () => {
    updateQuestions();
    DOMSelectors.$nextQuestionBtn.style.visibility = "hidden";
    DOMSelectors.$nextQuestionBtn.removeEventListener("click", handleNextQuestionClick);
  };

  DOMSelectors.$nextQuestionBtn.addEventListener("click", handleNextQuestionClick);
};


export const init = () => {
    
  onStartQuizClick()
}