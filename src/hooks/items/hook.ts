
import {getAllItems} from "@/api/items/get";
import reactQueryFunction from "../ReactQueryFunction";

export default function hook () {
  return reactQueryFunction(['queryAllItems'], getAllItems)
}