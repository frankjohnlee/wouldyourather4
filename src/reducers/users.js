import { RECIEVE_USER } from "../actions/users";

export function users(state={}, action){

    switch (action.type) {
        case RECIEVE_USER:
            return {
                ...state,
                ...action.users,
            };
        default:
            return state;
    }
}