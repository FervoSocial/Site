import { ptBR } from "@/lib/i18n";
import { Surface } from "./Surface";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="placeholder-page" aria-labelledby="placeholder-title">
      <p className="section-kicker">{ptBR.common.foundation}</p>
      <h1 id="placeholder-title">{title}</h1>
      <p className="placeholder-intro">{description}</p>

      <Surface className="placeholder-card">
        <span className="status-chip">
          <span aria-hidden="true" />
          {ptBR.common.comingSoon}
        </span>
        <p>
          A navegação, o layout e os componentes partilhados já estão ativos.
          O conteúdo desta área será criado numa etapa posterior.
        </p>
      </Surface>
    </section>
  );
}
