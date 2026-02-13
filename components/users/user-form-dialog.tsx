
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, User as UserIcon, Shield, Building2 } from "lucide-react"
import type { User } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSubmit: (user: User) => void
}

export function UserFormDialog({ open, onOpenChange, user, onSubmit }: Props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<string>("user")
  const [department, setDepartment] = useState("")
  const [status, setStatus] = useState<string>("active")

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setRole(user.role)
      setDepartment(user.department)
      setStatus(user.status)
    } else {
      setFirstName(""); setLastName(""); setEmail("")
      setRole("user"); setDepartment(""); setStatus("active")
    }
  }, [user, open])

  const handleSubmit = () => {
    onSubmit({
      id: user?.id || `u${Date.now()}`,
      firstName, lastName, email,
      role: role as User["role"],
      department,
      status: status as User["status"],
      avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
      groups: user?.groups || [],
      createdAt: user?.createdAt || new Date().toISOString(),
      lastLogin: user?.lastLogin,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200/50">
                <Users className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">{user ? "Edit Identity" : "New User"}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            
            {/* Personal Details */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <UserIcon className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Personal Details</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="usr-first" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">First Name</Label>
                        <Input id="usr-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Alex" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="usr-last" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Last Name</Label>
                        <Input id="usr-last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Morgan" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="usr-email" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
                    <Input id="usr-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex.morgan@smartlabs.edu" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors" />
                </div>
            </div>

            {/* System Access */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">System Access</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Role</Label>
                        <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="master" className="font-bold text-purple-600">Master</SelectItem>
                            <SelectItem value="configurator" className="font-bold text-blue-600">Configurator</SelectItem>
                            <SelectItem value="user" className="font-bold text-slate-600">User</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="active" className="font-bold text-emerald-600">Active</SelectItem>
                            <SelectItem value="inactive" className="font-bold text-slate-400">Inactive</SelectItem>
                            <SelectItem value="suspended" className="font-bold text-red-600">Suspended</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Department</Label>
                    <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors"><SelectValue placeholder="Select..." /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                        {["Computer Science", "Electronics", "Mechanical Eng.", "Biomedical", "Chemistry", "Physics"].map((d) => (
                            <SelectItem key={d} value={d} className="font-medium">{d}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {!user && (
              <div className="grid gap-2">
                <Label htmlFor="usr-pass" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Initial Password</Label>
                <Input id="usr-pass" type="password" placeholder="Set temporary password" className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:border-blue-400 transition-colors" />
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-3 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">Cancel</Button>
            <Button onClick={handleSubmit} className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">{user ? "Save Changes" : "Create User"}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
