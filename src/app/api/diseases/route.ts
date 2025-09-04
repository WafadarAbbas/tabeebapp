// app/api/diseases/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Disease from "../../../../models/Disease";

export async function GET() {
  try {
    await connectDB();
    const diseases = await Disease.find();
    return NextResponse.json({ success: true, diseases });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
