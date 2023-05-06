import { useNavigate } from "react-router-dom";
import { SignUpI, GlobalResI  } from "../helpers";
import axios, { AxiosError } from "axios";
import { axiosPrivate, ErrorsI } from "../helpers";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
    const navigate = useNavigate();
  const { mutate, error, isError, isLoading, isSuccess } = useMutation<
    GlobalResI,
    AxiosError,
    SignUpI
  >(
    async (body: SignUpI): Promise<GlobalResI> => {
      const { data } = await axiosPrivate.post<GlobalResI>(
        "/auth/signup-operator",
        body
      );
      return data;
    },
    {
      onSuccess: (variables) => {
        navigate("/", {
            replace:true
        });
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
