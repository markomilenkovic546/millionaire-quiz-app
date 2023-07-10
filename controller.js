import * as model from "./model.js";
import * as view from "./view.js";
import { config } from "./model.js";
import { DOMSelectors } from "./view.js";

// Initalize app
export function init() {
  view.onStartQuizClick(() => {
    model.drawQuestion();
    view.showQuestion(config.questionData);
  });
}

// Handle click on the "Answer" button
view.onAnswerBtnClick((answerButton) => {
    // If the user answers correctly
  if (answerButton.textContent === config.questionData.questionAnswer) {
    model.drawQuestion();
    model.levelUp();
    view.reactToCorrectAnswer(answerButton);
    // Stores the guaranteed sum if the conditions are met
    model.handleGuaranteedSum();
    view.createNextQuestionButton();
    view.handleClickOnNextQuestionButton();
  }
  // If the users answers incorrectly 
  else {
    DOMSelectors.$correctAnswerBtn = Array.from(DOMSelectors.$answerButtons).find((el) =>
      el.textContent.includes(`${config.questionData.questionAnswer}`)
    );
    view.reactToWrongAnswer(answerButton);
  }
});
