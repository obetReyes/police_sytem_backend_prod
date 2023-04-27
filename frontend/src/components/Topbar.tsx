import React, { useContext } from 'react'
import {useForm} from "react-hook-form"


import { UserContext } from '../contexts'
interface Props{
    setSearchRecords:(value: React.SetStateAction<string | undefined>) => void
    allowedRole:string
    modal:JSX.Element
    setParam:React.Dispatch<React.SetStateAction<{}>>
    setSubmit:React.Dispatch<React.SetStateAction<boolean>>
}

export const Topbar = ({setSearchRecords, allowedRole, modal, setParam, setSubmit}:Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",

  });
  const onSubmit = handleSubmit(async(data, e) => {
    setParam(data.param)
    setSearchRecords(data.searchRecords)
    setSubmit(true)
    
  })
  const {role} = useContext(UserContext);
  return (
    <div className="h-20 my-6 flex justify-around md:w-10/12 lg:w-8/12 items-center">
      <form className='flex items-center gap-4' onSubmit={() => setSubmit(true)}>
      <input
            autoComplete="off"
            type="text"
            placeholder="barra de busqueda"
            
            className="input  input-bordered mx-auto w-[25rem]"
            {...register("searchRecords")}
          

        />
        <select id="param" {...register("param")}  className="select select-bordered " name="param" >

        <option disabled selected> elige una opcion de busqueda</option>
  <option value="officer">oficial</option>
  <option value="event">suceso</option>
</select>
<input 
  className='btn btn-outline'
  type='submit'
  value="buscar"
/>
      </form>
          {allowedRole == role && modal}
    </div>
  )
}
