import { useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
GroupResI,
GroupsResI,
  DecodedI,
  ErrorsI,
  GroupActionResI,
  UpdateGroupI,
  CreateGroupI,
} from "../helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { UserContext } from "../contexts";
import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
export  const useGroups = () => {
const axiosPrivate = useAxiosPrivate();
  const reportsQuery = useQuery(["reports"], async (): Promise<GroupsResI> => {
    const { data } = await axiosPrivate.get<GroupsResI>("/groups/");
    return data;
  });
  return reportsQuery;
}
export const useSearchGroup = () => {
    const [group, setgroup] = useState<string | undefined>("");
    const debouncedFilter = useDebounce(group!.length > 6, 500);
  
    const debounceDelay = group!.length > 5 ? 500 : null;
    const [debouncedGroupValue] = useDebounce(group, debounceDelay!);
    const axiosPrivate = useAxiosPrivate();
    const officerReportsQuery = useQuery(
      ["agentGroup", debouncedGroupValue],
      async (): Promise<GroupsResI> => {
        const { data } = await axiosPrivate.get<GroupsResI>(`/groups/`, {
          params: {
            group:group,
          },
        });
        console.log(data);
        return data;
      },
      {
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: !!debouncedGroupValue,
      }
    );
    return {
      officerReportsQuery,
      group,
      setgroup
    };

}
export const useGroup = (id:number) => {
    const axiosPrivate = useAxiosPrivate();
    const reportQuery = useQuery(["group", id], async()
    :Promise<GroupResI> => {
        console.log(id)
        const {data} = await axiosPrivate.get<GroupResI>(`/groups/${id}`);
        return data
    },{
       
    }) 
    return reportQuery
}

export const useGroupMutation = () => {
    const { token } = useContext(UserContext);
    const axiosPrivate = useAxiosPrivate()
    const reports = useQueryClient()
    const decoded:DecodedI = jwt_decode(token);
    const createGroup = async(body:CreateGroupI):Promise<GroupActionResI> => {
        const { data } = await axiosPrivate.post<GroupActionResI>("/groups/", body);   
        return data
    }
    const {mutate, error, isError, isLoading, isSuccess} = useMutation<GroupActionResI, AxiosError , CreateGroupI>(createGroup,{
        onSuccess:(data) => {
            reports.refetchQueries({queryKey:["groups", decoded.info.username]});
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
export const useGroupUpdateMutation = () => {const { token } = useContext(UserContext);
const axiosPrivate = useAxiosPrivate()
const reports = useQueryClient()
const decoded:DecodedI = jwt_decode(token);
const updateGroup = async(body:UpdateGroupI):Promise<GroupActionResI> => {
    const { data } = await axiosPrivate.put<GroupActionResI>("/groups/", body);   
    return data
}
const {mutate, error, isError, isLoading, isSuccess} = useMutation<GroupActionResI, AxiosError ,UpdateGroupI>(updateGroup,{
    onSuccess:(data) => {
        reports.refetchQueries({queryKey:["groups", decoded.info.username]});
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