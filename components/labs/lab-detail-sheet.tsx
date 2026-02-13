
"use client"

import React from "react"
import { MapPin, Monitor, Pencil, Trash2, Calendar, Box, Printer, Cpu, FileText as FileTextIcon } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Lab } from "@/lib/types"
import { bookingRequests } from "@/lib/mock-data"

interface LabDetailSheetProps {
  lab: Lab | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (lab: Lab) => void
  onDelete: (id: string) => void
}

export function LabDetailSheet({ lab, open, onOpenChange, onEdit, onDelete }: LabDetailSheetProps) {
  if (!lab) return null

  const upcomingBookings = bookingRequests.filter(
    (b) => b.labId === lab.id && (b.status === "approved" || b.status === "pending")
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 border-l-2 border-slate-200 shadow-2xl bg-[#F6F8FA] gap-0">
        <div className="h-full flex flex-col">
          {/* Header Card - Floating style */}
          <div className="p-6 pb-2">
            <div className="rounded-[2rem] bg-white border-2 border-slate-200 shadow-xl shadow-slate-200/50 p-6 relative overflow-hidden">
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className={`border-2 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${lab.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                            {lab.status}
                        </Badge>
                        <span className="font-mono text-[10px] font-bold text-slate-300">ID: {lab.id.toUpperCase()}</span>
                    </div>
                    
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-none mb-2">{lab.name}</h2>
                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {lab.location}
                    </p>
                </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm mb-6 h-14">
                <TabsTrigger value="overview" className="flex-1 rounded-xl h-11 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-none font-bold text-slate-500 transition-all">Overview</TabsTrigger>
                <TabsTrigger value="visuals" className="flex-1 rounded-xl h-11 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-none font-bold text-slate-500 transition-all">Visuals</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 outline-none">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-[1.5rem] border-2 border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-blue-200 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 border border-blue-100">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stations</span>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">{lab.workstations}</span>
                  </div>
                  <div className="bg-white p-5 rounded-[1.5rem] border-2 border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-purple-200 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 border border-purple-100">
                      <Box className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assets</span>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">{lab.equipment.length + 12}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-200 shadow-sm">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
                    <FileTextIcon className="h-4 w-4 text-slate-400" /> Description
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {lab.description || "No description available for this laboratory facility."}
                  </p>
                </div>

                {/* Features */}
                {lab.features.length > 0 && (
                  <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-200 shadow-sm">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
                      <Cpu className="h-4 w-4 text-slate-400" /> Features & Specs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {lab.features.map((f) => (
                        <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-100 bg-slate-50 text-xs font-bold text-slate-700 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Activity Feed */}
                <div className="bg-white p-6 rounded-[1.5rem] border-2 border-slate-200 shadow-sm">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
                    <Calendar className="h-4 w-4 text-slate-400" /> Upcoming Activity
                  </h4>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingBookings.slice(0, 3).map((b) => (
                        <div key={b.id} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-slate-200 transition-colors">
                          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-white border-2 border-slate-200 shadow-sm text-slate-900 shrink-0">
                            <span className="text-[9px] font-black uppercase text-slate-400 leading-none mb-0.5">
                              {new Date(b.date).toLocaleDateString("en-US", { month: "short" })}
                            </span>
                            <span className="text-base font-black leading-none">
                              {new Date(b.date).getDate()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-slate-900">{b.purpose}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mt-0.5">
                              {b.startTime} - {b.endTime} • {b.userName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 font-bold">No upcoming sessions scheduled.</p>
                    </div>
                  )}
                </div>

              </TabsContent>

              <TabsContent value="visuals" className="mt-0">
                <div className="bg-white rounded-[1.5rem] border-2 border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center h-64 border-dashed">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 border-2 border-slate-100">
                    <Printer className="h-6 w-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-black text-slate-900">No media uploaded</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px] font-medium">Upload photos of equipment and layout for this lab.</p>
                  <Button variant="outline" size="sm" className="mt-6 border-2 border-slate-200 font-bold rounded-xl h-10">
                    Upload Photos
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-6 bg-white border-t-2 border-slate-200 flex gap-3 shrink-0">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-2 border-slate-200 font-bold hover:bg-slate-50 hover:text-slate-900 text-slate-600 transition-all shadow-sm"
              onClick={() => onEdit(lab)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
            <Button
              className="h-12 px-6 rounded-xl bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-2 border-red-100 font-bold shadow-sm transition-colors"
              onClick={() => {
                if (confirm("Are you sure you want to delete this lab?")) {
                  onDelete(lab.id)
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
