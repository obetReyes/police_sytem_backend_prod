import { z } from "zod";
const usernameContraint = z.string().min(6,{message: "el nombre de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"});


export const userValidator = z.object({
    params:z.object({
        username:usernameContraint
    }).strict("el unico parametro disponible es: el nombre de usuario")
});