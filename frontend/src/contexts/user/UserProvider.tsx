import {useReducer} from 'react'
import { UserContext } from './UserContext'
import { UserReducer } from './UserReducer'

interface PROPS{
  children: JSX.Element | JSX.Element[]
}
export interface USER_STATE{
    user:boolean
    role:string
    token:string
    persist:boolean
} 
const INITIAL_STATE:USER_STATE = {
  user:false,
  role:"",
  token:"",
  persist:false
}
export const UserProvider = ({children}:PROPS) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE )
  
  
  const setUser = (user:boolean) => {
    dispatch({type:"setUser", payload:user})
  }
  const setRole = (role:string) => {
    dispatch({type:"setRole", payload:role})
  }
  const setToken = (token:string) => {
    dispatch({type:"setToken", payload:token})
  }
  
  const setPersist = (persist:boolean) => {
    dispatch({type:"setPersist", payload:persist})
  }
  
  return (
      <UserContext.Provider value={{...state, setUser, setRole, setToken, setPersist}}>
          {children}
      </UserContext.Provider>
  )
}
