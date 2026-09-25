"use client";

import Link from "next/link";
import { useState } from "react";
import { GalleryShell } from "@/components/profile/GalleryShell";
import { Surface } from "@/components/ui/Surface";
import type { MemberProfileView } from "@/lib/member-profile";

type ProfileTab = "about" | "media" | "posts";

function ProfileDetailGroup({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="member-profile-detail-group">
      <h3>{label}</h3>
      {values.length ? (
        <ul>{values.map((value) => <li key={value}>{value}</li>)}</ul>
      ) : (
        <p>Ainda não informado.</p>
      )}
    </div>
  );
}

const audienceLabels = {
  public: "Público",
  profile: "Somente no perfil",
  only_me: "Só eu",
} as const;

function ProfilePosts({ ownerView, profile }: { ownerView: boolean; profile: MemberProfileView }) {
  const [removedPostIds, setRemovedPostIds] = useState<string[]>([]);
  const visiblePosts = profile.posts.filter((post) => !removedPostIds.includes(post.id));

  async function deletePost(postId: string) {
    if (!window.confirm("Excluir esta publicação? Esta ação não pode ser desfeita nesta versão.")) return;
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (response.ok) setRemovedPostIds((current) => [...current, postId]);
  }

  if (!visiblePosts.length) {
    return (
      <div className="member-profile-empty">
        <span aria-hidden="true">◇</span>
        <h3>Nenhuma publicação visível ainda</h3>
        <p>{ownerView ? "As suas publicações aparecerão aqui." : "As publicações deste perfil aparecerão aqui."}</p>
      </div>
    );
  }

  return (
    <div className="member-profile-post-list">
      {visiblePosts.map((post) => (
        <article key={post.id}>
          <div>
            <span>{audienceLabels[post.audience]}</span>
            <time dateTime={new Date(post.createdAt * 1000).toISOString()}>
              {new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(post.createdAt * 1000)}
            </time>
          </div>
          <p>{post.body}</p>
          {post.media?.kind === "image" ? (
            // Persisted member media is served by the protected same-origin endpoint.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="member-profile-post-media" src={`/api/posts/${post.id}/media`} alt="Mídia da publicação" />
          ) : null}
          {post.media?.kind === "video" ? (
            <video className="member-profile-post-media" src={`/api/posts/${post.id}/media`} controls playsInline preload="metadata" />
          ) : null}
          {ownerView ? (
            <button className="member-profile-post-delete" type="button" onClick={() => deletePost(post.id)}>Excluir</button>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function PrivateMemberProfile({
  ownerView = false,
  profile,
}: {
  ownerView?: boolean;
  profile: MemberProfileView;
}) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("about");
  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <section className="private-profile" aria-labelledby="private-profile-name">
      <header className="member-profile-context">
        <div>
          <p className="section-kicker">{ownerView ? "Seu perfil social" : "Perfil da comunidade"}</p>
          <p>{ownerView
            ? "Sua identidade social na Fervo."
            : "Perfil público pseudônimo · dados privados e de verificação não são exibidos."}</p>
        </div>
        {ownerView ? (
          <div className="member-profile-owner-links" aria-label="Controles do proprietário do perfil">
            <Link className="member-profile-owner-primary" href="/me/profile/edit">Editar perfil</Link>
            <Link href="/me/settings">Conta e configurações</Link>
          </div>
        ) : null}
      </header>

      <Surface className="private-profile-card">
        <div className="private-profile-photo" role="img" aria-label={profile.photoLabel}>
          <span aria-hidden="true">{profile.initials}</span>
          <small>Foto de perfil</small>
        </div>

        <div className="private-profile-copy">
          <div className="member-profile-labels">
            <span className="private-profile-type">{profile.accountLabel}</span>
            <span>{profile.compositionLabel}</span>
          </div>
          <h1 id="private-profile-name">{profile.displayName}</h1>
          <p className="member-profile-handle">@{profile.handle}</p>
          <p className="private-profile-location"><span aria-hidden="true">⌖</span>{profile.approximateLocation}</p>
          <p className="private-profile-bio">{profile.bio}</p>

          <dl className="private-profile-stats" aria-label="Resumo do perfil">
            <div><dt>Adultos vinculados</dt><dd>{profile.members.length}</dd></div>
            <div><dt>Publicações</dt><dd>{profile.postCount}</dd></div>
            <div><dt>Localização</dt><dd aria-label="Localização protegida">≈</dd></div>
          </dl>
        </div>

        <div className={`private-profile-actions ${ownerView ? "private-profile-owner-actions" : ""}`} aria-label={ownerView ? "Ações do seu perfil" : "Ações do perfil"}>
          {ownerView ? (
            <>
              <Link className="private-profile-action private-profile-action-primary" href="/me/profile/edit"><span aria-hidden="true">✎</span>Editar perfil</Link>
              <Link className="private-profile-action" href={`/profile/${profile.handle}`}><span aria-hidden="true">◉</span>Ver como membro</Link>
              <Link className="private-profile-action" href="/me/settings"><span aria-hidden="true">⚙</span>Conta e configurações</Link>
            </>
          ) : (
            <>
              <button type="button" className="private-profile-action private-profile-action-primary" aria-pressed={followed} onClick={() => setFollowed((current) => !current)}><span aria-hidden="true">＋</span>{followed ? "Seguindo" : "Seguir"}</button>
              <button type="button" className="private-profile-action" aria-pressed={saved} onClick={() => setSaved((current) => !current)}><span aria-hidden="true">◇</span>{saved ? "Salvo" : "Salvar"}</button>
              <button type="button" className="private-profile-action" title="Disponível em uma próxima etapa" disabled><span aria-hidden="true">○</span>Acenar</button>
              <Link className="private-profile-action" href="/messages"><span aria-hidden="true">✉</span>Mensagem</Link>
              <button type="button" className="private-profile-action" title="Disponível em uma próxima etapa" disabled><span aria-hidden="true">!</span>Denunciar</button>
              <button type="button" className="private-profile-action" title="Disponível em uma próxima etapa" disabled><span aria-hidden="true">×</span>Bloquear</button>
            </>
          )}
        </div>

        <div className="private-profile-tabs">
          <div className="private-profile-tab-list" role="tablist" aria-label="Conteúdo do perfil">
            {([ ["about", "Sobre"], ["media", "Mídia"], ["posts", "Publicações"] ] as const).map(([id, label]) => (
              <button type="button" role="tab" id={`private-profile-tab-${id}`} aria-controls={`private-profile-tab-panel-${id}`} aria-selected={activeTab === id} onClick={() => setActiveTab(id)} key={id}>{label}</button>
            ))}
          </div>

          <div className="private-profile-tab-panel" id="private-profile-tab-panel-about" role="tabpanel" aria-labelledby="private-profile-tab-about" hidden={activeTab !== "about"}>
            <div className="member-profile-members">
              <div>
                <p className="section-kicker">Estrutura do perfil</p>
                <h2>{profile.compositionLabel}</h2>
                <p>Cada pessoa adulta mantém a própria conta e verificação. O perfil compartilhado é uma camada social vinculada, não uma identidade de verificação única.</p>
              </div>
              <ul>
                {profile.members.map((member) => (
                  <li key={member.displayName}><span aria-hidden="true">✓</span><div><strong>{member.displayName}</strong><small>{member.verificationLabel}</small></div></li>
                ))}
              </ul>
            </div>
            <div className="member-profile-details">
              <ProfileDetailGroup label="Interesses" values={profile.interests} />
              <ProfileDetailGroup label="O que procura" values={profile.lookingFor} />
              <ProfileDetailGroup label="Idiomas" values={profile.languages} />
            </div>
          </div>

          <div className="private-profile-tab-panel private-profile-media-panel" id="private-profile-tab-panel-media" role="tabpanel" aria-labelledby="private-profile-tab-media" hidden={activeTab !== "media"}><GalleryShell /></div>

          <div className="private-profile-tab-panel" id="private-profile-tab-panel-posts" role="tabpanel" aria-labelledby="private-profile-tab-posts" hidden={activeTab !== "posts"}>
            <h2>{ownerView ? "Suas publicações" : "Publicações do perfil"}</h2>
            <p>{ownerView
              ? "Você vê aqui publicações públicas, somente no perfil e privadas para você."
              : "Publicações públicas e marcadas como somente no perfil aparecem aqui."}</p>
            <ProfilePosts ownerView={ownerView} profile={profile} />
          </div>
        </div>
      </Surface>

      {profile.demoNotice ? <p className="private-profile-demo">{profile.demoNotice}</p> : null}
    </section>
  );
}
