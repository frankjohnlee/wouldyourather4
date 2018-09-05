import { ADD_USER_ANSWER, RECEIVE_USER} from "../actions/users";


export function users(state={}, action){

    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                ...action.users,
            };
        case ADD_USER_ANSWER:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers : {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }

            };

        default:
            return state;
    }
}