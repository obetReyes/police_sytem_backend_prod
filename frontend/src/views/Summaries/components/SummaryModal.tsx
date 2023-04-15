import React from 'react'

export const SummaryModal = () => {
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"

  return (
    <>
<label htmlFor="my-modal-6" className="btn">crear sumario</label>

<input type="checkbox" id="my-modal-6" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="font-bold text-lg">Nuevo Sumario</h3>
    <form>
  <label htmlFor="event" className="sr-only">Suceso</label>
  <div className="my-4">
  <div className="relative">
    <input
    id="event"
      type="text"
      className={inputStyles}
      placeholder="Suceso"
      autoComplete="off"
     //register goes here
    />
  </div>
  </div>

  <div className="pb-4">
  <label htmlFor="actions" className="sr-only">Acciones Tomadas</label>
  
  <div className="relative">
    <textarea
    id="actions"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="Acciones Tomadas"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>
    
    <div className='pb-4'>
    <label htmlFor="sucessSumary" className="sr-only">Resumen Del Suceso</label>
  
  <div className="relative">
  <textarea
    id="sucessSumary"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="Resumen Del Suceso"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>

    <input type='submit' className='btn float-right' value="crear sumario"></input>
    </form>
    <div className="modal-action">
    </div>
  </div>
</div>
</>
  )
}
