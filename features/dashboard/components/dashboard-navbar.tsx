import Link from "next/link";
import { Brain, UserCircle } from "lucide-react";

export function DashboardNavbar() {
  return (
    <header className="border-border/70 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Brand */}

        <Link href="/notebooks" className="group flex items-center gap-3">
          <div className="bg-primary/10 text-primary group-hover:bg-primary/15 flex h-10 w-10 items-center justify-center rounded-2xl transition">
            <Brain className="h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <p className="text-base font-semibold tracking-tight">VeriQ</p>

            <p className="text-muted-foreground text-xs">
              AI Knowledge Workspace
            </p>
          </div>
        </Link>

        {/* Account */}

        <button className="border-border/70 bg-card hover:bg-muted flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition">
          <UserCircle className="text-muted-foreground h-5 w-5" />

          <span className="hidden sm:block">Account</span>
        </button>
      </div>
    </header>
  );
}
