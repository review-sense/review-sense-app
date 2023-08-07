import { QueryObserverResult, useQuery } from "react-query";
import { ListResult } from "../representations/results";
import { apis } from "../lib/apis";

export const useGetBusinesses = (
  queryConfig?
): QueryObserverResult<ListResult<any>> => {
  return useQuery<ListResult<any>, Error>("businesses", async () => {
    const response = await fetch(
      "https://127.0.0.1:8000/api/businesses/all-businesses"
    );
    return response.json();
  });
};
