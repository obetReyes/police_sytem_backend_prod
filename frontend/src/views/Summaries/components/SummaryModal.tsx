import React from 'react'

export const SummaryModal = () => {
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"
  return (
    <>
<label htmlFor="myModalSummary" className="btn">crear sumario</label>

<input type="checkbox" id="myModalSummary" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalSummary" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="font-bold text-lg">Nuevo Sumario</h3>
    <form>
  <label htmlFor="callTimeInput" className="sr-only">duracion de la llamada</label>
  <div className="my-4">
  <div className="relative">
    <input
    id="callTimeInput"
      type="text"
      className={inputStyles}
      placeholder="duracion de la llamada"
      autoComplete="off"
     //register goes here
    />
  </div>
  </div>

  <div className="pb-4">
  <label htmlFor="requestorInput" className="sr-only">Solicitante</label>
  
  <div className="relative">
    <input
    type='text'
    id="requestorInput"
      className={inputStyles}
      placeholder="Solicitante"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>
    


    <div className='pb-4'>
    <label htmlFor="incidentInput" className="sr-only">incidente o suceso</label>
  
  <div className="relative">
  <textarea
    id="incidentInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="incidente o suceso"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>

    
    <div className='pb-4'>
    <label htmlFor="locationInput" className="sr-only">ubicación</label>
  
  <div className="relative">
  <textarea
    id="locationInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="ubicación"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>
    <div className='pb-4'>
    <label htmlFor="notesInput" className="sr-only">notas</label>
  
  <div className="relative">
  <textarea
    id="notesInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="notas"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>

    <div className='pb-4'>
    <label htmlFor="phoneNumberInput" className="sr-only">numero de contacto</label>
  
  <div className="relative">
  <input
  type='text'
    id="phoneNumberInput"
      className={inputStyles}
      placeholder="numero de contacto"
      autoComplete="off"
     //register goes here
    />
    </div>
    </div>
    <input type='submit' className='btn float-right' value="crear sumario"></input>
    </form>
    </div>
</div>
</>
  )
}
