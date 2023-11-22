import { api } from "@/lib/api";

export async function getAuthors() {
    const { data } = await api.get("authors");
    return data.authors;
}