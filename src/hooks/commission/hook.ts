import {getListCommissions} from "@/api/commissions/get";
import dayjs from "dayjs";
import reactQueryFunction from "../ReactQueryFunction";

export default function queryListCommissions(dateStart: dayjs.Dayjs | null = null, dateEnd: dayjs.Dayjs | null = null) {
  return reactQueryFunction(["listAllCommissions"], () => {
    return getListCommissions(dateStart, dateEnd)
  })
}