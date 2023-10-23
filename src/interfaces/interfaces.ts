import {Dispatch, SetStateAction} from "react";

export const currency = { style: 'currency', currency: 'BRL' }
export const DateFormat = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
				hour: "numeric",
				minute: "numeric"
    };

export interface Item {
	id: number;
	productId: number;
	productName: string;
	quantity: number;
	unitaryPriceCommission: number
	totalProduct: number;
	commission?: number
	percentageCommission?: number;
}

export interface Cart {
	totalCommission: number;
	totalSale: number;
	items: Item[];
}


export interface Sale {
	invoice: number;
	invoiceLabel: string;
	client: string;
	seller: string;
	date: string;
	totalSale: number;
	cart: Cart;
}

export interface Commission {
	id: string;
    name: string;
    total_sales: number;
	total_commission: number;
}

export interface Seller {
	id: number
	name: string
}

export interface Client {
	id: number
	name: string
}


export interface Product {
	id: number,
	product: string,
	value: number
}

export interface ShoppingCart {
	id: number,
	label: string,
	quantity: number,
	price: number,
	total: number
}

export interface ContextProps {
	dateSale: string,
	setDateSale: Dispatch<SetStateAction<string>>,
	seller: Seller | null,
	setSeller: Dispatch<SetStateAction<Seller>>,
	client: Client | null,
	setClient: Dispatch<SetStateAction<Client>>,
	sellers: Seller[],
	setSellers: Dispatch<SetStateAction<Seller[]>>,
	customers: Client[],
	setCustomers: Dispatch<SetStateAction<Client[]>>,
	openAlert: boolean,
	setOpenAlert: Dispatch<SetStateAction<boolean>>,
	isLoading: boolean,
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	isError: boolean,
	setIsError: Dispatch<SetStateAction<boolean>>,
	menu: string,
	setMenu: Dispatch<SetStateAction<string>>,
	sales: Sale[],
	setSales: Dispatch<SetStateAction<Sale[]>>,
	cart: ShoppingCart[],
	setCart: Dispatch<SetStateAction<ShoppingCart[]>>
	products: Product[],
	setProducts: Dispatch<SetStateAction<Product[]>>,
	total: number,
	setTotal: Dispatch<SetStateAction<number>>,
}

export interface UseQueryData {
	queryKey: any[],
	queryFn: any
}
