"use client"

import React, { useState } from "react"
import { Camera, Save, User, Shield, Activity, Lock, Mail, Phone, Briefcase, Calendar, Clock, KeyRound, Fingerprint, UserCog } from "lucide-react"
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
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Header */}
        <div className="relative rounded-xl bg-card border border-border overflow-hidden">
            <div className="h-32 bg-foreground relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(160_84%_39%/0.2),transparent_70%)]" />
            </div>

            <div className="relative px-6 pb-6 -mt-12">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="relative shrink-0">
                        <Avatar className="h-24 w-24 rounded-lg border-4 border-card">
                            <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} className="object-cover" />
                            <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-medium rounded-lg">
                            {currentUser.firstName[0]}{currentUser.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-card">
                            <Camera className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                    
                    <div className="flex-1 pt-14 sm:pt-2 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                                <h1 className="text-xl font-semibold text-foreground tracking-tight">{currentUser.firstName} {currentUser.lastName}</h1>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded">
                                        {currentUser.role === 'master' ? 'Administrator' : currentUser.role}
                                    </Badge>
                                    <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded text-emerald-600 border-emerald-200 bg-emerald-50">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"/>
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            <Button size="sm" className="h-9 px-3.5 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-sm">
                                <UserCog className="mr-1.5 h-3.5 w-3.5" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {currentUser.email}
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border text-xs text-muted-foreground">
                                <Briefcase className="h-3 w-3" />
                                {currentUser.department}
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                Since {new Date(currentUser.createdAt).getFullYear()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="h-10">
                <TabsTrigger value="personal" className="text-sm">
                    <User className="mr-1.5 h-3.5 w-3.5" /> Personal
                </TabsTrigger>
                <TabsTrigger value="security" className="text-sm">
                    <Shield className="mr-1.5 h-3.5 w-3.5" /> Security
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-sm">
                    <Activity className="mr-1.5 h-3.5 w-3.5" /> Log
                </TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-6">
                    <TabsContent value="personal" className="mt-0">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm font-medium text-foreground">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-first" className="text-sm">First Name</Label>
                                        <Input id="prf-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-9" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-last" className="text-sm">Last Name</Label>
                                        <Input id="prf-last" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-9" />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="prf-email" className="text-sm">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="prf-email" type="email" value={currentUser.email} disabled className="h-9 pl-9 bg-muted text-muted-foreground" />
                                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-phone" className="text-sm">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="prf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="h-9 pl-9" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm">Department</Label>
                                        <Select value={department} onValueChange={setDepartment}>
                                            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                            {["Computer Science", "Electronics", "Mechanical Eng.", "Biomedical", "Chemistry", "Physics"].map((d) => (
                                                <SelectItem key={d} value={d}>{d}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <Button className="h-9 px-3.5 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-sm">
                                        <Save className="mr-1.5 h-3.5 w-3.5" />
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="mt-0">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm font-medium text-foreground">Security Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prf-cur-pass" className="text-sm">Current Password</Label>
                                    <Input id="prf-cur-pass" type="password" placeholder="Enter current password" className="h-9" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-new-pass" className="text-sm">New Password</Label>
                                        <Input id="prf-new-pass" type="password" placeholder="Enter new password" className="h-9" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prf-confirm" className="text-sm">Confirm Password</Label>
                                        <Input id="prf-confirm" type="password" placeholder="Confirm password" className="h-9" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border mt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                            <Fingerprint className="h-4.5 w-4.5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">Extra layer of security for your account.</p>
                                        </div>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm font-medium text-foreground">Activity Log</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {userActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-foreground/20 mt-1.5 shrink-0" />
                                            <div>
                                                <p className="text-sm text-foreground">
                                                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                                                    <span className="font-medium">{activity.resource}</span>
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
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

                {/* Sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Shield className="h-3 w-3" /> Access Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between py-1">
                                <span className="text-sm text-muted-foreground">Account</span>
                                <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded text-emerald-600 border-emerald-200 bg-emerald-50">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <span className="text-sm text-muted-foreground">Security</span>
                                <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded">Level 4</Badge>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <span className="text-sm text-muted-foreground">2FA</span>
                                <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded text-muted-foreground">Disabled</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" /> Recent Bookings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {userBookings.length > 0 ? (
                                <div className="divide-y divide-border">
                                    {userBookings.slice(0, 3).map(booking => (
                                        <div key={booking.id} className="px-6 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="flex justify-between items-start mb-1">
                                                <Badge variant="outline" className={`text-[10px] font-medium px-1.5 py-0 rounded ${
                                                    booking.status === "approved" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                                                    booking.status === "pending" ? "text-amber-600 border-amber-200 bg-amber-50" :
                                                    "text-muted-foreground"
                                                }`}>{booking.status}</Badge>
                                                <span className="text-[11px] text-muted-foreground font-mono">{booking.date}</span>
                                            </div>
                                            <p className="text-sm font-medium text-foreground line-clamp-1">{booking.labName}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {booking.startTime} - {booking.endTime}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-xs text-muted-foreground">No recent bookings</p>
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
