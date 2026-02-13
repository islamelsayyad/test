import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Dashboard" }]}
      />
      <DashboardContent />
    </>
  )
}
