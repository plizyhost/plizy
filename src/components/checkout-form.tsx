"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCheckout } from "@/app/actions";
import { checkoutSchema, type CheckoutSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countries } from "@/lib/countries";
import { deviceTypes } from "@/lib/devices";
import { Terminal } from "lucide-react";
import Link from "next/link";
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
      firstName: (state?.fields?.firstName as string) || "",
      lastName: (state?.fields?.lastName as string) || "",
      email: (state?.fields?.email as string) || "",
      country: (state?.fields?.country as string) || "",
      deviceType: (state?.fields?.deviceType as string) || "",
      agreement: state?.fields?.agreement === "on",
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.firstName.label}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.form.firstName.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.lastName.label}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.form.lastName.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.country.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={dict.form.country.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.device.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={dict.form.device.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {deviceTypes.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{dict.form.agreement.label}</FormLabel>
                <FormDescription>
                  {dict.form.agreement.description}{" "}
                  <Link href={`/${locale}/terms`} className="underline">
                    {dict.form.agreement.terms}
                  </Link>{" "}
                  and{" "}
                  <Link href={`/${locale}/privacy`} className="underline">
                    {dict.form.agreement.privacy}
                  </Link>
                  .
                </FormDescription>
                 <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <SubmitButton text={dict.form.submit} />
      </form>
    </Form>
  );
}
