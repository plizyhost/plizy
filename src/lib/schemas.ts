import { z } from 'zod';

// The schema should only validate the fields a user can see and interact with.
export const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number including country code.'),
  plan: z.string().min(1, 'A plan must be selected.'), // This is the unique plan slug
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

export const contactSchema = z.object({
    name: z.string().min(2, 'name: Name must be at least 2 characters.'),
    email: z.string().email('email: Please enter a valid email address.'),
    message: z.string().min(10, 'message: Message must be at least 10 characters.'),
});

export type ContactSchema = z.infer<typeof contactSchema>;