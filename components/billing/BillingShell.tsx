import Link from "next/link";
import { Surface } from "@/components/ui/Surface";
import {
  billingPeriods,
  billingPlaceholder,
  formatBRL,
  getPlanAmount,
  planGroups,
} from "@/lib/billing-placeholder";
import { ptBR } from "@/lib/i18n";

const copy = ptBR.billing;

export function BillingShell() {
  const currentPlan = planGroups[0].plans[0];
  const currentPeriod = billingPeriods[0];
  const currentAmount = getPlanAmount(currentPlan.id, currentPeriod.priceField);
  const foundingOffer = billingPlaceholder.foundingClubOffer;

  return (
    <section className="billing-shell" aria-labelledby="billing-title">
      <Link className="billing-back" href="/me/settings">
        <span aria-hidden="true">←</span>
        {copy.backToAccount}
      </Link>

      <header className="billing-heading">
        <p className="section-kicker">{copy.eyebrow}</p>
        <h1 id="billing-title">{copy.title}</h1>
        <p>{copy.description}</p>
      </header>

      <Surface className="billing-current-plan">
        <div className="billing-section-heading">
          <div>
            <p className="billing-label">{copy.currentPlan}</p>
            <h2>{currentPlan.label}</h2>
            <p>{copy.currentPlanDescription}</p>
          </div>
          <span className="billing-status"><span aria-hidden="true" />{copy.demoStatus}</span>
        </div>

        <div className="billing-current-grid">
          <div><span>{copy.planStatus}</span><strong>{copy.activeDemo}</strong></div>
          <div><span>{copy.billingPeriod}</span><strong>{currentPeriod.label}</strong></div>
          <div><span>{copy.currentAmount}</span><strong>{formatBRL(currentAmount)}</strong></div>
          <div><span>{copy.nextCharge}</span><strong>{copy.notScheduled}</strong></div>
          <div><span>{copy.paymentMethod}</span><strong>{copy.notAdded}</strong></div>
          <div><span>{copy.subscriptionType}</span><strong>{copy.fictionalSubscription}</strong></div>
        </div>

        <div className="billing-actions" aria-label={copy.accountControls}>
          <button type="button" disabled>{copy.managePayment}</button>
          <button type="button" disabled>{copy.viewInvoices}</button>
          <button type="button" className="billing-danger-action" disabled>{copy.cancel}</button>
        </div>
      </Surface>

      <section className="billing-period-section" aria-labelledby="billing-periods-title">
        <div className="billing-section-heading">
          <div>
            <p className="billing-label">{copy.periodComparison}</p>
            <h2 id="billing-periods-title">{copy.compareTitle}</h2>
            <p>{copy.compareDescription}</p>
          </div>
        </div>

        <div className="billing-period-grid" aria-label={copy.periodOptions}>
          {billingPeriods.map((period) => (
            <div className="billing-period-card" key={period.id}>
              <span>{period.shortLabel}</span>
              <strong>{period.label}</strong>
              <small>
                {period.discount_percent > 0
                  ? copy.discount.replace("{discount}", String(period.discount_percent))
                  : copy.noDiscount}
              </small>
              <button type="button" disabled>{copy.comparePeriod}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="billing-plans" aria-labelledby="billing-plans-title">
        <div className="billing-section-heading">
          <div>
            <p className="billing-label">{copy.availablePlans}</p>
            <h2 id="billing-plans-title">{copy.chooseTitle}</h2>
            <p>{copy.chooseDescription}</p>
          </div>
        </div>

        {planGroups.map((group) => (
          <section className="billing-plan-group" aria-labelledby={`billing-group-${group.id}`} key={group.id}>
            <div className="billing-plan-group-heading">
              <div>
                <h3 id={`billing-group-${group.id}`}>{group.label}</h3>
                <p>{group.description}</p>
              </div>
              {group.gated ? <span className="billing-gate-badge">{copy.gated}</span> : null}
            </div>

            {group.gated ? (
              <div className="billing-gate-notice" role="note">
                <span aria-hidden="true">◇</span>
                <p><strong>{copy.professionalGateTitle}</strong>{copy.professionalGateDescription}</p>
              </div>
            ) : null}

            <div className="billing-plan-grid">
              {group.plans.map((plan) => (
                <Surface className={`billing-plan-card${group.gated ? " billing-plan-card-gated" : ""}`} key={plan.id}>
                  <div className="billing-plan-title">
                    <div><h4>{plan.label}</h4><p>{plan.summary}</p></div>
                    {plan.id === billingPlaceholder.currentPlanId ? <span>{copy.currentBadge}</span> : null}
                  </div>

                  <div className="billing-price-list">
                    {billingPeriods.map((period) => {
                      const total = getPlanAmount(plan.id, period.priceField);
                      const monthlyEquivalent = total / period.months;

                      return (
                        <div key={period.id}>
                          <span>{period.label}</span>
                          <strong>{formatBRL(total)}</strong>
                          <small>
                            {period.months > 1
                              ? copy.monthlyEquivalent.replace("{amount}", formatBRL(monthlyEquivalent))
                              : copy.perMonth}
                          </small>
                        </div>
                      );
                    })}
                  </div>

                  <button type="button" className="billing-select-plan" disabled>
                    {group.gated ? copy.awaitingApproval : copy.selectPlan}
                  </button>
                </Surface>
              ))}
            </div>
          </section>
        ))}
      </section>

      <Surface className="billing-founding-offer">
        <span className="billing-offer-icon" aria-hidden="true">✦</span>
        <div>
          <p className="billing-label">{copy.foundingEyebrow}</p>
          <h2>{foundingOffer.name}</h2>
          <p>
            {copy.foundingDescription
              .replace("{months}", String(foundingOffer.free_months))}
          </p>
          <ul>
            <li>{foundingOffer.no_card_required ? copy.noCardRequired : copy.paymentRequired}</li>
            <li>{!foundingOffer.auto_paid_conversion ? copy.neverAutoConverts : copy.mayAutoConvert}</li>
            <li>{copy.activePurchaseRequired}</li>
          </ul>
        </div>
        <button type="button" disabled>{copy.previewOffer}</button>
      </Surface>

      <Surface className="billing-change-info">
        <section>
          <h2>{copy.upgradeTitle}</h2>
          <p>{copy.upgradeDescription}</p>
          <button type="button" disabled>{copy.previewChanges}</button>
        </section>
        <section>
          <h2>{copy.downgradeTitle}</h2>
          <p>{copy.downgradeDescription}</p>
          <button type="button" disabled>{copy.previewChanges}</button>
        </section>
        <section>
          <h2>{copy.cancellationTitle}</h2>
          <p>{copy.cancellationDescription}</p>
          <button type="button" disabled>{copy.cancel}</button>
        </section>
      </Surface>

      <p className="billing-placeholder-notice">{copy.placeholderNotice}</p>
    </section>
  );
}
