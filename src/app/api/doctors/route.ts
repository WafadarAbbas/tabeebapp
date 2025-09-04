import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Doctor from "../../../../models/Doctor";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      name,
      number,
      address,
      locations,
      specialities,
      description,
      experience,
      stars,
      videoConsultations,
      hospitals,
    } = await req.json();

    const doctor = await Doctor.create({
      name,
      number,
      address,
      // ✅ make sure locations & specialities are arrays
      locations: Array.isArray(locations) ? locations : locations?.split(","),
      specialities: Array.isArray(specialities) ? specialities : specialities?.split(","),
      description,
      experience,
      stars,
      videoConsultations: Array.isArray(videoConsultations) ? videoConsultations : [],
      hospitals: Array.isArray(hospitals) ? hospitals : [],
    });

    return NextResponse.json({ success: true, doctor }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET /api/doctors → saare doctors list
export async function GET() {
  try {
    await connectDB();

    const doctors = await Doctor.find();

    return NextResponse.json({ success: true, doctors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
