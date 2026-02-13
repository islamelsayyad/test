import { DashboardHeader } from "@/components/dashboard-header"
import { GroupsContent } from "@/components/groups/groups-content"

export default function GroupsPage() {
  return (
    <>
      <DashboardHeader
        title="Cohorts & Groups"
        breadcrumbs={[{ label: "Groups" }]}
      />
      <GroupsContent />
    </>
  )
}
