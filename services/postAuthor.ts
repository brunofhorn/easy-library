import { api } from "@/lib/api";
import { IAuthor } from "@interfaces/common";

export async function postAuthor(author: IAuthor) {
    const response = await api.put(`author/${author.id}`, { author });
    return response.status;
}