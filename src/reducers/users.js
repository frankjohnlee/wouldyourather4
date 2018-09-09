import { ADD_USER_ANSWER, RECEIVE_USER, ADD_QUESTION_USER } from "../actions/users";
import {questions} from "./questions";


export function users(state={}, action){

    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                ...action.users,
            };
        case ADD_USER_ANSWER:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers : {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }

            };
        case ADD_QUESTION_USER:
            const { question } = action;
            const { author, id } = question;
            let answerArray = state[author].questions;
            const nextIDIndex = state[author].questions.length; // the questions object has an id counting from 0
            answerArray[nextIDIndex] = id;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: answerArray
                }

            };
        default:
            return state;
    }
}