"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";

import { authClient } from "@/lib/auth/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (error) {
          setError(error.message ?? "Unable to create account.");
          return;
        }
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          setError(error.message ?? "Invalid email or password.");
          return;
        }
      }

      router.push("/notebooks");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/70 shadow-primary/5 w-full max-w-lg rounded-3xl shadow-xl">
      <CardHeader className="space-y-5 p-8 pb-6 text-center">
        <div className="bg-primary/10 text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
          <Brain className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            {mode === "signup" ? "Create your VeriQ account" : "Welcome back"}
          </CardTitle>

          <p className="text-muted-foreground text-sm leading-6">
            {mode === "signup"
              ? "Create your AI knowledge workspace."
              : "Continue with your personal knowledge base."}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit} className="space-y-5">
          <fieldset disabled={loading} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="h-12 rounded-xl"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="h-12 rounded-xl"
              />
            </div>

            {error && (
              <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl"
            >
              {loading
                ? mode === "signup"
                  ? "Creating account..."
                  : "Signing in..."
                : mode === "signup"
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
}
