import { z } from "zod";

export const AuthorRegisterScheme = z.object({
    name: z.string({ required_error: "O nome do autor é obrigatório." }).min(3, { message: "O tamanho mínimo de caracteres é 3." }).max(100, { message: "O tamanho máximo de caracteres é 100." }),
    nationality: z.string({ required_error: "Selecione uma nacionalidade para o autor." }),
    avatar: z.string().optional()
});

export type AuthorRegisterForm = z.infer<typeof AuthorRegisterScheme>;
