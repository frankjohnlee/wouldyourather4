import { _getUsers, _getQuestions} from "../utils/_DATA";
import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers} from "./users";
import { setAuthedUser } from "./authedUser";

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData(){
    return (dispatch) => {
        return getInitialData().then(({users, questions})=>{
            dispatch(receiveQuestions(questions));
            dispatch(receiveUsers(users));
            dispatch(setAuthedUser(AUTHED_ID));
        })
    }

}