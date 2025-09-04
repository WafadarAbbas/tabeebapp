import { NextResponse } from "next/server";

export async function GET() {
  const specialityOptions = [
    { id: 1, value: "cardiology", label: "Cardiology" },
    { id: 2, value: "dermatology", label: "Dermatology" },
    { id: 3, value: "neurology", label: "Neurology" },
    { id: 4, value: "orthopedics", label: "Orthopedics" },
    { id: 5, value: "pediatrics", label: "Pediatrics" },
    { id: 6, value: "psychiatry", label: "Psychiatry" },
    { id: 7, value: "radiology", label: "Radiology" },
    { id: 8, value: "anesthesiology", label: "Anesthesiology" },
    { id: 9, value: "ophthalmology", label: "Ophthalmology" },
    { id: 10, value: "gynecology", label: "Gynecology" },
  ];

  return NextResponse.json(specialityOptions);
}
