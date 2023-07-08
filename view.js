import * as data from "./model.js";
import { config } from "./model.js";
export const DOMSelectors = {
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

// Show question related elements and populate content with question data
export function showQuestion(questionData) {
  DOMSelectors.$questionParaprah.textContent = `${questionData.askedQuestion}`;
  DOMSelectors.$answerBtn1.textContent = `${questionData.options[0]}`;
  DOMSelectors.$answerBtn2.textContent = `${questionData.options[1]}`;
  DOMSelectors.$answerBtn3.textContent = `${questionData.options[2]}`;
  DOMSelectors.$answerBtn4.textContent = `${questionData.options[3]}`;
  DOMSelectors.$answersContainer.style.visibility = "visible";
  DOMSelectors.$questionContainer.style.visibility = "visible";
  DOMSelectors.$levelsContainer.style.visibility = "visible";

  if (DOMSelectors.$startQuiz.style.visibility != "hidden") {
    DOMSelectors.$startQuiz.style.visibility = "hidden";
  }
}

// Update UI by displaying new question
export const updateQuestions = () => {
  // Show question related elements and populate content with question data
  showQuestion(config.questionData);
  // Enable "Answer" buttons once the next question is loaded
  anableAnswerButtons();
};

// Disable "Answer" buttons
export const anableAnswerButtons = () => {
  DOMSelectors.$answerButtons.forEach((button) => {
    button.disabled = false;
    button.style.backgroundColor = "";
  });
};

// Update UI when user answers correctly
export const reactToCorrectAnswer = (answerButton) => {
  answerButton.style.backgroundColor = "green";
  // Call highlightCurrentPrizeLevel function to hightlight current earnings
  highlightCurrentPrizeLevel();
  //Call function to show appropriate message when answer is correct
  showMessageWhenUserAnswersCorrectly();
  createNextQuestionButton();

  // Disable "Answer" buttons
  disableAnswerButtons();
};

// Disable "Answer" buttons
export const disableAnswerButtons = () => {
  DOMSelectors.$answerButtons.forEach((button) => {
    button.disabled = true;
  });
};
// Call this function to hightlight current prize ladder level
export const highlightCurrentPrizeLevel = () => {
  const $prizeLadderLevel = document.querySelector(`.money-levels ul li:nth-of-type(${config.currentPrizeLevel})`);
  config.levelPrice = $prizeLadderLevel.value;
  $prizeLadderLevel.style.backgroundColor = "rgb(255, 102, 0)";
  $prizeLadderLevel.style.color = "white";

  if (config.currentPrizeLevel < 15) {
    const $previousPrizeLadderLevel = document.querySelector(
      `.money-levels ul li:nth-of-type(${config.currentPrizeLevel + 1})`
    );
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

  disableAnswerButtons();
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

export const handleClickOnNextQuestionButton = () => {
  const handleNextQuestionClick = () => {
    updateQuestions();
    DOMSelectors.$nextQuestionBtn.style.visibility = "hidden";
    DOMSelectors.$nextQuestionBtn.removeEventListener("click", handleNextQuestionClick);
  };

  DOMSelectors.$nextQuestionBtn.addEventListener("click", handleNextQuestionClick);
};

// Attach event listener to "Start quiz" button
export function onStartQuizClick(callback) {
  DOMSelectors.$startQuiz?.addEventListener("click", callback);
}

// Attach event listener to "Start quiz" button
export function onAnswerBtnClick(callback) {
  DOMSelectors.$answerButtons.forEach((answerButton) => {
    answerButton?.addEventListener("click", (event) => {
      callback(event.target); // Pass the target button element to the callback
    });
  });
}
