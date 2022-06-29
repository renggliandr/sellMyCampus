import {getJSON, postJSON, putJSON, deleteJSON} from "./index";


const ItemAPI = {

    readAll() {
        const data = getJSON(`${URL}?_sort=id&_order=desc`)
        return data;
    },

    readId(id) {
        const data = getJSON(`${URL}/${id}`)
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
    delete(id, token){
        const data = deleteJSON(`${URL}/${id}`, {token});
        return data;
    }
}

export default ItemAPI