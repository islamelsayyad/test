import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsContent } from "@/components/settings/settings-content"

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        title="System Configuration"
        breadcrumbs={[{ label: "Settings" }]}
      />
      <SettingsContent />
    </>
  )
}
