import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getUsurApi(id) {
    const url = `${API_HOST}/verperfil?ID=${id}`;

    const params = {
        headers: {
            "Contten-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params)
        .then(response => {
            if (response.status >= 400) throw null;
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}