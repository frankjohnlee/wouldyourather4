export const ADD_QUESTION = "ADD_QUESTION";

export function recieveQuestions(questions){
    return {
        type: ADD_QUESTION,
        questions: questions
    }
}