import { QueryObserverResult, useQuery } from "react-query";
import { ListResult } from "../representations/results";

export const useGetBusinesses = (
  queryConfig?
): QueryObserverResult<ListResult<any>> => {
  return useQuery<ListResult<any>, Error>("businesses", async () => {
    // const {data}= await axious
    const response = await fetch(
      "http://127.0.0.1:8000/api/businesses/all-businesses"
    );
    return response.json();
  });
};
