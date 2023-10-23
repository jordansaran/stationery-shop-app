import {getAllItems} from "@/api/items/get";
import useQueryFunction from "@/hooks/useQueryFunction";

export default function useQueryItems () {
  return useQueryFunction(['queryAllItems'], getAllItems)
}