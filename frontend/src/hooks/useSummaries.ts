import { useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  DecodedI,
  ErrorsI,
  SummariesResI,
  SummaryResI,
  CreateSummaryI,
} from "../helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

export  const useSummaries = () => {
    const axiosPrivate = useAxiosPrivate();
    const summariesQuery = useQuery(["reports"], async (): Promise<SummariesResI> => {
      const { data } = await axiosPrivate.get<SummariesResI>("/reports/");
      return data;
    });
    return summariesQuery;
}
export const useSearchSummary = () => {
    const [dispatcher, setDispatcher] = useState<string | undefined>("");
    const debouncedFilter = useDebounce(dispatcher!.length > 6, 500);
  
    const debounceDelay = dispatcher!.length > 5 ? 500 : null;
    const [debouncedDispatcherValue] = useDebounce(dispatcher, debounceDelay!);
    const axiosPrivate = useAxiosPrivate();
    const dispatcherSummariesQuery = useQuery(
      ["dispatcherSummaries", debouncedDispatcherValue],
      async (): Promise<SummariesResI> => {
        const { data } = await axiosPrivate.get<SummariesResI>(`/summaries/`, {
          params: {
            dispatcher: dispatcher,
          },
        });
        console.log(data);
        return data;
      },
      {
        refetchOnWindowFocus: false,
        retry: 1,
        onError(error) {
          if (axios.isAxiosError<ErrorsI, Record<string, unknown>>(error)) {
            error.message = String(error.response?.data.message);
          }
        },
        enabled: !!debouncedDispatcherValue,
      }
    );
    return {
    dispatcherSummariesQuery,
    dispatcher,
    setDispatcher
    };
}
export const useSummary = (id:number) => {
    const axiosPrivate = useAxiosPrivate();
    const summaryQuery = useQuery(["summary", id], async()
    :Promise<SummaryResI> => {
        console.log(id)
        const {data} = await axiosPrivate.get<SummaryResI>(`/summaries/${id}`);
        //tengo que cheacar como llega la respuesta del id para ebvuarka
        console.log(data)
        return data
    },{
        onError:(error)=> {
            if (axios.isAxiosError<ErrorsI, Record<string, unknown>>(error))
            error.message = String(error.response?.data.message)
        }
    }) 
    return summaryQuery
}

export const useSummaryMutation = () => {
 const { token } = useContext(UserContext);
    const axiosPrivate = useAxiosPrivate()
    const summaries = useQueryClient()
    const decoded:DecodedI = jwt_decode(token);
    const createReport = async(body:CreateSummaryI):Promise<SummaryResI> => {
        const { data } = await axiosPrivate.post<SummaryResI>("/summaries/", body);   
        return data
    }
    const {mutate, error, isError, isLoading, isSuccess} = useMutation<SummaryResI, AxiosError , CreateSummaryI>(createReport,{
        onSuccess:(data) => {
            summaries.refetchQueries({queryKey:["dispatcherSummaries", decoded.info.username]});
        },
        onError:(error) => {
            if (axios.isAxiosError<ErrorsI,Record<string, unknown>>(error)) {
                error.message = String(error.response?.data.message)
                // Do something with this error...
            } 
            if(error.code == "ERR_NETWORK"){
                error.message = "no se puedo establecer conexion con el servidor"
            }
            return error.message
        }, 
    })
    return{
        mutate,
        error,
        isError,
        isLoading,
        isSuccess,
    }
}