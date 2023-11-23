import { z } from "zod";

export const BorrowScheme = z.object({
    date: z.string({ required_error: "A data de início é obrigatória." }),
    returnDate: z.string({ required_error: "A data de início é obrigatória." }),
    borrower: z.string({ required_error: "O leitor é obrigatório." })
});

export type BorrowForm = z.infer<typeof BorrowScheme>;
