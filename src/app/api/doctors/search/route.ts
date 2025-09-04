import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Doctor from "../../../../../models/Doctor";
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query) {
      return NextResponse.json(
        { success: false, message: "Please provide a search query" },
        { status: 400 }
      );
    }

 
    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialities: { $regex: query, $options: "i" } },
      ],
    });

    return NextResponse.json({ success: true, doctors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}