import {createContext, ReactNode, SyntheticEvent, useContext, useEffect, useState} from "react";
import {Cart, ContextProps, Product, Sale, ShoppingCart} from "@/interfaces/interfaces"

export const SaleContext = createContext<ContextProps> ({
	openAlert: false,
	setOpenAlert: (): boolean => false,
	menu: "Vendas",
	setMenu: (): string => "Vendas",
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
	const [cart, setCart] = useState<ShoppingCart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number> (0.00);
	const  getReportSales = async () => {
    let url = process.env.API_URL + "/sale/report/"
    const response = await fetch(url)
	    .then((response) => response.json())
      .then((response) => {
				let reportSales: Sale[] = response['results']
	      setSales(reportSales)
      })
    .catch((error) => console.log(error))
	}

  useEffect(() => {
		getReportSales()
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
				setOpenAlert
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
		setOpenAlert
	} = useContext(SaleContext);

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
		setCart(shoppingCart)
		setTotal(cart.totalSale)
	}

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setOpenAlert(false);
	};

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
		setTotal(subTotal)
	}

	return {
		cart,
		setCart,
		addItem,
		removeItem,
		handleClose,
		total,
		setTotal,
		setProducts,
		products,
		sales,
		setSales,
		menu,
		setMenu,
		openAlert,
		setOpenAlert
	}
}