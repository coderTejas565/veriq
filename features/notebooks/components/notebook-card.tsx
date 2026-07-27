import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { NotebookDTO } from "../types";

interface Props {
  notebook: NotebookDTO;
}

export function NotebookCard({ notebook }: Props) {
  return (
    <Link href={`/notebooks/${notebook.id}`}>
      <Card className="transition hover:shadow-lg">
        <CardHeader>
          <CardTitle>{notebook.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-sm">
            {notebook.description ?? "No description"}
          </p>

          <div className="mt-3 text-xs">{notebook.visibility}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
