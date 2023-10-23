import {getListCommissions} from "@/api/commissions/get";
import dayjs from "dayjs";
import useQueryFunction from "@/hooks/useQueryFunction";

export default function queryListCommissions(dateStart: dayjs.Dayjs | null = null, dateEnd: dayjs.Dayjs | null = null) {
  return useQueryFunction(["listAllCommissions"], () => {
    return getListCommissions(dateStart, dateEnd)
  })
}