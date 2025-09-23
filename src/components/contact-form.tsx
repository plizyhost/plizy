"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { handleContact } from "@/app/actions";
import { contactSchema, type ContactSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/form-state";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : text}
    </Button>
  );
}

export function ContactForm({ dict }: { dict: any }) {
  const [state, formAction] = useFormState<FormState, FormData>(
    handleContact,
    null
  );

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: (state?.fields?.name as string) || "",
      email: (state?.fields?.email as string) || "",
      message: (state?.fields?.message as string) || "",
    },
  });

  useEffect(() => {
    if (state?.type === "success") {
      form.reset();
    }
    if (state?.type === "error") {
      state.issues?.forEach((issue) => {
        const [field, message] = issue.split(":");
        form.setError(field.trim() as keyof ContactSchema, {
          type: "manual",
          message: message.trim(),
        });
      });
    }
  }, [state, form]);

  if (state?.type === "success") {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }

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
        
        <input type="text" name="honeypot" className="hidden" />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.name.label}</FormLabel>
              <FormControl>
                <Input placeholder={dict.name.placeholder} {...field} />
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
              <FormLabel>{dict.email.label}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={dict.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.message.label}</FormLabel>
              <FormControl>
                <Textarea placeholder={dict.message.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text={dict.submit} />
      </form>
    </Form>
  );
}
