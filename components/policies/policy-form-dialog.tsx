
"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Scale, Clock, ShieldCheck, Zap, Hash, Target } from "lucide-react"
import type { Policy } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  policy: Policy | null
  onSubmit: (policy: Policy) => void
}

export function PolicyFormDialog({ open, onOpenChange, policy, onSubmit }: Props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [target, setTarget] = useState<string>("all")
  const [targetValue, setTargetValue] = useState("")
  const [maxHoursPerDay, setMaxHoursPerDay] = useState(4)
  const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(16)
  const [maxHoursPerSession, setMaxHoursPerSession] = useState(3)
  const [maxConcurrentBookings, setMaxConcurrentBookings] = useState(2)
  const [cooldownHours, setCooldownHours] = useState(1)
  const [supervisionRequired, setSupervisionRequired] = useState(false)
  const [autoApprovalEligible, setAutoApprovalEligible] = useState(true)
  const [priority, setPriority] = useState(5)

  useEffect(() => {
    if (policy) {
      setName(policy.name); setDescription(policy.description)
      setTarget(policy.target); setTargetValue(policy.targetValue || "")
      setMaxHoursPerDay(policy.maxHoursPerDay); setMaxHoursPerWeek(policy.maxHoursPerWeek)
      setMaxHoursPerSession(policy.maxHoursPerSession); setMaxConcurrentBookings(policy.maxConcurrentBookings)
      setCooldownHours(policy.cooldownHours); setSupervisionRequired(policy.supervisionRequired)
      setAutoApprovalEligible(policy.autoApprovalEligible); setPriority(policy.priority)
    } else {
      setName(""); setDescription(""); setTarget("all"); setTargetValue("")
      setMaxHoursPerDay(4); setMaxHoursPerWeek(16); setMaxHoursPerSession(3)
      setMaxConcurrentBookings(2); setCooldownHours(1); setSupervisionRequired(false)
      setAutoApprovalEligible(true); setPriority(5)
    }
  }, [policy, open])

  const handleSubmit = () => {
    onSubmit({
      id: policy?.id || `p${Date.now()}`,
      name, description,
      target: target as Policy["target"],
      targetValue: targetValue || undefined,
      scope: policy?.scope || "all_labs",
      maxHoursPerDay, maxHoursPerWeek, maxHoursPerSession,
      maxConcurrentBookings, cooldownHours,
      supervisionRequired, autoApprovalEligible,
      priority, active: policy?.active ?? true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200/50">
                <Scale className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">{policy ? "Edit Policy" : "Define Policy"}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            
            {/* Identity & Scope */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="pol-name" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Policy Name</Label>
                    <Input id="pol-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Standard Student Policy" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><Target className="h-3 w-3" /> Target</Label>
                        <Select value={target} onValueChange={setTarget}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="all" className="font-bold">All Users</SelectItem>
                            <SelectItem value="role" className="font-bold">Specific Role</SelectItem>
                            <SelectItem value="group" className="font-bold">Specific Group</SelectItem>
                            <SelectItem value="user" className="font-bold">Specific User</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="pol-priority" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Priority</Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-300" />
                            <Input id="pol-priority" type="number" min={1} max={10} value={priority} onChange={(e) => setPriority(Number(e.target.value))} className="h-12 pl-9 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-indigo-400 transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Time Quotas Matrix */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Quota Matrix</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide ml-1">Per Day</span>
                        <div className="relative">
                            <Input type="number" value={maxHoursPerDay} onChange={(e) => setMaxHoursPerDay(Number(e.target.value))} className="h-12 pr-7 rounded-xl bg-white border-2 border-slate-200 font-mono font-bold text-center focus:border-indigo-400 transition-colors" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">h</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide ml-1">Per Week</span>
                        <div className="relative">
                            <Input type="number" value={maxHoursPerWeek} onChange={(e) => setMaxHoursPerWeek(Number(e.target.value))} className="h-12 pr-7 rounded-xl bg-white border-2 border-slate-200 font-mono font-bold text-center focus:border-indigo-400 transition-colors" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">h</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide ml-1">Session</span>
                        <div className="relative">
                            <Input type="number" value={maxHoursPerSession} onChange={(e) => setMaxHoursPerSession(Number(e.target.value))} className="h-12 pr-7 rounded-xl bg-white border-2 border-slate-200 font-mono font-bold text-center focus:border-indigo-400 transition-colors" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">h</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2 border-t-2 border-slate-100">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Cooldown</span>
                        <div className="flex items-center gap-1">
                            <Input type="number" value={cooldownHours} onChange={(e) => setCooldownHours(Number(e.target.value))} className="h-7 w-12 px-1 text-center bg-slate-50 border border-slate-200 rounded-md font-mono text-xs font-bold focus:border-indigo-400 transition-colors" />
                            <span className="text-[9px] font-bold text-slate-400">h</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Concurrent</span>
                        <div className="flex items-center gap-1">
                            <Input type="number" value={maxConcurrentBookings} onChange={(e) => setMaxConcurrentBookings(Number(e.target.value))} className="h-7 w-12 px-1 text-center bg-slate-50 border border-slate-200 rounded-md font-mono text-xs font-bold focus:border-indigo-400 transition-colors" />
                            <span className="text-[9px] font-bold text-slate-400">#</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${supervisionRequired ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                onClick={() => setSupervisionRequired(!supervisionRequired)}
              >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-2 ${supervisionRequired ? 'bg-white text-amber-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                      <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wide ${supervisionRequired ? 'text-amber-800' : 'text-slate-500'}`}>Supervision</span>
                  <Switch checked={supervisionRequired} className="absolute top-3 right-3 scale-75 data-[state=checked]:bg-amber-500" />
              </div>

              <div 
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${autoApprovalEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                onClick={() => setAutoApprovalEligible(!autoApprovalEligible)}
              >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-2 ${autoApprovalEligible ? 'bg-white text-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                      <Zap className="h-5 w-5 fill-current" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wide ${autoApprovalEligible ? 'text-emerald-800' : 'text-slate-500'}`}>Auto-Approve</span>
                  <Switch checked={autoApprovalEligible} className="absolute top-3 right-3 scale-75 data-[state=checked]:bg-emerald-500" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="pol-desc" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Description</Label>
              <Textarea id="pol-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Internal notes..." rows={2} className="rounded-xl bg-slate-50 border-2 border-slate-200 font-medium focus:bg-white transition-colors resize-none focus:border-indigo-400" />
            </div>
          </div>
          
          <DialogFooter className="gap-3 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">Cancel</Button>
            <Button onClick={handleSubmit} className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">{policy ? "Save Changes" : "Create Policy"}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
