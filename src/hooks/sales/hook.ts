import {getReportSales, getSaleByInvoice} from "@/api/sales/get";
import reactQueryFunction from "../ReactQueryFunction";

function queryAllSales() {
  return reactQueryFunction(["reportSales"], getReportSales)
}

function querySaleById(invoice: number) {
  return reactQueryFunction(["editSale"], () => {
    return getSaleByInvoice(invoice)
  })
}

export { queryAllSales, querySaleById }