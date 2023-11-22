import axios from "axios";

export const api = axios.create({
    baseURL: `https://easy-educa-library.vercel.app/api/`,
});
