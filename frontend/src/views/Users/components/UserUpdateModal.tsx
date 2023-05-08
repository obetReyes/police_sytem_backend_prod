import {useState, useEffect} from "react";
import { useRecordUpdateMutation } from "../../../hooks";
import {
  UpdateUserI,
  updateUserSchema,
  ErrorsI,
  UserResI,
} from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface Props{
  userId:string
  role:string
} 

export const UserUpdateModal = ({userId, role}:Props) => {
  const { mutate, error, isError, isLoading, isSuccess } =
    useRecordUpdateMutation<UserResI, UpdateUserI>("users", userId);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [currentRole, setCurrentRole] = useState<string>(""); // Add a state to hold the current role
    useEffect(() => {
      setValue("username", userId); // Move the setValue call inside the useEffect hook
    }, []);
  

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      getValues,
      formState: { errors },
    } = useForm<UpdateUserI>({
      mode: "onSubmit",
      resolver: yupResolver(updateUserSchema),
    });

    useEffect(() => {
      // Update the current role when the form values change
      setCurrentRole(getValues("role"));
      if(role == "OFFICER"){
        setCurrentRole("OFFICER")
      }
    }, [getValues]);

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

    const inputStyles =
    "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent";
  const errorStyles = "absolute  text-sm  text-error font-semibold underline";
  return(
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
            <label htmlFor="newRoleInput" className="sr-only">
            cambiar funcion del agente
            </label>


            <div className="relative">
              <input
                type="text"
                id="newRoleInput"
                className={inputStyles}
                placeholder=" cambiar funcion del agente"
                autoComplete="off"
                {...register("role")}
              />
            </div>
            {errors.role ? <p className={errorStyles}>{errors.role?.message}</p> : null}
          </div>
        {currentRole  == "OFFICER"  && 
          <div className="pb-4">
            <label htmlFor="newGroupInput" className="sr-only">
             asignar un grupo al oficial
            </label>
            <div className="relative">
              <input
              type="text"
                id="newGroupInput"
                className={inputStyles}
                placeholder="  Actualizar Area de Operaciones"
                autoComplete="off"
                {...register("group")}
              />
            </div>
            {errors.group ? <p className={errorStyles}>{errors.group?.message}</p> : null}
          </div>
        }
            
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
};
