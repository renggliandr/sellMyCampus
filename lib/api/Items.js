import {getJSON, postJSON, putJSON, deleteJSON} from "./index";


const ItemAPI = {

    readAll() {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getAllItems`)
        return data;
    },

    readId(id) {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getItemById?id=${id}`)
        return data;
    },

    create(item){
        const data = postJSON(`https://functions-smc.azurewebsites.net/api/createItem`, { body: item });
        return data;

    },
    update(item, token){
        const data = putJSON(`${URL}`, {body: item, token})
        return data;
    },
    delete(item){
        //id = parseInt(id)
        const data = postJSON(`https://functions-smc.azurewebsites.net/api/deleteById?code=-zHyYCExcj_qeura2yZV3av7NPDwq_FtfgrISlNY1_1FAzFujeq9jg==`, {body: item});
        return data;
    }
}

export default ItemAPI