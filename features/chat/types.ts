export interface ChatMessageDTO {
  id: string;

  notebookId: string;

  role: "USER" | "ASSISTANT" | "SYSTEM";

  content: string;

  createdAt: Date;
}

export interface RetrievedChunk {
  id: string;

  content: string;

  sourceId: string;

  similarity: number;
}
