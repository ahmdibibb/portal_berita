import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-card py-8 px-6 shadow-lg rounded-xl border border-gray-100 dark:border-border animate-fade-in-up">
          <div className="text-center">
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
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">
              Buat Akun Baru
        </h2>
            <p className="text-sm text-gray-500">
              Gabung untuk menikmati fitur lengkap
            </p>
      </div>

          <div className="mt-6">
          <RegisterForm />
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
                Sudah punya akun?{" "}
              <Link 
                href="/auth/login" 
                className="font-medium text-red-600 hover:text-red-500"
              >
                  Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
