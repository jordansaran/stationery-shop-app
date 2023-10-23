"use client"

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import SalesBar from "@/components/SalesBar/SalesBar";
import {Grid} from "@mui/material";
import {ReactNode} from "react";
import QueryProvider from "@/providers/QueryProvider";
import {SaleProvider} from "@/context/SalesContext";
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br'

export default function Providers({children,}: { children: ReactNode }) {
	return (
		<>
			<QueryProvider>
				<ThemeRegistry>
					<LocalizationProvider dateAdapter={AdapterDayjs} localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText} adapterLocale={"pt-br"}>
						<body>
							<SaleProvider>
								<SalesBar/>
								<Grid container sx={{ marginTop: "4.5rem" }}>
									{children}
								</Grid>
							</SaleProvider>
						</body>
					</LocalizationProvider>
				</ThemeRegistry>
			</QueryProvider>
		</>
	)
}