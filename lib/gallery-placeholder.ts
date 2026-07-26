export type GallerySection = "public" | "friends" | "private";
export type GalleryTone = "violet" | "gold" | "plum" | "midnight";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  visibility: "Público" | "Amigos";
  tone: GalleryTone;
};

export const galleryItems: Record<"public" | "friends", GalleryItem[]> = {
  public: [
    {
      id: "public-1",
      title: "Noite de música",
      description: "Composição abstrata de luz violeta.",
      visibility: "Público",
      tone: "violet",
    },
    {
      id: "public-2",
      title: "Encontro tranquilo",
      description: "Composição abstrata em dourado e preto.",
      visibility: "Público",
      tone: "gold",
    },
    {
      id: "public-3",
      title: "Fim de semana",
      description: "Composição abstrata em tons de ameixa.",
      visibility: "Público",
      tone: "plum",
    },
    {
      id: "public-4",
      title: "Nosso ritmo",
      description: "Composição abstrata em azul-noturno.",
      visibility: "Público",
      tone: "midnight",
    },
  ],
  friends: [
    {
      id: "friends-1",
      title: "Para amizades",
      description: "Composição abstrata de luz violeta.",
      visibility: "Amigos",
      tone: "violet",
    },
    {
      id: "friends-2",
      title: "Memória compartilhada",
      description: "Composição abstrata em dourado suave.",
      visibility: "Amigos",
      tone: "gold",
    },
  ],
};
