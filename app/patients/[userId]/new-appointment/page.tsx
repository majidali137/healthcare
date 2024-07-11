import AppointmentForm from "@/components/forms/AppointmentForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId)
  
  return (
    <div className="flex h-screen max-h-screen"> 
     <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          {/* <RegisterForm user = {user} /> */}

          <AppointmentForm 
           patientId={patient?.$id}
           userId={userId}
           type="create"
          />
          

            <p className="copyright py-12">
              © {new Date().getFullYear()} CarePlure
            </p>
         
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="appointment"
        // className="side-img max-w-[50%]"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
