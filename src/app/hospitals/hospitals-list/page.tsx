"use client";
import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import { FaHospital } from "react-icons/fa";
import  hos from "../../assets/hospital-default.jpg"

type Hospital = {
  _id: string;
  name: string;
  address: string;
  number: string;
  city: string;
  servingDepartments?: string[];
};

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchHospitals = async (searchCity?: string) => {
    setLoading(true);
    try {
      let url = "/api/hospitals";
      if (searchCity && searchCity.trim()) {
        url = `/api/hospitals/search?city=${encodeURIComponent(searchCity)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setHospitals(data.data);
      else setHospitals([]);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all on mount
  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className="w-full">
      {/* 🔎 Formik Search */}
      <Formik
        initialValues={{ city: "" }}
        onSubmit={async (values) => {
          await fetchHospitals(values.city);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="flex justify-center  mt-6 mb-8">
              <input
                name="city"
                type="text"
                value={values.city}
                onChange={(e) => {
                  handleChange(e);
                  const v = e.target.value;
                  if (debounceTimer.current) clearTimeout(debounceTimer.current);
                  debounceTimer.current = setTimeout(() => {
                    fetchHospitals(v.trim() || undefined);
                  }, 500);
                }}
                placeholder="Search hospitals by city..."
                className="border px-4 py-2 rounded-l-lg w-96 focus:outline-none focus:ring-2 focus:ring-[#004D71]"
              />
              <button
                type="submit"
                className=" text-white px-2 py-1 hover:bg-blue-700"
                  style={{ backgroundColor: "#004D71", borderRadius:10}}
              >
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {loading ? (
        <p className="text-center mt-10">Loading hospitals...</p>
      ) : hospitals.length === 0 ? (
        <p className="text-center mt-10">No hospitals found.</p>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {hospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition p-2"
              >
                <div className="flex justify-center">
                <img src={hos.src} width={130}height={60} alt="" />
                </div>

                <div className="mt-4 text-center">
                  <h4 className="font-bold text-gray-900">{hospital.name}</h4>

                  {!!hospital.servingDepartments?.length && (
                    <div className="mt-3 mb-3 flex flex-wrap justify-center gap-2">
                      {hospital.servingDepartments.map((dept, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded text-white text-xs"
                          style={{ backgroundColor: "#004D71" }}
                        >
                          {dept}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-600 mt-1">📍 {hospital.address}</p>
                  <p className="text-gray-600">
                    ☎️ {hospital.number} || {hospital.city}
                  </p>
                </div>

                <div className="mt-5 flex justify-center gap-2">
                  <button
                    className="text-white px-2 py-1 hover:bg-blue-800 transition"
                    style={{ backgroundColor: "#4CA585", borderRadius: 10 }}
                  >
                    View Direction
                  </button>
                  <button
                    className="text-white px-2 py-1 hover:bg-blue-800 transition"
                    style={{ backgroundColor: "#004D71", borderRadius: 10 }}
                  >
                    Call Helpline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
