import { useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ReportResI,
  ReportsResI,
  CreateReportI,

  DecodedI,
  ErrorsI,
  UsersResI,
} from "../helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

export  const useUsers = () => {
    const axiosPrivate = useAxiosPrivate();
    const [currentUsers, setCurrentUsers] = useState<number>(25)
    const usersQuery = useQuery(["users"], async (): Promise<UsersResI> => {
      const { data } = await axiosPrivate.get<UsersResI>("/users/", {
        params:{
          starting_after:currentUsers
        }
      });
      return data;
    },{
      keepPreviousData:true
    });
    return {
      currentUsers,
      setCurrentUsers,
      usersQuery
    }
  
}
export const useSearchUser = () => {
  const [searchUser, setSearchUser] = useState<string | undefined>("");
  // debounce delay if the length of searchOfficer state is more than 6 give 500ms
  const debounceDelay = searchUser!.length > 6 ? 500 : null;
  const [debouncedOfficerValue] = useDebounce(searchUser, debounceDelay!);
  const axiosPrivate = useAxiosPrivate();
  const searchOfficerReportsQuery = useQuery(
    ["SearchofficerReports", debouncedOfficerValue],
    async (): Promise<ReportsResI> => {
      const { data } = await axiosPrivate.get<ReportsResI>(`/reports/`, {
        params: {
          officer: searchUser,
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
    searchUser,
    setSearchUser,
  };

}
export const useUser = (userId:number) => {
  const axiosPrivate = useAxiosPrivate();
  const userQuery = useQuery(["user", userId], async()
  :Promise<ReportResI> => {
      console.log(userId)
      const {data} = await axiosPrivate.get<ReportResI>(`/users/${userId}`);
      //tengo que cheacar como llega la respuesta del id para ebvuarka
      console.log(data)
      return data
  },{
  }) 
  return userQuery
}

//create officer
export const useOfficerMutation = () => {

}


//creaate Disptacher
export const useDispatcherMutation = () => {

}

export const useUserUpdateMutation = () => {

}