import { CheckCircle2, Clock3, FileText, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { SourceDTO } from "../dto";

interface Props {
  source: SourceDTO;
}

const STATUS = {
  READY: {
    label: "Ready",
    icon: CheckCircle2,
    className:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400",
  },
  PROCESSING: {
    label: "Processing",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
  },
  FAILED: {
    label: "Failed",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
  },
} as const;

export function SourceCard({ source }: Props) {
  const status = STATUS[source.status];
  const StatusIcon = status.icon;

  const characterCount =
    typeof source.metadata?.length === "number" ? source.metadata.length : null;

  return (
    <Card className="group border-border/60 hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">{source.title}</h3>

            <p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">
              {source.type}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <Badge variant="outline" className={status.className}>
            <StatusIcon className="mr-1 h-3.5 w-3.5" />
            {status.label}
          </Badge>

          {characterCount && (
            <span className="text-muted-foreground text-xs">
              {characterCount.toLocaleString()} chars
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
