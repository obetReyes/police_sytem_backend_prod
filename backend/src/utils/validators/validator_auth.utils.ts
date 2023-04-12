import { z } from "zod";
const usernameContraint = z.string().min(6,{message: "el nombre de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"});

const passwordContraint = z.string().min(8,{message: "la contrasena debe incluir al menos 8 caracteres"}).max(100,{message:"la contrasena no debe  exceder los 100 caracteres"}).trim();

const emailContraint = z.string().email({message:"el correo electronico"}).min(8, "es necesario que el correo electronico contenga mas de 8 caracteres").max(250,{message:"el email no puede exceder los 250 caracteres"}).optional();

const cuipContraint = z.string().min(25, {message:"el cuip debe contener 25 carateres"}).max(25,{message:"el cuip debe contener 25 caracteres"}).trim();

const groupContraint = z.string().min(6,{message: "el nombre de grupo de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}).trim();

export const signInValidator = z.object({
    body: z.object({
        username:usernameContraint,
        password:passwordContraint
    }).strict("los unicos campos disponibles son: username y password")
});

export const signUpOfficerValidator = z.object({
    body:z.object({
        username:usernameContraint,
        email:emailContraint,
        password:passwordContraint,
        cuip:cuipContraint,
        group:groupContraint
    }).strict("los unicos campos disponibles son: username, email, password, cuip y group")
});

export const signUpValidator = z.object({
    body:z.object({
        username:usernameContraint,
        email:emailContraint,
        password:passwordContraint,
        cuip:cuipContraint,
    }).strict("los unicos campos disposibles son: username, email, password y cuip")
});
