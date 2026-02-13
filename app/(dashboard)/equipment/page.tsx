import { DashboardHeader } from "@/components/dashboard-header"
import { EquipmentContent } from "@/components/equipment/equipment-content"

export default function EquipmentPage() {
  return (
    <>
      <DashboardHeader
        title="Equipment & Assets"
        breadcrumbs={[{ label: "Equipment" }]}
      />
      <EquipmentContent />
    </>
  )
}
