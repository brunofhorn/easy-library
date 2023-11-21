import { z } from "zod";

export const ItemRegisterScheme = z.object({
    title: z.string({ required_error: "O título da obra é obrigatório." }).min(3, { message: "O tamanho mínimo de caracteres é 3." }).max(100, { message: "O tamanho máximo de caracteres é 100." }),
    synopsis: z.string(),
    author: z.string({ required_error: "Selecionar o autor é obrigatório." }),
    publicationYear: z.string({ required_error: "Selecione o ano de publicação." }),
    numberPages: z.string({ required_error: "O número de páginas é obrigatório." }).max(4, { message: "O número máximo de páginas é 2000." }).min(1, { message: "O número mínimo de páginas é 2." }),
    itemTypeId: z.string({ required_error: "Selecione o tipo da obra." }),
    publishingCompanyId: z.string(),
    coverImage: z.string(),
});

export type ItemRegisterForm = z.infer<typeof ItemRegisterScheme>;
