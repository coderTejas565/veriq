import { requireUser } from "@/features/auth/session";
import { getUserNotebooks } from "@/features/notebooks/repositories/notebook.repository";

import { NotebookList } from "@/features/notebooks/components/notebook-list";
import { CreateNotebookDialog } from "@/features/notebooks/components/create-notebook-dialog";

export default async function NotebooksPage() {
  const user = await requireUser();

  const notebooks = await getUserNotebooks(user.id);

  return (
    <main className="container mx-auto space-y-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Notebooks</h1>

          <p className="text-muted-foreground">
            Organize your AI knowledge base
          </p>
        </div>

        <CreateNotebookDialog />
      </div>

      <NotebookList notebooks={notebooks} />
    </main>
  );
}
