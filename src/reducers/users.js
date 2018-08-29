import { RECEIVE_USER } from "../actions/users";
import {ADD_ANSWER} from "../actions/questions";

export function users(state={}, action){

    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                ...action.users,
            };
        default:
            return state;
    }
}