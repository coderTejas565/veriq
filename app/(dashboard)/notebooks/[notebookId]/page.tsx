import { notFound } from "next/navigation";

import { requireUser } from "@/features/auth/session";
import { getNotebookById } from "@/features/notebooks/repositories/notebook.repository";


interface Props {
  params: Promise<{
    notebookId: string;
  }>;
}


export default async function NotebookPage({
  params,
}: Props) {

  const { notebookId } = await params;

  const user = await requireUser();


  const notebook =
    await getNotebookById(
      notebookId,
      user.id
    );


  if (!notebook) {
    notFound();
  }


  return (
    <main className="container mx-auto py-10 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          {notebook.title}
        </h1>

        <p className="text-muted-foreground">
          {notebook.description ??
            "No description"}
        </p>
      </div>


      <div className="rounded-lg border p-6">
        <h2 className="font-semibold">
          Sources
        </h2>

        <p className="text-sm text-muted-foreground">
          No sources added yet.
        </p>
      </div>


      <div className="rounded-lg border p-6">
        <h2 className="font-semibold">
          Chat
        </h2>

        <p className="text-sm text-muted-foreground">
          Ask questions about your knowledge base.
        </p>
      </div>


    </main>
  );
}