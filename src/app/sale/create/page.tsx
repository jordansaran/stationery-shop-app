"use client"

import {Sale} from "@/components/Sale/Sale";

export default function Create() {
	const params = {menu: "Nova Venda"}

	return (
		<Sale params={params} />
	)
}
