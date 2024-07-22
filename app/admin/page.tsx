
// if the show new appointmenet automatically without resfresh the page but this function Polling every 10 seconds


// "use client"
// import React, { useEffect, useState } from "react";
// import { StatCard } from "@/components/StatCard";
// import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
// import Image from "next/image";
// import Link from "next/link";
// import {DataTable} from "@/components/table/DataTable";
// import {columns} from "@/components/table/columns";

// interface AppointmentData {
//   scheduledCount: number;
//   pendingCount: number;
//   cancelledCount: number;
//   totalCount: number;
//   documents: any[];
// }



// const Admin = () => {

//   const [appointments, setAppointments] = useState<AppointmentData | null>(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       const data = await getRecentAppointmentList();
//       setAppointments(data);
//     };

//     fetchAppointments();

//     // Polling every 10 seconds
//     const intervalId = setInterval(() => {
//       fetchAppointments();
//     }, 10000); // Adjust the interval as needed

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   if (!appointments) return <div className="flex justify-center items-center h-screen">
//     <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
//   </div>

//   return (
//     <div className="mx-auto flex max-w-7xl flex-col space-y-14">
//       <header className="admin-header">
//         <Link href="/" className="cursor-pointer">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={32}
//             width={162}
//             alt="Logo"
//             className="h-8 w-full"
//           />
//         </Link>
//         <p className="text-16-semibold"> Admin Dashboard</p>
//       </header>

//       <main className="admin-main">
//         <section className="w-full space-y-4">
//           <h1 className="header">Welcome 👋</h1>
//           <p className="text-dark-700">
//             Start the day with managing new appointments
//           </p>
//         </section>

//         <section className="admin-stat">
//           <StatCard
//             type="totalCount"
//             count={appointments.totalCount}
//             label="Total Appointments"
//             icon="/assets/icons/totalappointments.svg"
//           />
//           <StatCard
//             type="appointments"
//             count={appointments.scheduledCount}
//             label="Scheduled appointments"
//             icon="/assets/icons/appointments.svg"
//           />
//           <StatCard
//             type="pending"
//             count={appointments.pendingCount}
//             label="Pending appointments"
//             icon="/assets/icons/pending.svg"
//           />
//           <StatCard
//             type="cancelled"
//             count={appointments.cancelledCount}
//             label="Cancelled appointments"
//             icon="/assets/icons/cancelled.svg"
//           />
//         </section>

//         <DataTable columns={columns} data={appointments.documents} />

//       </main>
//     </div>
//   );
// };

// export default Admin;
















// if the admin page refresh then show new appointment


import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
// import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;