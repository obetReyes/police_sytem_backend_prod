import { z } from "zod";
const usernameContraint = z.string().min(6,{message: "el nombre de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"});


export const userValidator = z.object({
    params:z.object({
        username:usernameContraint
    }).strict("el unico parametro disponible es: el nombre de usuario")
});

export const userUpdateValidator = z.object({
    body:z.object({
        username:z.string().min(6,{message: "el nombre de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}),
        role:z.string().min(7,{message: "el rol no puede tener menos de 7  caracteres"}).max(10, {message:"el rol no puede tener mas de 10 caracteres"}),
        password: z.string().min(8,{message: "la contrasena debe incluir al menos 8 caracteres"}).max(100,{message:"la contrasena no debe  exceder los 100 caracteres"}).trim().optional(),
        group:z.string().min(6,{message: "el nombre de grupo de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}).optional()
    })
});