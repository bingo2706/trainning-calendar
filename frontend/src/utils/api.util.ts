import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
export async function api(config: AxiosRequestConfig, authen = true) {
    if (!config.url?.startsWith("http")) {
        config.url = `http://localhost:8003${config.url}`;
    }
    if (config.method === "post") {
        config.data = trimAllStrings(config.data);
    }
    try {
        const response: AxiosResponse = await axios(config);

        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.message);
    }
}
function trimAllStrings(obj: any): any {
    if (typeof obj === "string") {
        return obj.trim();
    }

    if (typeof obj === "object" && !(obj instanceof FormData)) {
        if (Array.isArray(obj)) {
            // If it's an array, recursively trim each element
            return obj.map((item) => trimAllStrings(item));
        } else {
            // If it's an object, recursively trim each property value
            const trimmedObject: { [key: string]: any } = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    trimmedObject[key] = trimAllStrings(obj[key]);
                }
            }
            return trimmedObject;
        }
    }

    // Return non-string values as is
    return obj;
}
