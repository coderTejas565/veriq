import type { NotebookDTO } from "../types";

import { NotebookCard } from "./notebook-card";

interface Props {
  notebooks: NotebookDTO[];
}

export function NotebookList({ notebooks }: Props) {
  if (!notebooks.length) {
    return (
      <div className="text-muted-foreground text-center">No notebooks yet.</div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notebooks.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
}
