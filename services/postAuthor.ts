import { api } from "@/lib/api";
import { IAuthor } from "@interfaces/common";
import axios from "axios";

export async function postAuthor(author: IAuthor) {
    const response = await axios.put(`http://localhost:3000/api/author/${author.id}`, { author });
    return response.status;
}