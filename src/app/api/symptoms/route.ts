// app/api/symptoms/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Symptom from "../../../../models/Symptom";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // get query param

  try {
    let data;
    if (id) {
      data = await Symptom.findOne({ id: Number(id) });
      if (!data) return NextResponse.json({}, { status: 404 });
    } else {
      data = await Symptom.find();
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch symptoms" }, { status: 500 });
  }
}