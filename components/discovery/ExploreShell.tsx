"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  exploreResults,
  type ExploreCategory,
} from "@/lib/explore-placeholder";
import { ptBR } from "@/lib/i18n";
import { ExploreResultCard } from "./ExploreResultCard";

type ExploreShellProps = {
  category: ExploreCategory;
};

type ResultState = "results" | "loading" | "empty" | "no-results";
type ResultView = "grid" | "list";

const categoryRoutes: Array<{ category: ExploreCategory; href: string }> = [
  { category: "profiles", href: "/explore/profiles" },
  { category: "clubs", href: "/explore/clubs" },
  { category: "events", href: "/explore/events" },
];

function LoadingState() {
  return (
    <div className="explore-state explore-loading-state" role="status" aria-live="polite">
      <span className="explore-spinner" aria-hidden="true" />
      <div>
        <h2>{ptBR.explore.states.loadingTitle}</h2>
        <p>{ptBR.explore.states.loadingDescription}</p>
      </div>
    </div>
  );
}

function MessageState({
  kind,
  onReset,
}: {
  kind: "empty" | "no-results";
  onReset: () => void;
}) {
  const content = kind === "empty" ? ptBR.explore.states.empty : ptBR.explore.states.noResults;

  return (
    <div className="explore-state" role="status">
      <span className="explore-state-symbol" aria-hidden="true">
        {kind === "empty" ? "◇" : "⌕"}
      </span>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
      <button className="explore-reset-button" type="button" onClick={onReset}>
        {content.action}
      </button>
    </div>
  );
}

export function ExploreShell({ category }: ExploreShellProps) {
  const [query, setQuery] = useState("");
  const [resultState, setResultState] = useState<ResultState>("results");
  const [resultView, setResultView] = useState<ResultView>("grid");
  const copy = ptBR.explore.categories[category];
  const results = exploreResults[category];

  function showResults() {
    setQuery("");
    setResultState("results");
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResultState(query.trim() ? "no-results" : "results");
  }

  return (
    <section className="explore-shell" aria-labelledby="explore-title">
      <header className="explore-heading">
        <p className="section-kicker">{ptBR.explore.eyebrow}</p>
        <h1 id="explore-title">{ptBR.explore.title}</h1>
        <p>{ptBR.explore.description}</p>
      </header>

      <form className="explore-search" role="search" onSubmit={submitSearch}>
        <label htmlFor="explore-search">{ptBR.explore.search.label}</label>
        <div className="explore-search-row">
          <span aria-hidden="true">⌕</span>
          <input
            id="explore-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
          />
          <button type="submit">{ptBR.explore.search.action}</button>
        </div>
        <p>{ptBR.explore.search.notice}</p>
      </form>

      <nav className="explore-categories" aria-label={ptBR.explore.categoriesLabel}>
        {categoryRoutes.map((item) => (
          <Link
            key={item.category}
            href={item.href}
            aria-current={item.category === category ? "page" : undefined}
          >
            {ptBR.explore.categories[item.category].label}
          </Link>
        ))}
      </nav>

      <form className="explore-filter-panel" onReset={showResults}>
        <div className="explore-filter-grid">
          <label>
            <span>{ptBR.explore.filters.location}</span>
            <select defaultValue="sao-paulo">
              <option value="sao-paulo">São Paulo</option>
              <option value="rio-de-janeiro">Rio de Janeiro</option>
              <option value="belo-horizonte">Belo Horizonte</option>
              <option value="curitiba">Curitiba</option>
            </select>
          </label>
          <label>
            <span>{ptBR.explore.filters.distance}</span>
            <select defaultValue="25">
              <option value="10">Até 10 km</option>
              <option value="25">Até 25 km</option>
              <option value="50">Até 50 km</option>
              <option value="100">Até 100 km</option>
            </select>
          </label>
          <label>
            <span>{ptBR.explore.filters.profileType}</span>
            <select defaultValue={category === "professionals" ? "profiles" : category}>
              {categoryRoutes.map((item) => (
                <option value={item.category} key={item.category}>
                  {ptBR.explore.categories[item.category].label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{ptBR.explore.filters.ageRange}</span>
            <select defaultValue="all">
              <option value="all">Todas as idades 18+</option>
              <option value="18-29">18 a 29 anos</option>
              <option value="30-39">30 a 39 anos</option>
              <option value="40-49">40 a 49 anos</option>
              <option value="50+">50 anos ou mais</option>
            </select>
          </label>
        </div>

        <div className="explore-filter-toggles">
          <label>
            <input type="checkbox" />
            <span>{ptBR.explore.filters.verifiedOnly}</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>{ptBR.explore.filters.recentlyActive}</span>
          </label>
          <button type="button" disabled title={ptBR.explore.filters.moreUnavailable}>
            {ptBR.explore.filters.more}
          </button>
          <button type="reset">{ptBR.explore.filters.clear}</button>
        </div>
      </form>

      <div className="explore-results-toolbar">
        <div>
          <p className="section-kicker">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <span>{ptBR.explore.results.demoCount}</span>
        </div>
        <div className="explore-toolbar-controls">
          <label>
            <span>{ptBR.explore.sort.label}</span>
            <select defaultValue="relevance">
              <option value="relevance">{ptBR.explore.sort.relevance}</option>
              <option value="distance">{ptBR.explore.sort.distance}</option>
              <option value="recent">{ptBR.explore.sort.recent}</option>
              <option value="newest">{ptBR.explore.sort.newest}</option>
              <option value="next-event">{ptBR.explore.sort.nextEvent}</option>
            </select>
          </label>
          <div className="explore-view-toggle" aria-label={ptBR.explore.view.label}>
            <button
              type="button"
              aria-pressed={resultView === "grid"}
              onClick={() => setResultView("grid")}
            >
              {ptBR.explore.view.grid}
            </button>
            <button
              type="button"
              aria-pressed={resultView === "list"}
              onClick={() => setResultView("list")}
            >
              {ptBR.explore.view.list}
            </button>
          </div>
        </div>
      </div>

      <details className="explore-state-preview">
        <summary>{ptBR.explore.states.preview}</summary>
        <div>
          <button type="button" aria-pressed={resultState === "results"} onClick={() => setResultState("results")}>
            {ptBR.explore.states.resultsLabel}
          </button>
          <button type="button" aria-pressed={resultState === "loading"} onClick={() => setResultState("loading")}>
            {ptBR.explore.states.loadingLabel}
          </button>
          <button type="button" aria-pressed={resultState === "empty"} onClick={() => setResultState("empty")}>
            {ptBR.explore.states.emptyLabel}
          </button>
          <button type="button" aria-pressed={resultState === "no-results"} onClick={() => setResultState("no-results")}>
            {ptBR.explore.states.noResultsLabel}
          </button>
        </div>
      </details>

      {resultState === "results" ? (
        <div className={`explore-results explore-results-${resultView}`}>
          {results.map((result) => (
            <ExploreResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : null}
      {resultState === "loading" ? <LoadingState /> : null}
      {resultState === "empty" ? <MessageState kind="empty" onReset={showResults} /> : null}
      {resultState === "no-results" ? <MessageState kind="no-results" onReset={showResults} /> : null}
    </section>
  );
}
