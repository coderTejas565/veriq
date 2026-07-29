import Link from "next/link";
import { BookOpen, Settings, Sparkles } from "lucide-react";

const navigation = [
  {
    name: "Notebooks",
    href: "/notebooks",
    icon: BookOpen,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  return (
    <aside className="border-border/70 bg-background fixed left-0 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r lg:block">
      <div className="flex h-full flex-col px-4 py-6">
        {/* Navigation */}

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="group text-muted-foreground hover:bg-primary/5 hover:text-foreground flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
              >
                <Icon className="group-hover:text-primary h-5 w-5 transition-colors" />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card */}

        <div className="border-border/70 bg-card mt-auto overflow-hidden rounded-2xl border p-4">
          <div className="bg-primary/10 text-primary mb-3 flex h-9 w-9 items-center justify-center rounded-xl">
            <Sparkles className="h-4 w-4" />
          </div>

          <p className="text-sm font-semibold">VeriQ AI</p>

          <p className="text-muted-foreground mt-1 text-xs leading-5">
            Chat with your documents using your personal knowledge base.
          </p>
        </div>
      </div>
    </aside>
  );
}
