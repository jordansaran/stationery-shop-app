import {getAllCustomers} from "@/api/customers/get";
import reactQueryFunction from "../ReactQueryFunction";

export default function hook() {
  return reactQueryFunction(['queryAllCustomers'], getAllCustomers)
}