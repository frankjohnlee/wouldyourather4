import { ADD_QUESTION, ADD_ANSWER, ADD_NEW_QUESTION } from "../actions/questions";

export function questions(state={}, action){
    switch (action.type){
        case ADD_QUESTION:
            return {
                ...state,
                ...action.questions,
            };
        case ADD_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            };
        case ADD_NEW_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        default:
            return state;
    }
}
