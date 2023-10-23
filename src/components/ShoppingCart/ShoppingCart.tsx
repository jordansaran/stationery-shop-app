"use client"

import {TableContainer, TableHead, TableRow, TableBody, Table, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import {Cart, currency} from "@/interfaces/interfaces";
import {useSaleContext} from "@/context/SalesContext";
import { useEffect } from "react";
import {ShoppingCart} from "@/interfaces/interfaces"

function parserShoppingCart(cart: Cart) {
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

export default function ShoppingCart({invoice = null} : {invoice?: number | null}) {
	const {
		sales,
		cart,
		setCart,
		setTotal,
		removeItem
	} = useSaleContext()
	const sale = sales.find((sale) => sale.invoice == invoice ? sale : null)
	useEffect(() => {
		if (sale !== undefined) {
			const shoppingCart = parserShoppingCart(sale?.cart)
			setCart(shoppingCart)
			setTotal(sale.totalSale)
		}
	}, [sales]);

	return (
		<>
			<TableContainer style={{ maxHeight: 400 }} key={"table-container-cart"}>
				<Table aria-label="simple table" stickyHeader size={"small"} key={"table-cart"}>
					<TableHead>
						<TableRow>
							<TableCell align={"left"} sx={{border: "none"}}>
								<Typography variant={"body1"} fontWeight={"bold"}>
									Produto/Serviço
								</Typography>
							</TableCell>
							<TableCell align={"center"} sx={{border: "none"}}>
								<Typography variant={"body1"} fontWeight={"bold"}>
									Quantidade
								</Typography>
							</TableCell>
							<TableCell align={"center"} sx={{border: "none"}}>
								<Typography variant={"body1"} fontWeight={"bold"}>
									Valor unitário
								</Typography>
							</TableCell>
							<TableCell align={"center"} sx={{border: "none"}}>
								<Typography variant={"body1"} fontWeight={"bold"}>
									Total
								</Typography>
							</TableCell>
							<TableCell align={"center"} sx={{border: "none"}}></TableCell>
						</TableRow>
					</TableHead>
		        <TableBody>
		          {cart.map((item) => (
		            <TableRow key={item.id}>
		              <TableCell component="th" scope="row" sx={{border: "none"}}>
			              <Typography variant={"body2"}>
				              {item.label}
						        </Typography>
					        </TableCell>
		              <TableCell align="center" sx={{border: "none"}}>
			              <Typography variant={"body2"}>
				              {item.quantity}
						        </Typography>
					        </TableCell>
			            <TableCell align="center" sx={{border: "none"}}>
			              <Typography variant={"body2"}>
				              {Number(item.price).toLocaleString('pt-BR', currency)}
						        </Typography>
					        </TableCell>
		              <TableCell align="center" sx={{border: "none"}}>
			              <Typography variant={"body2"}>
				              {Number(item.total).toLocaleString('pt-BR', currency)}
						        </Typography>
					        </TableCell>
			            <TableCell align={"center"} sx={{border: "none"}}>
				            <IconButton onClick={() => {removeItem(item)}}>
				              <DeleteIcon color={"warning"} />
			              </IconButton>
			            </TableCell>
								</TableRow>
		          ))}
		        </TableBody>
				</Table>
			</TableContainer>
		</>
	)
}