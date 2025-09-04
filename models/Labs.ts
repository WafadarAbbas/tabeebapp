import mongoose, { Schema, model, models } from "mongoose";

const LabSchema = new Schema(
  {
    name: { type: String, required: true },
    branches: { type: Number, required: true },
    cities: { type: Number, required: true },
    image: { type: String },
    labTests: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Lab = models.Lab || model("Lab", LabSchema);

export default Lab;
