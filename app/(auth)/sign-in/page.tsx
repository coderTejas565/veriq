import { AuthForm } from "@/components/auth/auth-form";

export default function SigninPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthForm mode="signin" />
    </div>
  );
}
