import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, emailOrPhone, password, confirmPassword } = await request.json();

    if (!name || !emailOrPhone || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Email/Phone, Password)." },
        { status: 400 }
      );
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Mock created user
    const newUser = {
      id: "usr_" + Math.floor(1000 + Math.random() * 9000),
      name,
      emailOrPhone,
      role: "VIP Member",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Account created successfully! Welcome, ${name}.`,
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
