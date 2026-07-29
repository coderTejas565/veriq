import { BookOpen } from "lucide-react";

import type { NotebookDTO } from "../types";

import { NotebookCard } from "./notebook-card";

interface Props {
  notebooks: NotebookDTO[];
}

export function NotebookList({
  notebooks,
}: Props) {

  if (!notebooks.length) {
    return (
      <div
        className="
          flex
          min-h-[360px]
          items-center
          justify-center
          rounded-3xl
          border
          border-border/70
          bg-card
        "
      >

        <div
          className="
            flex
            max-w-sm
            flex-col
            items-center
            space-y-4
            px-6
            text-center
          "
        >

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <BookOpen className="h-7 w-7" />
          </div>


          <div className="space-y-2">

            <p
              className="
                text-lg
                font-semibold
                tracking-tight
              "
            >
              No notebooks yet
            </p>


            <p
              className="
                text-sm
                leading-6
                text-muted-foreground
              "
            >
              Create your first AI knowledge workspace
              and start chatting with your documents.
            </p>

          </div>

        </div>

      </div>
    );
  }


  return (
    <div
      className="
        grid
        items-stretch
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >

      {notebooks.map((notebook) => (
        <NotebookCard
          key={notebook.id}
          notebook={notebook}
        />
      ))}

    </div>
  );
}