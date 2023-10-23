import {getAllCustomers} from "@/api/customers/get";
import useQueryFunction from "@/hooks/useQueryFunction";

export default function useQueryCustomers() {
  return useQueryFunction(['queryAllCustomers'], getAllCustomers)
}