"use customers"

import SalesTable from "@/components/SalesTable/SalesTable"
import { SaleProvider } from "@/context/SalesContext"

export default function Home() {
  return (
    <>
      <SaleProvider>
        <SalesTable />
      </SaleProvider>
    </>
  )
}
