import { useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ReportI,
  ReportsResI,
  ReportResI,
  CreateReportI,
  DecodedI,
  ErrorsI,
} from "../helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

// to get all the reports
export const useReports = () => {
  const axiosPrivate = useAxiosPrivate();
  const reportsQuery = useQuery(["reports"], async (): Promise<ReportsResI> => {
    const { data } = await axiosPrivate.get<ReportsResI>("/reports/");
    return data;
  });
  return reportsQuery;
};


//query to get reports if the are searched through the searchbar
export const useSearchReport = () => {
  const [officer, setOfficer] = useState<string | undefined>("");
  const debouncedFilter = useDebounce(officer!.length > 6, 500);

  const debounceDelay = officer!.length > 5 ? 500 : null;
  const [debouncedOfficerValue] = useDebounce(officer, debounceDelay!);
  const axiosPrivate = useAxiosPrivate();
  const officerReportsQuery = useQuery(
    ["officerReports", debouncedOfficerValue],
    async (): Promise<ReportsResI> => {
      const { data } = await axiosPrivate.get<ReportsResI>(`/reports/`, {
        params: {
          officer: officer,
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
      enabled: !!debouncedOfficerValue,
    }
  );
  return {
    officerReportsQuery,
    officer,
    setOfficer,
  };
};
//query when click in a sepecific report
export const useReport = (reportId:number) => {
  const axiosPrivate = useAxiosPrivate();
  const reportQuery = useQuery(["report", reportId], async()
  :Promise<ReportResI> => {
      console.log(reportId)
      const {data} = await axiosPrivate.get<ReportResI>(`/reports/${reportId}`);
      //tengo que cheacar como llega la respuesta del id para ebvuarka
      console.log(data)
      return data
  },{
      onError:(error)=> {
          if (axios.isAxiosError<ErrorsI, Record<string, unknown>>(error))
          error.message = String(error.response?.data.message)
      }
  }) 
  return reportQuery
}

//query for the officer to create the report
export const useReportMutation = () => {
    const { token } = useContext(UserContext);
    const axiosPrivate = useAxiosPrivate()
    const reports = useQueryClient()
    const decoded:DecodedI = jwt_decode(token);
    const createReport = async(body:CreateReportI):Promise<ReportResI> => {
        const { data } = await axiosPrivate.post<ReportResI>("/reports/", body);   
        return data
    }
    const {mutate, error, isError, isLoading, isSuccess} = useMutation<ReportResI, AxiosError , CreateReportI>(createReport,{
        onSuccess:(data) => {
            reports.refetchQueries({queryKey:["officerReports", decoded.info.username]});
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
};
