"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/client";
import { AlertFeedback } from "../ui/alert-feedback";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .refine(
        (value) => value.trim().split(" ").length >= 2,
        "Por favor, insira um sobrenome",
      ),
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["password"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

export function SignupForm() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpData) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setError("root.server", ctx.error);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="John Doe"
                autoComplete="off"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder="m@example.com"
                autoComplete="off"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: passwordField,
            fieldState: passwordFieldState,
          }) => (
            <Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field data-invalid={passwordFieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...passwordField}
                    id="password"
                    type="password"
                    aria-invalid={passwordFieldState.invalid}
                  />
                </Field>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: confirmationField }) => (
                    <Field data-invalid={passwordFieldState.invalid}>
                      <FieldLabel htmlFor="confirm-password">
                        Confirmar senha
                      </FieldLabel>
                      <Input
                        {...confirmationField}
                        id="confirm-password"
                        type="password"
                        aria-invalid={passwordFieldState.invalid}
                      />
                    </Field>
                  )}
                />
              </Field>
              {passwordFieldState.invalid && (
                <FieldError errors={[passwordFieldState.error]} />
              )}
              {!passwordFieldState.invalid && !passwordField.value && (
                <FieldDescription>
                  A senha deve ter pelo menos 8 caracteres
                </FieldDescription>
              )}
            </Field>
          )}
        />
        {errors.root?.server && (
          <AlertFeedback
            description={
              errors.root.server.message || "Ocorreu um erro ao criar a conta."
            }
          />
        )}
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar conta"}
          </Button>
          <FieldDescription className="text-center">
            Você já possui uma conta? <Link href="/sign-in">Acessar</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
