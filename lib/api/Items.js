import {getJSON, postJSON, putJSON, deleteJSON} from "./index";


const ItemAPI = {

    readAll() {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getAllItems?code=tr3Iy18xKqFUcWbS9Jns45bgb9y93K7XmTKOd5B9Zej9AzFuriZruQ==`)
        return data;
    },

    readId(id) {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getItemById?id=${id}`)
        return data;
    },

    create(item, token){
        const data = postJSON(`${URL}/new`, { body: item, token });
        return data;

    },
    update(item, token){
        const data = putJSON(`${URL}`, {body: item, token})
        return data;
    },
    delete(item){
        const data = deleteJSON(`https://functions-smc.azurewebsites.net/api/deleteItem`, {body: item});
        return data;
    }
}

export default ItemAPI