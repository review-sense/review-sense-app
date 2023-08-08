import { QueryObserverResult, useQuery } from "react-query";
import { ListResult } from "../representations/results";

export const useGetBusinesses = (
  queryConfig?
): QueryObserverResult<ListResult<any>> => {
  return useQuery<ListResult<any>, Error>("businesses", async () => {
    const response = await fetch(
      "https://localhost:8000/api/businesses/all-businesses"
    );
    return response.json();
  });
};
