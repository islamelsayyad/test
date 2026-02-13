import { DashboardHeader } from "@/components/dashboard-header"
import { SchedulingContent } from "@/components/scheduling/scheduling-content"

export default function SchedulingPage() {
  return (
    <>
      <DashboardHeader
        title="Scheduling & Bookings"
        breadcrumbs={[{ label: "Scheduling" }]}
      />
      <SchedulingContent />
    </>
  )
}
