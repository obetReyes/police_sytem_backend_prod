import * as yup from "yup";


export interface SignUpI{
    username:string
    email?:string
    password:string
    password2?:string
    cuip:string
    group?:string
}