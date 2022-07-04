import {getJSON, postJSON} from "./index";


const UsersAPI = {

    readAll(){
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getAllUsers?code=47-JkRbp4E9jI1d9Rw5W0FoVK0RJrHjfz9McLmhTMEj9AzFu6nKPyA==`);
        return data;
    },

    readId(id){
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getUserById?id=${id}`);
        return data;
    },

    login(user) {
        const data = postJSON(`https://users-sellmycampus.azurewebsites.net/api/userLogin?code=g4dyl3TxZGn485vFgA2fbhQgV-C9Z4b4CFtxNk0a-V0yAzFue0-JKg==`, {body: user});
        return data;
    },

    getHighestId() {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/getHighestUserId`);
        return data;
    },

    signUp(user) {
        const data = postJSON(`https://functions-smc.azurewebsites.net/api/createUser`, {body: user})
        return data;
    }
}

export default UsersAPI