import { z } from "zod";

export const PublishingCompanyRegisterScheme = z.object({
    name: z.string({ required_error: "O nome da editora é obrigatório." }).min(3, { message: "O tamanho mínimo de caracteres é 3." }).max(100, { message: "O tamanho máximo de caracteres é 100." }),
});

export type PublishingCompanyRegisterForm = z.infer<typeof PublishingCompanyRegisterScheme>;
