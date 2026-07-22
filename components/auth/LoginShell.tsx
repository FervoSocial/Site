"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ptBR } from "@/lib/i18n";
import { AuthFrame } from "./AuthFrame";
import { FormField } from "./FormField";
import { StatusPanel } from "./StatusPanel";

type LoginState = "default" | "loading" | "error" | "success";

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export function LoginShell() {
  const copy = ptBR.auth.login;
  const [state, setState] = useState<LoginState>("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 1) {
      setState("error");
      return;
    }

    setState("loading");
    await wait(700);
    setState("success");
  }

  return (
    <AuthFrame
      title={copy.title}
      description={copy.description}
      pageClassName="auth-page-login"
      footer={
        <p>
          {copy.noAccount} <Link href="/register">{copy.register}</Link>
        </p>
      }
    >
      {state === "success" ? (
        <StatusPanel
          tone="success"
          title={copy.successTitle}
          message={copy.successMessage}
          actions={<Link className="auth-primary-link" href="/home">{copy.successAction}</Link>}
        />
      ) : (
        <form className="auth-form" onSubmit={submit} noValidate>
          {state === "error" ? (
            <StatusPanel tone="error" title={copy.errorTitle} message={copy.errorMessage} />
          ) : null}
          <FormField
            id="login-email"
            label={copy.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={state === "loading"}
          />
          <FormField
            id="login-password"
            label={copy.password}
            type="password"
            autoComplete="current-password"
            placeholder={copy.passwordPlaceholder}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={state === "loading"}
          />
          <div className="auth-form-row auth-form-row-end">
            <Link href="/forgot-password">{copy.forgot}</Link>
          </div>
          <button className="auth-submit" type="submit" disabled={state === "loading"}>
            {state === "loading" ? <span className="button-spinner" aria-hidden="true" /> : null}
            {state === "loading" ? ptBR.auth.common.loading : copy.submit}
          </button>
        </form>
      )}
    </AuthFrame>
  );
}
