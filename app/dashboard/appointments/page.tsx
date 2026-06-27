"use client";

import { useState } from "react";
import { Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { getListingById } from "@/lib/mock-data";
import { formatAppointmentType, formatLeadStatus } from "@/lib/types";

const statusVariant: Record<string, "gold" | "success" | "warning" | "destructive" | "secondary"> = {
  pending: "warning",
  confirmed: "success",
  completed: "secondary",
  cancelled: "destructive",
};

export default function AppointmentsPage() {
  const [tab, setTab] = useState("upcoming");

  const upcoming = MOCK_APPOINTMENTS.filter((a) => a.status !== "completed" && a.status !== "cancelled");
  const past = MOCK_APPOINTMENTS.filter((a) => a.status === "completed" || a.status === "cancelled");
  const display = tab === "upcoming" ? upcoming : past;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Appointments</h1>
          <p className="text-muted-foreground">Manage tours, consultations, and valuations</p>
        </div>
        <Button variant="gold"><Plus className="mr-2 h-4 w-4" />New Appointment</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {["tour", "consultation", "valuation"].map((type) => {
          const count = MOCK_APPOINTMENTS.filter((a) => a.appointment_type === type && a.status !== "completed").length;
          return (
            <Card key={type}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal/10">
                  <CalendarIcon className="h-5 w-5 text-royal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">{count}</p>
                  <p className="text-sm text-muted-foreground">{formatAppointmentType(type)}s</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {display.map((appt) => {
              const listing = appt.listing_id ? getListingById(appt.listing_id) : null;
              const date = appt.scheduled_at ? new Date(appt.scheduled_at) : null;
              return (
                <Card key={appt.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{formatAppointmentType(appt.appointment_type)}</Badge>
                          <Badge variant={statusVariant[appt.status] || "secondary"}>{formatLeadStatus(appt.status)}</Badge>
                        </div>
                        <h3 className="mt-2 font-semibold">{appt.lead?.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{appt.lead?.email}</p>
                        {listing && <p className="mt-1 text-sm text-royal">{listing.title}</p>}
                      </div>
                      {date && (
                        <div className="text-right text-sm">
                          <p className="font-medium">{date.toLocaleDateString()}</p>
                          <p className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">Confirm</Button>
                      <Button variant="ghost" size="sm">Reschedule</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader><CardTitle className="text-lg">Calendar View</CardTitle></CardHeader>
        <CardContent>
          <div className="flex aspect-[2/1] items-center justify-center rounded-lg border-2 border-dashed bg-secondary/30">
            <div className="text-center text-muted-foreground">
              <CalendarIcon className="mx-auto mb-2 h-10 w-10" />
              <p>Calendar integration ready</p>
              <p className="text-xs mt-1">Connect Google Calendar or Cal.com for sync</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
