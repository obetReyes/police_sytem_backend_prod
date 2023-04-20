import {z} from "zod";
const nameContraint =  z.string().min(6,{message: "el nombre de grupo de no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"}
);

const areaContraint = z.string().min(8, {message:"el area asignada no puede ser menor a 8 caracteres"}).max(120,
{message:"el area asignada no puede ser menor a 120 caracteres"}
);

const usernameContraint = z.string().min(6,{message: "el nombre de usuario no puede tener menos de 6 caracteres"}).max(60, {message:"el nombre de usuario no puede exceder los 60 caracteres"});

export const groupParamsValidator = z.object({
    params:z.object({
        group:nameContraint
    }).strict("el unico parametro disponible es: el nombre del grupo")
});

export const groupUpdateValidator = z.object({
    body:z.object({
        name:nameContraint,
        newName:nameContraint,
        area:areaContraint
    }).strict("los unicos campos disponibles son: name, newName y area")
});
export const groupValidator = z.object({
    body:z.object({
        name:nameContraint,
        area:areaContraint
    }).strict("los unicos campos disponibles son name y area")
});
