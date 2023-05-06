import { useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { GlobalResI, } from "../helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";




//create officer
export const useUsersMutation = <T, U,X>(path:string) => {
  const axiosPrivate = useAxiosPrivate();
  const createUser = async (body: U): Promise<T> => {
    const { data } = await axiosPrivate.post<T>(`auth/${path}/`, body);
    return data;
  };

  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
  T,
  unknown,
  U
>(createUser);
return {
  mutate,
  error,
  isError,
  isLoading,
  isSuccess,
};
}


//creaate Disptacher
export const useDispatcherMutation = () => {

}

export const useUserUpdateMutation = () => {

}