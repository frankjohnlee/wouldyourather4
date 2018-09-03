import { ADD_QUESTION, ADD_ANSWER, ADD_NEW_QUESTION } from "../actions/questions";

export function questions(state={}, action){
    console.log(action);
    switch (action.type){
        case ADD_QUESTION:
            return {
                ...state,
                ...action.questions,
            };
        case ADD_ANSWER:
            /*
            * state = {
            *   qid: {
            *       author: "johndoe",
            *       id: qid,
            *       optionOne:{votes: [], text: "text for option 1"},
            *       optionTwo: {votes: ["sarahedo"], text: "text for option 2"},
            *       timestamp: 129383803803802
            *   }
            * }
            * */
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
