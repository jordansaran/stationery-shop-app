import dayjs from "dayjs";
import {Commission} from "@/interfaces/interfaces";

export async function getListCommissions(dateStart: dayjs.Dayjs | null = null, dateEnd: dayjs.Dayjs | null = null) {

  let url = process.env.API_URL + "/sale/report/commission/"
  if (dateStart != null && dateEnd != null && dateStart != undefined && dateEnd != undefined) {
    console.log(dateStart.locale('pt-br').format().toString().split('T')[0])
    const params = new URLSearchParams(
      {
        dateStart: dateStart.locale('pt-br').format().toString().split('T')[0],
        dateEnd: dateEnd.locale('pt-br').format().toString().split('T')[0]
      }
      )

    url = url + "?" + params.toString()
  }

  console.log(url)

  return await fetch(url)
  .then((response) => response.json())
      .then((response) => {
          let listCommissions: Commission[] = response['results']
          return listCommissions
      })
      .catch((error) => {
      console.log(error)
  })
}