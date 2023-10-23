import {UseQueryData} from "@/interfaces/interfaces"
import { useQuery } from "@tanstack/react-query"
import {getAllItems} from "@/api/items/get";

export default function useQueryFunction(queryKey: string[], queryFn: any) {
    return useQuery( { queryKey: queryKey, queryFn: queryFn})
};