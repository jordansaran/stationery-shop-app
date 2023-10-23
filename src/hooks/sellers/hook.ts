import {getAllSellers} from "@/api/sellers/get";
import reactQueryFunction from "../ReactQueryFunction";


export default function hook() {
  return reactQueryFunction(['queryAllSellers'], getAllSellers)
}