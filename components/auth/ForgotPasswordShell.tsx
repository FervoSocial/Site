"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ptBR } from "@/lib/i18n";
import { AuthFrame } from "./AuthFrame";
import { FormField } from "./FormField";
import { StatusPanel } from "./StatusPanel";

type RecoveryState = "form" | "loading" | "error" | "requested";

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export function ForgotPasswordShell() {
  const copy = ptBR.auth.recovery;
  const [state, setState] = useState<RecoveryState>("form");
  const [email, setEmail] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      setState("error");
      return;
    }
    setState("loading");
    await wait(700);
    setState("requested");
  }

  return (
    <AuthFrame
      title={copy.title}
      description={copy.description}
      footer={
        <p>
          {copy.remember} <Link href="/login">{copy.login}</Link>
        </p>
      }
    >
      {state === "requested" ? (
        <StatusPanel
          tone="success"
          title={copy.requestedTitle}
          message={copy.requestedMessage}
          actions={
            <>
              <Link className="auth-primary-link" href="/login">{copy.login}</Link>
              <button className="auth-text-button" type="button" onClick={() => setState("form")}>
                {copy.tryAnother}
              </button>
            </>
          }
        />
      ) : (
        <form className="auth-form" onSubmit={submit} noValidate>
          {state === "error" ? (
            <StatusPanel tone="error" title={copy.errorTitle} message={copy.errorMessage} />
          ) : null}
          <FormField
            id="recovery-email"
            label={copy.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={state === "loading"}
          />
          <button className="auth-submit" type="submit" disabled={state === "loading"}>
            {state === "loading" ? <span className="button-spinner" aria-hidden="true" /> : null}
            {state === "loading" ? ptBR.auth.common.loading : copy.submit}
          </button>
        </form>
      )}
    </AuthFrame>
  );
}
