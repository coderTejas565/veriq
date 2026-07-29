import Link from "next/link";
import { BookOpen, Lock, Globe } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { NotebookDTO } from "../types";

interface Props {
  notebook: NotebookDTO;
}

export function NotebookCard({ notebook }: Props) {
  const isPrivate = notebook.visibility === "PRIVATE";

  return (
    <Link href={`/notebooks/${notebook.id}`} className="group block h-full">
      <Card className="border-border/70 bg-card hover:border-primary/20 relative h-full overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* subtle hover background */}
        <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="relative space-y-5 pb-4">
          <div className="flex items-start justify-between">
            <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>

            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            >
              {isPrivate ? (
                <>
                  <Lock className="h-3 w-3" />
                  Private
                </>
              ) : (
                <>
                  <Globe className="h-3 w-3" />
                  Public
                </>
              )}
            </Badge>
          </div>

          <CardTitle className="group-hover:text-primary line-clamp-1 text-xl font-semibold tracking-tight transition-colors">
            {notebook.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative pb-6">
          <p className="text-muted-foreground line-clamp-3 text-sm leading-6">
            {notebook.description ??
              "Create an AI workspace and chat with your personal knowledge base."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
