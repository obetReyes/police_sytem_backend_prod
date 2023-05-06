import { useRecordMutation } from '../../../hooks'
import { SignUpOfficerI, SignUpI, signUpOfficerSchema, signUpSchema, UserResI} from '../../../helpers'
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
export const UsersModal = () => {


  const {mutate:DispatcherMutation, error:errorDispatcher, isError:IsErrorDispatcher, isLoading:isLoadingDisptacher} = useRecordMutation<UserResI, SignUpI>("auth/signup-officer", "");
  const {mutate:OfficerMutation, error:errorOfficer, isError:isErrorOfficer, isLoading:isLoadingOfficer} = useRecordMutation<UserResI, SignUpOfficerI>("auth/signup-officer", "");

  const [isOfficer, setIsOfficer] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpOfficerI | SignUpI>({
    mode: "onSubmit",
    resolver: yupResolver(signUpOfficerSchema),
  });

  const onSubmit = handleSubmit(async(data,e) => {
    
    if(isOfficer && "group" in data)
  {
    OfficerMutation(data,{
      onSettled:() => {
        data.username = ""
        data.group = ""
        data.cuip = ""
        data.password = ""
        data.password2 = ""
      }
    })
    
     }else{
        DispatcherMutation(data,{
          onSettled:() =>{
            data.username = ""
            data.cuip = ""
            data.password = ""
            data.password2 = ""
          }
        })
     }
     e?.target.reset()
     reset()
     setIsModal(false)
  }
  )
  
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"

  return (
    <>
<label htmlFor="myModalUsers" className="btn" onClick={() => setIsModal(true)}>crear Agente</label>
{isModal &&
<>
<input type="checkbox" id="myModalUsers" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalUsers" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsModal(false)} >
          ✕</label>
    <h3 className="font-bold text-lg">Nuevo Agente</h3>
    <form onSubmit={onSubmit}>
  <label htmlFor="name" className="sr-only">Nombre</label>
  <div className="my-4">
  <div className="relative">
    <input
    id="name"
      type="text"
      className={inputStyles}
      placeholder="Nombre"
      autoComplete="off"
      {...register("username")}
     //register goes here
    />
  </div>
  </div>

  <div className="pb-4">
  <label htmlFor="passwordInput" className="sr-only">Contraseña</label>
  
  <div className="relative">
    <input
    id="PasswordInput"
    type='password'
      className={inputStyles}
      placeholder="Contraseña"
      autoComplete="off"
      {...register("password")}
     //register goes here
    />
    </div>
    </div>

  <div className="pb-4">
  <label htmlFor="passwordInput" className="sr-only">Confirmar Contraseña</label>
  
  <div className="relative">
    <input
    id="PasswordInput"
    type='password'
      className={inputStyles}
      placeholder="Confirmar Contraseña"
      autoComplete="off"
      {...register("password2")}
     //register goes here
    />
    </div>
    </div>

    <div className='pb-4'>
    <label htmlFor="functionInput" className="sr-only">Funcion</label>
  
  <div className="relative">
  <select
    id="functionInput"
      className="select select-bordered  w-full"
      placeholder="Funcion"
      autoComplete="off"
      onChange={(event) => {
          if(event.target.value == "OFFICER"){
                setIsOfficer(true)
          }
      }}
     >   <option disabled selected>Elegir una funcion</option>
        <option value="DISPATCHER">Operador 911</option>
      <option value="OFFICER">Oficial</option>
    </select>
    </div>
    </div>

    <div className='pb-4'>
    <label htmlFor="cuipInput" className="sr-only">Cuip</label>
  
  <div className="relative">
  <input
    id="cuipInput"
      className={inputStyles}
      placeholder="Cuip"
      autoComplete="off"
      {...register("cuip")}
     //register goes here
    />
    </div>
    </div>

    {/* check if fucntion is seelected as oficial show group is dispatcher does not show it */}
    
    <div className='pb-4'>
    <label htmlFor="GroupInput" className="sr-only">Grupo</label>
  
  <div className="relative">
  <select
    id="functionInput"
      className="select select-bordered  w-full"
      placeholder="Funcion"
      autoComplete="off"
     >   <option disabled selected>Elegir un grupo</option>
        <option value="DISPATCHER">Operador 911</option>
      <option value="OFFICER">Oficial</option>
    </select>
    </div>
    </div>

    <input type='submit' className='btn float-right' value="crear agente"></input>
    </form>
    <div className="modal-action">
    </div>
  </div>
</div>
</>}
</>
  )
}
