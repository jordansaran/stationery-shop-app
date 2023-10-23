import useQueryFunction from "@/hooks/useQueryFunction";
import {getAllItems} from "@/api/items/get";

export default function hook () {
  return useQueryFunction(['queryAllItems'], getAllItems)
}