import * as yup from "yup";


export interface SignInI{
    username:string
    password:string
}
export interface SignInResI{
    field: string,
    details: {
        token:string
        role: string
    }
}
