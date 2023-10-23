import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import AutoCompleteItems from "@/components/AutoCompleteItems/AutoCompleteItems";
import Divider from "@mui/material/Divider";
import DataSale from "@/components/DataSale/DataSale";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import {DateFormat, ShoppingCart as ShoppingCartInterface} from "@/interfaces/interfaces";
import {useSaleContext} from "@/context/SalesContext";
import {useEffect} from "react";
import {Cart} from "@/interfaces/interfaces";

function parserShoppingCart(cart: Cart) {
	let shoppingCart: ShoppingCartInterface[] = []
	cart.items.forEach((item) => {
		let itemToShoppingCart = {
		  id: item.id,
		  label: String(item.productId).padStart(3, '0') + ' - ' + item.productName,
		  quantity: item.quantity,
		  price: item.unitaryPriceCommission,
		  total: item.totalProduct
		}
		shoppingCart.push(itemToShoppingCart)
	})
	return shoppingCart
}

export function Sale({ params }: { params?: { invoice?: number, menu?: string } }) {

	const {
		sales,
		setCart,
		setTotal,
		sellers,
		setSeller,
		customers,
		setClient,
		setDateSale,
		setMenu
	} = useSaleContext()

	const sale = sales.find((sale) => {
		if (params !== undefined && params !== null) {
			return sale.invoice == params.invoice ? sale : null
		}
		return undefined
	} )


	useEffect(() => {
		if (sale !== undefined) {
			const shoppingCart = parserShoppingCart(sale?.cart)
			setCart(shoppingCart)
			setTotal(sale.totalSale)
			const seller = sellers.find((seller) => seller.name == sale.seller ? seller : null)
			if (seller !== undefined) setSeller(seller)
			const client = customers.find((client) => client.name == sale.client ? client : null)
			if (client !== undefined) setClient(client)
			// @ts-ignore
			setDateSale(new Date(sale.date).toLocaleDateString('pt-br', DateFormat).replace(",", ""))
		} else {
			// @ts-ignore
			setDateSale(new Date().toLocaleDateString('pt-br', DateFormat).replace(",", ""))
		}
		// @ts-ignore
		setMenu(params.menu)
			// @ts-ignore
	}, [sales, customers, sale, sellers, setCart, setClient, setDateSale, setTotal, setSeller, setMenu, params.menu]);

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
									<ShoppingCart />
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