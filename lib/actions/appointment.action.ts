"use server"
import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"



import type { Models } from "appwrite";
import { revalidatePath } from "next/cache"

interface AppointmentResponse {
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: Models.Document[];
}

// create appointment
// export const createAppointment = async (appointment: CreateAppointmentParams) => {
//     try {
//         const newAppointment = await database.createDocument(
//             DATABASE_ID!,
//             APPOINTMENT_COLLECTION_ID!,
//             ID.unique(),
//             appointment
//         );

//         return parseStringify(newAppointment)


//     } catch (error) {
//         console.log(error)
//     }
// }

export const createAppointment = async (
    appointment: CreateAppointmentParams
  ) => {
    try {
      const newAppointment = await database.createDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        ID.unique(),
        appointment
      );
  
    //   revalidatePath("/admin");
      return parseStringify(newAppointment);
    } catch (error) {
      console.error("An error occurred while creating a new appointment:", error);
    }
  };


// get appointment 
export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await database.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );
        return parseStringify(appointment)
    } catch (error) {
        console.log(error)
    }
}

// get all recent appointment

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await database.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        )

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0
        }
        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled') {
                acc.scheduledCount += 1;
            } else if (appointment.status === "pending") {
                acc.pendingCount += 1;
            } else if (appointment.status === 'cancelled') {
                acc.cancelledCount += 1
            }

            return acc
        }, initialCounts)

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }
        // console.log(parseStringify(data), "Get all recent")
        return parseStringify(data)

    } catch (error) {
        console.log(error)
    }
}


// update appointment
export const updateAppointment = async ({
    appointmentId,
    userId,
    appointment,
    type,
  }: UpdateAppointmentParams) => {
    try {
      // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
      const updatedAppointment = await database.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
      );
  
      if (!updatedAppointment) throw Error;
  
     // SMS notification
  
      revalidatePath("/admin");
      return parseStringify(updatedAppointment);
    } catch (error) {
      console.error("An error occurred while scheduling an appointment:", error);
    }
  }