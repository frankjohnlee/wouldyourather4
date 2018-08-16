export const ADD_USER = "ADD_USER";

export function recieveUsers(users){
    return {
        type: ADD_USER,
        users: users
    }
}