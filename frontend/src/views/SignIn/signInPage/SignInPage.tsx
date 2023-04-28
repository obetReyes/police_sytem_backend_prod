
/* login page, the  form is using yup validator and react hook form if 
the user has a valid credentials he can access other screens otherwise
he is not allowed (react hook form does the validation job and yup is used as resolver for more info see the react hook form
docs, the auth context is used to trigger authorization states across the app
)
*/

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInI, signInSchema } from "../../../helpers";
import { useSignInMutation } from "../../../hooks";
import { ErrorsI } from "../../../helpers";

export const SignInPage = () => {
  const {mutate, error, isError, isLoading} =  useSignInMutation()

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInI>({
    mode: "onSubmit",
    resolver: yupResolver(signInSchema),
  });
  
  

  const onSubmit = handleSubmit(async(data,e) => {
    mutate(data,
      {
        onSettled:() => {
          
          data.username = ""
          data.password = ""
          
          e?.target.reset
        }
      })
    
    e?.target.reset()
  })
 
 // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"

 
  return (
  
  <div className=" mx-auto flex flex-col  justify-center w-full h-screen px-4 py-16 sm:px-6 lg:px-8 ">
    <div>
    <div className="mx-auto max-w-xl text-primary-content">
      <h3 className="text-xl font-bold sm:text-3xl text-center">INGRESO</h3>
    </div>
    
    <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4" onSubmit={onSubmit}>
      <div className="pb-4">
        <label htmlFor="email" className="sr-only">Nombre De Usuario</label>
  
        <div className="relative">
          <input
            type="text"
            placeholder="nombre de usuario"
            className={inputStyles}
            {...register("username")} 
          />
  
         
        </div>
        {errors.username ? <p className={errorStyles}>{errors.username?.message}</p> : null}
      </div>
  
      <div className="pb-4">
        <label htmlFor="password" className="sr-only">Contraseña</label>
  
        <div className="relative">
          <input
            type="password"
            className={inputStyles}
            placeholder="Contraseña"
            {...register("password")}  autoComplete="off" 
          />
        </div>
        {errors.password ? <p className={errorStyles}>{errors.password?.message}</p> : null}
      </div>
  
      <div className="float-right">
      {isLoading ? <span className="loader"></span>: 
        <button
          type="submit"
          className="inline-block rounded-lg bg-base-200 hover:bg-base-300 px-5 py-3 text-sm font-medium"
        >
          iniciar Sesion
        </button>
  }
      </div>
       
      {isError ? <p  className={`${errorStyles} pt-4`}>{`${(error as ErrorsI).response.data.message}`}</p> : null}
    </form>
    

  </div>
  </div>
  
  );
};
