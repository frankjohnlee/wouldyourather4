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

