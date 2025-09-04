"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "doctor") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className=" ">
      <h1 className="text-3xl font-bold text-blue-700">
        👨‍⚕️ Doctor Dashboard
      </h1>
    </div>
  );
}
