
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { useRecords } from "./useQueries";
import { useSearchRecords } from "./useQueries";
import { useAxiosPrivate } from "./useAxiosPrivate";




//create officer
export const useUsersMutation = <T, U>(path:string) => {
  const axiosPrivate = useAxiosPrivate();
  const records = useQueryClient();
  const {currentPage:currentPageRecords} = useRecords("users")
  const {param, currentPage:currentPageSearch} = useSearchRecords("users", "FoundUsers")
  const createUser = async (body: U): Promise<T> => {
    const { data } = await axiosPrivate.post<T>(`auth/${path}/`, body);
    return data;
  };

  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
  T,
  unknown,
  U
>(createUser,{
  onSuccess: (data) => {
    // if the user is in filtered records refetch the fiteredOnes
    if(Object.keys(param).length > 0){
      records.refetchQueries(["FoundUsers", "users", param, currentPageSearch]);
    }
    
    else{
      
      //if the user is in allRecords feretch all the records
      records.refetchQueries(["records", "users", currentPageRecords])
    }
    // refetch the queries with the updated currentPage and param values
  },
});
return {
  mutate,
  error,
  isError,
  isLoading,
  isSuccess,
};
}

