import React from 'react'

export const UsersModal = () => {
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"

  return (
    <>
<label htmlFor="myModalUsers" className="btn">crear Agente</label>

<input type="checkbox" id="myModalUsers" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalUsers" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="font-bold text-lg">Nuevo Agente</h3>
    <form>
  <label htmlFor="name" className="sr-only">Nombre</label>
  <div className="my-4">
  <div className="relative">
    <input
    id="name"
      type="text"
      className={inputStyles}
      placeholder="Nombre"
      autoComplete="off"
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
</>
  )
}
