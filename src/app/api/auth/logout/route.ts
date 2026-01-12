import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Berhasil logout" })

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  })

  return response
}

export async function GET(request: NextRequest) {
  // Clear the token cookie
  const response = NextResponse.redirect(new URL("/", request.url))

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  })

  return response
}
