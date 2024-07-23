import { getToken } from "@/lib/auth";


export default class ApiProxy {

    static async getHeaders(requireAuth) {
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        const authToken = getToken();
        if (authToken && requireAuth) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }
        return headers;
    }

    static async handleFetch(endpoint, requestOptions) {
        let data = {};
        let status = 200;
        try {
            const response = await fetch(endpoint,
                requestOptions);
            data = await response.json();
        } catch (error) {
            data = {message: "Cannot reach API server.",
                error: error,
            }
            status = 500;
        }
        return {data, status};
    }

    static async handleBlob(endpoint, requestOptions) {
        let data = {};
        let status = 200;
        let response;
        try {
            response = await fetch(endpoint,
                requestOptions);
            // data = await response.blob();
        } catch (error) {
            data = {message: "Cannot reach API server.",
                error: error,
            }
            status = 500;
            response = data;
        }
        return {response, status};
    }
    
    static async post(endpoint, object, requireAuth) {
        const jsonData = JSON.stringify(object);

        const headers = await ApiProxy.getHeaders(requireAuth);
        const requestOptions = {
            method: "POST",
            headers,
            body: jsonData,
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions);
    }

    static async put(endpoint, object, requireAuth) {
        const jsonData = JSON.stringify(object);

        const headers = await ApiProxy.getHeaders(requireAuth);
        const requestOptions = {
            method: "PUT",
            headers,
            body: jsonData,
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions);
    }

    static async get(endpoint, requireAuth) {

        const headers = await ApiProxy.getHeaders(requireAuth);
        const requestOptions = {
            method: "GET",
            headers,
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions);
    }

    static async delete(endpoint, requireAuth) {

        const headers = await ApiProxy.getHeaders(requireAuth);
        const requestOptions = {
            method: "DELETE",
            headers,
        }
        return await ApiProxy.handleFetch(endpoint, requestOptions);
    }

    static async get_download(endpoint) {
        const authToken = getToken();
        const requestOptions = {  
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
        }
        return await ApiProxy.handleBlob(endpoint, requestOptions);
    }
}