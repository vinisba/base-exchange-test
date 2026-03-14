import * as z from "zod";

export const orderSchema = z.object({
  instrument: z.string().min(1, "Instrumento é obrigatório"),
  price: z.coerce
    .number<number>({ error: "Preço é obrigatório" })
    .min(1, "Preço é obrigatório"),
  quantity: z.coerce
    .number<number>()
    .int("Número inteiro obrigatório")
    .positive("Quantidade maior que zero"),
  side: z.enum(["BUY", "SELL"], "Selecione um lado"),
});

export type OrderData = z.infer<typeof orderSchema>;
