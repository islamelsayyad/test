import type { User, Lab, Equipment, BookingRequest, Group, Policy, Holiday, Activity, DashboardStats } from "./types"

export const currentUser: User = {
  id: "u1",
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@smartlabs.edu",
  role: "master",
  department: "Computer Science",
  avatar: "/placeholder.svg?height=40&width=40",
  status: "active",
  lastLogin: "2026-02-13T08:00:00Z",
  groups: [],
  createdAt: "2024-01-15T00:00:00Z",
}

export const users: User[] = [
  currentUser,
  { id: "u2", firstName: "Sarah", lastName: "Chen", email: "sarah.chen@smartlabs.edu", role: "configurator", department: "Electronics", avatar: "/placeholder.svg?height=40&width=40", status: "active", lastLogin: "2026-02-12T14:30:00Z", groups: ["g1"], createdAt: "2024-02-01T00:00:00Z" },
  { id: "u3", firstName: "James", lastName: "Wilson", email: "james.wilson@smartlabs.edu", role: "user", department: "Mechanical Eng.", avatar: "/placeholder.svg?height=40&width=40", status: "active", lastLogin: "2026-02-13T07:00:00Z", groups: ["g1", "g2"], createdAt: "2024-03-10T00:00:00Z" },
  { id: "u4", firstName: "Maria", lastName: "Garcia", email: "maria.garcia@smartlabs.edu", role: "user", department: "Biomedical", avatar: "/placeholder.svg?height=40&width=40", status: "active", lastLogin: "2026-02-11T09:00:00Z", groups: ["g2"], createdAt: "2024-03-15T00:00:00Z" },
  { id: "u5", firstName: "David", lastName: "Kim", email: "david.kim@smartlabs.edu", role: "user", department: "Computer Science", avatar: "/placeholder.svg?height=40&width=40", status: "inactive", lastLogin: "2026-01-20T16:00:00Z", groups: ["g3"], createdAt: "2024-04-01T00:00:00Z" },
  { id: "u6", firstName: "Emily", lastName: "Brown", email: "emily.brown@smartlabs.edu", role: "configurator", department: "Chemistry", avatar: "/placeholder.svg?height=40&width=40", status: "active", lastLogin: "2026-02-12T11:00:00Z", groups: [], createdAt: "2024-04-15T00:00:00Z" },
  { id: "u7", firstName: "Michael", lastName: "Taylor", email: "michael.taylor@smartlabs.edu", role: "user", department: "Physics", avatar: "/placeholder.svg?height=40&width=40", status: "suspended", lastLogin: "2026-01-05T10:00:00Z", groups: ["g1"], createdAt: "2024-05-01T00:00:00Z" },
  { id: "u8", firstName: "Lisa", lastName: "Anderson", email: "lisa.anderson@smartlabs.edu", role: "user", department: "Electronics", avatar: "/placeholder.svg?height=40&width=40", status: "active", lastLogin: "2026-02-13T06:30:00Z", groups: ["g2", "g3"], createdAt: "2024-05-15T00:00:00Z" },
]

export const labs: Lab[] = [
  { id: "l1", name: "Innovation Hub", location: "Block C, Room 3A1", workstations: 12, description: "State-of-the-art prototyping and digital fabrication lab with advanced 3D printing capabilities.", status: "active", features: ["3D Printers", "CNC Machine", "Laser Cutter", "VR Area", "WiFi"], media: [], equipment: ["e1", "e2", "e3"], createdAt: "2024-01-01T00:00:00Z" },
  { id: "l2", name: "Electronics Lab A", location: "Block A, Room 101", workstations: 24, description: "Full-service electronics workbenches with oscilloscopes, signal generators, and soldering stations.", status: "active", features: ["Oscilloscopes", "Signal Generators", "Soldering Stations", "PCB Etching"], media: [], equipment: ["e4", "e5"], createdAt: "2024-01-15T00:00:00Z" },
  { id: "l3", name: "Chemistry Lab B", location: "Block B, Room 205", workstations: 18, description: "Wet chemistry lab with fume hoods, spectrophotometers, and analytical instruments.", status: "active", features: ["Fume Hoods", "Spectrophotometers", "Centrifuges", "pH Meters"], media: [], equipment: ["e6", "e7"], createdAt: "2024-02-01T00:00:00Z" },
  { id: "l4", name: "Robotics Workshop", location: "Block D, Room 102", workstations: 8, description: "Robotics development lab with industrial arms, sensors, and programming stations.", status: "maintenance", features: ["Robot Arms", "Sensors", "Programming Stations", "3D Scanner"], media: [], equipment: ["e8"], createdAt: "2024-02-15T00:00:00Z" },
  { id: "l5", name: "Biomedical Research Lab", location: "Block E, Room 301", workstations: 16, description: "BSL-2 research facility for biomedical experiments and cell culture work.", status: "active", features: ["Biosafety Cabinet", "Incubators", "Microscopes", "Centrifuges"], media: [], equipment: ["e9", "e10"], createdAt: "2024-03-01T00:00:00Z" },
  { id: "l6", name: "Physics Lab C", location: "Block A, Room 310", workstations: 20, description: "General physics lab for mechanics, optics, and electromagnetic experiments.", status: "inactive", features: ["Optics Bench", "Electromagnetic Kit", "Data Loggers"], media: [], equipment: [], createdAt: "2024-03-15T00:00:00Z" },
]

export const equipment: Equipment[] = [
  { id: "e1", name: "Ultimaker S5 Pro", model: "S5 Pro Bundle", serialNumber: "SN-UM5P001", category: "3D Printer", labId: "l1", labName: "Innovation Hub", status: "active", purchaseDate: "2024-06-15", nextCalibration: "2026-06-15", calibrationFrequency: "Yearly", description: "Professional dual-extrusion 3D printer", maintenanceLogs: [{ id: "ml1", date: "2025-06-15", outcome: "passed", technician: "Sarah Chen", notes: "Annual calibration performed. All axes within spec." }] },
  { id: "e2", name: "Trotec Speedy 360", model: "Speedy 360", serialNumber: "SN-TR360A", category: "Laser Cutter", labId: "l1", labName: "Innovation Hub", status: "active", purchaseDate: "2024-05-20", nextCalibration: "2026-05-20", calibrationFrequency: "Yearly", description: "80W CO2 laser cutter and engraver", maintenanceLogs: [] },
  { id: "e3", name: "Haas Mini Mill", model: "Mini Mill 2", serialNumber: "SN-HMM002", category: "CNC Machine", labId: "l1", labName: "Innovation Hub", status: "maintenance", purchaseDate: "2024-03-10", nextCalibration: "2026-03-10", calibrationFrequency: "6 Months", description: "Compact vertical CNC milling machine", maintenanceLogs: [{ id: "ml2", date: "2025-09-10", outcome: "needs_repair", technician: "James Wilson", notes: "Spindle bearing showing wear. Replacement ordered." }] },
  { id: "e4", name: "Spectrophotometer J-100", model: "J-100 UV-VIS", serialNumber: "SN-21BNKVF3P", category: "Spectrophotometer", labId: "l2", labName: "Electronics Lab A", status: "active", purchaseDate: "2022-05-20", nextCalibration: "2026-01-31", calibrationFrequency: "Yearly", description: "UV-Visible spectrophotometer for optical analysis", maintenanceLogs: [{ id: "ml3", date: "2025-12-17", outcome: "passed", technician: "Emily Brown", notes: "Calibration performed. Wavelength accuracy verified." }] },
  { id: "e5", name: "Keysight DSOX3024T", model: "DSOX3024T", serialNumber: "SN-KS3024T", category: "Oscilloscope", labId: "l2", labName: "Electronics Lab A", status: "active", purchaseDate: "2023-01-10", nextCalibration: "2026-07-10", calibrationFrequency: "Yearly", description: "200 MHz, 4 channel digital oscilloscope", maintenanceLogs: [] },
  { id: "e6", name: "Shimadzu HPLC", model: "Prominence-i LC-2030C", serialNumber: "SN-SHM2030", category: "HPLC System", labId: "l3", labName: "Chemistry Lab B", status: "active", purchaseDate: "2023-06-01", nextCalibration: "2026-06-01", calibrationFrequency: "Yearly", description: "Integrated HPLC system for chemical analysis", maintenanceLogs: [] },
  { id: "e7", name: "Mettler Toledo XPE205", model: "XPE205", serialNumber: "SN-MT205X", category: "Analytical Balance", labId: "l3", labName: "Chemistry Lab B", status: "active", purchaseDate: "2024-01-20", nextCalibration: "2026-03-20", calibrationFrequency: "6 Months", description: "Semi-micro analytical balance, 0.01mg readability", maintenanceLogs: [{ id: "ml4", date: "2025-09-20", outcome: "passed", technician: "Emily Brown", notes: "Calibration with certified weights. All within tolerance." }] },
  { id: "e8", name: "KUKA LBR iiwa", model: "LBR iiwa 14 R820", serialNumber: "SN-KK14R8", category: "Robot Arm", labId: "l4", labName: "Robotics Workshop", status: "maintenance", purchaseDate: "2024-04-01", nextCalibration: "2026-04-01", calibrationFrequency: "6 Months", description: "Sensitive 7-axis lightweight robot for collaborative tasks", maintenanceLogs: [] },
  { id: "e9", name: "Zeiss Axio Observer", model: "Axio Observer 7", serialNumber: "SN-ZAO700", category: "Microscope", labId: "l5", labName: "Biomedical Research Lab", status: "active", purchaseDate: "2023-08-15", nextCalibration: "2026-08-15", calibrationFrequency: "Yearly", description: "Inverted research microscope for life sciences", maintenanceLogs: [] },
  { id: "e10", name: "Thermo CO2 Incubator", model: "Heracell VIOS 160i", serialNumber: "SN-TH160V", category: "Incubator", labId: "l5", labName: "Biomedical Research Lab", status: "active", purchaseDate: "2024-02-10", nextCalibration: "2026-08-10", calibrationFrequency: "6 Months", description: "Cell culture CO2 incubator with HEPA filtration", maintenanceLogs: [{ id: "ml5", date: "2025-08-10", outcome: "passed", technician: "Sarah Chen", notes: "CO2 sensor recalibrated. Temperature uniformity verified." }] },
]

export const bookingRequests: BookingRequest[] = [
  { id: "b1", userId: "u3", userName: "James Wilson", userRole: "user", labId: "l1", labName: "Innovation Hub", equipment: ["Ultimaker S5 Pro"], date: "2026-02-14", startTime: "09:00", endTime: "12:00", purpose: "3D printing prototypes for senior capstone project", status: "pending", groupId: "g1", groupName: "ME-2026-A", createdAt: "2026-02-12T10:00:00Z" },
  { id: "b2", userId: "u4", userName: "Maria Garcia", userRole: "user", labId: "l3", labName: "Chemistry Lab B", equipment: ["Shimadzu HPLC"], date: "2026-02-14", startTime: "14:00", endTime: "16:00", purpose: "HPLC analysis for pharmaceutical research", status: "approved", createdAt: "2026-02-11T09:00:00Z" },
  { id: "b3", userId: "u8", userName: "Lisa Anderson", userRole: "user", labId: "l2", labName: "Electronics Lab A", equipment: ["Keysight DSOX3024T"], date: "2026-02-15", startTime: "10:00", endTime: "13:00", purpose: "Circuit testing and signal analysis for thesis", status: "pending", groupId: "g2", groupName: "EE-2026-B", createdAt: "2026-02-12T14:00:00Z" },
  { id: "b4", userId: "u3", userName: "James Wilson", userRole: "user", labId: "l5", labName: "Biomedical Research Lab", equipment: ["Zeiss Axio Observer"], date: "2026-02-13", startTime: "11:00", endTime: "12:00", purpose: "Microscopy session - cell morphology analysis", status: "approved", createdAt: "2026-02-10T08:00:00Z" },
  { id: "b5", userId: "u7", userName: "Michael Taylor", userRole: "user", labId: "l1", labName: "Innovation Hub", equipment: ["Trotec Speedy 360"], date: "2026-02-16", startTime: "09:00", endTime: "11:00", purpose: "Laser cutting enclosure panels", status: "rejected", reason: "Account suspended", createdAt: "2026-02-12T16:00:00Z" },
  { id: "b6", userId: "u4", userName: "Maria Garcia", userRole: "user", labId: "l3", labName: "Chemistry Lab B", equipment: ["Mettler Toledo XPE205"], date: "2026-02-17", startTime: "09:00", endTime: "10:00", purpose: "Weighing reagents for titration experiment", status: "pending", createdAt: "2026-02-13T07:00:00Z" },
  { id: "b7", userId: "u2", userName: "Sarah Chen", userRole: "configurator", labId: "l2", labName: "Electronics Lab A", equipment: ["Spectrophotometer J-100", "Keysight DSOX3024T"], date: "2026-02-13", startTime: "14:00", endTime: "17:00", purpose: "Equipment calibration verification", status: "approved", createdAt: "2026-02-09T11:00:00Z" },
]

export const groups: Group[] = [
  { id: "g1", name: "Mechanical Engineering 2026-A", code: "ME-2026-A", department: "Mechanical Engineering", academicYear: "2025-2026", description: "Senior year mechanical engineering cohort, section A", studentCount: 28, students: ["u3", "u7"], faculty: "Dr. Robert Lee", status: "active" },
  { id: "g2", name: "Electronics Engineering 2026-B", code: "EE-2026-B", department: "Electronics", academicYear: "2025-2026", description: "Senior year electronics engineering cohort, section B", studentCount: 32, students: ["u4", "u8"], faculty: "Dr. Sarah Chen", status: "active" },
  { id: "g3", name: "Computer Science 2026-C", code: "CS-2026-C", department: "Computer Science", academicYear: "2025-2026", description: "Senior year computer science cohort, section C", studentCount: 35, students: ["u5", "u8"], faculty: "Prof. Alex Morgan", status: "active" },
]

export const policies: Policy[] = [
  { id: "p1", name: "Standard Student Policy", description: "Default usage policy for all student users", target: "role", targetValue: "user", scope: "all_labs", maxHoursPerDay: 4, maxHoursPerWeek: 16, maxHoursPerSession: 3, maxConcurrentBookings: 2, cooldownHours: 1, supervisionRequired: false, autoApprovalEligible: true, priority: 5, active: true },
  { id: "p2", name: "Faculty Extended Access", description: "Extended access for faculty and configurators", target: "role", targetValue: "configurator", scope: "all_labs", maxHoursPerDay: 8, maxHoursPerWeek: 40, maxHoursPerSession: 6, maxConcurrentBookings: 5, cooldownHours: 0, supervisionRequired: false, autoApprovalEligible: true, priority: 8, active: true },
  { id: "p3", name: "CNC Supervised Access", description: "CNC machines require trained supervisor present", target: "all", scope: "specific_equipment", scopeValue: "CNC Machine", maxHoursPerDay: 2, maxHoursPerWeek: 8, maxHoursPerSession: 2, maxConcurrentBookings: 1, cooldownHours: 2, supervisionRequired: true, autoApprovalEligible: false, priority: 9, active: true },
]

export const holidays: Holiday[] = [
  { id: "h1", name: "Spring Break", startDate: "2026-03-15", endDate: "2026-03-22", type: "public", affectedLabs: ["all"], recurring: false, description: "University spring break - all labs closed" },
  { id: "h2", name: "Annual Maintenance Window", startDate: "2026-06-01", endDate: "2026-06-07", type: "maintenance", affectedLabs: ["all"], recurring: true, description: "Annual scheduled maintenance for all facilities" },
  { id: "h3", name: "Independence Day", startDate: "2026-07-04", endDate: "2026-07-04", type: "public", affectedLabs: ["all"], recurring: true, description: "National holiday" },
  { id: "h4", name: "Robotics Lab Renovation", startDate: "2026-02-20", endDate: "2026-03-05", type: "maintenance", affectedLabs: ["l4"], recurring: false, description: "Scheduled renovation and equipment upgrade" },
]

export const recentActivities: Activity[] = [
  { id: "a1", userId: "u3", userName: "James Wilson", action: "submitted a booking request for", resource: "Innovation Hub", timestamp: "2026-02-13T08:30:00Z", type: "booking" },
  { id: "a2", userId: "u2", userName: "Sarah Chen", action: "approved booking for", resource: "Chemistry Lab B", timestamp: "2026-02-13T08:15:00Z", type: "booking" },
  { id: "a3", userId: "u6", userName: "Emily Brown", action: "logged calibration for", resource: "Mettler Toledo XPE205", timestamp: "2026-02-13T07:45:00Z", type: "calibration" },
  { id: "a4", userId: "u1", userName: "Alex Morgan", action: "added new equipment", resource: "Thermo CO2 Incubator", timestamp: "2026-02-12T16:00:00Z", type: "equipment" },
  { id: "a5", userId: "u4", userName: "Maria Garcia", action: "cancelled booking for", resource: "Electronics Lab A", timestamp: "2026-02-12T14:30:00Z", type: "booking" },
  { id: "a6", userId: "u1", userName: "Alex Morgan", action: "created new schedule in", resource: "Biomedical Research Lab", timestamp: "2026-02-12T10:00:00Z", type: "schedule" },
  { id: "a7", userId: "u2", userName: "Sarah Chen", action: "updated status of", resource: "Robotics Workshop", timestamp: "2026-02-11T17:00:00Z", type: "equipment" },
]

export const dashboardStats: DashboardStats = {
  totalUsers: 156,
  activeLabs: 4,
  scheduledSessions: 12,
  equipmentAlerts: 3,
  usersTrend: 12.5,
  labsTrend: 0,
  sessionsTrend: 8.3,
  alertsTrend: -25,
}
