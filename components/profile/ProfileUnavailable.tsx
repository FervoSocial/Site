import Link from "next/link";
import { Surface } from "@/components/ui/Surface";

export function ProfileUnavailable() {
  return (
    <section className="private-profile" aria-labelledby="profile-unavailable-title">
      <p className="section-kicker">Perfil da comunidade</p>
      <Surface className="member-profile-unavailable">
        <span aria-hidden="true">◇</span>
        <h1 id="profile-unavailable-title">Perfil indisponível</h1>
        <p>Este perfil não está disponível para descoberta. Nenhum dado privado ou de verificação foi exibido.</p>
        <Link href="/home">Voltar ao Feed</Link>
      </Surface>
    </section>
  );
}
