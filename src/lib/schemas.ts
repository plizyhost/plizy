import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, 'name: Name must be at least 2 characters.'),
  email: z.string().email('email: Please enter a valid email address.'),
  phone: z.string().min(10, 'phone: Phone number must be at least 10 characters.'),
  plan: z.string().min(1, 'plan: A plan must be selected.'),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;


export const contactSchema = z.object({
    name: z.string().min(2, 'name: Name must be at least 2 characters.'),
    email: z.string().email('email: Please enter a valid email address.'),
    message: z.string().min(10, 'message: Message must be at least 10 characters.'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
