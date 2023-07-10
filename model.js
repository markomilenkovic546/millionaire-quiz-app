import { questionBank } from "./question-bank.js";

/*
currentPrizeLevel - represents the current level the user is on. 
Because first price is represented on the UI as a fifteenth child of the <ul>, inital ladder value is 16

guaranteedSum - represents the current guaranteed sum the user has. Initial value is 0

levelPrice - represents the prize amount stored for current level.
*/
export const config = {
   currentPrizeLevel: 16,
   guaranteedSum: 0,
   levelPrice: null,
   questionData: null
 }

// Draw random question and store it as questionData object
export const drawQuestion = () => {
  if (questionBank.length === 0) {
    // Handle the case when all questions have been drawn
    return null;
  }

  const randomIndex = Math.floor(Math.random() * questionBank.length);
  const randomQuestion = questionBank[randomIndex];
  console.log(questionBank.length)

  // Remove the drawn question from the array
  questionBank.splice(randomIndex, 1);

  config.questionData = {
    askedQuestion: randomQuestion.question,
    questionAnswer: randomQuestion.answer,
    options: randomQuestion.options,
  };
};
//console.log(questionData.askedQuestion)

// Change level
export const levelUp = () => {
  config.currentPrizeLevel = config.currentPrizeLevel - 1;
};

// Store Guaranteed Sum according to currentPrizeLevel
export const handleGuaranteedSum = ()  => {
  if (config.currentPrizeLevel === 11) {
    config.guaranteedSum = 1000;
  }
  if (config.currentPrizeLevel === 6) {
    config.guaranteedSum = 32000;
  }

  if (config.currentPrizeLevel === 1) {
    config.guaranteedSum = 1000000;
  }
};
