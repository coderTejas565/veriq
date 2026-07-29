import { Settings, User, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="space-y-8">
      {/* Header */}

      <section className="bg-card rounded-3xl border p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
            <Settings className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <p className="text-muted-foreground mt-2">
              Manage your VeriQ workspace preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Cards */}

      <section className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-3xl border p-6">
          <div className="flex items-center gap-3">
            <User className="text-primary h-5 w-5" />

            <h2 className="font-semibold">Account</h2>
          </div>

          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Manage your profile information and account preferences.
          </p>
        </div>

        <div className="bg-card rounded-3xl border p-6">
          <div className="flex items-center gap-3">
            <Shield className="text-primary h-5 w-5" />

            <h2 className="font-semibold">Security</h2>
          </div>

          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Security controls and authentication settings will appear here.
          </p>
        </div>
      </section>
    </main>
  );
}
