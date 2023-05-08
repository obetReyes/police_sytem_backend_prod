import * as yup from "yup";


export interface SignUpI{
    username:string
    password:string
    password2?:string
    cuip:string
}

export interface SignUpOfficerI{
    username:string
    password:string
    password2?:string
    cuip:string
    group?:string
}

export const signUpSchema = yup.object({
    username:yup.string().min(6, "el nombre de usuario no puede ser tan corto").max(30, "el nombre de usuario no puede tener mas de 30 caracteres").required("necesitas ingresar un nombre de usuario").matches(/^(\d|\w)+$/,"el nombre de usuario no puede contener espacios o caracteres especiales"),
    password:yup.string().trim("tu contrasena no puede contener espacios").min(6,"la contrasena no puede ser tan corta").max(60, "la contrasena no puede ser tan larga").required("la contrasena es requerida"),
    password2: yup.string()
     .oneOf([yup.ref('password')], 'las contrasenas no coinciden'),
    cuip:yup.string().trim().min(25,"el cuip debe contener 25 caracteres").max(25, "el cuip debe contener 25 caracteres").required("necesitas introducir tu cuip").matches(/^(\d|\w)+$/,"el cuip no es valido")
}).required("el formulario no puede estar vacio")


export const signUpOfficerSchema = yup.object({
    group:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").required("el nombre del grupo es requerido").optional(),
    username:yup.string().trim().min(6, "el nombre de usuario no puede ser tan corto").max(30, "el nombre de usuario no puede tener mas de 30 caracteres").required("necesitas ingresar un nombre de usuario").matches(/^(\d|\w)+$/,"el nombre de usuario no puede contener espacios o caracteres especiales"),
    password:yup.string().trim("tu contrasena no puede contener espacios").min(6,"la contrasena no puede ser tan corta").max(60, "la contrasena no puede ser tan larga").required("la contrasena es requerida"),
    password2: yup.string()
     .oneOf([yup.ref('password')], 'las contrasenas no coinciden'),
    cuip:yup.string().trim().min(25,"el cuip debe contener 25 caracteres").max(25, "el cuip debe contener 25 caracteres").required("necesitas introducir tu cuip").matches(/^(\d|\w)+$/,"el cuip no es valido")
})