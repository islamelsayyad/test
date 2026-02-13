import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  return (
    <>
      <DashboardHeader
        title="Profile"
        breadcrumbs={[{ label: "Profile" }]}
      />
      <ProfileContent />
    </>
  )
}
