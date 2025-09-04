 
"use client";

import { useEffect, useState } from "react";

type Disease = {
  _id: string;
  name: string;
  details: string;
};

export default function DiseasesDataPage() {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchDiseases = async (query: string = "") => {
    try {
      setLoading(true);
      const url = query
        ? `/api/diseasesdata?name=${encodeURIComponent(query)}`
        : "/api/diseasesdata";

      const res = await fetch(url);
      const data = await res.json();
      setDiseases(data);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchDiseases(search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
   
      <>
<div
  className="p-14 mb-6 flex flex-col items-center justify-center text-center"
  style={{ backgroundColor: "#014e78" }}
>
  <h4 style={{ color: "white" }}>
    Find Best Doctors For Any Disease or Medical Condition
  </h4>
  
  <input
  
    type="text"
    placeholder="Search disease..."
    value={search}
    style={{ backgroundColor: "white" }}
    onChange={(e) => setSearch(e.target.value)}
    className="mt-4 w-full max-w-4xl px-4 py-2 rounded-lg outline-none border border-blue-300"
  />
</div>


 <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Common Diseases in Pakistan
      </h1>

      {loading ? (
        <p className="text-center">Loading diseases...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          {diseases.map((disease) => (
            <div
              key={disease._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="text-md font-semibold mb-2">{disease.name}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {disease.details}
              </p>
            </div>
          ))}

          {diseases.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No diseases found.
            </p>
          )}
        </div>
      )}
    </div>
    </> 
  );
}
