import { useContext } from "react";
import { SignInI, SignInResI, signInSchema } from "../helpers";
import axios, { AxiosError } from "axios";
import { axiosPrivate, ErrorsI } from "../helpers";
import { UserContext } from "../contexts";
import { useMutation } from "@tanstack/react-query";

export const useSignInMutation = () => {
  const { setUser, setRole, setToken } = useContext(UserContext);

  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
    SignInResI,
    AxiosError,
    SignInI
  >(
    async (body: SignInI): Promise<SignInResI> => {
      const { data } = await axiosPrivate.post<SignInResI>(
        "/auth/signin",
        body
      );
      return data;
    },
    {
      onSuccess: (variables) => {
        setUser(true);
        setToken(variables.details.token);
        setRole(variables.details.role);
      },
      onError: (error) => {
        if (axios.isAxiosError<ErrorsI, Record<string, unknown>>(error)) {
          error.message = String(error.response?.data.error);
          // Do something with this error...
        }
        if (error.code == "ERR_NETWORK") {
          error.message = "no se puedo establecer conexion con el servidor";
        }
        return error.message;
      },
    }
  );
  return {
    mutate,
    error,
    isError,
    isLoading,
    isSuccess,
  };
};
