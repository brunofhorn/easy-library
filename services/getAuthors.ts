import { api } from "@/lib/api";
import axios from "axios";

export async function getAuthors() {
    const { data } = await axios.get("http://localhost:3000/api/authors");
    return data.authors;
}