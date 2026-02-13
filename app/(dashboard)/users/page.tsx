import { DashboardHeader } from "@/components/dashboard-header"
import { UsersContent } from "@/components/users/users-content"

export default function UsersPage() {
  return (
    <>
      <DashboardHeader
        title="User Management"
        breadcrumbs={[{ label: "Users" }]}
      />
      <UsersContent />
    </>
  )
}
