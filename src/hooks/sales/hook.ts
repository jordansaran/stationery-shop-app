import {getReportSales, getSaleByInvoice} from "@/api/sales/get";
import useQueryFunction from "@/hooks/useQueryFunction";

function useQueryAllSales() {
  return useQueryFunction(["reportSales"], getReportSales)
}

function useQuerySaleById(invoice: number) {
  return useQueryFunction(["editSale"], () => {
    return getSaleByInvoice(invoice)
  })
}

export { useQueryAllSales, useQuerySaleById }