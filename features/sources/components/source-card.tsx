import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { SourceDTO } from "../dto";

interface Props {
  source: SourceDTO;
}

export function SourceCard({ source }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{source.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-muted-foreground text-sm">Type: {source.type}</div>

        <div className="text-muted-foreground text-sm">
          Status: {source.status}
        </div>

        {source.metadata && (
          <div className="text-muted-foreground text-xs">
            {JSON.stringify(source.metadata)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
