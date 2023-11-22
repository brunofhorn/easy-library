import { api } from "@/lib/api";
import axios from "axios";

export async function getAuthor(id: string) {
    const { data } = await axios.get(`http://localhost:3000/api/author/${id}`);
    return data.author;
}