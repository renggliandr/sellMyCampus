import {getJSON} from "./index";


const CredentialsAPI = {

    get() {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/imgCredentials?code=d2EqmAsrUvyzueAKoPtlUuqHUfdI5y3o6Jg8NvAuWY0AAzFuWeh6hg==`)
        return data;
    }
}


export default CredentialsAPI