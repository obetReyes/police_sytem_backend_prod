import { useState, useContext, useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import { DecodedI } from "../helpers";
import jwt_decode from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRecords = <T>(path: string) => {
  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const recordsQuery = useQuery(
    [path, currentPage],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/`, {
        params: {
          limit:25,
          starting_after:currentPage
        },
      });
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
  return {
    currentPage,
    setCurrentPage,
    recordsQuery,
  };
};


export const useSearchRecords = <T>(path: string) => {

  const [param, setParam] = useState<{}>({});


  const axiosPrivate = useAxiosPrivate();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const searchRecordsQuery = useQuery(
    [path, currentPage],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/many`, {
        params:{  
          limit:25,
          starting_after:currentPage,
          ...param}
      });
      console.log(data)
      return data;
      
    },
    {
      //refetchOnWindowFocus option is set to false to prevent the query from refetching
      keepPreviousData:true,
      refetchOnWindowFocus: false,
      retry: 1,
      enabled:Object.keys(param).length > 0 || currentPage > 0, // use enabled flag
      /*enabled:Object.keys(param).length > 0 || currentPage > 0*/
    }
  );
  return {
    currentPage,
    setCurrentPage,
    searchRecordsQuery,
    param,
    setParam,
   
  };
};

export const useRecord = <T>(path: string, id: number) => {
  const axiosPrivate = useAxiosPrivate();
  const recordQuery = useQuery(
    [`${path}`, id],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/${path.slice(0, -1)}/${id}`);
      //tengo que cheacar como llega la respuesta del id para ebvuarka
      console.log(data)
      return data;
    },
    {}
  );
  return recordQuery;
};

export const useRecordMutation = <T, U>(path: string) => {
  const { token } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();
  const records = useQueryClient();
  const decoded: DecodedI = jwt_decode(token);
  const createRecord = async (body: U): Promise<T> => {
    const { data } = await axiosPrivate.post<T>(`/${path}/`, body);
    return data;
  };
  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
    T,
    unknown,
    U
  >(createRecord, {
    onSuccess: (data) => {
      records.refetchQueries({
        queryKey: [`user${path}`, decoded.info.username],
      });
    },
  });
  return {
    mutate,
    error,
    isError,
    isLoading,
    isSuccess,
  };
};
