import fs from "fs";
import { random } from "underscore";

/*
This function takes an array and the number of random items to choose from the array (numItems). 
It should return a new array containing the correct number of randomly selected, unique items from the original array. 
Students must export their createRandom function from the lib.js file in order to run the included test cases.
*/
export const chooseRandom = (array = [], numItems) => {
  if (array.length < 2) {
    return array;
  }
  if (numItems > array.length) {
    numItems = Math.floor(Math.random() * array.length) + 1;
  }
  let randomArray = [];
  while (randomArray.length < numItems) {
    let randomIndex = Math.floor(Math.random() * array.length) + 1;
    if (!randomArray.includes(array[randomIndex])) {
      randomArray.push(array[randomIndex]);
    }
  }
  return randomArray;
};

/*
 function which expects an object with properties: numQuestions and numChoices and must return an array of objects in a specific format (listed in the CreatePrompt Format section below). 
 The numQuestions parameter should have a default value of 1 and the numchoices parameter should have a default value of 2.
*/
export const createPrompt = (answers) => {
  let answer = answers || {};
  if (!answer) {
    answers = { numQuestions: 1, numChoices: 2 };
  }
  if (!answer.numQuestions || answer.numQuestions < 1) {
    answer.numQuestions = 1;
  }
  if (!answer.numChoices || answer.numChoices < 2) {
    answer.numChoices = 2;
  }
  const { numQuestions = 1, numChoices = 2 } = answer;

  let prompt = [];
  for (let i = 1; i <= numQuestions; i++) {
    const question = {
      type: "input",
      name: `question-${i}`,
      message: `Enter question ${i}`,
    };
    prompt.push(question);
    for (let j = 1; j <= numChoices; j++) {
      const choice = {
        type: "input",
        name: `question-${i}-choice-${j}`,
        message: `Enter answer choice ${j} for question ${i}`,
      };
      prompt.push(choice);
    }
  }
  return prompt;
};

export const createQuestions = (answer) => {
  if (!answer) {
    return [];
  }
  let questions = [];
  for (let key in answer) {
    if (key.includes("question") && !key.includes("choice")) {
      const question = {
        type: "list",
        name: key,
        message: answer[key],
        choices: [],
      };
      questions.push(question);
      for (let choiceKey in answer) {
        if (choiceKey.includes("choice") && choiceKey.includes(key)) {
          question.choices.push(answer[choiceKey]);
        }
      }
    }
  }
  return questions;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });
