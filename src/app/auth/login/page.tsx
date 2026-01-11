import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-none dark:bg-card dark:border-border animate-fade-in-up">
          <CardHeader className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/Logo.svg"
                alt="Portal Berita"
                width={140}
                height={40}
                className="mx-auto mb-2"
                priority
              />
            </Link>
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk mengakses fitur lengkap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center text-sm">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline"
              >
                Daftar di sini
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
