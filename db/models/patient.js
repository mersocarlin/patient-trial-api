import mongoose, { Schema } from 'mongoose';

const PatientSchema = new Schema({
  active: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, required: true },
  gender: { type: String, required: true, lowercase: true },
  firstname: { type: String, required: true, uppercase: true },
  lastname: { type: String, required: true, uppercase: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  zip: { type: String, required: true },
  termsAccepted: { type: Boolean, required: true },
});

export default mongoose.model('patient', PatientSchema);
