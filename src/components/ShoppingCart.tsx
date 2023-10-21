import {Grid} from "@mui/material";
import InputItems from "@/components/InputItems/InputItems";
import Cart from "@/components/Cart/Cart";
import Divider from "@mui/material/Divider";
import DataSale from "@/components/DataSale/DataSale";
import {useSaleContext} from "@/context/SalesContext";
import {useEffect} from "react";
import {ShoppingCart, Cart as CartItem} from "@/interfaces/interfaces";

function parserShoppingCart(cart: CartItem) {
		let shoppingCart: ShoppingCart[] = []
		cart.items.forEach((item) => {
			let itemToShoppingCart = {
			  id: item.id,
			  label: item.productName,
			  quantity: item.quantity,
			  price: item.unitaryPriceCommission,
			  total: item.totalProduct
			}
			shoppingCart.push(itemToShoppingCart)
		})
		return shoppingCart
	}

export default function ShoppingCart({invoice = null} : {invoice: number | null}) {
	const { sales, cart, total, setCart, setTotal } = useSaleContext()
	const sale = sales.find((sale) => sale.invoice == invoice ? sale : null)
	useEffect(() => {
		if (sale !== undefined) {
			const shoppingCart = parserShoppingCart(sale?.cart)
			setCart(shoppingCart)
			setTotal(sale.totalSale)
		}
	}, [sales]);

	return(
		<>
			<Grid container sx={{display: "flex", marginTop: "4.5rem", padding: "2rem"}} spacing={2}>
				<Grid item xs={7}>
					<InputItems />
					<Grid container sx={{marginTop: "1rem"}}>
						<Grid item xs={12}>
							<Cart />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={1}>
					<Divider orientation={"vertical"} />
				</Grid>
				<DataSale />
			</Grid>
		</>
	)
}