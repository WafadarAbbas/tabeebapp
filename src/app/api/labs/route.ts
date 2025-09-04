import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Lab from "../../../../models/Labs"; // Model alag file me bana hoga

// ✅ GET - fetch all labs
export async function GET(req: Request) {
  try {
    await connectDB();
    const labs = await Lab.find({});
    return NextResponse.json(labs);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch labs", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST - insert labs
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // ek ya multiple lab insert karna
    const labs = Array.isArray(body)
      ? await Lab.insertMany(body)
      : await Lab.create(body);

    return NextResponse.json(labs, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save labs", details: error.message },
      { status: 500 }
    );
  }
}
