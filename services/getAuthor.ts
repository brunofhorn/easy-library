import { api } from "@/lib/api";

export async function getAuthor(id: string) {
    const { data } = await api.get(`author/${id}`);
    return data.author;
}