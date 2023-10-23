import {Seller} from "@/interfaces/interfaces";

export async function getAllSellers() {
    let url = process.env.API_URL + "/seller/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let listAllSellers: Seller[] = response['results']
        return listAllSellers
    })
    .catch((error) => console.log(error))
}