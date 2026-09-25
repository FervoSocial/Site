export const POST_MEDIA_ATTESTATION_VERSION = "2026-09-create-v1";
export const POST_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const POST_VIDEO_MAX_BYTES = 50 * 1024 * 1024;
export const POST_MEDIA_ACCEPT = "image/jpeg,image/png,image/webp,video/mp4,video/webm";

const supportedMedia = {
  "image/jpeg": { kind: "image", extension: "jpg" },
  "image/png": { kind: "image", extension: "png" },
  "image/webp": { kind: "image", extension: "webp" },
  "video/mp4": { kind: "video", extension: "mp4" },
  "video/webm": { kind: "video", extension: "webm" },
} as const;

export function getSupportedPostMediaKind(mimeType: string): PostMediaKind | null {
  return supportedMedia[mimeType as keyof typeof supportedMedia]?.kind ?? null;
}

export type PostMediaKind = "image" | "video";

export type ValidatedPostMedia = {
  bytes: ArrayBuffer;
  byteSize: number;
  extension: string;
  kind: PostMediaKind;
  mimeType: keyof typeof supportedMedia;
};

export type PostMediaValidation =
  | { ok: true; media: ValidatedPostMedia }
  | {
      ok: false;
      code:
        | "media_empty"
        | "media_invalid_content"
        | "media_too_large"
        | "media_type_unsupported";
    };

function startsWith(bytes: Uint8Array, signature: number[], offset = 0) {
  return signature.every((value, index) => bytes[offset + index] === value);
}

function hasExpectedSignature(mimeType: string, bytes: Uint8Array) {
  if (mimeType === "image/jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]);
  if (mimeType === "image/png") return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (mimeType === "image/webp") {
    return startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8);
  }
  if (mimeType === "video/mp4") return startsWith(bytes, [0x66, 0x74, 0x79, 0x70], 4);
  if (mimeType === "video/webm") return startsWith(bytes, [0x1a, 0x45, 0xdf, 0xa3]);
  return false;
}

export async function validatePostMediaFile(file: File): Promise<PostMediaValidation> {
  const definition = supportedMedia[file.type as keyof typeof supportedMedia];
  if (!definition) return { ok: false, code: "media_type_unsupported" };
  if (file.size <= 0) return { ok: false, code: "media_empty" };

  const maxBytes = definition.kind === "image" ? POST_IMAGE_MAX_BYTES : POST_VIDEO_MAX_BYTES;
  if (file.size > maxBytes) return { ok: false, code: "media_too_large" };

  const bytes = await file.arrayBuffer();
  if (!hasExpectedSignature(file.type, new Uint8Array(bytes))) {
    return { ok: false, code: "media_invalid_content" };
  }

  return {
    ok: true,
    media: {
      bytes,
      byteSize: file.size,
      extension: definition.extension,
      kind: definition.kind,
      mimeType: file.type as keyof typeof supportedMedia,
    },
  };
}
