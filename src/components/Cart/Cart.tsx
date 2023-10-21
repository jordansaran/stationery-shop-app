"use client"

import {TableContainer, TableHead, TableRow, TableBody, Paper, Table, TableCell } from "@mui/material";
import { useSaleContext } from "@/context/SalesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";

export default function Cart() {
	const options = { style: 'currency', currency: 'BRL' }
	const { cart, removeItem } = useSaleContext()

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
				              {Number(item.price).toLocaleString('pt-BR', options)}
						  </Typography>
					  </TableCell>
		              <TableCell align="center" sx={{border: "none"}}>
			              <Typography variant={"body2"}>
				              {Number(item.total).toLocaleString('pt-BR', options)}
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