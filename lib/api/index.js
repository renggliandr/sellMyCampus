function createFetchFunction(method) {
    return async (url, params) => {

        const _params = {
            method,
            headers: {
                "content-type": "application/json"
            },
            ...params
        }
        if (_params.token !== undefined) {
            _params.headers["Authorization"] = `Bearer ${_params.token}`
        }


        if (_params.body !== undefined) {
            _params.body = JSON.stringify(_params.body)
        }
        console.log(_params)
        const response = await fetch(url, _params)
        console.log(url)
        console.log(response)
        console.log(_params)

        if (!response.ok) {
            const error = new Error("Request failed with status " + response.status)
            error.response = response
            throw error
        }

        if (response.status === 200) {
            const data = await response.json()
            return data
        }
        console.log(response)
        return response

    }
}

export const getJSON = createFetchFunction("GET")
export const postJSON = createFetchFunction("POST")
export const putJSON = createFetchFunction("PUT")
export const deleteJSON = createFetchFunction("DELETE")
