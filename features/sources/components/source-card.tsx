import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import type { SourceDTO } from "../dto";

interface Props {
  source: SourceDTO;
}

export function SourceCard({ source }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {source.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground">
          Type: {source.type}
        </div>

        <div className="text-sm text-muted-foreground">
          Status: {source.status}
        </div>

        {source.metadata && (
          <div className="text-xs text-muted-foreground">
            {JSON.stringify(source.metadata)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}