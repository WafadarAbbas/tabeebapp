// models/Symptom.ts
import mongoose, { Schema, model, models } from "mongoose";

const SymptomSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String }, // optional
});

// Avoid recompilation errors in Next.js hot reload
const Symptom = models.Symptom || model("Symptom", SymptomSchema);

export default Symptom;
