"use client"

import {AppBar, Box, Drawer, Toolbar, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CalculateIcon from '@mui/icons-material/Calculate';
import {useEffect, useState} from "react";
import { useSaleContext } from "@/context/SalesContext";
import Link from "next/link";


export default function SalesBar() {

	const [stateButton, setStateButton] = useState(true)
    const drawerWidth = 240;
    const anchor = 'left'
    const [state, setState] = useState({left: false});
    const toggleDrawer =
        (open: boolean = true) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
		setStateButton(!open)
	    setState({ ...state, [anchor]: open });
		};
    const toggleButton = () => {
		setStateButton(preState => !preState)
		setState({ ...state, [anchor]: stateButton });
	}

	const menuBar = () => (
	    <Box
		    sx={{ display: 'flex', marginTop: '5rem' }}
	        role="presentation"
	        onClick={toggleDrawer(false)}
	        onKeyDown={toggleDrawer(false)}
	    >
		    <Grid container rowSpacing={1} spacing={1}>
			    <Grid item xs={12}>
				    <Link href={"/"}>
					    <Grid container padding={1}>
						    <Grid item xs={2}>
								<PointOfSaleIcon color={"primary"} fontSize={"large"} />
						    </Grid>
						    <Grid item xs={8}>
								<Typography variant={"h6"} color={"primary"}>
									Vendas
							    </Typography>
						    </Grid>
						    <Grid item xs={2}>
								<KeyboardArrowRightIcon fontSize={"large"} color={"action"} />
						    </Grid>
					    </Grid>
				    </Link>
			    </Grid>
			    <Grid item xs={12}>
				    <Link href={"/commission/list/"}>
					    <Grid container padding={1}>
						    <Grid item xs={2}>
								<CalculateIcon color={"primary"} fontSize={"large"} />
						    </Grid>
						    <Grid item xs={8}>
							    <Typography variant={"h6"} color={"primary"}>
									Comissões
							    </Typography>
						    </Grid>
						    <Grid item xs={2}>
								<KeyboardArrowRightIcon fontSize={"large"} color={"action"} />
						    </Grid>
					    </Grid>
				    </Link>
			    </Grid>
		    </Grid>
	    </Box>
    );

	const {menu, setMenu} = useSaleContext()

  return (
      <>
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color={"default"}>
                <Toolbar>
	                <Grid container marginTop={1}>
		                <Grid item justifyItems={"center"} xs={6}>
			                <IconButton onClick={toggleButton} color={"primary"} size={"large"}>
                                <MenuIcon fontSize={"large"} />
                            </IconButton>
		                </Grid>
		                <Grid item justifyItems={"center"} justifyContent={"center"} xs={6}>
			                <Link href={"/"}>
				                <Typography variant="h4" color={"primary"} fontWeight={"bold"}>
					                {menu}
                                </Typography>
							</Link>

		                </Grid>
	                </Grid>
                </Toolbar>
		  </AppBar>
	      <Drawer
		        anchor={anchor}
		        open={state[anchor]}
		        onClose={toggleDrawer(false)}
		        sx={{
		          width: drawerWidth,
		          flexShrink: 0,
		          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
		        }}
	          >
	            {menuBar()}
		  </Drawer>
      </Box>
      </>
 );
}