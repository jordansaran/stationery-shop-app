"use client"

import {Sale} from "@/components/Sale/Sale";

export default function Edit({ params }: { params: { invoice: number } }) {

	let newParams = {invoice: params.invoice, menu: "Alterar Venda - Nº" + String(params.invoice)}

	return (
		<>
			<Sale params={newParams} />
		</>
	)
}