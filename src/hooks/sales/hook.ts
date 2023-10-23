import {getReportSales, getSaleByInvoice} from "@/api/sales/get";
import useQueryFunction from "@/hooks/useQueryFunction";

function queryAllSales() {
  return useQueryFunction(["reportSales"], getReportSales)
}

function querySaleById(invoice: number) {
  return useQueryFunction(["editSale"], () => {
    return getSaleByInvoice(invoice)
  })
}
export { queryAllSales, querySaleById }