import { DashboardHeader } from "@/components/dashboard-header"
import { LabsContent } from "@/components/labs/labs-content"

export default function LabsPage() {
  return (
    <>
      <DashboardHeader
        title="Laboratories"
        breadcrumbs={[{ label: "Laboratories" }]}
      />
      <LabsContent />
    </>
  )
}
