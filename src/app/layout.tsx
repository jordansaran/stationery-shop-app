import '../styles/globals.css'
import type { Metadata } from 'next'
import {ReactNode} from "react"
import Providers from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: 'Stationery Shop App',
  description: 'Stationery Shop',
}

export default function RootLayout({children,}: { children: ReactNode }) {

  return (
    <html lang="pt-br">
      <Providers>
        {children}
      </Providers>
    </html>
  )
}
