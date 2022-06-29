import {postJSON} from "./index";


const UsersAPI = {

    login(user) {
        const data = postJSON(`https://users-sellmycampus.azurewebsites.net/api/userLogin?code=g4dyl3TxZGn485vFgA2fbhQgV-C9Z4b4CFtxNk0a-V0yAzFue0-JKg==`, {body: user});
        return data;
    },

    signUp(user) {
        const data = postJSON(`${URL}/sign-up`, {body: user})
        return data;
    }
}

export default UsersAPI