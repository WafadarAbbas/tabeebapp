"use client";
import topbanner from "../assets/top-banner.png"

import { useState } from "react";
import { Formik, Form, Field } from "formik";

export default function Medicine() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
  <div
      style={{
        width: "100%",
        height: "280px",  
        
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      <img
        src={topbanner.src}
        alt="Top Banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",  
          objectPosition: "center top",  
        }}
      />

 
    </div>
      <div className=" container bg-white shadow-md rounded-xl p-8  mt-1  ">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Medicine</h2>

        <Formik
          initialValues={{
            medicineName: "",
            image: null,
            address: "",
            phone: "",
            patientName: "",
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Medicine Name */}
              <div>
                <label className="block text-sm font-medium">Medicine Name</label>
                <Field
                  name="medicineName"
                  type="text"
                  className="mt-1 block w-full border rounded-lg p-2"
                  placeholder="Enter medicine name"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium">Upload Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full border rounded-lg p-2"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    setFieldValue("image", file);
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium">Address</label>
                <Field
                  name="address"
                  type="text"
                  className="mt-1 block w-full border rounded-lg p-2"
                  placeholder="Enter address"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <Field
                  name="phone"
                  type="text"
                  className="mt-1 block w-full border rounded-lg p-2"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium">Patient Name</label>
                <Field
                  name="patientName"
                  type="text"
                  className="mt-1 block w-full border rounded-lg p-2"
                  placeholder="Enter patient name"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
 
  </>
  );
}
