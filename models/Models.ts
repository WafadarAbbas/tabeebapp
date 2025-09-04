import mongoose, { Schema, model, models } from "mongoose";

const LabSchema = new Schema(
  {
    name: { type: String, required: true },
    branches: { type: Number, required: true },
    cities: { type: Number, required: true },
    image: { type: String, required: true }, // URL for lab logo or image
  },
  { timestamps: true }
);

const Lab = models.Lab || model("Lab", LabSchema);
export default Lab;
