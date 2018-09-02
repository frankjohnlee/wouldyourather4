import { SET_AUTHED_USER } from "../actions/authedUser";
// When the function is first called the state will be undefined so the default state should be null
export function authedUser(state = null, action){
    console.log("authedUser action", action);
    console.log("authedUser state", state);
    switch (action.type){
        case SET_AUTHED_USER:
            return action.id;
        default:
            return state;
    }
}