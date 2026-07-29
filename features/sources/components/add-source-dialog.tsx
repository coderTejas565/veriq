"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Plus, FileText } from "lucide-react";

import { addSourceAction } from "../actions/add-source";
import type { SourceType } from "../types";

interface Props {
  notebookId: string;
}

export function AddSourceDialog({ notebookId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const [type, setType] = useState<SourceType>("TEXT");

  const [source, setSource] = useState("");

  function handleSubmit() {
    startTransition(async () => {
      try {
        await addSourceAction({
          notebookId,
          type,
          source,
        });

        setSource("");
        setOpen(false);

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" />
        Add Source
      </DialogTrigger>

      <DialogContent className="rounded-2xl p-6 sm:max-w-lg">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl">Add Knowledge Source</DialogTitle>

          <DialogDescription>
            Add content to your notebook so VeriQ can understand and answer
            questions from it.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Source Type</label>

            <Select
              value={type}
              onValueChange={(value) => setType(value as SourceType)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="TEXT">Text</SelectItem>

                <SelectItem value="PDF" disabled>
                  PDF (Coming Soon)
                </SelectItem>

                <SelectItem value="WEBSITE" disabled>
                  Website (Coming Soon)
                </SelectItem>

                <SelectItem value="YOUTUBE" disabled>
                  YouTube (Coming Soon)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Content</label>

              <span className="text-muted-foreground text-xs">
                {source.length} characters
              </span>
            </div>

            <Textarea
              rows={10}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Paste notes, documentation, articles, or any text..."
              className="border-border/70 bg-muted/20 focus-visible:ring-primary/30 min-h-[240px] resize-none rounded-2xl focus-visible:ring-2"
            />

            <p className="text-muted-foreground text-xs">
              Plain text sources are supported in the MVP.
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={pending || source.trim() === ""}
            className="h-11 w-full rounded-xl"
          >
            <FileText className="mr-2 h-4 w-4" />

            {pending ? "Processing..." : "Add to Notebook"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
