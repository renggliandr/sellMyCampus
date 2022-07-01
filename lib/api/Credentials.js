import {getJSON} from "./index";


const CredentialsAPI = {

    get() {
        const data = getJSON(`https://functions-smc.azurewebsites.net/api/imgCredentials?code=A55evYwTvr52csgn_TkQxV3FzZb6iDFb4vTjVxzKkCq3AzFuog_2aw==`)
        return data;
    }
}


export default CredentialsAPI