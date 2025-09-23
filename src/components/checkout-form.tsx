"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Terminal } from "lucide-react";
import { useEffect } from "react";

type CheckoutFormProps = {
  locale: string;
  dict: any; // Simplified dictionary type for component
  searchParams: { [key: string]: string | string[] | undefined };
};

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Submitting..." : text}
    </Button>
  );
}

export function CheckoutForm({
  locale,
  dict,
  searchParams,
}: CheckoutFormProps) {
  const [state, formAction] = useFormState<FormState, FormData>(
    handleCheckout,
    null
  );

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      plan: (searchParams?.plan as string) || "none",
      name: (state?.fields?.name as string) || "",
      email: (state?.fields?.email as string) || "",
      phone: (state?.fields?.phone as string) || "",
    },
  });

  useEffect(() => {
    if (state?.type === "error") {
      state.issues?.forEach((issue) => {
        const [field, message] = issue.split(":");
        form.setError(field.trim() as keyof CheckoutSchema, {
          type: "manual",
          message: message.trim(),
        });
      });
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        {state?.type === "error" && !state.issues && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {/* Hidden fields */}
        <input type="hidden" name="locale" value={locale} />
        <input
          type="hidden"
          name="plan"
          value={(searchParams?.plan as string) || "none"}
        />
        {Object.entries(searchParams).map(([key, value]) => {
          if (key.startsWith("utm_")) {
            return (
              <input
                type="hidden"
                key={key}
                name={key}
                value={value as string}
              />
            );
          }
          return null;
        })}
        <input type="text" name="honeypot" className="hidden" />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form.name.label}</FormLabel>
              <FormControl>
                <Input placeholder={dict.form.name.placeholder} {...field} />
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
                <Input type="email" placeholder={dict.form.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.form.phone.label}</FormLabel>
              <FormControl>
                <Input type="tel" placeholder={dict.form.phone.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton text={dict.form.submit} />
      </form>
    </Form>
  );
}
