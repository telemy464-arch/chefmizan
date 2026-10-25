import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    // Demo authentication check
    // Accepts any valid-looking password or specific demo accounts
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Mock authenticated user object (similar to Laravel Auth::user())
    const user = {
      id: "usr_" + Math.floor(1000 + Math.random() * 9000),
      name: email.toLowerCase().includes("mizan") ? "Chef Mizan" : "Guest Gourmet",
      email: email,
      role: email.toLowerCase().includes("admin") || email.toLowerCase().includes("mizan") ? "Master Chef (Admin)" : "VIP Member",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
      token: "jwt_token_" + Math.random().toString(36).substring(2),
      rememberMe: !!rememberMe,
    };

    return NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name}! Authentication successful.`,
      user,
    });
  } catch (error) {
    console.error("Auth Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication service error. Please try again." },
      { status: 500 }
    );
  }
}
