import { _saveQuestionAnswer } from "../utils/_DATA";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";


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

export function handleAddAnswer(qid, answer){
     return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(
                () => dispatch(addAnswer(authedUser, qid, answer))
            ) // Once this is done then add it to our own state
    }
}