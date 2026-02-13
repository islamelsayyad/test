
"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, FlaskConical, MapPin, Monitor, Tag } from "lucide-react"
import type { Lab, Status } from "@/lib/types"

interface LabFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lab: Lab | null
  onSubmit: (lab: Lab) => void
}

export function LabFormDialog({ open, onOpenChange, lab, onSubmit }: LabFormDialogProps) {
  const isEditing = !!lab
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [workstations, setWorkstations] = useState(1)
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<Status>("active")
  const [features, setFeatures] = useState<string[]>([])
  const [featureInput, setFeatureInput] = useState("")

  useEffect(() => {
    if (lab) {
      setName(lab.name)
      setLocation(lab.location)
      setWorkstations(lab.workstations)
      setDescription(lab.description)
      setStatus(lab.status)
      setFeatures(lab.features)
    } else {
      setName("")
      setLocation("")
      setWorkstations(1)
      setDescription("")
      setStatus("active")
      setFeatures([])
    }
    setFeatureInput("")
  }, [lab, open])

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures((prev) => [...prev, featureInput.trim()])
      setFeatureInput("")
    }
  }

  const removeFeature = (f: string) => {
    setFeatures((prev) => prev.filter((x) => x !== f))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newLab: Lab = {
      id: lab?.id || `l${Date.now()}`,
      name,
      location,
      workstations,
      description,
      status,
      features,
      media: lab?.media || [],
      equipment: lab?.equipment || [],
      createdAt: lab?.createdAt || new Date().toISOString(),
    }
    onSubmit(newLab)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-2 border-slate-200 shadow-2xl p-0 gap-0">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 shadow-sm border border-teal-200/50">
                <FlaskConical className="h-5 w-5" />
             </div>
             <DialogTitle className="text-xl font-black text-slate-900">{isEditing ? "Edit Laboratory" : "Create Laboratory"}</DialogTitle>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Main Info Section */}
          <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="lab-name" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Lab Name</Label>
                <Input id="lab-name" placeholder="e.g. Advanced Robotics Lab" value={name} onChange={(e) => setName(e.target.value)} required className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold text-slate-900 focus:bg-white focus:border-teal-400 transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="lab-location" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</Label>
                    <Input id="lab-location" placeholder="Block A, 101" value={location} onChange={(e) => setLocation(e.target.value)} required className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white focus:border-teal-400 transition-colors" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Operational Status</Label>
                    <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white focus:border-teal-400 transition-colors">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border-slate-100">
                        <SelectItem value="active" className="font-bold text-emerald-600">Active</SelectItem>
                        <SelectItem value="maintenance" className="font-bold text-amber-600">Maintenance</SelectItem>
                        <SelectItem value="inactive" className="font-bold text-slate-400">Inactive</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Capacity Control Panel */}
            <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 flex items-center justify-between gap-4 group hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                        <Monitor className="h-5 w-5" />
                    </div>
                    <div>
                        <Label className="text-xs font-bold text-slate-900 block">Capacity</Label>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Workstations</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border-2 border-slate-200 shadow-sm">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600" onClick={() => setWorkstations(Math.max(1, workstations - 1))}>
                        <Minus className="h-4 w-4 stroke-[3]" />
                    </Button>
                    <span className="w-8 text-center text-xl font-black text-slate-900 tabular-nums">{workstations}</span>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600" onClick={() => setWorkstations(workstations + 1)}>
                        <Plus className="h-4 w-4 stroke-[3]" />
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="lab-description" className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1">Description</Label>
                <Textarea id="lab-description" placeholder="Describe the lab facilities..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="rounded-xl bg-slate-50 border-2 border-slate-200 font-medium focus:bg-white transition-colors resize-none focus:border-teal-400" />
            </div>

            {/* Features Tag Input */}
            <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-1 flex items-center gap-1"><Tag className="h-3 w-3" /> Key Features</Label>
                <div className="flex gap-2">
                <Input
                    placeholder="Add a feature (e.g. Fume Hoods)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        addFeature()
                    }
                    }}
                    className="h-12 rounded-xl bg-slate-50 border-2 border-slate-200 font-bold focus:bg-white flex-1 focus:border-teal-400"
                />
                <Button type="button" onClick={addFeature} className="h-12 w-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-md">
                    <Plus className="h-5 w-5" />
                </Button>
                </div>
                {features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {features.map((f) => (
                    <React.Fragment key={f}>
                      <Badge variant="secondary" className="gap-1.5 py-1.5 px-3 rounded-lg bg-white text-slate-600 border-2 border-slate-200 font-bold hover:border-teal-200 hover:text-teal-600 hover:bg-teal-50 transition-colors cursor-default group">
                          {f}
                          <button type="button" onClick={() => removeFeature(f)} className="text-slate-300 group-hover:text-teal-400 hover:text-red-500 transition-colors">
                          <X className="h-3 w-3 stroke-[3]" />
                          </button>
                      </Badge>
                    </React.Fragment>
                    ))}
                </div>
                )}
            </div>
          </div>

          <DialogFooter className="gap-3 pt-4 border-t-2 border-slate-50">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">
              Cancel
            </Button>
            <Button type="submit" className="h-12 rounded-xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 px-8 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
                {isEditing ? "Save Changes" : "Create Lab"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
