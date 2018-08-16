import { ADD_QUESTION } from "../actions/questions";

export function tweets(state={}, action){
    switch (action.type){
        case ADD_QUESTION:
            return {
                ...state,
                ...action.questions,
            };
        default:
            return state;
    }
}