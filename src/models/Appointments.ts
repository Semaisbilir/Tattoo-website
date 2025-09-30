import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema({
  clientID: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  date: {type: Date, require: true},
  description: {type: String, require: false}
})

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema)