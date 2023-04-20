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
} from "../helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

export  const useUsers = () => {
    const axiosPrivate = useAxiosPrivate();
    const usersQuery = useQuery(["users"], async (): Promise<ReportsResI> => {
      const { data } = await axiosPrivate.get<ReportsResI>("/reports/");
      return data;
    });
    return usersQuery;
}
export const useUser = () => {
    
}

export const useOfficerMutation = () => {

}

export const useDispatcherMutation = () => {

}

export const useUserUpdateMutation = () => {

}