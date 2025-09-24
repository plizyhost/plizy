'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { saveLead } from '@/lib/sheets';
import type { FormState } from '@/lib/form-state';
import { checkoutSchema, contactSchema } from '@/lib/schemas';
import { generateFaqContent } from '@/ai/flows/dynamic-faq-content';


export async function handleFaq(formData: FormData) {
  // ... (this function is unchanged)
}

export async function handleCheckout(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot check
  if (formData.get('honeypot')) {
    return {
      type: 'error',
      message: 'Spam detected.',
    };
  }

  const parsed = checkoutSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const issues = Object.entries(fieldErrors).map(([field, messages]) => `${field}: ${messages?.join(', ')}`);

    return {
      type: 'error',
      message: "Please correct the errors below.",
      fields: Object.fromEntries(formData.entries()),
      issues: issues,
    };
  }

  const headersList = headers();
  const orderNumber = `SH-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  
  // --- THIS IS THE FIX ---
  // Read the plan details directly from the formData object.
  const planName = formData.get('planName') as string;
  const devices = formData.get('devices') as string;
  const currency = formData.get('currency') as string;
  const price = formData.get('price') as string;

  // Construct the full plan name for the Google Sheet
  const fullPlanName = `${planName} (${devices} Device${devices !== '1' ? 's' : ''})`;
  
  const leadData = {
    timestamp: new Date().toISOString(),
    orderNumber: orderNumber,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    planName: fullPlanName,
    planPrice: `${currency || ''}${price || '0'}`,
    ip: headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? 'IP Not Found',
  };
  
  try {
    await saveLead(leadData);
  } catch (error) {
    console.error('Failed to save lead to Google Sheets:', error);
    return {
      type: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      fields: parsed.data,
    };
  }

  const locale = formData.get('locale') as string || 'en';
  redirect(`/${locale}/thank-you`);
}


export async function handleContact(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // ... (this function is unchanged)
}