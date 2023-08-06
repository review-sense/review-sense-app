import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { apis } from "../lib/apis";
import { UserRepresentation } from "../representations/user";
import { GenericError } from "../representations/error";

export const usePostRegisterUser =
  (): UseMutationResult<UserRepresentation> => {
    const queryClient = useQueryClient();
    return useMutation<UserRepresentation>(
      (params: any) =>
        fetch("http://127.0.0.1:8000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }).then((response) => response.json()),
      { mutationKey: ["regidterUser"] }
    );
  };

export const usePostLoginUser = (): UseMutationResult<
  UserRepresentation | GenericError
> => {
  const queryClient = useQueryClient();
  return useMutation<UserRepresentation | GenericError, GenericError>(
    (params: any) =>
      fetch("http://127.0.0.1:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          if (!response.ok) {
            throw { message: "Unauthorized" } as GenericError;
          }
          return response.json();
        })
        .catch((error) => {
          throw error;
        }),
    { mutationKey: ["loginUser"] }
  );
};
