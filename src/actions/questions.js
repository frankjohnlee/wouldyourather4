import { formatQuestion } from "../utils/_DATA";
import { saveQuestion } from "../utils/api";
import {addUserAnswer} from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";


export function receiveQuestions(questions){
    return {
        type: ADD_QUESTION,
        questions: questions
    }
}

export function addAnswer(authedUser, qid, answer){
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function newQuestion(question){
    return {
        type: ADD_NEW_QUESTION,
        question
    }
}

export function addNewQuestion(optionOneText, optionTwoText){
      return (dispatch, getState) => {
        const { authedUser } = getState();
         return saveQuestion({
              author: authedUser,
              optionOneText,
              optionTwoText,
         })
        .then(
            question => dispatch(newQuestion(question))

        ) // Once this is done then add it to our own state
    }
}

