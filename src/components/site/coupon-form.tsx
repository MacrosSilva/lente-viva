"use client";

import { type FormEvent, useState } from "react";

import { submitContactMessage } from "@/app/contato/actions";
import { contactFormSchema } from "@/lib/contact-schema";

const PROJECT_TYPES = ["Retrato", "Paisagem", "Evento", "Editorial", "Outro"];

type Status = "idle" | "submitting" | "success" | "error";

// The contact form as a coupon to cut out: heading on the stub, fields on the
// body, a perforation of round dots between them.
export function CouponForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactFormSchema.safeParse({ ...data, phone: "" });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await submitContactMessage(parsed.data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const field =
    "block h-[54px] w-full bg-[#3d4a2e] px-4 text-[length:var(--step-body)] text-accent-ink placeholder:text-accent-ink/75 transition-[background-color] focus:bg-[#4a5937] focus:outline-none";
  const err = "mt-1.5 text-[length:var(--step-small)] text-[#f0d8c8]";

  return (
    <div className="relative bg-accent text-accent-ink lg:grid lg:grid-cols-[46%_54%]">
      {/* notches cut into the top and bottom edges at the perforation */}
      <span aria-hidden="true" className="absolute left-[46%] top-0 hidden h-[14px] w-[28px] -translate-x-1/2 rounded-b-full bg-bg lg:block" />
      <span aria-hidden="true" className="absolute bottom-0 left-[46%] hidden h-[14px] w-[28px] -translate-x-1/2 rounded-t-full bg-bg lg:block" />
      <span aria-hidden="true" className="perf-y absolute inset-y-[22px] left-[46%] hidden -translate-x-1/2 lg:block" />

      <div className="flex flex-col justify-between gap-8 p-7 sm:p-12">
        <h2 id="contato-titulo" className="font-display max-w-[13ch] text-[length:var(--step-head)]">
          Reserve uma hora de luz
        </h2>
        <p className="max-w-[36ch]">
          Diga a data, o lugar e a ideia. Respondo em até dois dias úteis com a hora de luz que eu
          escolheria, disponibilidade e orçamento.
        </p>
      </div>

      <span aria-hidden="true" className="perf-x mx-6 block lg:hidden" />

      <div className="p-7 sm:p-12">
        {status === "success" ? (
          <div role="status" className="flex h-full flex-col justify-center">
            <p className="font-display text-[length:var(--step-lead)] italic">Recebido.</p>
            <p className="mt-3">Obrigado. Respondo em até dois dias úteis.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 self-start font-medium underline underline-offset-4 hover:opacity-70"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate aria-labelledby="contato-titulo" className="grid gap-2.5">
            <div>
              <label htmlFor="c-name" className="sr-only">Nome</label>
              <input id="c-name" name="name" autoComplete="name" placeholder="Seu nome" className={field}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-e" : undefined} />
              {errors.name && <p id="c-name-e" className={err}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-email" className="sr-only">Email</label>
              <input id="c-email" name="email" type="email" autoComplete="email" placeholder="Seu email" className={field}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-e" : undefined} />
              {errors.email && <p id="c-email-e" className={err}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="c-type" className="sr-only">Tipo de projeto</label>
              <select id="c-type" name="projectType" defaultValue="" className={field}
                aria-invalid={!!errors.projectType} aria-describedby={errors.projectType ? "c-type-e" : undefined}>
                <option value="" disabled>Tipo de projeto</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.projectType && <p id="c-type-e" className={err}>{errors.projectType}</p>}
            </div>
            <div>
              <label htmlFor="c-msg" className="sr-only">Data, lugar e ideia</label>
              <input id="c-msg" name="message" placeholder="Data, lugar e ideia" className={field}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-msg-e" : undefined} />
              {errors.message && <p id="c-msg-e" className={err}>{errors.message}</p>}
            </div>
            {status === "error" && (
              <p role="alert" className={err}>Não foi possível enviar agora. Tente de novo em instantes.</p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 h-14 w-full bg-ink text-[length:var(--step-body)] font-medium text-paper transition-[transform,background-color] hover:bg-black active:scale-[0.99] disabled:opacity-60"
            >
              {status === "submitting" ? "Enviando…" : "Enviar o pedido"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
