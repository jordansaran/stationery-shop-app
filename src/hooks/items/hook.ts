import {getAllItems} from "@/api/items/get";
import useQueryFunction from "@/hooks/useQueryFunction";

export default function hook () {
  return useQueryFunction(['queryAllItems'], getAllItems)
}