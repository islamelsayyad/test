
"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, BookOpen, Users } from "lucide-react"
import type { Group } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: Group | null
  onSubmit: (group: Group) => void
}

export function GroupFormDialog({ open, onOpenChange, group, onSubmit }: Props) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [department, setDepartment] = useState("")
  const [academicYear, setAcademicYear] = useState("2025-2026")
  const [description, setDescription] = useState("")
  const [faculty, setFaculty] = useState("")

  useEffect(() => {
    if (group) {
      setName(group.name); setCode(group.code)
      setDepartment(group.department); setAcademicYear(group.academicYear)
      setDescription(group.description); setFaculty(group.faculty)
    } else {
      setName(""); setCode(""); setDepartment("")
      setAcademicYear("2025-2026"); setDescription(""); setFaculty("")
    }
  }, [group, open])

  const handleSubmit = () => {
    onSubmit({
      id: group?.id || `g${Date.now()}`,
      name, code, department, academicYear, description, faculty,
      studentCount: group?.studentCount || 0,
      students: group?.students || [],
      status: group?.status || "active",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200/50">
                <GraduationCap className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">{group ? "Edit Group" : "Create Group"}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            
            {/* Identity Block */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Identity</span>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="grp-name" className="sr-only">Group Name</Label>
                    <Input id="grp-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Group Name (e.g. Mech Eng A)" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="grp-code" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Group Code</Label>
                    <Input id="grp-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ME-2026-A" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold font-mono text-sm focus:border-indigo-400 transition-colors" />
                </div>
            </div>

            {/* Academic Context */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Academic Context</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Department</Label>
                        <Select value={department} onValueChange={setDepartment}>
                            <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors"><SelectValue placeholder="Dept..." /></SelectTrigger>
                            <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            {["Computer Science", "Electronics", "Mechanical Engineering", "Biomedical", "Chemistry", "Physics"].map((d) => (
                                <SelectItem key={d} value={d} className="font-medium">{d}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Year</Label>
                        <Select value={academicYear} onValueChange={setAcademicYear}>
                            <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors"><SelectValue /></SelectTrigger>
                            <SelectContent className="rounded-xl shadow-xl border-slate-100">
                                <SelectItem value="2024-2025" className="font-medium">2024-25</SelectItem>
                                <SelectItem value="2025-2026" className="font-medium">2025-26</SelectItem>
                                <SelectItem value="2026-2027" className="font-medium">2026-27</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="grp-faculty" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Advisor</Label>
                    <Input id="grp-faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} placeholder="Faculty Advisor Name" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors" />
                </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="grp-desc" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Description</Label>
              <Textarea id="grp-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Cohort description and notes..." rows={2} className="rounded-xl bg-slate-50 border-2 border-slate-200 font-medium focus:bg-white transition-colors resize-none focus:border-indigo-400" />
            </div>
          </div>
          
          <DialogFooter className="gap-3 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">Cancel</Button>
            <Button onClick={handleSubmit} className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">{group ? "Save Changes" : "Create Group"}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
