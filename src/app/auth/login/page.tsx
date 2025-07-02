import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>Masuk ke akun Anda untuk mengakses fitur lengkap</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center text-sm">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Daftar di sini
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
