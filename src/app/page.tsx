"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";    
import { setUser } from "./store/authSlice";
import Link from "next/link";

import d1 from "../app/assets/d1.png";
import hos from "../app/assets/hos.jpg";
import female from "../app/assets/female-doc.avif";
import lab from "../app/assets/lab.avif";
import medicine from "../app/assets/medicine.avif";
import surgical from "../app/assets/surgical.avif";
import weight from "../app/assets/waight-loss-man .avif";
import doc2 from "../app/assets/doc2.avif";
import questionwomen from "../app/assets/question-women.avif";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { username } = useSelector((state: RootState) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [loadingSymptom, setLoadingSymptom] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);

  type Disease = {
    _id: string;
    name: string;
    image: string;
  };

  type Symptom = {
    id: number;
    name: string;
    img: string;
    details?: string;
  };

  const symptoms: Symptom[] = [
    { id: 1, name: "Fever", img: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png" },
    { id: 2, name: "Heart attack", img: "https://cdn-icons-png.flaticon.com/512/4240/4240651.png" },
    { id: 3, name: "Pregnancy", img: "https://cdn-icons-png.flaticon.com/512/4144/4144796.png" },
    { id: 4, name: "High blood pressure", img: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png" },
    { id: 5, name: "Breathlessness", img: "https://cdn-icons-png.flaticon.com/512/4144/4144822.png" },
    { id: 6, name: "Diarrhea", img: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png" },
    { id: 7, name: "Hairfall", img: "https://cdn-icons-png.flaticon.com/512/2913/2913461.png" },
    { id: 8, name: "Anxiety/Depression", img: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const savedUsername = localStorage.getItem("username");

    if (!token || !role) {
      router.push("/login");
    } else if (savedUsername) {
      dispatch(setUser({ username: savedUsername }));
    }
  }, [router, dispatch]);

  const handleSymptomClick = async (id: number) => {
    setLoadingSymptom(true);
    try {
      const res = await fetch(`/api/symptoms?id=${id}`);
      const data = await res.json();
      setSelectedSymptom(data);
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to fetch symptom:", err);
    } finally {
      setLoadingSymptom(false);
    }
  };

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await fetch("/api/diseases");
        const data = await res.json();
        if (data.success) setDiseases(data.diseases);
      } catch (err) {
        console.error("Error fetching diseases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  return (
    <div className="m-4">
      {/* Greeting */}
      <div className="mt-4">
        <h5 className="h6-lg">
          Hello{" "}
          <span className="px-1.5 py-1 rounded bg-[#014e78] text-white">
            {username || "Guest"}
          </span>
        </h5>
        <h5 className="h5-lg">Find the Best Doctor Near You</h5>
      </div>

      {/* Hospital Search */}
      <div className="flex justify-center mt-5">
        <input
          type="text"
          placeholder="Search Hospitals..."
          className="w-8/12 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#014e78]"
          style={{ border: "1px solid #014e78" }}
        />
      </div>

      {/* Services Section */}
      <div className="mt-4">
        <h5 className="h5-lg mt-4">How can we help you today?</h5>
        <div className="flex flex-col md:flex-row gap-2 mt-4">
          {/* Left Column */}
          <div className="flex-1 bg-white rounded-lg">
            <div className="grid grid-flow-col gap-2">
              <div className="row-span-3 bg-blue-100 rounded-lg p-2 flex flex-col">
                <h6 className="text-left">Video Consultation</h6>
                <div className="flex items-center justify-center mt-1">
                  <img src={d1.src} alt="Doctor" className="w-38 h-42 object-cover rounded" />
                </div>
              </div>

              <div className="col-span-2 flex rounded-lg p-2" style={{ backgroundColor: "#fcceb3" }}>
                <div className="flex flex-col">
                  <h6>In-clinic Visit</h6>
                  <p className="text-sm">Book appointment</p>
                </div>
                <img src={female.src} alt="Doctor" className="ml-auto w-24 h-24 object-cover rounded" />
              </div>

              <div className="col-span-2 flex rounded-lg p-2" style={{ backgroundColor: "#fff7e8" }}>
                <div className="flex flex-col">
                  <h6>Weight Loss Clinic</h6>
                  <p className="text-sm">Book appointment</p>
                </div>
                <img src={weight.src} alt="Doctor" className="ml-auto w-24 h-26 object-cover rounded" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 text-center">
            <div className="grid grid-flow-row gap-1">
              <div className="col-span-1 flex rounded-lg p-2" style={{ backgroundColor: "#DFEFEB" }}>
                <h6>Get instant relief in click</h6>
                <img src={doc2.src} alt="Doctor" className="ml-auto w-24 h-24 object-cover rounded" />
              </div>

              <div className="grid grid-cols-4 gap-3 mt-2">
                {[
                  { img: lab.src, label: "Labs", route: "/labs", bg: "bg-blue-100" },
                  { img: medicine.src, label: "Medicine", route: "/medicine", bg: "bg-red-100" },
                  { img: hos.src, label: "Hospitals", route: "/hospitals/hospitals-list", bg: "" },
                  { img: surgical.src, label: "Surgical", route: "/labs", bg: "" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => router.push(item.route)}
                    className={`max-w-sm transition duration-300 hover:scale-105 cursor-pointer flex flex-col items-center justify-center rounded-lg shadow-sm border border-gray-200 ${item.bg}`}
                  >
                    <img className="w-full h-22 object-cover rounded" src={item.img} />
                    <div className="bg-white w-full rounded-lg">
                      <p className="font-bold text-gray-700 mt-2 mb-2">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div
        onClick={() => alert("Questions Form")}
        className="transition duration-300 hover:scale-101 hover:shadow-lg cursor-pointer mt-4 p-4 rounded"
        style={{ backgroundColor: "#DFEFEB", height: "200px", display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <h5 className="h5-lg">Get free medical advice by asking a doctor</h5>
          <p className="ml-2">✓ Get free medical advice by asking a doctor</p>
          <p className="ml-2">✓ Get free medical advice by asking a doctor</p>
        </div>
        <img src={questionwomen.src} alt="Doctor" className="ml-auto w-40 h-44 object-cover rounded" />
      </div>

      {/* Symptoms Section */}
      <div className="p-4 mt-4">
        <h5 className="h5-lg mb-4">Symptoms</h5>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-6 shadow-md rounded">
          {symptoms.map((symptom) => (
            <div
              key={symptom.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSymptomClick(symptom.id)}
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white shadow-md rounded-full">
                <img src={symptom.img} alt={symptom.name} className="w-10 h-10 object-contain" />
              </div>
              <p className="mt-2 text-sm font-semibold text-center">{symptom.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Symptom Modal */}
      {isOpen && selectedSymptom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative animate-fadeIn justify-center">
            <h2 className="text-xl font-bold mb-4">{selectedSymptom.name}</h2>
            {loadingSymptom ? <p>Loading details...</p> : <p className="mb-4">{selectedSymptom.details || "No details available."}</p>}
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Diseases Section */}
      <div className="mt-3">
        <h5 className="h5-lg mb-4">Diseases</h5>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-6 shadow-md rounded">
          {diseases.map((disease) => (
            <div
              key={disease._id}
              onClick={() => router.push("/diseasesdata")}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <img
                  src={disease.image}
                  alt={disease.name}
                  className="w-20 h-20 object-contain rounded-full transition hover:shadow-lg"
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-center">{disease.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
