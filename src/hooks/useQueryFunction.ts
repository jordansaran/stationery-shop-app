import { useQuery } from "@tanstack/react-query"

export default function useQueryFunction(queryKey: string[], queryFn: any) {
    return useQuery( { queryKey: queryKey, queryFn: queryFn})
};