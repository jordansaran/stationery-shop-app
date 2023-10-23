import {Product} from "@/interfaces/interfaces";

export async function getAllItems() {
    let url = process.env.API_URL + "/product/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let listAllItems: Product[] = response['results']
        return listAllItems
    })
    .catch((error) => console.log(error))
}