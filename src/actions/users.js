import {ADD_NEW_QUESTION} from "./questions";

export const RECEIVE_USER = "RECEIVE_USER";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_QUESTION_USER = "ADD_QUESTION_USER";

export function addUserAnswer(authedUser, qid, answer){
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}
export function receiveUsers(users){
    return {
        type: RECEIVE_USER,
        users: users
    }
}


export function newQuestionUser(question){
    return {
        type: ADD_QUESTION_USER,
        question
    }
}
