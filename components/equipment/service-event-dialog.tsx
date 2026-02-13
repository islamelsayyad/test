
"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Info, Wrench, CheckCircle2, XCircle, AlertTriangle, CalendarDays } from "lucide-react"
import type { Equipment, MaintenanceLog } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  equipment: Equipment | null
  onSubmit: (log: MaintenanceLog) => void
}

export function ServiceEventDialog({ open, onOpenChange, equipment, onSubmit }: Props) {
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split("T")[0])
  const [outcome, setOutcome] = useState<"passed" | "failed" | "needs_repair">("passed")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    onSubmit({
      id: `ml${Date.now()}`,
      date: serviceDate,
      outcome,
      technician: "Alex Morgan",
      notes,
    })
    setNotes("")
    setOutcome("passed")
  }

  if (!equipment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200/50">
                <Wrench className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">Record Service</DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-6">
            <div className="rounded-2xl bg-indigo-50 p-4 flex items-start gap-3 border border-indigo-100">
                <Info className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
                <p className="text-xs text-indigo-900 font-bold leading-relaxed">
                    Recording a service event will automatically update the asset{"'"}s status and next calibration date.
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="svc-date" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Service Date</Label>
                    <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                        <Input id="svc-date" type="date" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} className="h-12 pl-10 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white transition-colors text-slate-900" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Outcome</Label>
                    <div className="grid grid-cols-3 gap-2">
                        <button 
                            type="button"
                            onClick={() => setOutcome('passed')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1.5 ${outcome === 'passed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm scale-[1.02]' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                        >
                            <CheckCircle2 className={`h-6 w-6 ${outcome === 'passed' ? 'fill-emerald-100' : ''}`} />
                            <span className="text-[10px] font-black uppercase tracking-wide">Passed</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setOutcome('needs_repair')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1.5 ${outcome === 'needs_repair' ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm scale-[1.02]' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                        >
                            <AlertTriangle className={`h-6 w-6 ${outcome === 'needs_repair' ? 'fill-amber-100' : ''}`} />
                            <span className="text-[10px] font-black uppercase tracking-wide">Repair</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setOutcome('failed')}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1.5 ${outcome === 'failed' ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm scale-[1.02]' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                        >
                            <XCircle className={`h-6 w-6 ${outcome === 'failed' ? 'fill-rose-100' : ''}`} />
                            <span className="text-[10px] font-black uppercase tracking-wide">Failed</span>
                        </button>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="svc-notes" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Technician Notes</Label>
                    <Textarea
                    id="svc-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Details about calibration parameters, adjustments made, or parts replaced..."
                    rows={3}
                    className="rounded-xl bg-slate-50 border-2 border-slate-200 font-medium focus:bg-white transition-colors resize-none"
                    />
                </div>
            </div>

            <DialogFooter className="gap-2 pt-2">
                <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">Cancel</Button>
                <Button onClick={handleSubmit} className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">Log Event</Button>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
