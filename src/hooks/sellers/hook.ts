import {getAllSellers} from "@/api/sellers/get";
import useQueryFunction from "@/hooks/useQueryFunction";

export default function hook() {
  return useQueryFunction(['queryAllSellers'], getAllSellers)
}