import { BookOpen } from "lucide-react";

import type { NotebookDTO } from "../types";

import { NotebookCard } from "./notebook-card";

interface Props {
  notebooks: NotebookDTO[];
}

export function NotebookList({ notebooks }: Props) {
  if (!notebooks.length) {
    return (
      <div className="border-border/70 bg-card flex min-h-[360px] items-center justify-center rounded-3xl border">
        <div className="flex max-w-sm flex-col items-center space-y-4 px-6 text-center">
          <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-2xl">
            <BookOpen className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold tracking-tight">
              No notebooks yet
            </p>

            <p className="text-muted-foreground text-sm leading-6">
              Create your first AI knowledge workspace and start chatting with
              your documents.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {notebooks.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
}
