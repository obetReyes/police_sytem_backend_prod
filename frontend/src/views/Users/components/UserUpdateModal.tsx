import {useState, useEffect} from "react";
import { useRecordUpdateMutation } from "../../../hooks";
import {
  UpdateUserI,
  updateUserSchema,
  UsersI,
  UserResI,
} from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface Props{
  userId:string
  groupName:string
} 

export const UserUpdateModal = ({userId}:Props) => {
  const { mutate, error, isError, isLoading, isSuccess } =
    useRecordUpdateMutation<UserResI, UpdateUserI>("users", userId);
    const [isModal, setIsModal] = useState<boolean>(false);

    useEffect(() => {
      setValue("username", userId); // Move the setValue call inside the useEffect hook
    }, []);
  

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<UpdateUserI>({
      mode: "onSubmit",
      resolver: yupResolver(updateUserSchema),
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

    const inputStyles =
    "w-full rounded-lg rounded-sm border-gray-300 p-4 pr-12 text-sm text-warning shadow-sm focus:border-zinc-800 focus:ring-transparent";
  const errorStyles = "absolute  text-sm  text-error font-semibold underline";
  
};
