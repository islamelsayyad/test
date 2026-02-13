
"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Palmtree, Calendar, Repeat } from "lucide-react"
import type { Holiday } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  holiday: Holiday | null
  onSubmit: (holiday: Holiday) => void
}

export function HolidayFormDialog({ open, onOpenChange, holiday, onSubmit }: Props) {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [type, setType] = useState<string>("public")
  const [description, setDescription] = useState("")
  const [recurring, setRecurring] = useState(false)

  useEffect(() => {
    if (holiday) {
      setName(holiday.name); setStartDate(holiday.startDate)
      setEndDate(holiday.endDate); setType(holiday.type)
      setDescription(holiday.description); setRecurring(holiday.recurring)
    } else {
      setName(""); setStartDate(""); setEndDate("")
      setType("public"); setDescription(""); setRecurring(false)
    }
  }, [holiday, open])

  const handleSubmit = () => {
    onSubmit({
      id: holiday?.id || `h${Date.now()}`,
      name, startDate, endDate: endDate || startDate,
      type: type as Holiday["type"],
      affectedLabs: holiday?.affectedLabs || ["all"],
      recurring, description,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm border border-green-200/50">
                <Palmtree className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">{holiday ? "Edit Event" : "Add Event"}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="hol-name" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Event Name</Label>
              <Input id="hol-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Spring Break" className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors" />
            </div>
            
            {/* Timeline Group */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border-2 border-slate-100 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Timeline</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="hol-start" className="text-[10px] font-bold text-slate-500 ml-1">Start</Label>
                        <Input id="hol-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="hol-end" className="text-[10px] font-bold text-slate-500 ml-1">End</Label>
                        <Input id="hol-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold" />
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Event Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-slate-100">
                  <SelectItem value="public" className="font-bold text-indigo-600">Public Holiday</SelectItem>
                  <SelectItem value="maintenance" className="font-bold text-amber-600">Maintenance</SelectItem>
                  <SelectItem value="special" className="font-bold text-purple-600">Special Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="hol-desc" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Description</Label>
              <Textarea id="hol-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event description..." rows={2} className="rounded-xl bg-slate-50 border-2 border-slate-200 font-medium focus:bg-white transition-colors resize-none" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border-2 border-slate-200 bg-white p-4 transition-colors hover:border-slate-300">
              <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Repeat className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                      <Label htmlFor="hol-recurring" className="text-sm font-bold text-slate-900 cursor-pointer">Annual Event</Label>
                      <span className="text-[10px] font-bold text-slate-400">Repeat every year</span>
                  </div>
              </div>
              <Switch id="hol-recurring" checked={recurring} onCheckedChange={setRecurring} className="scale-110 data-[state=checked]:bg-green-600" />
            </div>
          </div>
          
          <DialogFooter className="gap-3 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">Cancel</Button>
            <Button onClick={handleSubmit} className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">{holiday ? "Save Changes" : "Add Event"}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
