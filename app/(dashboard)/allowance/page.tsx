import { DashboardHeader } from "@/components/dashboard-header"
import { PoliciesContent } from "@/components/policies/policies-content"

export default function AllowancePage() {
  return (
    <>
      <DashboardHeader
        title="Machine Allowance Policies"
        breadcrumbs={[{ label: "Policies" }]}
      />
      <PoliciesContent />
    </>
  )
}
