"use client"
import { StatCard } from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface AppointmentData {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  totalCount:number
}

const Admin =  () => {
  // const appointments = await getRecentAppointmentList()

  const [appointments, setAppointments] = useState<AppointmentData | null>(null);

  useEffect(() => {
      const fetchAppointments = async () => {
          const data = await getRecentAppointmentList();
          setAppointments(data);
      };

      fetchAppointments();
  }, []); 
  if (!appointments) return <div>Loading...</div>;
  // return <div>{JSON.stringify(appointments)}</div>;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="Logo"
            className="h-8 w-full"
          />
        </Link>
        <p className="text-16-semibold"> Admin Dashboard</p>
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
            type="totalCount"
            count={appointments?.totalCount}
            label="Total Appointments"
            icon="/assets/icons/totalappointments.svg"
          />
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?. pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
};

export default Admin;
