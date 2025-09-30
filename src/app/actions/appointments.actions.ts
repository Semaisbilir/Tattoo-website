"use server"
import { connectDB } from "@/lib/mongodb"
import Appointments from "@/models/Appointments"

export interface AppointmentType {
  _id: string
  clientID: string
  date: Date,
  size: string
  description: string
}

// Get all appointments
async function getAllAppointments() {
  await connectDB()

  const appointments = await Appointments.find()
  return appointments.map(appointment => ({
    _id: appointment._id.toString(),
    clientID: appointment.clientID.toString(),
    date: appointment.date,
    size: appointment.size,
    description: appointment.description
  }))
}

//Get single appointment by id
async function getAppointmentById(id: string) {
  await connectDB()

  const appointment = await Appointments.findById(id)
  if (!appointment) return null

  return {
    _id: appointment._id.toString(),
    clientId: appointment.clientID,
    date: appointment.date,
    size: appointment.size,
    description: appointment.description
  }
}

// Get appointments by date
async function getAppointmentsByDate(date: Date) {
  await connectDB()
  const appointments = await Appointments.find(date)
  if (!date) return null

  return appointments.map(appointment => ({
    _id: appointment._id.toString(),
    clientId: appointment.clientID,
    date: appointment.date,
    size: appointment.size,
    description: appointment.description
  }))
}



export default {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDate
}