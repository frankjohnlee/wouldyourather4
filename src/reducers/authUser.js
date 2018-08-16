import { SET_AUTHED_USER } from "../actions/authedUser";
// When the function is first called the state will be undefined so the default state should be null
export function authUser(state = null, action){
    switch (action.type){
        case SET_AUTHED_USER:
            return action.id;
        default:
            return state;
    }
}