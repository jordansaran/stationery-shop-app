import {Sale} from "@/interfaces/interfaces";

export async function getReportSales() {
    let url = process.env.API_URL + "/sales/report/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let reportSales: Sale[] = response['results']
        return reportSales
    })
    .catch((error) => console.log(error))
}

export async function getSaleByInvoice(invoice: number) {
    let url = process.env.API_URL + "/sales/" + invoice + "/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let itemCartSaleEdit: Sale = response
        return itemCartSaleEdit
    })
    .catch((error) => console.log(error))
}