import { useRecordMutation } from "../../../hooks";
import { CreateReportI, ReportResI, createReportSchema } from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { ErrorsI } from "../../../helpers";



export const ReportModal = () => {
  const {mutate, error, isError, isLoading} = useRecordMutation<ReportResI, CreateReportI>("reports");
  const [isModal, setIsModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportI>({
    mode: "onSubmit",
    resolver: yupResolver(createReportSchema),
  });

  const onSubmit = handleSubmit(async(data,e) => {
    mutate(data,{
      onSettled:() => {
        data.event = ""
        data.actions = ""
        data.summary = ""
        e?.target.reset()
      }
    })
    setIsModal(false)
  })
  
   // common styles 
 const inputStyles = "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent"
 const errorStyles = "absolute  text-sm  text-error font-semibold underline"

  return (
    <>
<label htmlFor="myModalReport" className="btn" onClick={() => setIsModal(true)}>crear reporte</label>
{isModal &&
<>

<input type="checkbox" id="myModalReport" className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative">
  <label htmlFor="myModalReport" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsModal(false)}>✕</label>
    <h3 className="font-bold text-lg">Nuevo Reporte</h3>
    <div className="modal-action">
    <form onSubmit={onSubmit}>
  <label htmlFor="eventInput" className="sr-only">Suceso</label>
  <div className="my-6">
  <div className="relative">
    <input
    id="eventInput"
      type="text"
      className={inputStyles}
      placeholder="Suceso"
      autoComplete="off"
      {...register("event")}
    />
  </div>
  {errors.event ? <p className={errorStyles}>{errors.event?.message}</p> : null}
  </div>

  <div className="pb-6">
  <label htmlFor="actionsInput" className="sr-only">Acciones Tomadas</label>
  
  <div className="relative">
    <textarea
    id="actionsInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="Acciones Tomadas"
      autoComplete="off"
      {...register("actions")}
    />
    </div>
    {errors.actions ? <p className={errorStyles}>{errors.actions?.message}</p> : null}
    </div>
    
    <div className='pb-6'>
    <label htmlFor="sucessSumaryInput" className="sr-only">Resumen Del Suceso</label>
  
  <div className="relative">
  <textarea
    id="sucessSumaryInput"
    rows={4} 
    cols={50}
      className={inputStyles}
      placeholder="Resumen Del Suceso"
      autoComplete="off"
     {...register("summary")}
    />
    </div>
    {errors.summary ? <p className={errorStyles}>{errors.summary?.message}</p> : null}
    </div>
    {isLoading ? <span className="loader"></span> :
  
      <input  className=" btn float-right" type='submit'value="crear reporte"></input>
    }
    </form>
    </div>
  

    {isError ? <p className={`${errorStyles} pt-4`}>{`${(error as ErrorsI).response.data.message}`}</p> : null}
  </div>
</div>
</>
}
</>
  )
}
