import { FileText } from "lucide-react";

import type { SourceDTO } from "../dto";
import { SourceCard } from "./source-card";

interface Props {
  sources: SourceDTO[];
}

export function SourceList({ sources }: Props) {
  if (!sources.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
        <div className="bg-muted mb-4 rounded-full p-3">
          <FileText className="text-muted-foreground h-6 w-6" />
        </div>

        <h3 className="text-base font-semibold">No sources yet</h3>

        <p className="text-muted-foreground mt-2 max-w-xs text-sm">
          Add text, PDFs, websites, or YouTube videos to build your
          notebook&apos;s knowledge base.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sources.map((source) => (
        <SourceCard key={source.id} source={source} />
      ))}
    </div>
  );
}
