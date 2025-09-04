import { NextResponse } from "next/server";
import { connectDB }from "../../../../../lib/mongodb";
import Hospital from "../../../../../models/Hospital";
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { success: false, message: "City is required" },
        { status: 400 }
      );
    }

    const hospitals = await Hospital.find({
      city: { $regex: city, $options: "i" },
    });

    return NextResponse.json({ success: true, data: hospitals });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}