export type Role = "master" | "configurator" | "user"

export type Status = "active" | "inactive" | "maintenance" | "pending" | "suspended"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  department: string
  avatar?: string
  status: Status
  lastLogin?: string
  groups: string[]
  createdAt: string
}

export interface Lab {
  id: string
  name: string
  location: string
  workstations: number
  description: string
  status: Status
  features: string[]
  media: string[]
  equipment: string[]
  createdAt: string
}

export interface Equipment {
  id: string
  name: string
  model: string
  serialNumber: string
  category: string
  labId: string
  labName: string
  status: Status
  purchaseDate: string
  nextCalibration: string
  calibrationFrequency: string
  description: string
  image?: string
  maintenanceLogs: MaintenanceLog[]
}

export interface MaintenanceLog {
  id: string
  date: string
  outcome: "passed" | "failed" | "needs_repair"
  technician: string
  notes: string
}

export interface BookingRequest {
  id: string
  userId: string
  userName: string
  userRole: Role
  labId: string
  labName: string
  equipment: string[]
  date: string
  startTime: string
  endTime: string
  purpose: string
  status: "pending" | "approved" | "rejected" | "cancelled"
  groupId?: string
  groupName?: string
  createdAt: string
  reason?: string
}

export interface Group {
  id: string
  name: string
  code: string
  department: string
  academicYear: string
  description: string
  studentCount: number
  students: string[]
  faculty: string
  status: Status
}

export interface Policy {
  id: string
  name: string
  description: string
  target: "all" | "role" | "group" | "user"
  targetValue?: string
  scope: "all_labs" | "specific_lab" | "specific_equipment"
  scopeValue?: string
  maxHoursPerDay: number
  maxHoursPerWeek: number
  maxHoursPerSession: number
  maxConcurrentBookings: number
  cooldownHours: number
  supervisionRequired: boolean
  autoApprovalEligible: boolean
  priority: number
  active: boolean
}

export interface Holiday {
  id: string
  name: string
  startDate: string
  endDate: string
  type: "public" | "maintenance" | "special"
  affectedLabs: string[]
  recurring: boolean
  description: string
}

export interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  action: string
  resource: string
  timestamp: string
  type: "booking" | "equipment" | "calibration" | "schedule" | "user"
}

export interface DashboardStats {
  totalUsers: number
  activeLabs: number
  scheduledSessions: number
  equipmentAlerts: number
  usersTrend: number
  labsTrend: number
  sessionsTrend: number
  alertsTrend: number
}
