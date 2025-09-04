"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage,FieldArray } from "formik";
import * as Yup from "yup";
import Select from "react-select";

// 🔹 Form type
type DoctorFormValues = {
  name: string;
  number: string;
  address: string;
  locations: string[];
  specialities: string[];
  description: string;
  experience: number;
  stars: number;
  videoConsultations: { fee: number; time: string }[];
  hospitals: { name: string; fee: number; time: string; address: string }[];
};

// 🔹 Initial values
const initialValues: DoctorFormValues = {
  name: "",
  number: "",
  address: "",
  locations: [],
  specialities: [],
  description: "",
  experience: 0,
  stars: 0,
    videoConsultations: [
    { fee: 0, time: "" }, // at least one default row
  ],
  hospitals: [
    { name: "", fee: 0, time: "", address: "" },
  ],
};


export default function DoctorDashboard() {
  const [specialityOptions, setSpecialityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // ✅ Fetch specialities from API
  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const res = await fetch("/api/specialities");
        const data = await res.json();

        // API returns with {id, value, label}, so map properly
        const formatted = data.map((item: any) => ({
          value: item.value,
          label: item.label,
        }));

        setSpecialityOptions(formatted);
      } catch (err) {
        console.error("Failed to load specialities", err);
      }
    };

    fetchSpecialities();
  }, []);
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

useEffect(() => {
  const fetchCities = async () => {
    try {
      const res = await fetch("/api/cities");
      const data = await res.json();
      const formatted = data.map((item: any) => ({
        value: item.value,
        label: item.label,
      }));
      setCityOptions(formatted);
    } catch (err) {
      console.error("Failed to load cities", err);
    }
  };

  fetchCities();
}, []);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-3 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Doctor Dashboard</h1>

      <Formik<DoctorFormValues>
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          number: Yup.string().required("Number is required"),
          address: Yup.string().required("Address is required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          try {
            const res = await fetch("/api/doctors", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            const data = await res.json();
            if (data.success) {
              alert("Doctor added successfully!");
              resetForm();
            } else {
              alert("Error: " + data.error);
            }
          } catch (err) {
            console.error(err);
            alert("Something went wrong");
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium">Name</label>
              <Field
                name="name"
                className="w-full border p-2 rounded"
                placeholder="Enter doctor name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Number */}
            <div>
              <label className="block font-medium">Number</label>
              <Field
                name="number"
                className="w-full border p-2 rounded"
                placeholder="Enter phone number"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium">Address</label>
              <Field
                name="address"
                className="w-full border p-2 rounded"
                placeholder="Enter address"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Locations */}
            <div>
              <label className="block font-medium">Locations (Cities)</label>
              <Select
                isMulti
                name="locations"
                options={cityOptions}
                value={cityOptions.filter((opt) =>
                  values.locations.includes(opt.value)
                )}
                onChange={(selected) =>
                  setFieldValue(
                    "locations",
                    (selected as { value: string; label: string }[]).map(
                      (s) => s.value
                    )
                  )
                }
              />
            </div>

            {/* Specialities (from API) */}
            <div>
              <label className="block font-medium">Specialities</label>
              <Select
                isMulti
                name="specialities"
                options={specialityOptions}
                value={specialityOptions.filter((opt) =>
                  values.specialities.includes(opt.value)
                )}
                onChange={(selected) =>
                  setFieldValue(
                    "specialities",
                    (selected as { value: string; label: string }[]).map(
                      (s) => s.value
                    )
                  )
                }
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full border p-2 rounded"
                placeholder="Enter description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block font-medium">Experience (in years)</label>
              <Field
                type="number"
                name="experience"
                className="w-full border p-2 rounded"
                placeholder="e.g. 5"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Stars */}
            <div>
              <label className="block font-medium">Stars (out of 5)</label>
              <Field
                type="number"
                name="stars"
                min="1"
                max="5"
                className="w-full border p-2 rounded"
                placeholder="Rate from 1 to 5"
              />
              <ErrorMessage
                name="stars"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

             <div>
              <label className="block font-medium text-lg">Video Consultations</label>
              <FieldArray name="videoConsultations">
                {({ push, remove }) => (
                  <div className="space-y-3">
                    {values.videoConsultations.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-4 border p-3 rounded"
                      >
                        <Field
                          type="number"
                          name={`videoConsultations[${index}].fee`}
                          placeholder="Fee"
                          className="border p-2 rounded"
                        />
                        <Field
                          type="text"
                          name={`videoConsultations[${index}].time`}
                          placeholder="Time (e.g. 10AM - 12PM)"
                          className="border p-2 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 col-span-2 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ fee: 0, time: "" })}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      + Add Video Consultation
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Hospitals Section */}
            <div>
              <label className="block font-medium text-lg">Hospitals</label>
              <FieldArray name="hospitals">
                {({ push, remove }) => (
                  <div className="space-y-3">
                    {values.hospitals.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-4 border p-3 rounded"
                      >
                        <Field
                          type="text"
                          name={`hospitals[${index}].name`}
                          placeholder="Hospital Name"
                          className="border p-2 rounded"
                        />
                        <Field
                          type="number"
                          name={`hospitals[${index}].fee`}
                          placeholder="Fee"
                          className="border p-2 rounded"
                        />
                        <Field
                          type="text"
                          name={`hospitals[${index}].time`}
                          placeholder="Time"
                          className="border p-2 rounded"
                        />
                        <Field
                          type="text"
                          name={`hospitals[${index}].address`}
                          placeholder="Address"
                          className="border p-2 rounded col-span-2"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 col-span-2 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        push({ name: "", fee: 0, time: "", address: "" })
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      + Add Hospital
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
