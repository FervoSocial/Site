"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ptBR } from "@/lib/i18n";
import { AuthFrame } from "./AuthFrame";
import { FormField } from "./FormField";
import { StatusPanel } from "./StatusPanel";

type RegisterState = "default" | "loading" | "error" | "success";

export function RegisterShell() {
  const copy = ptBR.auth.register;
  const [state, setState] = useState<RegisterState>("default");
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [adultConsent, setAdultConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid =
      accountType &&
      email.includes("@") &&
      username.trim().length >= 3 &&
      birthDate &&
      password.length >= 12 &&
      adultConsent &&
      termsConsent;

    if (!valid) {
      setState("error");
      return;
    }

    setState("loading");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountType, email, username, birthDate, password, adultConsent, termsConsent }),
      });
      if (!response.ok) throw new Error("registration_failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <AuthFrame
      title={copy.title}
      description={copy.description}
      footer={
        <p>
          {copy.haveAccount} <Link href="/login">{copy.login}</Link>
        </p>
      }
    >
      {state === "success" ? (
        <StatusPanel
          tone="success"
          title={copy.successTitle}
          message={copy.successMessage}
          actions={<Link className="auth-primary-link" href="/verify-age">{copy.successAction}</Link>}
        />
      ) : (
        <form className="auth-form" onSubmit={submit} noValidate>
          {state === "error" ? (
            <StatusPanel tone="error" title={copy.errorTitle} message={copy.errorMessage} />
          ) : null}
          <FormField
            kind="select"
            id="register-account-type"
            label={copy.accountType}
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            disabled={state === "loading"}
          >
            <option value="">{copy.accountTypePlaceholder}</option>
            <option value="private">{copy.accountTypes.private}</option>
            <option value="club_business">{copy.accountTypes.club}</option>
            <option value="event_organizer">{copy.accountTypes.organizer}</option>
            <option value="professional">{copy.accountTypes.professional}</option>
          </FormField>
          <div className="auth-form-grid">
            <FormField
              id="register-email"
              label={copy.email}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={state === "loading"}
            />
            <FormField
              id="register-username"
              label={copy.username}
              type="text"
              autoComplete="username"
              hint={copy.usernameHint}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={state === "loading"}
            />
            <FormField
              id="register-birth-date"
              label={copy.birthDate}
              type="date"
              autoComplete="bday"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              disabled={state === "loading"}
            />
            <FormField
              id="register-password"
              label={copy.password}
              type="password"
              autoComplete="new-password"
              hint={copy.passwordHint}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={state === "loading"}
            />
          </div>
          <div className="consent-group">
            <label className="check-row">
              <input
                type="checkbox"
                checked={adultConsent}
                onChange={(event) => setAdultConsent(event.target.checked)}
                disabled={state === "loading"}
              />
              <span>{copy.adultConsent}</span>
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={termsConsent}
                onChange={(event) => setTermsConsent(event.target.checked)}
                disabled={state === "loading"}
              />
              <span>{copy.termsConsent}</span>
            </label>
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
