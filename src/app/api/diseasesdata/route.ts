import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Diseasedata from "../../../../models/Diseasedata";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name"); // e.g. /api/diseasesdata?name=Malaria

    let diseases;

    if (name) {
      // name ke base pe search (case-insensitive)
      diseases = await Diseasedata.find({
        name: { $regex: name, $options: "i" },
      });
    } else {
      // agar name nahi diya to saari diseases
      diseases = await Diseasedata.find({});
    }

    return NextResponse.json(diseases);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch diseases", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST - Insert disease(s)
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // agar ek disease bheji ho ya multiple ho
    const diseases = Array.isArray(body)
      ? await Diseasedata.insertMany(body)
      : await Diseasedata.create(body);

    return NextResponse.json(diseases, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to save disease(s)" }, { status: 500 });
  }
}
