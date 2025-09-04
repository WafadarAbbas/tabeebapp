import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Hospital from "../../../../models/Hospital";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const hospital = await Hospital.create(body);

    return NextResponse.json(
      { success: true, data: hospital },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const hospitals = await Hospital.find();
    return NextResponse.json({ success: true, data: hospitals });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
