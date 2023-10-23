import {getAllSellers} from "@/api/sellers/get";
import useQueryFunction from "@/hooks/useQueryFunction";


export default function useQuerySellers() {
  return useQueryFunction(['queryAllSellers'], getAllSellers)
}