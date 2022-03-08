import api from "./api";
/**
* @param {String} endpoint relative endpoint
* @param {object} body request body
* @param {String} method method can be ["GET","POST","PUT", "DELETE"] | Default
GET
* @param {boolean} transformBody whether to transform the request body from JSON
to FormData | Default false
*/
export async function queryApi(
    endpoint,
    body = null,
    method = "GET",
    transformBody = false,
    token = null
) {
    let error = null;
    let result = null;
    try {
        //Create our config, with the method as the method passed and the new endpoint;
        let config = {
            method,
            url: `${process.env.REACT_APP_API_URL}/${endpoint}`,
        };
        if (body) {
            // If we have a body and the method is GET, the config is the following
            if (method.toUpperCase() === "GET")
                config = {
                    ...config,
                    headers: { "Content-Type": "application/json" },
                    data: body,
                };
            if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
                if (transformBody) {
            // If our method is POST, PUT or PATCH, and we have to transform our body toFormData(for files upload for example)
                        // transform body object to form data entries
                        let bodyFormData = new FormData();
                    for (let [key, value] of Object.entries(body)) {
                        if (value) {
                            if (Array.isArray(value))
                                value.forEach((v) => bodyFormData.append(key, v));
                            else bodyFormData.append(key, value);
                        }
                    }
                    // Change the config to the following
                    config = {
                        ...config,
                        headers: { "Content-Type": "multipart/form-data" },
                        data: bodyFormData,
                    };
                } else {
            // If not keep the content type json and the body will be parsed automatically to json
                    config = {
                        ...config,
                        headers: { "Content-Type": "application/json", },
                        data: body,
                    };
                }
            }
        }
            // Setting authorization token if available with each request
            // This example uses localStorage, feel free to change it to cookie storage or something else.
        // const token = localStorage.getItem("token");
         if (token != null){
            config.headers = { ...config.headers, Authorization: `${token}` }
            //console.log(config)
         }
        // console.log(`Requesting : ${config.url}`)

        // console.log(config)
        const res = await api(config);
        result = res.data;
    } catch (e) {
        // To differentiate between validation errors and response errors,
        // check whether the "errors" key is defined or not in the returned error fromthis function.
        if (e.response) {
            // The request was made and the server responded with a status code that fallsout of the range of 2xx
            error = e.response.data;
            // console.log(e.message);
            // console.log(error);
        } else {
            // 1) The request was made but no response was received
            // OR
            // 2) Something went wrong in setting up the request that triggered an Error
            // console.log(e.request);
            // console.log(e.message);
            error = e.message;
        }
    }
    return [result, error];
}