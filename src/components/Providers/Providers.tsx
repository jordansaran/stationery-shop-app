"use client"

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import SalesBar from "@/components/SalesBar/SalesBar";
import {Grid} from "@mui/material";
import {ReactNode} from "react";
import ReactQueryProvider from "@/providers/QueryReactProvider";
import {SaleProvider} from "@/context/SalesContext";

export default function Providers({children,}: { children: ReactNode }) {
	return (
		<>
			<ReactQueryProvider>
			    <ThemeRegistry>
					<body>
						<SaleProvider>
							<SalesBar/>
							<Grid container sx={{ marginTop: "4.5rem" }}>
								{children}
							</Grid>
						</SaleProvider>
					</body>
			    </ThemeRegistry>
			</ReactQueryProvider>
		</>
	)
}