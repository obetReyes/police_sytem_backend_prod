import { useRecordUpdateMutation } from "../../../hooks";
import { UpdateGroupI, GroupResI, updateGroupSchema, ErrorsI, GroupActionResI } from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";


interface Props{
    groupId:number
    groupName:string
} 
export const GroupUpdateModal = ({groupId, groupName}:Props) => {
    const {mutate, error, isError, isLoading} = useRecordUpdateMutation<GroupActionResI, UpdateGroupI>("groups", groupId);
    const [isModal, setIsModal] = useState<boolean>(false);
    
    useEffect(() => {
      setValue("name", groupName); // Move the setValue call inside the useEffect hook
    }, []);
  
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<UpdateGroupI>({
      mode: "onSubmit",
      resolver: yupResolver(updateGroupSchema),
    });
    const onSubmit = handleSubmit(async (data, e) => {
      mutate(data, {
        onSettled: () => {
          reset();
        },
        onError: (error) => {
          console.log(error);
        }
      });
    
      setIsModal(false);
    });

    // common styles
  const inputStyles =
  "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent";
const errorStyles = "absolute  text-sm  text-error font-semibold underline";
  return (
        <div className="float-right">
      <label htmlFor="myModalGroups" className="btn" onClick={() => setIsModal(true)}>
       modificar grupo
      </label>
      {isModal &&
<>
      <input type="checkbox" id="myModalGroups" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="myModalGroups"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsModal(false)} >
            ✕
          </label>
          <h3 className="font-bold text-lg">modificar el grupo</h3>
          <form onSubmit={onSubmit}>

            <div className="pb-4">
              <label htmlFor="groupNameInput" className="sr-only">
              Nuevo  Nombre Del Grupo
              </label>
  

              <div className="relative">
                <input
                  type="text"
                  id="newGroupNameInput"
                  className={inputStyles}
                  placeholder=" Nuevo  Nombre Del Grupo"
                  autoComplete="off"
                  {...register("newName")}
                />
              </div>
              {errors.newName ? <p className={errorStyles}>{errors.newName?.message}</p> : null}
            </div>

            <div className="pb-4">
              <label htmlFor="operationsAreaInput" className="sr-only">
                Actualizar Area de Operaciones
              </label>

              <div className="relative">
                <input
                type="text"
                  id="newOperationsAreaInput"
                  className={inputStyles}
                  placeholder="  Actualizar Area de Operaciones"
                  autoComplete="off"
                  {...register("area")}
                />
              </div>
              {errors.area ? <p className={errorStyles}>{errors.area?.message}</p> : null}
            </div>
            {isLoading ? <span className="loader"></span> :
  
      <input  className=" btn float-right" type='submit'value="actualizar grupo"></input>
    }
          </form>
        </div>
        {isError ? <p className={`${errorStyles} pt-4`}>{`${(error as ErrorsI).response.data.message}`}</p> : null}
      </div>
      </>
    }
    </div>
  )
}