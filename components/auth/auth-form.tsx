"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
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
              />
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
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
