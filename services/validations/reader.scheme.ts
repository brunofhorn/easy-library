import { z } from "zod";

export const ReaderRegisterScheme = z.object({
    name: z.string({ required_error: "O nome do leitor é obrigatório." }).min(3, { message: "O tamanho mínimo de caracteres é 3." }).max(100, { message: "O tamanho máximo de caracteres é 100." }),
    username: z.string({ required_error: "O nome do usuário é obrigatório." }),
    email: z.string({ required_error: "O e-mail é obrigatório." }).email({ message: "O campo deve ser um e-mail válido." }),
    birthDate: z.string({ required_error: "A data de nascimento é obrigatória." })
});

export type ReaderRegisterForm = z.infer<typeof ReaderRegisterScheme>;
