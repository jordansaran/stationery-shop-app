import {Alert, Grid, Snackbar, TableFooter} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useState} from "react";
import {useSaleContext} from "@/context/SalesContext";
import {Sale} from "@/interfaces/interfaces";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Link from "next/link";

function Row(props: { row: Sale }) {
  const options = { style: 'currency', currency: 'BRL' }
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="center">{row.invoiceLabel}</TableCell>
        <TableCell align="center">{row.client}</TableCell>
        <TableCell align="center">{row.seller}</TableCell>
        <TableCell align="center">{new Date(row.date).toLocaleString('pt-BR').replace(",", "")}</TableCell>
        <TableCell align="center">{Number(row.totalSale).toLocaleString('pt-BR', options)}</TableCell>
        <TableCell align="center">
	        <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}>
		        {open ? <Typography variant={"body1"} fontWeight={"bold"} color={"primary"}>
			        Fechar
		        </Typography> : <Typography variant={"body1"} fontWeight={"bold"} color={"primary"}>
			        Ver Items
		        </Typography>}
            </IconButton>
	        <Link href={`/sale/${row.invoice}`}>
				<IconButton>
					<EditIcon color={"primary"}/>
				</IconButton>
            </Link>
	        <Link href={"/"}>
		        <IconButton>
                    <DeleteIcon color={"warning"} />
				</IconButton>
	        </Link>
        </TableCell>
      </TableRow>
	  <TableRow>
		  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
			  <Collapse in={open} timeout="auto" unmountOnExit>
		        <Box >
		          <Table size="small" aria-label="reportSales">
		            <TableHead>
		              <TableRow >
		                <TableCell align="left" sx={{border: "none"}}>
			                <Typography variant={"body1"} fontWeight={"bold"}>
			                    Produtos/Serviço
		                    </Typography>
						</TableCell>
		                <TableCell align="center" sx={{border: "none"}}>
			                <Typography variant={"body2"} fontWeight={"bold"}>
			                    Quantidade
		                    </Typography>
						</TableCell>
		                <TableCell align="center" sx={{border: "none"}}>
			                <Typography variant={"body2"} fontWeight={"bold"}>
			                    Preço Unitárrio
		                    </Typography>
						</TableCell>
		                <TableCell align="center" sx={{border: "none"}}>
			                <Typography variant={"body2"} fontWeight={"bold"}>
			                    Total do Produto
		                    </Typography>
						</TableCell>
		                <TableCell align="center" sx={{border: "none"}}>
			                <Typography variant={"body2"} fontWeight={"bold"}>
			                    % de Comissão
		                    </Typography>
						</TableCell>
		                <TableCell align="center" sx={{border: "none"}}>
			                <Typography variant={"body2"} fontWeight={"bold"}>
			                    Comissão
		                    </Typography>
						</TableCell>
		              </TableRow>
		            </TableHead>
		            <TableBody>
		              {row.cart.items.map((item) => (
		                <TableRow key={item.id}>
		                  <TableCell align="left" component="th" scope="row" sx={{border: "none"}}>
		                    {item.productName}
		                  </TableCell>
		                  <TableCell align="center" sx={{border: "none"}}>{item.quantity}</TableCell>
		                  <TableCell align="center" sx={{border: "none"}}>{item.unitaryPriceCommission != null ? Number(item.unitaryPriceCommission).toLocaleString(`pt-BR`, options) : "-"}</TableCell>
		                  <TableCell align="center" sx={{border: "none"}}>{Number(item.totalProduct).toLocaleString('pt-BR', options)}</TableCell>
		                  <TableCell align="center" sx={{border: "none"}}>{item.percentageCommission != null ? Number(item.percentageCommission).toLocaleString('pt-BR', { style: 'percent' }) : "-"}</TableCell>
		                  <TableCell align="center" sx={{border: "none"}}>{item.commission != null ? Number(item.commission).toLocaleString(`pt-BR`, options) : "-"}</TableCell>
		                </TableRow>
		              ))}
		            </TableBody>
		            <TableFooter>
		              <TableRow key={"values-all-sum"}>
		                <TableCell align="left">
			                <Typography variant={"body2"} fontWeight={"bold"} color={"primary"}>
			                    Total da Venda
		                    </Typography>
						</TableCell>
		                <TableCell align="center"></TableCell>
		                <TableCell align="center"></TableCell>
		                <TableCell align="center">
			                <Typography variant={"body2"} fontWeight={"bold"} color={"primary"}>
			                    {Number(row.cart.totalSale).toLocaleString('pt-BR', options)}
		                    </Typography>
						</TableCell>
		                <TableCell align="center"></TableCell>
		                <TableCell align="center">
			                <Typography variant={"body2"} fontWeight={"bold"} color={"primary"}>
			                    {Number(row.cart.totalCommission).toLocaleString('pt-BR', options)}
		                    </Typography>
						</TableCell>
		              </TableRow>
		            </TableFooter>
		          </Table>
		        </Box>
		      </Collapse>
		  </TableCell>
	  </TableRow>
    </>
  );
}

export default function SalesTable() {
	const {sales} = useSaleContext()
	return (
		<>
			<Grid
				container
				sx={{padding: "2.5rem"}}>
				<Grid
					item
					xs={12}>
					<Grid container>
						<Grid
						  item
						  xs={6}>
						  <Typography variant={"h4"} fontWeight={"bold"} color={"primary"}>
						        Vendas Realizadas
						  </Typography>
						</Grid>
						<Grid
						  item
						  xs={6}>
						  <Grid container justifyContent={"flex-end"}>
						      <Grid item xs={12}>
						          <Button href={"/sale/create/"} size={"large"} color={"primary"} variant={"contained"}>
							          Nova venda
								  </Button>
						      </Grid>
						  </Grid>
						</Grid>
		          </Grid>
				</Grid>
	          <Grid item xs={12}>
			        <Grid container>
		              <TableContainer>
		                <Table aria-label="collapsible table"  size={"small"}>
		                  <TableHead>
		                    <TableRow >
		                      <TableCell align="center">
			                      <Typography variant={"body2"} fontWeight={"bold"}>
				                      Nota Fiscal
			                      </Typography>
		                      </TableCell>
		                      <TableCell align="center">
			                      <Typography variant={"body2"} fontWeight={"bold"}>
				                      Cliente
			                      </Typography>
							  </TableCell>
		                      <TableCell align="center">
			                      <Typography variant={"body2"} fontWeight={"bold"}>
				                      Cliente
			                      </Typography>
							  </TableCell>
		                      <TableCell align="center">
			                      <Typography variant={"body2"} fontWeight={"bold"}>
				                      Data da Venda
			                      </Typography>
		                      </TableCell>
		                      <TableCell align="center">
			                      <Typography variant={"body2"} fontWeight={"bold"}>
				                      Valor Total
			                      </Typography>
		                      </TableCell>
		                      <TableCell align="center">
			                      Opções
		                      </TableCell>
		                    </TableRow>
		                  </TableHead>
		                  <TableBody>
		                      {sales.map((row) => (
		                      <Row key={row.invoice} row={row} />
		                    ))}
		                  </TableBody>
		                </Table>
		              </TableContainer>
				  </Grid>
	          </Grid>
	        </Grid>
		</>
	)
}