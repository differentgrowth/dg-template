"use client";

import type { z } from "zod/v4";
import type { ContactFormBlock as ContactFormBlockProps } from "@/payload-types";

import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTiltIcon, SpinnerGapIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { contactEmailSchema } from "@/lib/zod";

type Props = ContactFormBlockProps & {
  className?: string;
};

export function ContactForm({ title, subtitle, className }: Props) {
  const form = useForm<z.infer<typeof contactEmailSchema>>({
    resolver: zodResolver(contactEmailSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      email2: "",
      privacyCheck: false,
    },
  });

  async function onSubmit(values: z.infer<typeof contactEmailSchema>) {
    const result = await fetch("/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (result.ok) {
      form.reset();
      toast.success("Mensaje enviado", {
        description: "Gracias por contactarnos",
      });
    } else {
      toast.error("Algo ha ido mal", {
        description:
          "Vuelve a intentarlo más tarde o prueba otros medios de contacto",
      });
    }
  }

  return (
    <div
      className={cn(
        "container py-12 lg:py-20",
        "prose dark:prose-invert prose-lg",
        className
      )}
    >
      {title ? (
        <h3 className="mx-auto mb-6 w-fit text-balance border-b border-b-primary px-6 pb-1 text-center text-primary">
          {title}
        </h3>
      ) : null}
      {subtitle ? (
        <p className="mx-auto mb-10 max-w-2xl text-balance text-center text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
      <Form {...form}>
        <form
          className="mx-auto max-w-xl space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre:</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Emily"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your email to proceed</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="your@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your email to proceed</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono:</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="612 234 234"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your email to proceed</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Teléfono:</FormLabel>
                <FormControl>
                  <Textarea rows={4} value={value || ""} {...field} />
                </FormControl>
                <FormDescription>Enter your email to proceed</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyCheck"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    He leído y acepto la política de privacidad.
                  </FormLabel>
                </div>
                <FormDescription>
                  Necesitas aceptar los términos y condiciones para continuar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email2"
            render={({ field: { value, ...field } }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    className="sr-only"
                    type="email"
                    value={value || ""}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full justify-end">
            <Button disabled={form.formState.isSubmitting} type="submit">
              Enviar
              {form.formState.isSubmitting ? (
                <SpinnerGapIcon className="size-4 animate-spin" />
              ) : (
                <PaperPlaneTiltIcon className="size-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
