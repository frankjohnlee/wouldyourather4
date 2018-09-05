export const RECEIVE_USER = "RECEIVE_USER";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";

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