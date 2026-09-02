"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { submitContactMessage } from "@/app/contato/actions";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

const PROJECT_TYPES = ["Retrato", "Paisagem", "Evento", "Editorial", "Outro"];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", projectType: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      await submitContactMessage(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none";
  const labelClass = "text-[13px] font-medium text-ink";
  const errorClass = "mt-1.5 text-[13px] text-red-600 dark:text-red-400";

  if (status === "success") {
    return (
      <div className="rounded-md border border-line bg-paper-soft px-6 py-10 text-center" role="status">
        <p className="text-lg font-medium tracking-tight text-ink">Mensagem enviada.</p>
        <p className="mt-2 text-sm text-ink-soft">
          Obrigado pelo contato. Normalmente respondo em até dois dias úteis.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-ink underline underline-offset-4 hover:opacity-70"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nome
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`mt-2 ${inputClass}`}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`mt-2 ${inputClass}`}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefone <span className="text-ink-soft">(opcional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={`mt-2 ${inputClass}`}
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            Tipo de projeto
          </label>
          <select
            id="projectType"
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={`mt-2 ${inputClass}`}
            defaultValue=""
            {...register("projectType")}
          >
            <option value="" disabled>
              Selecione
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id="projectType-error" className={errorClass}>
              {errors.projectType.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`mt-2 resize-none ${inputClass}`}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-[13px] text-red-600 dark:text-red-400">
          Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
