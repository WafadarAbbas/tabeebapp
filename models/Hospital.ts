import mongoose, { Schema, model, models } from "mongoose";

const HospitalSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    servingDepartments: {
      type: [String], // ✅ array of strings
      required: true,
      default: [], // agar kuch na aaye toh empty array save ho
    },
  },
  { timestamps: true }
);

const Hospital = models.Hospital || model("Hospital", HospitalSchema);
export default Hospital;
