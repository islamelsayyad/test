"use client"

import { useState } from "react"
import { Save, Globe, Lock, Settings2, Bell, ShieldCheck, Mail, Database, Clock, KeyRound, AlertOctagon, Smartphone, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsContent() {
  const [systemName, setSystemName] = useState("SmartLabs Management")
  const [language, setLanguage] = useState("en-US")
  const [timezone, setTimezone] = useState("UTC+02:00")
  const [adminEmail, setAdminEmail] = useState("admin@smartlabs.edu")
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [enforce2FA, setEnforce2FA] = useState(false)
  const [minPasswordLength, setMinPasswordLength] = useState("8")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [maxFileSize, setMaxFileSize] = useState("10")
  const [defaultBookingDuration, setDefaultBookingDuration] = useState("60")
  const [autoApproveBookings, setAutoApproveBookings] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">System Configuration</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage global parameters, security policies, and operational rules.
          </p>
        </div>
        <Button className="h-9 px-3.5 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-sm">
          <Save className="mr-1.5 h-3.5 w-3.5" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="h-10">
          <TabsTrigger value="general" className="text-sm">
              <Globe className="mr-1.5 h-3.5 w-3.5" />
              General
          </TabsTrigger>
          <TabsTrigger value="security" className="text-sm">
              <Lock className="mr-1.5 h-3.5 w-3.5" />
              Security
          </TabsTrigger>
          <TabsTrigger value="system" className="text-sm">
              <Settings2 className="mr-1.5 h-3.5 w-3.5" />
              Modules
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="mt-0 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-foreground">System Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="set-name" className="text-sm">Instance Name</Label>
                    <Input id="set-name" value={systemName} onChange={(e) => setSystemName(e.target.value)} className="h-9" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="set-email" className="text-sm">Admin Contact</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="set-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="h-9 pl-9" />
                    </div>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-foreground">Localization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-sm">Default Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-sm">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="UTC+00:00">UTC+00:00 (London)</SelectItem>
                        <SelectItem value="UTC-05:00">UTC-05:00 (New York)</SelectItem>
                        <SelectItem value="UTC+02:00">UTC+02:00 (Cairo)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-0">
          <Card>
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <ShieldCheck className="h-4.5 w-4.5" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-medium text-foreground">Access Control Policies</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground mt-0.5">Configure authentication and session settings</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg border border-border space-y-2">
                    <Label htmlFor="set-timeout" className="text-sm">Idle Session Timeout</Label>
                    <div className="flex items-center gap-2">
                        <Input id="set-timeout" type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className="h-9 font-medium" />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">min</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg border border-border space-y-2">
                    <Label htmlFor="set-pass" className="text-sm">Min Password Length</Label>
                    <div className="flex items-center gap-2">
                        <Input id="set-pass" type="number" value={minPasswordLength} onChange={(e) => setMinPasswordLength(e.target.value)} className="h-9 font-medium" />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">chars</span>
                    </div>
                  </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex gap-3 items-center">
                    <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <Smartphone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Mandatory for all staff accounts</p>
                    </div>
                </div>
                <Switch checked={enforce2FA} onCheckedChange={setEnforce2FA} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="mt-0 space-y-4">
          {/* Maintenance Mode */}
          <Card className={maintenanceMode ? "border-amber-200 bg-amber-50/50" : ""}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                 <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${maintenanceMode ? "bg-amber-100 border-amber-200 text-amber-600" : "bg-accent/10 text-accent border-accent/20"}`}>
                    <AlertOctagon className="h-5 w-5" />
                 </div>
                 <div>
                    <h3 className="text-sm font-medium text-foreground">Maintenance Mode</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {maintenanceMode 
                            ? "System lockdown active. Standard user access is suspended." 
                            : "System operating normally."}
                    </p>
                 </div>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Database className="h-3.5 w-3.5 text-muted-foreground" /> Operational Limits
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="set-file" className="text-sm">Max Upload (MB)</Label>
                        <Input id="set-file" type="number" value={maxFileSize} onChange={(e) => setMaxFileSize(e.target.value)} className="h-9" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="set-dur" className="text-sm">Default Duration (min)</Label>
                        <Input id="set-dur" type="number" value={defaultBookingDuration} onChange={(e) => setDefaultBookingDuration(e.target.value)} className="h-9" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium text-foreground flex items-center gap-1.5">
                        <Bell className="h-3.5 w-3.5 text-muted-foreground" /> Automation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0 -mx-6 -mb-6">
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors border-b border-border cursor-pointer" onClick={() => setAutoApproveBookings(!autoApproveBookings)}>
                        <div>
                            <p className="text-sm font-medium text-foreground">Auto-Approve</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Policy-compliant bookings</p>
                        </div>
                        <Switch checked={autoApproveBookings} onCheckedChange={setAutoApproveBookings} />
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setEmailNotifications(!emailNotifications)}>
                        <div>
                            <p className="text-sm font-medium text-foreground">Email Alerts</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Status updates & reminders</p>
                        </div>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
