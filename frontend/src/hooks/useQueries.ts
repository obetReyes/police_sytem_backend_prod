import { useState, useContext } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import { DecodedI } from "../helpers";
import jwt_decode from "jwt-decode";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useRecords = <T>(path:string) => {
    const axiosPrivate = useAxiosPrivate();
    const [currentPage, setCurrentPage] = useState<number>(25);
    const recordsQuery = useQuery([path, currentPage],
    async():Promise<T> => {
        const { data } = await axiosPrivate.get<T>(`/${path}/`,{
            params:{
              starting_after:currentPage,
            }
          });
          return data;
        },{
          keepPreviousData:true
    });
    return {
        currentPage,
        setCurrentPage,
        recordsQuery
    }
};

export const useUserRecord = <T> (path:string) => {
    const axiosPrivate = useAxiosPrivate();  
    const [currentPage, setCurrentPage] = useState<number>(25);
    const {token} = useContext(UserContext);
    const decoded: DecodedI = jwt_decode(token);
    const userRecordQuery = useQuery([`user${path}`, decoded.info.username, currentPage], async():Promise<T> => {
        const {data} = await axiosPrivate.get<T>(`/${path}/`,{
            params:{
              starting_after:currentPage,
              officer:decoded.info.username
            },
          })
          return data;
        },{
          keepPreviousData:true
    });
    return{
        currentPage,
        setCurrentPage,
        userRecordQuery
    }

} 

export const useSearchRecords = <T>(path:string) => {
    const [searchRecords, setSearchRecords] = useState<string | undefined> ("")
    // debounce delay if the length of searchOfficer state is more than 6 give 500ms
  const debounceDelay = searchRecords!.length > 6 ? 500 : null;
  const [debouncedRecordsValue] = useDebounce(searchRecords, debounceDelay!);
  const axiosPrivate = useAxiosPrivate();
  const searchRecordsQuery = useQuery(
    [`searchRecords${path}`, debouncedRecordsValue],
    async (): Promise<T> => {
      const { data } = await axiosPrivate.get<T>(`/${path}/`, {
        params: {
          officer: searchRecords,
        },
      });
      return data;
    },
    {
      //refetchOnWindowFocus option is set to false to prevent the query from refetching 
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !!debouncedRecordsValue,
    }
  );
  return{
    searchRecordsQuery,
    searchRecords,
    setSearchRecords
  }
} 

export const useRecord = <T>(path:string, id:number) => {
    const axiosPrivate = useAxiosPrivate();
    const recordQuery = useQuery([`${path}`, id], async()
  :Promise<T> => {
      
      const {data} = await axiosPrivate.get<T>(`/${path}/${id}`);
      //tengo que cheacar como llega la respuesta del id para ebvuarka
      
      return data
  },{
  }) 
  return recordQuery
}