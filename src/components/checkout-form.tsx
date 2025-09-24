"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
// THE FIX: Import the useSearchParams hook
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal, ShoppingCart } from "lucide-react";

import { handleCheckout } from "@/app/actions";
import { checkoutSchema, type CheckoutSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CountryCodePicker } from "./country-code-picker";

// Props now only need locale and dict, not searchParams
type CheckoutFormProps = {
  locale: string;
  dict: any;
};

function SubmitButton({ text, price, currency }: { text: string; price?: string; currency?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold"
    >
      <ShoppingCart className="mr-2 h-6 w-6" />
      {pending ? "Processing..." : `${text} ${currency || ''}${price || ''}`}
    </Button>
  );
}

export function CheckoutForm({ locale, dict }: CheckoutFormProps) {
  // THE FIX: Read search params on the client with the hook
  const searchParams = useSearchParams();
  const planName = searchParams.get('planName') ?? 'N/A';
  const devices = searchParams.get('devices') ?? '1';
  const price = searchParams.get('price') ?? '0';
  const currency = searchParams.get('currency') ?? '';
  const planIdentifier = `${planName.toLowerCase().replace(/ /g, '-')}-${devices}-devices`;
  
  const [state, formAction] = useActionState<FormState, FormData>(handleCheckout, null);
  const [countryCode, setCountryCode] = useState("+1");
  const [localPhoneNumber, setLocalPhoneNumber] = useState(
    state?.fields?.phone?.startsWith(countryCode) 
      ? state.fields.phone.substring(countryCode.length) 
      : ""
  );

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    // Set defaultValues using the params we just read
    defaultValues: {
      plan: planIdentifier,
      name: state?.fields?.name || "",
      email: state?.fields?.email || "",
      phone: state?.fields?.phone || "",
    },
  });

  useEffect(() => {
    const combinedPhoneNumber = `${countryCode}${localPhoneNumber}`;
    form.setValue("phone", combinedPhoneNumber, { shouldValidate: true });
  }, [countryCode, localPhoneNumber, form]);

  useEffect(() => {
    if (state?.type === "error") {
      state.issues?.forEach((issue) => {
        if (typeof issue === 'string' && issue.includes(':')) {
          const [field, message] = issue.split(":");
          if (field && message) {
            form.setError(field.trim() as keyof CheckoutSchema, {
              type: "manual",
              message: message.trim(),
            });
          }
        }
      });
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6 mt-6">
        {state?.type === "error" && !state.issues && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {/* Hidden inputs now reliably get their values from the hook */}
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="plan" value={planIdentifier} />
        <input type="hidden" name="planName" value={planName} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="currency" value={currency} />
        <input type="hidden" name="devices" value={devices} />
        <input type="text" name="honeypot" className="hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.name.label}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={dict.form.name.placeholder} 
                    {...field} 
                    defaultValue={state?.fields?.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.email.label}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={dict.form.email.placeholder} 
                    {...field} 
                    defaultValue={state?.fields?.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form.phone.label}</FormLabel>
              <div className="flex gap-2">
                <CountryCodePicker value={countryCode} onChange={setCountryCode} />
                <FormControl>
                  <>
                    <input type="hidden" {...field} />
                    <Input
                      type="tel"
                      placeholder={dict.form.phone.placeholder}
                      value={localPhoneNumber}
                      onChange={(e) => setLocalPhoneNumber(e.target.value)}
                    />
                  </>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          text={dict.form.submit}
          price={price}
          currency={currency}
        />
      </form>
    </Form>
  );
}