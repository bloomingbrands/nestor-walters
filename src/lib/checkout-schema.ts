import { z } from "zod";

export const checkoutItemSchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().positive().max(99),
});

export const checkoutShippingSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(3).max(50),
  address1: z.string().min(1).max(200),
  address2: z.string().max(200).optional(),
  city: z.string().min(1).max(120),
  state: z.string().min(1).max(120),
  postalCode: z.string().min(2).max(32),
  country: z.string().min(2).max(120),
});

export const createOrderBodySchema = z.object({
  items: z.array(checkoutItemSchema).min(1).max(20),
  shipping: checkoutShippingSchema,
});

export const captureOrderBodySchema = z.object({
  orderID: z.string().min(10),
  items: z.array(checkoutItemSchema).min(1).max(20),
  shipping: checkoutShippingSchema,
});

export type CheckoutShipping = z.infer<typeof checkoutShippingSchema>;
export type CheckoutItem = z.infer<typeof checkoutItemSchema>;
