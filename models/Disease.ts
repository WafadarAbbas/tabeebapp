// models/Disease.ts
import mongoose, { Schema, model, models } from "mongoose";

const DiseaseSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, // image URL ya filename
  },
  { timestamps: true }
);

const Disease = models.Disease || model("Disease", DiseaseSchema);
export default Disease;
