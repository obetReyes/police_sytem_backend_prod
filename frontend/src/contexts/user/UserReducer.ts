import { USER_STATE } from "./UserProvider"

type USER_ACTION = {
    type:"setUser"
    payload:boolean
}

type ROLE_ACTION = {
    type:"setRole"
    payload:string
}
type TOKEN_ACTION = {
    type:"setToken"
    payload:string
}

type PERSIST_ACTION = {
    type:"setPersist"
    payload:boolean
}
export const UserReducer = (state:USER_STATE, action:USER_ACTION | ROLE_ACTION | TOKEN_ACTION | PERSIST_ACTION): USER_STATE => {
    switch(action.type){
        case "setUser":
            return{
                ...state,
                user:action.payload
            }
        case "setRole":
            return{
                ...state,
                role:action.payload
            }
        case "setToken":
            return{
                ...state,
                token:action.payload
            }
        case "setPersist":
            return{
                 ...state,
                persist:action.payload
            }
        default :
        return state
    }
}

