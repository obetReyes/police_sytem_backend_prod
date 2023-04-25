import { useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
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
import { useRecords } from "./useQueries";

// to get all the reports
export const useReports = () => {
  const {currentPage, setCurrentPage, recordsQuery} = useRecords<ReportResI>("reports")

};

export const useOfficerReports = () => {
    const axiosPrivate = useAxiosPrivate();
    const [currentOfReports, setCurrentOfReports] = useState<number>(25)

    const {token} = useContext(UserContext);
    const decoded: DecodedI = jwt_decode(token);
    const officerReportsQuery = useQuery(["officerReports", decoded.info.username, currentOfReports], async():Promise<ReportsResI> => {
      const {data} = await axiosPrivate.get<ReportsResI>(`/reports/`,{
        params:{
          starting_after:currentOfReports,
          officer:decoded.info.username
        },
      })
      console.log(data)
      return data;
    },{
      keepPreviousData:true
    })
    return {
      officerReportsQuery,
      currentOfReports,
      setCurrentOfReports
    }
}

//query to get reports if the are searched through the searchbar
export const useSearchReport = () => {
  const [searchOfficer, setSearchOfficer] = useState<string | undefined>("");
  // debounce delay if the length of searchOfficer state is more than 6 give 500ms
  const debounceDelay = searchOfficer!.length > 6 ? 500 : null;
  const [debouncedOfficerValue] = useDebounce(searchOfficer, debounceDelay!);
  const axiosPrivate = useAxiosPrivate();
  const searchOfficerReportsQuery = useQuery(
    ["SearchofficerReports", debouncedOfficerValue],
    async (): Promise<ReportsResI> => {
      const { data } = await axiosPrivate.get<ReportsResI>(`/reports/`, {
        params: {
          officer: searchOfficer,
        },
      });
      console.log(data);
      return data;
    },
    {
      //refetchOnWindowFocus option is set to false to prevent the query from refetching 
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !!debouncedOfficerValue,
    }
  );
  return {
    searchOfficerReportsQuery,
    searchOfficer,
    setSearchOfficer,
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
  
    })
    return{
        mutate,
        error,
        isError,
        isLoading,
        isSuccess,
        
    }
};
