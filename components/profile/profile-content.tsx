
"use client"

import React, { useState } from "react"
import { Camera, Save, User, Shield, Activity, Lock, Smartphone, Mail, Phone, Briefcase, Calendar, MapPin, Clock, KeyRound, Fingerprint, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser, bookingRequests, recentActivities } from "@/lib/mock-data"

export function ProfileContent() {
  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState(currentUser.department)

  const userBookings = bookingRequests.filter((b) => b.userId === currentUser.id)
  const userActivities = recentActivities.filter((a) => a.userId === currentUser.id)

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Profile Header - "The ID Card" */}
        <div className="relative rounded-[2.5rem] bg-white border-2 border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-slate-900 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="relative px-10 pb-10 pt-28">
                <div className="flex flex-col lg:flex-row items-end gap-8">
                    {/* Avatar Container */}
                    <div className="relative shrink-0">
                        <div className="h-40 w-40 rounded-[2rem] p-1.5 bg-white shadow-2xl rotate-3 transition-transform group-hover:rotate-0 duration-500 border-2 border-slate-100">
                            <Avatar className="h-full w-full rounded-[1.7rem] ring-0 border-0">
                                <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} className="object-cover" />
                                <AvatarFallback className="bg-slate-100 text-slate-400 text-4xl font-black rounded-[1.7rem]">
                                {currentUser.firstName[0]}{currentUser.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="absolute -bottom-3 -right-3">
                            <Button size="icon" className="h-12 w-12 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 shadow-xl border-4 border-white transition-colors hover:scale-110">
                                <Camera className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex-1 pb-2 text-center lg:text-left w-full">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">{currentUser.firstName} {currentUser.lastName}</h1>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                    <Badge variant="outline" className="border-2 border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wide px-2.5 py-1 rounded-lg bg-slate-50">
                                        {currentUser.role === 'master' ? 'System Administrator' : currentUser.role}
                                    </Badge>
                                    <Badge variant="outline" className="border-2 border-emerald-100 text-emerald-600 font-bold text-xs uppercase tracking-wide px-2.5 py-1 rounded-lg bg-emerald-50">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"/>
                                        Active Status
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-center lg:justify-end">
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-xl font-bold h-12 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:border-slate-200">
                                <Mail className="h-3.5 w-3.5 text-indigo-500" />
                                {currentUser.email}
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:border-slate-200">
                                <Briefcase className="h-3.5 w-3.5 text-indigo-500" />
                                {currentUser.department}
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border-2 border-slate-100 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:border-slate-200">
                                <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                                Member since {new Date(currentUser.createdAt).getFullYear()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-8">
            {/* Standardized Tabs List */}
            <div className="sticky top-0 z-20 bg-[#F8FAFC]/95 backdrop-blur-md -mx-4 px-4 pb-4 pt-2">
                <TabsList className="bg-white p-1.5 rounded-2xl border-2 border-slate-200 shadow-sm w-full sm:w-auto min-h-16 grid grid-cols-3 sm:flex gap-1">
                    <TabsTrigger value="personal" className="rounded-xl h-12 px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-inner font-bold text-slate-500 transition-all">
                        <User className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Personal</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl h-12 px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-inner font-bold text-slate-500 transition-all">
                        <Shield className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="rounded-xl h-12 px-6 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-inner font-bold text-slate-500 transition-all">
                        <Activity className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Log</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                {/* Main Content Area */}
                <div className="space-y-8">
                    <TabsContent value="personal" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="pb-4 border-b-2 border-slate-50 px-8 pt-8">
                                <CardTitle className="text-xl font-black text-slate-900">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8">
                                
                                {/* Identity Block */}
                                <div className="bg-slate-50/50 p-6 rounded-3xl border-2 border-slate-100 space-y-4 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Legal Identity</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="prf-first" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">First Name</Label>
                                            <Input id="prf-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 focus:border-indigo-500 transition-all font-bold text-slate-900" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="prf-last" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Last Name</Label>
                                            <Input id="prf-last" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 focus:border-indigo-500 transition-all font-bold text-slate-900" />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Block */}
                                <div className="bg-slate-50/50 p-6 rounded-3xl border-2 border-slate-100 space-y-4 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contact & Department</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-email" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
                                        <div className="relative opacity-75">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                            <Input id="prf-email" type="email" value={currentUser.email} disabled className="h-12 pl-12 rounded-xl bg-slate-100 border-2 border-transparent text-slate-500 font-bold" />
                                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="prf-phone" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                <Input id="prf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="h-12 pl-12 rounded-xl bg-white border-2 border-slate-200 focus:border-indigo-500 transition-all font-bold text-slate-900" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Department</Label>
                                            <div className="relative">
                                                <Select value={department} onValueChange={setDepartment}>
                                                    <SelectTrigger className="h-12 pl-4 rounded-xl bg-white border-2 border-slate-200 font-bold"><SelectValue /></SelectTrigger>
                                                    <SelectContent className="rounded-xl shadow-xl border-slate-100">
                                                    {["Computer Science", "Electronics", "Mechanical Eng.", "Biomedical", "Chemistry", "Physics"].map((d) => (
                                                        <SelectItem key={d} value={d} className="font-bold">{d}</SelectItem>
                                                    ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 rounded-xl font-bold h-12 px-8 transition-transform hover:scale-105 active:scale-95 border-2 border-transparent">
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="pb-4 border-b-2 border-slate-50 px-8 pt-8">
                                <CardTitle className="text-xl font-black text-slate-900">Security Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8">
                                
                                <div className="bg-slate-50/50 p-6 rounded-3xl border-2 border-slate-100 space-y-4 hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <KeyRound className="h-4 w-4 text-slate-400" />
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Password Update</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-cur-pass" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Current Password</Label>
                                        <Input id="prf-cur-pass" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="prf-new-pass" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">New Password</Label>
                                            <Input id="prf-new-pass" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="prf-confirm" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Confirm Password</Label>
                                            <Input id="prf-confirm" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-slate-200 transition-all hover:border-slate-300 shadow-sm cursor-pointer group">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border-2 border-indigo-100 group-hover:scale-110 transition-transform shadow-sm">
                                            <Fingerprint className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-slate-900 group-hover:text-indigo-700 transition-colors">Two-Factor Authentication</p>
                                            <p className="text-xs text-slate-500 font-bold mt-1">Add an extra layer of security to your account.</p>
                                        </div>
                                    </div>
                                    <Switch className="scale-125 data-[state=checked]:bg-indigo-600 mr-2 shadow-sm" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="pb-4 border-b-2 border-slate-50 px-8 pt-8">
                                <CardTitle className="text-xl font-black text-slate-900">Activity Log</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="relative pl-4 space-y-8 ml-2">
                                    {/* Continuous Line */}
                                    <div className="absolute top-2 bottom-2 left-[11px] w-[3px] bg-slate-100 rounded-full" />

                                    {userActivities.map((activity, i) => (
                                        <div key={activity.id} className="relative pl-10 group">
                                            {/* Tactile Node */}
                                            <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-[3px] border-indigo-100 bg-white shadow-sm z-10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-indigo-200">
                                                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                            </div>
                                            
                                            <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-slate-50/50 border-2 border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all cursor-default">
                                                <p className="text-sm text-slate-900 leading-snug">
                                                    <span className="font-bold text-slate-500">{activity.action}</span> <span className="font-black text-slate-800">{activity.resource}</span>
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(activity.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>

                {/* Sidebar / Quick Stats - "The Summary" */}
                <div className="space-y-6">
                    <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2 border-b-2 border-slate-50 bg-slate-50/30 px-6 pt-6">
                            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Shield className="h-3 w-3" /> Access Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <span className="text-xs font-bold text-slate-600">Account Status</span>
                                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] uppercase font-black px-2 py-0.5 border-2 shadow-sm">Active</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <span className="text-xs font-bold text-slate-600">Security Level</span>
                                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[10px] uppercase font-black px-2 py-0.5 border-2 shadow-sm">Level 4</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <span className="text-xs font-bold text-slate-600">2FA</span>
                                    <Badge variant="outline" className="text-slate-400 border-slate-200 text-[10px] uppercase font-black px-2 py-0.5 border-2">Disabled</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2 border-b-2 border-slate-50 bg-slate-50/30 px-6 pt-6">
                            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Calendar className="h-3 w-3" /> Recent Bookings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {userBookings.length > 0 ? (
                                <div className="divide-y-2 divide-slate-50">
                                    {userBookings.slice(0, 3).map(booking => (
                                        <div key={booking.id} className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer">
                                            <div className="flex justify-between items-start mb-1">
                                                <Badge className={`text-[9px] px-1.5 py-0 rounded-md uppercase font-black border-2 shadow-none ${
                                                    booking.status === "approved" ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
                                                    booking.status === "pending" ? "bg-amber-50 border-amber-100 text-amber-700" :
                                                    "bg-slate-50 border-slate-100 text-slate-500"
                                                }`}>{booking.status}</Badge>
                                                <span className="text-[10px] font-bold text-slate-400 font-mono">{booking.date}</span>
                                            </div>
                                            <p className="text-sm font-black text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">{booking.labName}</p>
                                            <p className="text-[10px] font-bold text-slate-500 mt-1 flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-slate-300" />
                                                {booking.startTime} - {booking.endTime}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center border-dashed border-slate-200 m-4 rounded-xl border-2">
                                    <p className="text-xs text-slate-400 font-bold">No recent bookings</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Tabs>
      </div>
    </div>
  )
}
