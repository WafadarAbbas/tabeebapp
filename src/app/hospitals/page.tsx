"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// SSR off for react-select
const Select = dynamic(() => import("react-select"), { ssr: false });

type Hospital = {
  id?: string; // MongoDB _id
  name: string;
  address: string;
  number: string;
  city: string; // ✅ new field
  servingDepartments: string[];
};

const departmentOptions = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Neurology", label: "Neurology" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Emergency", label: "Emergency" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Oncology", label: "Oncology" },
  { value: "Surgery", label: "Surgery" },
  { value: "Radiology", label: "Radiology" },
  { value: "ENT", label: "ENT" },
  { value: "Gynecology", label: "Gynecology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Urology", label: "Urology" },
  { value: "Nephrology", label: "Nephrology" },
  { value: "Gastroenterology", label: "Gastroenterology" },
  { value: "Hematology", label: "Hematology" },
  { value: "Pulmonology", label: "Pulmonology" },
  { value: "Endocrinology", label: "Endocrinology" },
  { value: "Psychiatry", label: "Psychiatry" },
  { value: "Psychology", label: "Psychology" },
  { value: "Rehabilitation", label: "Rehabilitation" },
  { value: "Anesthesiology", label: "Anesthesiology" },
  { value: "Pathology", label: "Pathology" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Dentistry", label: "Dentistry" },
  { value: "Nutrition & Dietetics", label: "Nutrition & Dietetics" },
  { value: "Physiotherapy", label: "Physiotherapy" },
  { value: "General Medicine", label: "General Medicine" },
];

export default function HospitalForm() {
  const [form, setForm] = useState<Hospital>({
    name: "",
    address: "",
    number: "",
    city: "", // ✅ default empty city
    servingDepartments: [],
  });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [mounted, setMounted] = useState(false); // hydration safe

  useEffect(() => {
    setMounted(true); // ensures client-only rendering for Select

    // Load existing hospitals
    fetch("/api/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/hospitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save hospital");

      const newHospital = await res.json();
      setHospitals([...hospitals, newHospital.data]);
      setForm({
        name: "",
        address: "",
        number: "",
        city: "", // ✅ reset
        servingDepartments: [],
      });
    } catch (err) {
      console.error(err);
      alert("Error saving hospital");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🏥 Add Hospital</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Hospital Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        {/* ✅ New City Input */}
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />

        {/* Multi-select */}
        {mounted && (
          <Select
            options={departmentOptions}
            isMulti
            value={
              form.servingDepartments?.map((dep) => ({
                value: dep,
                label: dep,
              })) || []
            }
            onChange={(selected: { value: string; label: string }[] | null) =>
              setForm({
                ...form,
                servingDepartments: selected
                  ? selected.map((s) => s.value)
                  : [],
              })
            }
            placeholder="Select Departments"
            className="w-full"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Hospital
        </button>
      </form>
    </div>
  );
}
