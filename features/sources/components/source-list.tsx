import type { SourceDTO } from "../dto";

import { SourceCard } from "./source-card";

interface Props {
  sources: SourceDTO[];
}

export function SourceList({ sources }: Props) {
  if (!sources.length) {
    return (
      <div className="text-center text-muted-foreground">
        No sources added yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sources.map((source) => (
        <SourceCard
          key={source.id}
          source={source}
        />
      ))}
    </div>
  );
}