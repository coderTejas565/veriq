"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createNotebookAction } from "../actions/create-notebook";

export function CreateNotebookDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setLoading(true);

    try {
      const notebook = await createNotebookAction({
        title: formData.get("title"),
        description: formData.get("description"),
      });

      setOpen(false);

      router.push(`/notebooks/${notebook.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>New Notebook</DialogTrigger>

      <DialogContent className="rounded-3xl p-6 shadow-xl sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl">
            <BookOpen className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <DialogTitle className="text-xl font-semibold tracking-tight">
              Create Notebook
            </DialogTitle>

            <DialogDescription className="leading-6">
              Create an AI workspace where VeriQ can learn from your documents
              and answer questions using your knowledge.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Notebook name</label>

            <Input
              name="title"
              placeholder="React Documentation"
              required
              className="bg-background h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Textarea
              name="description"
              placeholder="What knowledge will this notebook contain?"
              rows={4}
              className="bg-background resize-none rounded-xl leading-6"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl"
            >
              {loading ? "Creating..." : "Create Notebook"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
