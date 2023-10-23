import {getAllCustomers} from "@/api/customers/get";
import useQueryFunction from "@/hooks/useQueryFunction";

export default function hook() {
  return useQueryFunction(['queryAllCustomers'], getAllCustomers)
}