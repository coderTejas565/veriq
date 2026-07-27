import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">VeriQ</h1>

      <p>Your AI knowledge workspace</p>

      <div className="flex gap-4">
        <Link href="/sign-in" className="underline">
          Sign In
        </Link>

        <Link href="/sign-up" className="underline">
          Create Account
        </Link>
      </div>
    </main>
  );
}
