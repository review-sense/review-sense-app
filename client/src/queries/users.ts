import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { UserRepresentation } from "../representations/user";
import { apis } from "../lib/apis";

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
