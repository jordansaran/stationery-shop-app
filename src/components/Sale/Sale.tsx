import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import AutoCompleteItems from "@/components/AutoCompleteItems/AutoCompleteItems";
import Divider from "@mui/material/Divider";
import DataSale from "@/components/DataSale/DataSale";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

export function Sale({ params }: { params?: { invoice?: number } }) {
	return (
		<>
			<Grid container sx={{marginTop: "2.5rem", paddingLeft: "3rem", paddingRight: "3rem"}} spacing={1} justifyContent={"space-between"}>
				<Grid item xs={12}>
					<Grid container justifyContent={"space-between"}>
						<Grid item xs={6}>
					<Typography variant={"h6"}>
						Produtos
					</Typography>
				</Grid>
						<Grid item xs={2}></Grid>
						<Grid item xs={4}>
					<Typography variant={"h6"}>
						Dados da Venda
					</Typography>
				</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={7}>
							<Grid container direction={"column"} spacing={2}>
								<Grid item xs={12}>
									<AutoCompleteItems />
								</Grid>
								<Grid item xs={12}>
									{params !== undefined ? <ShoppingCart invoice={params.invoice} /> : <ShoppingCart /> }
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={1} justifyItems={"start"}>
							<Divider orientation={"vertical"} />
						</Grid>
						<Grid item xs={4}>
							<DataSale />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}