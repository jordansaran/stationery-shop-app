"use client"

import {createContext, ReactNode, SyntheticEvent, useContext, useEffect, useState} from "react";
import {Cart, Client, ContextProps, Product, Sale, Seller, ShoppingCart} from "@/interfaces/interfaces"

export const SaleContext = createContext<ContextProps> ({
	dateSale: "",
	setDateSale: (): string => "",
	seller: null,
	setSeller: (): Seller | null  => null,
	client: null,
	setClient: (): Client | null => null,
	openAlert: false,
	setOpenAlert: (): boolean => false,
	isLoading: false,
	setIsLoading: (): boolean => false,
	isError: false,
	setIsError: (): boolean => false,
	menu: "Vendas",
	setMenu: (): string => "Vendas",
	sellers: [],
	setSellers: (): Seller[] => [],
	customers: [],
	setCustomers: (): Client[] => [],
	sales: [],
	setSales: (): Sale[] => [],
	cart: [],
	setCart: (): ShoppingCart[] => [],
	products: [],
	setProducts: (): Product[] => [],
	total: 0.00,
	setTotal: (): number => 0.00
});
SaleContext.displayName = "Venda";

export const SaleProvider = ({children}: { children: ReactNode }) => {
	const [openAlert, setOpenAlert] = useState(false);
	const [menu, setMenu] = useState<string>("Vendas");
  const [sales, setSales] = useState<Sale[]>([]);
	const [sellers, setSellers] = useState<Seller[]>([]);
	const [customers, setCustomers] = useState<Client[]>([]);
	const [cart, setCart] = useState<ShoppingCart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number> (0.00);
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [seller, setSeller] = useState<Seller>({id: 0, name: ""})
	const [client, setClient] = useState<Client>({id: 0, name: ""})
	const [dateSale, setDateSale] = useState<string>("")

	const  getAllSales = async () => {
    let url = process.env.API_URL + "/sale/report/"
    return await fetch(url)
	    .then((response) => response.json())
      .then((response) => {
				let listAllSales: Sale[] = response['results']
	      setSales(listAllSales)
	      return true
      })
    .catch((error) => {
				console.log(error)
	      return false
    })
	}

	const getAllCustomers = async  () => {
    let url = process.env.API_URL + "/client/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let listAllClient: Client[] = response['results']
        setCustomers(listAllClient)
	    return true
    })
    .catch((error) => {
				console.log(error)
	    return false
    } )
}

	const getAllSellers = async () => {
    let url = process.env.API_URL + "/seller/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let listAllSellers: Seller[] = response['results']
        setSellers(listAllSellers)
	      return false
    })
    .catch((error) => {
			console.log(error)
	    return false
    } )
}

  useEffect(() => {
		const responseSales = getAllSales()
	  const responseSellers = getAllSellers()
	  const responseCustomers = getAllCustomers()
  }, [])

  return (
    <SaleContext.Provider
	    value={
			{
				products,
				setProducts,
				total,
				setTotal,
				cart,
				setCart,
				sales,
				setSales,
				menu,
				setMenu,
				openAlert,
				setOpenAlert,
				sellers,
				setSellers,
				customers,
				setCustomers,
				isError,
				setIsError,
				isLoading,
				setIsLoading,
				client,
				setClient,
				seller,
				setSeller,
				dateSale,
				setDateSale
			}}>
			{children}
		</SaleContext.Provider>
  );
};

export const useSaleContext = () => {
	const {
		products,
		setProducts,
		total,
		setTotal,
		cart,
		setCart,
		sales,
		setSales,
		menu,
		setMenu,
		openAlert,
		setOpenAlert,
		sellers,
		setSellers,
		customers,
		setCustomers,
		isLoading,
		isError,
		seller,
		setSeller,
		client,
		setClient,
		dateSale,
		setDateSale
	} = useContext(SaleContext);

	function addItem(item: ShoppingCart) {
		const hasItem = cart.some(itemCart => itemCart.id === item.id);
		if(!hasItem) {
			setCart(oldCart => [...oldCart, item])
			let sumTotal: number = total + item.total
			setTotal(sumTotal)
			return true
		}
		return false
	}

	function removeItem(item: ShoppingCart) {
		setCart(oldCart => oldCart.filter(itemCart => itemCart.id !== item.id));
		let subTotal: number = total - item.total
		subTotal < 0 ? setTotal(0) : setTotal(subTotal)
	}

	return {
		cart,
		setCart,
		addItem,
		removeItem,
		total,
		setTotal,
		setProducts,
		products,
		sales,
		setSales,
		menu,
		setMenu,
		openAlert,
		setOpenAlert,
		sellers,
		setSellers,
		customers,
		setCustomers,
		isError,
		isLoading,
		seller,
		setSeller,
		client,
		setClient,
		dateSale,
		setDateSale
	}
}