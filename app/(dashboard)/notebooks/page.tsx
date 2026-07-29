import { requireUser } from "@/features/auth/session";

import { getUserNotebooks } from "@/features/notebooks/repositories/notebook.repository";

import { NotebookList } from "@/features/notebooks/components/notebook-list";

import { CreateNotebookDialog } from "@/features/notebooks/components/create-notebook-dialog";

export default async function NotebooksPage() {
  const user = await requireUser();

  const notebooks = await getUserNotebooks(user.id);

  return (
    <main className="page-container space-y-10">
      {/* Dashboard Header */}

      <section className="bg-card flex flex-col gap-6 rounded-3xl border p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-4">
          <div className="bg-muted/50 text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
            VeriQ Workspace
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Notebooks
            </h1>

            <p className="text-muted-foreground max-w-xl text-sm leading-6 sm:text-base">
              Create knowledge spaces, add your documents, and chat with your AI
              assistant.
            </p>
          </div>

          <div className="bg-background text-muted-foreground inline-flex rounded-full border px-3 py-1 text-sm">
            {notebooks.length}{" "}
            {notebooks.length === 1 ? "notebook" : "notebooks"}
          </div>
        </div>

        <div className="shrink-0">
          <CreateNotebookDialog />
        </div>
      </section>

      {/* Notebook Section */}

      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Knowledge Spaces
            </h2>

            <p className="text-muted-foreground text-sm">
              Your AI-powered notebooks.
            </p>
          </div>
        </div>

        <NotebookList notebooks={notebooks} />
      </section>
    </main>
  );
}
