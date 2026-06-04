import { useState } from "react";
import { ui } from "~/i18n/ui";

interface Props {
  lang: string;
}

function t(lang: string, key: string): string {
  const dict = ui[lang as keyof typeof ui] ?? ui.es;
  return (dict as Record<string, string>)[key] ?? (ui.es as Record<string, string>)[key] ?? key;
}

export default function ContactForm({ lang }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="text-sm font-medium text-emerald-400">
          {t(lang, "form.exito")}
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all duration-200";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("access_key", "7674ccd6-49b7-4d99-9396-59496784df7b");

        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });

          if (res.ok) {
            setStatus("sent");
            form.reset();
          } else {
            setStatus("error");
          }
        } catch {
          setStatus("error");
        }
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {t(lang, "form.nombre")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t(lang, "form.nombre-placeholder")}
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {t(lang, "form.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t(lang, "form.email-placeholder")}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-[var(--color-text)]"
        >
          {t(lang, "form.asunto")}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder={t(lang, "form.asunto-placeholder")}
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-[var(--color-text)]"
        >
          {t(lang, "form.mensaje")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t(lang, "form.mensaje-placeholder")}
          className={`${inputClasses} resize-y min-h-[120px]`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[var(--color-primary)]/25 hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--color-primary)]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {status === "sending" ? (
          <>
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t(lang, "form.enviando")}
          </>
        ) : (
          t(lang, "form.enviar")
        )}
      </button>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">
            {t(lang, "form.error")}
          </p>
        </div>
      )}
    </form>
  );
}
