import { z } from 'zod';

export const checkoutSchema = z.object({
  plan: z.string().min(1, 'plan: A plan must be selected.'),
  firstName: z.string().min(2, 'firstName: First name must be at least 2 characters.'),
  lastName: z.string().min(2, 'lastName: Last name must be at least 2 characters.'),
  email: z.string().email('email: Please enter a valid email address.'),
  country: z.string().min(1, 'country: Please select your country.'),
  deviceType: z.string().min(1, 'deviceType: Please select your device type.'),
  agreement: z.literal('on', {
    errorMap: () => ({ message: 'agreement: You must agree to the terms.' }),
  }),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;


export const contactSchema = z.object({
    name: z.string().min(2, 'name: Name must be at least 2 characters.'),
    email: z.string().email('email: Please enter a valid email address.'),
    message: z.string().min(10, 'message: Message must be at least 10 characters.'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
