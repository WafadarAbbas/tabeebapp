import { NextResponse } from "next/server";

export async function GET() {
  const cityOptions = [
    { id: 1, value: "karachi", label: "Karachi" },
    { id: 2, value: "lahore", label: "Lahore" },
    { id: 3, value: "islamabad", label: "Islamabad" },
    { id: 4, value: "quetta", label: "Quetta" },
    { id: 5, value: "peshawar", label: "Peshawar" },
    { id: 6, value: "faisalabad", label: "Faisalabad" },
    { id: 7, value: "multan", label: "Multan" },
    { id: 8, value: "sialkot", label: "Sialkot" },
  ];

  return NextResponse.json(cityOptions);
}
