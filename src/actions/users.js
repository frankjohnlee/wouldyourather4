export const ADD_USER = "ADD_USER";
export const RECIEVE_USER = "RECIEVE_USER";
export function recieveUsers(users){
    return {
        type: ADD_USER,
        users: users
    }
}