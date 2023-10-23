"use client"

import {Sale} from "@/components/Sale/Sale";

export default function Edit({ params }: { params: { invoice: number } }) {

	return (
		<>
			<Sale params={params} />
		</>
	)
}