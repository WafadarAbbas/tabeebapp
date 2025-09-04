import mongoose, { Schema, model, models } from "mongoose";

const DiseasedataSchema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: String, required: true }
  },
  { timestamps: true }
);

const Diseasedata = models.Diseasedata || model("Diseasedata", DiseasedataSchema);
export default Diseasedata;
