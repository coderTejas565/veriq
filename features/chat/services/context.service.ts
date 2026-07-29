import type { RetrievedChunk } from "../types";

export function buildContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return "No relevant context found.";
  }

  return chunks
    .map((chunk, index) => `Document ${index + 1}:\n${chunk.content}`)
    .join("\n\n---\n\n");
}
