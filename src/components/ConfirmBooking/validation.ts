import { z } from "zod";

export const FormSchema = z.object({
    firstName: z.string().min(3, {
      message: "name must be at least 3 characters",
    }),
    lastName: z.string().min(3, {
      message: "last name must be at least 3 characters",
    }),
    email: z.string().email(),
    phone: z
      .string()
      .min(11, { message: "phone must be at least 11 characters" })
      .regex(/^01[0125][0-9]{8}$/, { message: "invalid phone" }),
    cardName: z.string().optional(),
    cardNumber: z
      .string({ message: "credit card number is required" })
      .min(16, { message: "credit card number must be at least 16 characters" })
      .max(16, { message: "credit card number must be at most 16 characters" }),
    month: z.string({ message: "month is required" }),
    year: z.string({ message: "year is required" }),
    cvc: z.string().regex(/^[0-9]{3,4}$/, { message: "invalid cvc" }),
  });