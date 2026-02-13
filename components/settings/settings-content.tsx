
"use client"

import { useState } from "react"
import { Save, Globe, Lock, Settings2, Bell, ShieldCheck, Mail, Database, Clock, KeyRound, AlertOctagon, Smartphone, Settings, ToggleRight, Info } from "lucide-react"
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
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 shadow-sm border-2 border-slate-300/50">
                <Settings className="h-6 w-6" />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-slate-900">System Configuration</h1>
          </div>
          <p className="text-slate-500 font-medium ml-14">
            Manage global parameters, security policies, and operational rules.
          </p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 rounded-xl font-bold h-12 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-8">
        <div className="sticky top-0 z-20 bg-[#F8FAFC]/95 backdrop-blur-md -mx-4 px-4 pb-4 pt-2">
            <TabsList className="bg-white p-1.5 rounded-2xl border-2 border-slate-200 shadow-sm w-full sm:w-auto min-h-14 grid grid-cols-3 sm:flex gap-1">
            <TabsTrigger value="general" className="rounded-xl h-11 px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-inner font-bold text-slate-500 transition-all">
                <Globe className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl h-11 px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-inner font-bold text-slate-500 transition-all">
                <Lock className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-xl h-11 px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-inner font-bold text-slate-500 transition-all">
                <Settings2 className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Modules</span>
            </TabsTrigger>
            </TabsList>
        </div>

        {/* General Tab */}
        <TabsContent value="general" className="mt-0 grid gap-6 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-2">
          {/* Identity Block */}
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm p-8 space-y-6 relative overflow-hidden group hover:border-slate-300 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <Globe className="h-24 w-24 text-slate-900 rotate-12" />
            </div>
            
            <div className="relative z-10">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-6">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-[10px] uppercase tracking-wider border border-blue-200">SYS-ID</span>
                    System Identity
                </h2>
                
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="set-name" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Instance Name</Label>
                        <Input id="set-name" value={systemName} onChange={(e) => setSystemName(e.target.value)} className="h-12 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors text-sm" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="set-email" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Admin Contact</Label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input id="set-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="h-12 pl-14 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors text-sm" />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Localization Block */}
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm p-8 space-y-6 relative overflow-hidden group hover:border-slate-300 transition-colors">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Clock className="h-24 w-24 text-slate-900 -rotate-12" />
            </div>
            
            <div className="relative z-10">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-6">
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-[10px] uppercase tracking-wider border border-purple-200">LOC-SET</span>
                    Localization
                </h2>
                
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Default Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="en-GB">English (UK)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Timezone</Label>
                        <Select value={timezone} onValueChange={setTimezone}>
                            <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="UTC+00:00">UTC+00:00 (London)</SelectItem>
                            <SelectItem value="UTC-05:00">UTC-05:00 (New York)</SelectItem>
                            <SelectItem value="UTC+02:00">UTC+02:00 (Cairo)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-0 animate-in fade-in slide-in-from-bottom-2">
          <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/30 px-8 pt-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-black text-slate-900">Access Control Policies</CardTitle>
                        <CardDescription className="text-slate-500 font-bold mt-1 text-xs uppercase tracking-wide">Strict Enforcement Mode Active</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-8 p-10">
              <div className="grid sm:grid-cols-2 gap-8">
                  {/* Session Module */}
                  <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-200 relative overflow-hidden hover:bg-slate-100/50 transition-colors">
                    <div className="absolute top-4 right-4 opacity-5"><Clock className="h-20 w-20" /></div>
                    <div className="relative z-10">
                        <Label htmlFor="set-timeout" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">Idle Session Timeout</Label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Input id="set-timeout" type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className="h-12 pl-6 rounded-2xl font-black bg-white border-2 border-slate-200 focus:ring-4 focus:ring-indigo-500/10 text-xl" />
                            </div>
                            <span className="text-sm font-bold text-slate-500 bg-white px-4 py-3 rounded-2xl border-2 border-slate-200">min</span>
                        </div>
                    </div>
                  </div>
                  
                  {/* Password Module */}
                  <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-200 relative overflow-hidden hover:bg-slate-100/50 transition-colors">
                    <div className="absolute top-4 right-4 opacity-5"><KeyRound className="h-20 w-20" /></div>
                    <div className="relative z-10">
                        <Label htmlFor="set-pass" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">Min Password Length</Label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Input id="set-pass" type="number" value={minPasswordLength} onChange={(e) => setMinPasswordLength(e.target.value)} className="h-12 pl-6 rounded-2xl font-black bg-white border-2 border-slate-200 focus:ring-4 focus:ring-indigo-500/10 text-xl" />
                            </div>
                            <span className="text-sm font-bold text-slate-500 bg-white px-4 py-3 rounded-2xl border-2 border-slate-200">char</span>
                        </div>
                    </div>
                  </div>
              </div>

              {/* 2FA Toggle - High Visibility */}
              <div className="flex items-center justify-between p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 transition-colors hover:bg-indigo-50 cursor-pointer group">
                <div className="flex gap-5 items-center">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center border-2 border-indigo-100 text-indigo-600 shadow-sm group-hover:scale-105 transition-transform">
                        <Smartphone className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-lg font-black text-slate-900">Enforce Two-Factor Authentication</p>
                        <p className="text-xs text-indigo-700/70 font-bold uppercase tracking-wide mt-1">Mandatory for all staff accounts</p>
                    </div>
                </div>
                <Switch checked={enforce2FA} onCheckedChange={setEnforce2FA} className="data-[state=checked]:bg-indigo-600 scale-150 shadow-sm mr-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {/* Maintenance Mode - Hazard Style */}
          <div className={`rounded-[2.5rem] border-2 relative overflow-hidden transition-all duration-300 ${maintenanceMode ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white"}`}>
            {/* Striped Background for Warning */}
            {maintenanceMode && (
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)" }}></div>
            )}
            
            <div className="p-10 flex items-center justify-between relative z-10">
              <div className="flex gap-8 items-center">
                 <div className={`flex h-24 w-24 items-center justify-center rounded-[2rem] border-4 shadow-xl transition-colors ${maintenanceMode ? "bg-amber-400 border-amber-500 text-white animate-pulse" : "bg-slate-100 border-slate-200 text-slate-400"}`}>
                    <AlertOctagon className="h-12 w-12" />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Maintenance Mode</h3>
                    <p className="text-sm font-bold mt-2 max-w-lg leading-relaxed opacity-70">
                        {maintenanceMode 
                            ? "SYSTEM LOCKDOWN ACTIVE. Standard user access is suspended. Only Administrators can bypass." 
                            : "System operating normally. Engaging this mode will suspend standard user access."}
                    </p>
                 </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                 <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} className="data-[state=checked]:bg-amber-500 scale-[2] shadow-lg" />
                 <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${maintenanceMode ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
                    {maintenanceMode ? "ENGAGED" : "STANDBY"}
                 </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/30 px-8 pt-8">
                    <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                        <Database className="h-4 w-4 text-indigo-500" /> Operational Limits
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                    <div className="space-y-2">
                        <Label htmlFor="set-file" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Max Upload (MB)</Label>
                        <Input id="set-file" type="number" value={maxFileSize} onChange={(e) => setMaxFileSize(e.target.value)} className="h-12 rounded-2xl bg-slate-50 border-2 border-slate-200 font-black text-xl pl-6" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="set-dur" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Default Duration (min)</Label>
                        <Input id="set-dur" type="number" value={defaultBookingDuration} onChange={(e) => setDefaultBookingDuration(e.target.value)} className="h-12 rounded-2xl bg-slate-50 border-2 border-slate-200 font-black text-xl pl-6" />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/30 px-8 pt-8">
                    <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                        <Bell className="h-4 w-4 text-indigo-500" /> Automation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0 p-0">
                    <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-50 group cursor-pointer" onClick={() => setAutoApproveBookings(!autoApproveBookings)}>
                        <div className="space-y-0.5">
                            <p className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">Auto-Approve</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Policy compliant bookings</p>
                        </div>
                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${autoApproveBookings ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                            {autoApproveBookings && <ToggleRight className="text-white h-5 w-5" />}
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setEmailNotifications(!emailNotifications)}>
                        <div className="space-y-0.5">
                            <p className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">Email Alerts</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Status updates & reminders</p>
                        </div>
                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-colors ${emailNotifications ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                            {emailNotifications && <ToggleRight className="text-white h-5 w-5" />}
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
