import {Client} from "@/interfaces/interfaces";

export async function getAllCustomers() {
    let url = process.env.API_URL + "/client/"
    return await fetch(url)
    .then((response) => response.json())
    .then((response) => {
        let listAllClient: Client[] = response['results']
        return listAllClient
    })
    .catch((error) => console.log(error))
}