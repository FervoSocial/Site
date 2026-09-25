"use client";

import Link from "next/link";
import { useState } from "react";
import { Surface } from "@/components/ui/Surface";
import type { SessionPrincipal } from "@/lib/auth/types";

export function EditProfileShell({ principal }: { principal: SessionPrincipal }) {
  const [displayName, setDisplayName] = useState(principal.displayName);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState(principal.approximateLocationLabel ?? "");

  return (
    <section className="edit-profile-shell" aria-labelledby="edit-profile-title">
      <header>
        <p className="section-kicker">Perfil público</p>
        <h1 id="edit-profile-title">Editar perfil</h1>
        <p>Prepare como sua identidade social será apresentada. Esta primeira superfície é uma prévia segura e ainda não salva alterações.</p>
        <div className="edit-profile-heading-links">
          <Link href="/me">Voltar ao meu perfil</Link>
          <Link href="/me/settings">Conta e configurações</Link>
        </div>
      </header>

      <div className="edit-profile-layout">
        <Surface className="edit-profile-form-card">
          <div className="edit-profile-notice" role="note">
            <span aria-hidden="true">◇</span>
            <div>
              <strong>Prévia de edição</strong>
              <p>A estrutura de dados para biografia, interesses e outras informações opcionais ainda requer aprovação. Nada digitado aqui será enviado ou salvo.</p>
            </div>
          </div>

          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="profile-display-name">Nome público</label>
            <input id="profile-display-name" maxLength={80} value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
            <small>Seu nome legal não é necessário no perfil público.</small>

            <label htmlFor="profile-bio">Sobre</label>
            <textarea id="profile-bio" maxLength={500} rows={6} value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Conte um pouco sobre você, seus interesses e o que procura." />
            <small>{Array.from(bio).length}/500 · não inclua dados privados ou alegações médicas.</small>

            <label htmlFor="profile-location">Localização aproximada</label>
            <input id="profile-location" maxLength={100} value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Cidade ou região ampla" />
            <small>Nunca informe endereço residencial ou coordenadas exatas.</small>

            <fieldset disabled>
              <legend>Informações sociais opcionais</legend>
              <label htmlFor="profile-interests">Interesses</label>
              <input id="profile-interests" placeholder="Disponível após aprovação do modelo de dados" />
              <label htmlFor="profile-languages">Idiomas</label>
              <input id="profile-languages" placeholder="Disponível após aprovação do modelo de dados" />
            </fieldset>

            <div className="edit-profile-actions">
              <Link href="/me">Cancelar</Link>
              <button type="submit" disabled title="Persistência ainda não aprovada">Salvar alterações</button>
            </div>
          </form>
        </Surface>

        <aside className="edit-profile-preview" aria-label="Prévia do perfil">
          <p className="section-kicker">Prévia local</p>
          <div className="edit-profile-preview-orbit" aria-hidden="true">
            {displayName.trim().slice(0, 2).toLocaleUpperCase("pt-BR") || "FS"}
          </div>
          <span>Membro privado</span>
          <h2>{displayName.trim() || "Seu nome público"}</h2>
          <p className="edit-profile-preview-handle">@{principal.handle}</p>
          <p>{location.trim() || "Localização oculta"}</p>
          <blockquote>{bio.trim() || "Sua apresentação aparecerá aqui."}</blockquote>
          <small>Somente nesta prévia · nenhuma alteração foi guardada</small>
        </aside>
      </div>
    </section>
  );
}
