import { DashboardHeader } from "@/components/dashboard-header"
import { HolidaysContent } from "@/components/holidays/holidays-content"

export default function HolidaysPage() {
  return (
    <>
      <DashboardHeader
        title="Holidays & Closures"
        breadcrumbs={[{ label: "Holidays" }]}
      />
      <HolidaysContent />
    </>
  )
}
