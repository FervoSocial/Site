"use client";

import Link from "next/link";
import { useState } from "react";
import { ptBR } from "@/lib/i18n";
import { AuthFrame } from "./AuthFrame";
import { StatusPanel } from "./StatusPanel";

type VerificationState = "required" | "pending" | "approved" | "failed" | "retry";

export function VerifyAgeShell() {
  const copy = ptBR.auth.verification;
  const [state, setState] = useState<VerificationState>("required");
  const [adultConsent, setAdultConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  function startVerification() {
    if (!adultConsent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setState("pending");
  }

  return (
    <AuthFrame title={copy.title} description={copy.description} eyebrow={copy.section}>
      {state === "required" ? (
        <div className="verification-content">
          <div className="verification-note">
            <span aria-hidden="true">◇</span>
            <div>
              <h2>{copy.privacyTitle}</h2>
              <p>{copy.privacyMessage}</p>
            </div>
          </div>
          <div className="verification-note">
            <span aria-hidden="true">i</span>
            <div>
              <h2>{copy.providerTitle}</h2>
              <p>{copy.providerMessage}</p>
            </div>
          </div>
          <label className="check-row verification-consent">
            <input
              type="checkbox"
              checked={adultConsent}
              onChange={(event) => setAdultConsent(event.target.checked)}
              aria-describedby={consentError ? "verification-consent-error" : undefined}
            />
            <span>{copy.adultConsent}</span>
          </label>
          {consentError ? (
            <p className="field-message field-error" id="verification-consent-error" role="alert">
              {copy.consentError}
            </p>
          ) : null}
          <button className="auth-submit" type="button" onClick={startVerification}>
            {copy.start}
          </button>
        </div>
      ) : null}

      {state === "pending" ? (
        <StatusPanel
          tone="waiting"
          title={copy.pendingTitle}
          message={copy.pendingMessage}
          actions={
            <>
              <button className="auth-primary-button" type="button" onClick={() => setState("approved")}>
                {copy.demoApprove}
              </button>
              <button className="auth-secondary-button" type="button" onClick={() => setState("failed")}>
                {copy.demoFail}
              </button>
            </>
          }
        />
      ) : null}

      {state === "approved" ? (
        <StatusPanel
          tone="success"
          title={copy.approvedTitle}
          message={copy.approvedMessage}
          actions={<Link className="auth-primary-link" href="/home">{copy.approvedAction}</Link>}
        />
      ) : null}

      {state === "failed" ? (
        <StatusPanel
          tone="error"
          title={copy.failedTitle}
          message={copy.failedMessage}
          actions={
            <button className="auth-primary-button" type="button" onClick={() => setState("retry")}>
              {copy.retry}
            </button>
          }
        />
      ) : null}

      {state === "retry" ? (
        <StatusPanel
          tone="info"
          title={copy.retryTitle}
          message={copy.retryMessage}
          actions={
            <button className="auth-primary-button" type="button" onClick={() => setState("pending")}>
              {copy.retryAction}
            </button>
          }
        />
      ) : null}
    </AuthFrame>
  );
}
