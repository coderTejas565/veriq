import { gemini } from "@/lib/modules/gemini/client";

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await gemini.models.embedContent({
    model: "gemini-embedding-001",

    contents: text,

    config: {
      outputDimensionality: 768,
    },
  });

  const values = response.embeddings?.[0]?.values;

  if (!values || values.length !== 768) {
    throw new Error(`Invalid embedding size: ${values?.length ?? "none"}`);
  }

  return values;
}
