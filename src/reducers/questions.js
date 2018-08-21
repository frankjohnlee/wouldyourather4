import { ADD_QUESTION, ADD_ANSWER } from "../actions/questions";

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
            };

        default:
            return state;
    }
}
