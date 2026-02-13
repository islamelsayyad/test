
"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { labs } from "@/lib/mock-data"
import { Wrench, Box, Activity, CalendarDays, Hash } from "lucide-react"
import type { Equipment } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  equipment: Equipment | null
  onSubmit: (eq: Equipment) => void
}

export function EquipmentFormDialog({ open, onOpenChange, equipment, onSubmit }: Props) {
  const [name, setName] = useState("")
  const [model, setModel] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [category, setCategory] = useState("")
  const [labId, setLabId] = useState("")
  const [status, setStatus] = useState<string>("active")
  const [purchaseDate, setPurchaseDate] = useState("")
  const [calibrationFrequency, setCalibrationFrequency] = useState("Yearly")
  const [nextCalibration, setNextCalibration] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (equipment) {
      setName(equipment.name)
      setModel(equipment.model)
      setSerialNumber(equipment.serialNumber)
      setCategory(equipment.category)
      setLabId(equipment.labId)
      setStatus(equipment.status)
      setPurchaseDate(equipment.purchaseDate)
      setCalibrationFrequency(equipment.calibrationFrequency)
      setNextCalibration(equipment.nextCalibration)
      setDescription(equipment.description)
    } else {
      setName(""); setModel(""); setSerialNumber(""); setCategory("")
      setLabId(""); setStatus("active"); setPurchaseDate("")
      setCalibrationFrequency("Yearly"); setNextCalibration(""); setDescription("")
    }
  }, [equipment, open])

  const handleSubmit = () => {
    const lab = labs.find((l) => l.id === labId)
    onSubmit({
      id: equipment?.id || `e${Date.now()}`,
      name, model, serialNumber, category,
      labId, labName: lab?.name || "", status: status as Equipment["status"],
      purchaseDate, nextCalibration, calibrationFrequency, description,
      maintenanceLogs: equipment?.maintenanceLogs || [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200/50">
                <Wrench className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">{equipment ? "Edit Asset" : "Register Asset"}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            
            {/* Asset Identity Block */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <Box className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Core Identity</span>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="eq-name" className="sr-only">Asset Name</Label>
                    <Input id="eq-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Asset Name (e.g. Spectrophotometer)" className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors"><SelectValue placeholder="Select..." /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            {["3D Printer", "Laser Cutter", "CNC Machine", "Spectrophotometer", "Oscilloscope", "HPLC System", "Analytical Balance", "Robot Arm", "Microscope", "Incubator", "Other"].map((c) => (
                            <SelectItem key={c} value={c} className="font-bold">{c}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="eq-model" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Model</Label>
                        <Input id="eq-model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model No." className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="eq-serial" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Serial No.</Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-300" />
                            <Input id="eq-serial" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="SN-XXXXX" className="h-12 pl-9 rounded-xl bg-white border-2 border-slate-200 font-mono text-sm font-bold focus:border-orange-400 transition-colors" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Location</Label>
                        <Select value={labId} onValueChange={setLabId}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors"><SelectValue placeholder="Lab..." /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            {labs.map((l) => (
                            <SelectItem key={l.id} value={l.id} className="font-bold">{l.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Maintenance Block */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status & Maintenance</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="eq-next-cal" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Next Calibration</Label>
                        <Input id="eq-next-cal" type="date" value={nextCalibration} onChange={(e) => setNextCalibration(e.target.value)} className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors" />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Frequency</Label>
                        <Select value={calibrationFrequency} onValueChange={setCalibrationFrequency}>
                        <SelectTrigger className="h-12 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="Monthly" className="font-bold">Monthly</SelectItem>
                            <SelectItem value="3 Months" className="font-bold">3 Months</SelectItem>
                            <SelectItem value="6 Months" className="font-bold">6 Months</SelectItem>
                            <SelectItem value="Yearly" className="font-bold">Yearly</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="eq-purchase" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Procured</Label>
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-300" />
                            <Input id="eq-purchase" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="h-12 pl-9 rounded-xl bg-white border-2 border-slate-200 font-bold focus:border-orange-400 transition-colors" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Current Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className={`h-12 rounded-xl bg-white border-2 font-bold focus:border-orange-400 transition-colors ${status === 'active' ? 'border-emerald-200 text-emerald-700' : status === 'maintenance' ? 'border-amber-200 text-amber-700' : 'border-slate-200'}`}><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl shadow-xl border-slate-100">
                            <SelectItem value="active" className="font-bold text-emerald-600">Active</SelectItem>
                            <SelectItem value="maintenance" className="font-bold text-amber-600">Maintenance</SelectItem>
                            <SelectItem value="inactive" className="font-bold text-slate-400">Inactive</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eq-desc" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Description</Label>
              <Textarea id="eq-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Additional notes about the equipment..." rows={2} className="rounded-xl bg-slate-50 border-2 border-slate-200 font-medium focus:bg-white transition-colors resize-none focus:border-orange-400" />
            </div>
          </div>
          
          <DialogFooter className="gap-3 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">Cancel</Button>
            <Button onClick={handleSubmit} className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">{equipment ? "Save Changes" : "Register Asset"}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
