
"use client"

import React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pencil, Trash2, Bookmark, MapPin, CalendarDays, CheckCircle2, XCircle, AlertTriangle, History, Tag, Box } from "lucide-react"
import type { Equipment } from "@/lib/types"

interface Props {
  equipment: Equipment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (eq: Equipment) => void
  onDelete: (id: string) => void
  onLogService: (eq: Equipment) => void
}

export function EquipmentDetailSheet({ equipment, open, onOpenChange, onEdit, onDelete, onLogService }: Props) {
  if (!equipment) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 border-l-2 border-slate-200 shadow-2xl bg-[#F6F8FA] gap-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 pb-2">
            <div className="rounded-[2rem] bg-white border-2 border-slate-200 shadow-xl shadow-indigo-100/50 p-6 relative overflow-hidden">
                {/* Status Indicator */}
                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl border-l-2 border-b-2 font-black text-[10px] uppercase tracking-widest ${
                    equipment.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    equipment.status === 'maintenance' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                    {equipment.status}
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                        <Box className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-2 border-slate-200 text-[10px] font-mono tracking-wider rounded-lg py-1 px-2">
                        {equipment.serialNumber}
                    </Badge>
                </div>
              
                <h2 className="text-2xl font-black tracking-tight mb-1 text-slate-900 leading-none">{equipment.name}</h2>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">{equipment.model}</p>
            </div>
          </div>

          <ScrollArea className="flex-1 px-6 py-2">
            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Assigned Lab</p>
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                    {equipment.labName}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Procured</p>
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
                    {equipment.purchaseDate}
                  </p>
                </div>
              </div>

              {/* Maintenance Status */}
              <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-200 shadow-sm overflow-hidden relative">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-900">Calibration Health</p>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 relative z-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Due Date</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight">{equipment.nextCalibration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Cycle</p>
                    <p className="text-sm font-bold text-slate-700 bg-white px-2 py-1 rounded-lg border border-slate-200 inline-block">{equipment.calibrationFrequency}</p>
                  </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-50 transform rotate-12 pointer-events-none">
                    <History className="h-32 w-32" />
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-200 shadow-sm">
                <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  <Tag className="h-3.5 w-3.5" /> Description
                </h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {equipment.description || "No description provided."}
                </p>
              </div>

              {/* History Log Timeline - Tactile Style */}
              <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                    <History className="h-3.5 w-3.5" /> Service Log
                  </h4>
                  <Badge variant="secondary" className="text-[9px] font-bold border-2 border-slate-100 rounded-lg px-2 bg-slate-50 text-slate-500">{equipment.maintenanceLogs.length} Entries</Badge>
                </div>
                
                {equipment.maintenanceLogs.length > 0 ? (
                  <div className="relative space-y-0 ml-2">
                    {/* Vertical line */}
                    <div className="absolute top-3 bottom-0 left-[11px] w-[3px] bg-slate-100 rounded-full" />
                    
                    {equipment.maintenanceLogs.map((log) => (
                      <div key={log.id} className="relative pl-10 pb-8 last:pb-0 group">
                        {/* Tactile Node */}
                        <div className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-[3px] bg-white z-10 flex items-center justify-center transition-all group-hover:scale-110 shadow-sm ${
                            log.outcome === 'passed' ? 'border-emerald-200 shadow-emerald-100' :
                            log.outcome === 'failed' ? 'border-rose-200 shadow-rose-100' : 'border-amber-200 shadow-amber-100'
                        }`}>
                           <div className={`h-2 w-2 rounded-full ${
                               log.outcome === 'passed' ? 'bg-emerald-500' :
                               log.outcome === 'failed' ? 'bg-rose-500' : 'bg-amber-500'
                           }`} />
                        </div>
                        
                        <div className="flex flex-col gap-2 p-4 bg-slate-50/50 rounded-2xl border-2 border-slate-100 group-hover:bg-slate-50 group-hover:border-slate-200 transition-all">
                          <div className="flex items-center justify-between">
                             <p className={`text-xs font-black uppercase tracking-wide ${
                                 log.outcome === "passed" ? "text-emerald-700" : log.outcome === "failed" ? "text-rose-700" : "text-amber-700"
                             }`}>
                                {log.outcome === "passed" ? "Passed" : log.outcome === "failed" ? "Failed" : "Repair"}
                             </p>
                             <span className="text-[10px] font-bold text-slate-400 font-mono">{log.date}</span>
                          </div>
                          
                          <p className="text-xs text-slate-500 font-bold">Tech: {log.technician}</p>
                          
                          {log.notes && (
                            <div className="text-xs text-slate-600 font-medium leading-relaxed pt-2 border-t border-slate-200/50">
                                {log.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center rounded-xl bg-slate-50 border-2 border-dashed border-slate-200">
                      <p className="text-xs font-bold text-slate-400">No records found</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="p-6 bg-white border-t-2 border-slate-200 flex flex-col gap-3 shrink-0">
            <Button className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/20 border-2 border-transparent hover:scale-[1.02] transition-all" onClick={() => onLogService(equipment)}>
              <Bookmark className="mr-2 h-4 w-4" />
              Log Service Event
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-11 rounded-xl font-bold hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-700" onClick={() => onEdit(equipment)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" className="h-11 w-11 rounded-xl p-0 text-red-500 hover:text-red-600 hover:bg-red-50 border-2 border-red-100 hover:border-red-200" onClick={() => onDelete(equipment.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
