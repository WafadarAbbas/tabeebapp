"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type LabTest = {
  name: string;
  price: number;
};

type Lab = {
  _id: string;
  name: string;
  branches: number;
  cities: number;
  image: string;
  labTests: LabTest[];
};

export default function LabsPage() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLabs() {
      try {
        const res = await fetch("/api/labs");
        const data = await res.json();
        setLabs(data);
      } catch (error) {
        console.error("Error fetching labs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLabs();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading labs...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Labs in Pakistan</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {labs.map((lab) => (
          <div key={lab._id} className="border rounded-lg p-4 shadow-md bg-white">
            <div className="flex items-center gap-3 mb-4">
         <img src={lab.image} alt={lab.name} width={80} height={80} className="rounded " />

              <div>
                <h2 className="text-lg font-semibold">{lab.name}</h2>
                <p className="text-sm text-gray-600">
                  {lab.branches} Branches • {lab.cities} Cities
                </p>
              </div>
            </div>

            <h3 className="font-semibold mb-2">Available Tests:</h3>
            <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
              {lab.labTests.map((test, i) => (
                <li key={i} className="flex justify-between border-b table-autopb-1">
                  <span>{test.name}</span>
                  <span className="font-medium">Rs. {test.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
