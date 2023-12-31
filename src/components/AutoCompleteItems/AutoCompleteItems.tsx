"use client"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {Product} from "@/interfaces/interfaces";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {SyntheticEvent, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import { useSaleContext } from '@/context/SalesContext';
import useQueryItems from "@/hooks/items/hook";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


export default function AutoCompleteItems() {

	const {
		addItem,
		products,
		setProducts,
	} = useSaleContext();
	const [alertProductZero, setAlertProductZero] = useState<boolean>(false)
	const [alertProductEquals, setAlertProductEquals] = useState<boolean>(false)
	const [open, setOpen] = useState(false);
	const [product, setProduct] = useState<Product | null>(null)
	const [quantity, setQuantity] = useState<number>(0)
	const { data, isLoading, isError } = useQueryItems()

	useEffect(() => {
		// @ts-ignore
	  !isLoading && !isError ? setProducts(data) : null
  }, [data, isError, isLoading, open, setProducts]);

	const handleCloseProductZero = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setAlertProductZero(false);
	};

	const handleCloseProductEquals = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setAlertProductEquals(false);
	};

  let parserItem = () => {
	  if (product !== null) {
		  if (quantity === 0) setAlertProductZero(true);
		  if (quantity > 0) {
			let totalItem = product.value * quantity;
		    let itemToCart = {
			    id: product.id,
			    label: product.product,
			    quantity: quantity,
			    price: product.value,
			    total: totalItem
		    }
		    setQuantity(0)
		    let hasItem = addItem(itemToCart)
		    if (!hasItem) setAlertProductEquals(true);
		  }
	  }
	}

  return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={7}>
					<Grid container direction={"column"}>
						<Grid item>
								<Typography variant={"inherit"}>
									Buscar pelo código de barras ou descrição
								</Typography>
						</Grid>
						<Grid item>
							<Autocomplete
								id="asyncProducts"
								open={open}
								onOpen={() => {setOpen(true)}}
								onClose={() => {setOpen(false)}}
								isOptionEqualToValue={(product, value) => product.id === value.id}
								getOptionLabel={(product) => product.product}
								options={products}
								loading={isLoading}
								onChange={(event, value) => setProduct(value)}
								renderInput={(params) => (
									<TextField
										{...params}
										required
										placeholder={"Digite o código ou nome do produto"}
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{!isLoading && isError ? <label>Error</label> : isLoading && !isError ? <CircularProgress color="inherit" size={20} /> : null}
													{params.InputProps.endAdornment}
												</>
											),
										}}
									/>
								)}
							/>
						</Grid>
				</Grid>
			</Grid>
				<Grid item xs={3}>
					<Grid container direction={"column"}>
						<Grid item>
							<Typography variant={"inherit"}>
								Quantidade de itens
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								id="outlined-number"
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								InputProps={{inputProps: { min: 0 }}}
								InputLabelProps={{shrink: true}}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2}>
				<Grid container direction={"column"}>
					<Grid item>
						<Typography>
							<br/>
						</Typography>
					</Grid>
					<Grid item>
						<Button size={"large"} color={"primary"} variant={"contained"} onClick={parserItem} sx={{height: "3.5rem"}}>
							Adicionar
						</Button>
						<Snackbar open={alertProductZero} autoHideDuration={6000} onClose={handleCloseProductZero}>
		          <Alert onClose={handleCloseProductZero} severity="warning" sx={{ width: '100%' }}>
		            A quantidade de produto não deve ser igual a 0.
		          </Alert>
						</Snackbar>
						<Snackbar open={alertProductEquals} autoHideDuration={6000} onClose={handleCloseProductEquals}>
		          <Alert onClose={handleCloseProductEquals} severity="warning" sx={{ width: '100%' }}>
		            Produto já presente no carrinho, remova para modificar a quantidade
		          </Alert>
						</Snackbar>
					</Grid>
				</Grid>
			</Grid>
		  </Grid>
		</>
  );
}