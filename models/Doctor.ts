import mongoose, { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    locations: [{ type: String }],        // multiple city IDs or names
    specialities: [{ type: String }],     // multiple specialities
    description: { type: String },
    experience: { type: Number },
    stars: { type: Number, min: 1, max: 5 },

    // ✅ Video Consultations (array of fee + time)
    videoConsultations: [
      {
        fee: { type: Number, required: true },
        time: { type: String, required: true }, // e.g. "10AM - 12PM"
      },
    ],

    // ✅ Hospitals (array of name, fee, time, address)
    hospitals: [
      {
        name: { type: String, required: true },
        fee: { type: Number, required: true },
        time: { type: String, required: true },
        address: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Doctor = models.Doctor || model("Doctor", DoctorSchema);
export default Doctor;
