import type { SourceStatus, SourceType } from "./types";

export interface SourceDTO {
  id: string;

  notebookId: string;

  title: string;

  type: SourceType;

  status: SourceStatus;

  metadata: Record<string, unknown> | null;

  createdAt: Date;

  updatedAt: Date;
}