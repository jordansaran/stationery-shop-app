"use client"

import Typography from "@mui/material/Typography";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AutoCompleteCustomers from "@/components/AutoCompleteCustomers/AutoCompleteCustomers";
import AutoCompleteSellers from "@/components/AutoCompleteSellers/AutoCompleteSellers";
import { useSaleContext } from "@/context/SalesContext";
import {currency} from "@/interfaces/interfaces";

export default function DataSale() {
	const { total } = useSaleContext()

	return (
		<>
			<Grid
				container
				spacing={3}
			>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={12}>
							Data e Hora da Venda
						</Grid>
						<Grid item xs={12}>
							<TextField id="date-sale" variant="outlined" fullWidth/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={12}>
							Escolha um vendedor
						</Grid>
						<Grid item xs={12}>
							<AutoCompleteSellers />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={12}>
							Escolha um cliente
						</Grid>
						<Grid item xs={12}>
							<AutoCompleteCustomers />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}><br/><br/><br/></Grid>
				<Grid item xs={12}>
					<Grid container columns={12}>
						<Grid item xs={9}>
							<Typography variant={"h6"} fontWeight={"bold"}>
								Valor total de venda
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography variant={"h5"} fontWeight={"bold"}>
								{Number(total).toLocaleString('pt-Br', currency)}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}><br/></Grid>
				<Grid item xs={12}>
					<Grid container columns={12}>
						<Grid item xs={9}>
							<Button href={"/"} variant={"contained"} color={"primary"} size={"large"}>
								Cancelar
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button variant={"contained"} color={"primary"} size={"large"}>
								Finalizar
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}