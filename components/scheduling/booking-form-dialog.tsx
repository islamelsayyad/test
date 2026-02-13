
"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Box } from "lucide-react"
import { labs, equipment, groups } from "@/lib/mock-data"
import type { BookingRequest } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (booking: BookingRequest) => void
}

export function BookingFormDialog({ open, onOpenChange, onSubmit }: Props) {
  const [labId, setLabId] = useState("")
  const [selectedEquipment, setSelectedEquipment] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("12:00")
  const [groupId, setGroupId] = useState("")
  const [purpose, setPurpose] = useState("")

  const labEquipment = equipment.filter((e) => e.labId === labId)
  const selectedLab = labs.find((l) => l.id === labId)
  const selectedGroup = groups.find((g) => g.id === groupId)

  const handleSubmit = () => {
    onSubmit({
      id: `b${Date.now()}`,
      userId: "u1",
      userName: "Alex Morgan",
      userRole: "master",
      labId,
      labName: selectedLab?.name || "",
      equipment: selectedEquipment ? [selectedEquipment] : [],
      date,
      startTime,
      endTime,
      purpose,
      status: "pending",
      groupId: groupId || undefined,
      groupName: selectedGroup?.name || undefined,
      createdAt: new Date().toISOString(),
    })
    setLabId(""); setSelectedEquipment(""); setDate(""); setPurpose(""); setGroupId("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 shadow-sm border border-violet-200/50">
                <Calendar className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">Schedule Event</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            
            {/* Resource Selection */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="grid gap-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Laboratory</Label>
                    <Select value={labId} onValueChange={(v) => { setLabId(v); setSelectedEquipment("") }}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:bg-white focus:border-violet-400 transition-colors"><SelectValue placeholder="Select facility..." /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                        {labs.filter((l) => l.status === "active").map((l) => (
                            <SelectItem key={l.id} value={l.id} className="font-bold">{l.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                
                {labId && labEquipment.length > 0 && (
                <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><Box className="h-3 w-3" /> Equipment (Optional)</Label>
                    <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                    <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:bg-white focus:border-violet-400 transition-colors"><SelectValue placeholder="Select specific asset..." /></SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border-slate-100">
                        {labEquipment.filter((e) => e.status === "active").map((e) => (
                        <SelectItem key={e.id} value={e.name} className="font-medium">{e.name}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                )}
            </div>

            {/* Time Block */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="bk-date" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Date</Label>
                    <Input id="bk-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-violet-400 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="bk-start" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Start</Label>
                        <Input id="bk-start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-violet-400 transition-colors" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bk-end" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><Clock className="h-3 w-3" /> End</Label>
                        <Input id="bk-end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-violet-400 transition-colors" />
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><Users className="h-3 w-3" /> Cohort Group (Optional)</Label>
              <Select value={groupId} onValueChange={setGroupId}>
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors"><SelectValue placeholder="Associate with a group..." /></SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-slate-100">
                  {groups.map((g) => (
                    <SelectItem key={g.id} value={g.id} className="