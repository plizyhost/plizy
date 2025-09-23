'use server';

import { generateFaqContent } from '@/ai/flows/dynamic-faq-content';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { z } from 'zod';
import { saveLead } from '@/lib/sheets';
import type { FormState } from '@/lib/form-state';
import { checkoutSchema, contactSchema } from '@/lib/schemas';

export async function handleFaq(formData: FormData) {
  const question = formData.get('question') as string;
  const pathname = headers().get('referer') || '/';

  if (!question) {
    return;
  }

  try {
    const result = await generateFaqContent({ question });
    const answer = result.answer;

    const url = new URL(pathname);
    url.searchParams.set('q', question);
    url.searchParams.set('a', answer);

    redirect(url.toString());
  } catch (error) {
    console.error('Error generating FAQ content:', error);
    const url = new URL(pathname);
    url.searchParams.set('q', question);
    url.searchParams.set('error', 'Failed to generate an answer. Please try again.');
    redirect(url.toString());
  }
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
    return {
      type: 'error',
      message: "Please correct the errors below.",
      fields: Object.fromEntries(formData.entries()),
      issues: parsed.error.issues.map(issue => issue.message),
    };
  }

  const headersList = headers();
  const leadData = {
    ...parsed.data,
    timestamp: new Date().toUTCString(),
    locale: formData.get('locale') as string,
    userAgent: headersList.get('user-agent'),
    referrer: headersList.get('referer'),
    ip: headersList.get('x-forwarded-for'),
    utm_source: formData.get('utm_source') as string | undefined,
    utm_medium: formData.get('utm_medium') as string | undefined,
    utm_campaign: formData.get('utm_campaign') as string | undefined,
    utm_term: formData.get('utm_term') as string | undefined,
    utm_content: formData.get('utm_content') as string | undefined,
  };
  
  try {
    // Here you would implement rate limiting based on IP address
    await saveLead(leadData);
  } catch (error) {
    console.error('Failed to save lead to Google Sheets:', error);
    return {
      type: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      fields: parsed.data,
    };
  }

  const locale = formData.get('locale') || 'en';
  redirect(`/${locale}/thank-you`);
}


export async function handleContact(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  if (formData.get('honeypot')) {
    return { type: 'success', message: 'Thank you for your message!' };
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));
  
  if (!parsed.success) {
    return {
      type: 'error',
      message: 'Please correct the errors below.',
      fields: Object.fromEntries(formData.entries()),
      issues: parsed.error.issues.map(issue => issue.message),
    };
  }

  // TODO: Implement sending email to admin
  console.log('New contact form submission:', parsed.data);

  return {
    type: 'success',
    message: 'Thank you for your message! We will get back to you shortly.',
  };
}
