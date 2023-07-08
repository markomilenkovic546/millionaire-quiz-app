import * as data from "./model.js";
import * as view from "./view.js";
import { config } from "./model.js";
import { DOMSelectors } from "./view.js";

export function init() {
  view.onStartQuizClick(() => {
    data.drawQuestion();
    view.showQuestion(config.questionData);
  });
}

view.onAnswerBtnClick((answerButton) => {
  if (answerButton.textContent === config.questionData.questionAnswer) {
    data.drawQuestion();
    data.levelUpSum();
    view.reactToCorrectAnswer(answerButton);
    // Stores the guaranteed sum if the conditions are met
    data.handleGuaranteedSum();
    view.createNextQuestionButton();
    view.handleClickOnNextQuestionButton();
  } else {
    DOMSelectors.$correctAnswerBtn = Array.from(DOMSelectors.$answerButtons).find((el) =>
      el.textContent.includes(`${config.questionData.questionAnswer}`)
    );
    view.reactToWrongAnswer(answerButton);
  }
});
