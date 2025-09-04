import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "TabeebSecretKey";  

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Dummy users
  const users = [
    { username: "Abbas", password: "123456", role: "doctor" },
    { username: "Wafadar", password: "123456", role: "patient" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // JWT token generate
  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ token, role: user.role });
}
