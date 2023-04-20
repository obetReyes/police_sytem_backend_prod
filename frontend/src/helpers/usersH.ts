import * as yup from "yup";
export interface UserI {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  group: string;
  role: string;
  location: string | null;
  reports?: number;
  summaries?: number;
}
export interface UsersI {

  id: number;
  name:string;
  createdAt: string;
  updatedAt: string;
  role: string;
  reports?: number;
  summaries?: number;
}
export interface UpdateUserI {
        group?:string,
        username:string,
        role:string
        password?:string

}
export interface UserResI {
        message:UserI
}
export interface UsersResI {
        message:UsersI[]
}
export interface UpdateUsersI{
        message:UsersI
}

export const updateUseSchema = yup.object({
        role:yup.string().min(7, "el rol no puede tener menos de 7  caracteres").max(10, "el rol no puede tener mas de 10 caracteres"),
        password: yup.string().min(8, "la contrasena debe incluir al menos 8 caracteres").max(100,"la contrasena no debe  exceder los 100 caracteres").trim().optional(),
        group:yup.string().min(6, "el nombre de grupo de no puede tener menos de 6 caracteres").max(60, "el nombre de usuario no puede exceder los 60 caracteres").optional()
})