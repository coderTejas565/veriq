import Link from "next/link";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background */}

      <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent" />

      <div className="bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <section className="relative max-w-4xl text-center">
        {/* Logo */}

        <div className="bg-card text-primary mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-3xl border shadow-sm">
          <Brain className="h-8 w-8" />
        </div>

        <div className="space-y-7">
          {/* Badge */}

          <div className="bg-card/80 text-muted-foreground mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles className="text-primary h-4 w-4" />
            AI Knowledge Workspace
          </div>

          {/* Heading */}

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Turn your knowledge
            <br />
            into an AI assistant.
          </h1>

          {/* Description */}

          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-8">
            Store your documents, build personal knowledge spaces, and chat with
            AI that understands your information.
          </p>

          {/* Actions */}

          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <Link
              href="/sign-up"
              className="bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-medium shadow-sm transition hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/sign-in"
              className="bg-card hover:bg-muted inline-flex items-center justify-center rounded-xl border px-7 py-3 text-sm font-medium transition"
            >
              Sign In
            </Link>
          </div>

          {/* Small trust text */}

          <p className="text-muted-foreground pt-4 text-sm">
            Create your workspace and start chatting with your knowledge.
          </p>
        </div>
      </section>
    </main>
  );
}
