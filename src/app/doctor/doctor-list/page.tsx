"use client";

import { useEffect, useState } from "react";
import Select  from "react-select";

type VideoConsultation = {
  fee: number;
  time: string;
};
 
type Hospital = {
  name: string;
  fee: number;
  time: string;
  address: string;
};

type Doctor = {
  _id: string;
  name: string;
  number: string;
  address: string;
  locations: string[];
  specialities: string[];
  description: string;
  experience: number;
  stars: number;
  videoConsultations: VideoConsultation[];
  hospitals: Hospital[];
};

export default function DoctorsPage() {
  type SpecialityOption = { id: number; value: string; label: string };
 const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialities, setSpecialities] = useState<SpecialityOption[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] =
    useState<SpecialityOption | null>(null);

  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        if (data.success) setDoctors(data.doctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const res = await fetch("/api/specialities");
        const data = await res.json();
        setSpecialities(data);
      } catch (err) {
        console.error("Error fetching specialities:", err);
      }
    };
    fetchSpecialities();
  }, []);

 
const handleSelect = async (option: SpecialityOption | null) => {
  setSelectedSpeciality(option);

  setLoading(true);
  try {
    let url = "/api/doctors";
    if (option) {
      url = `/api/doctors/search?query=${option.value}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      setDoctors(data.doctors);
    } else {
      setDoctors([]);
    }
  } catch (err) {
    console.error("Error searching doctors:", err);
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p className="p-4">Loading doctors...</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
        👨‍⚕️ Doctors List
      </h1>
           
 <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <Select
            options={specialities}
            value={selectedSpeciality}
            onChange={handleSelect}
            isClearable
            isSearchable
            placeholder="Search by speciality..."
            className="text-gray-700"
          />
        </div>
      </div>


      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="space-y-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white border rounded-2xl shadow-xl hover:shadow-2xl transition p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between ">
                <h4 className=" font-bold text-gray-800">
                  {doc.name}
                </h4>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {doc.stars}/5
                </span>
              </div>
<div className="flex flex-wrap gap-2">
  {doc.specialities.length > 0 ? (
    doc.specialities.map((spec, index) => (
      <div
        key={index}
        className="bg-gray-100 border border-gray-200 text-sm px-3 py-1 rounded"
        style={{ flex: "0 0 calc(10% - 0.2rem)" }} // ✅ 2 per row
      >
        {spec}
      </div>
    ))
  ) : (
    <span className="text-gray-500">N/A</span>
  )}
</div>

             
               

              {/* Description */}
              <div className="mt-2">
             
                <p className="text-gray-700 ">
                  {doc.description || "N/A"}
                </p>
              </div>

               <div className="flex gap-3 mt-2">
              <div className="">
                <strong className="text-gray-800">💼 Experience:</strong>{" "}
                <span className="text-gray-700">{doc.experience} years</span>
              </div>

              {/* Locations */}
              <div className=" ">
                <strong className="text-gray-800">🌍 Locations:</strong>{" "}
                <span className="text-gray-700">
                  {doc.locations.length > 0 ? doc.locations.join(", ") : "N/A"}
                </span>
              </div>

 
              </div>

              {/* ✅ Video Consultation & Hospitals in Card Style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {/* Video Consultations */}
                {doc.videoConsultations?.length > 0 &&
                  doc.videoConsultations.map((vc, idx) => (
                    <div
                      key={idx}
                     className="  rounded-lg p-2 hover:shadow-lg transition"
                     style={{ border: "1px solid green " }}
                    >
                      <h6 className="font-semibold text-gray-800">
                        Video Consultation
                      </h6>
                      <div className="flex flex-col">
                      <span className="  text-gray-600 ">
                        {vc.time || "Available Today"}
                      </span>
                        <span className="font-bold text-gray-900">
                          Rs. {vc.fee}
                        </span>
                     </div>
                    </div>
                  ))}

                 
                {doc.hospitals?.length > 0 &&
                  doc.hospitals.map((h, idx) => (
                    <div
                      key={idx}className="   rounded-lg p-2 hover:shadow-lg transition"
                         style={{ border: "1px solid blue " }}
                    >
                      <h6 className="font-semibold text-gray-800">
                        {h.name}
                      </h6>
                      <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        {h.time || "Available Today"}
                      </span>
                       <span className="font-bold text-gray-900">
                          Rs. {h.fee}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        📍 {h.address}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
