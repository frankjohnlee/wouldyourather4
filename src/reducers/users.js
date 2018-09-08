import { ADD_USER_ANSWER, RECEIVE_USER, ADD_QUESTION_USER } from "../actions/users";


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
        case ADD_QUESTION_USER:
            const { question } = action;
            const { author, id } = question;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    answers: {
                        ...state[author].answers,
                        id,
                    }

                }

            };
        default:
            return state;
    }
}