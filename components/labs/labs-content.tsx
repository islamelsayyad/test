
"use client"

import React, { useState } from "react"
import { Plus, MapPin, LayoutGrid, List, FlaskConical, Search, MoreVertical, Monitor, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { labs as allLabs } from "@/lib/mock-data"
import type { Lab } from "@/lib/types"
import { LabDetailSheet } from "./lab-detail-sheet"
import { LabFormDialog } from "./lab-form-dialog"

export function LabsContent() {
  const [labs, setLabs] = useState<Lab[]>(allLabs)
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingLab, setEditingLab] = useState<Lab | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [search, setSearch] = useState("")

  const filteredLabs = labs.filter(lab => 
    lab.name.toLowerCase().includes(search.toLowerCase()) || 
    lab.location.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreateLab = (lab: Lab) => {
    setLabs((prev) => [...prev, lab])
    setFormOpen(false)
  }

  const handleUpdateLab = (updated: Lab) => {
    setLabs((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
    setEditingLab(null)
    setFormOpen(false)
    if (selectedLab?.id === updated.id) setSelectedLab(updated)
  }

  const handleDeleteLab = (id: string) => {
    setLabs((prev) => prev.filter((l) => l.id !== id))
    setSheetOpen(false)
    setSelectedLab(null)
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
             <div className="h-10 w-10 rounded-xl bg-transparent flex items-center justify-center text-slate-900">
                <FlaskConical className="h-8 w-8 stroke-[2.5]" />
             </div>
             <h1 className="text-4xl font-black tracking-tighter text-slate-900">Laboratories</h1>
          </div>
          <p className="text-slate-500 font-medium ml-1 text-base">
            Manage lab spaces, equipment availability, and real-time operational status.
          </p>
        </div>
        <Button onClick={() => { setEditingLab(null); setFormOpen(true) }} className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/10 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
          <Plus className="mr-2 h-4 w-4" />
          New Lab
        </Button>
      </div>

      <div className="sticky top-0 z-20 mb-6 py-3 bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 group max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            <Input 
                placeholder="Search labs by name or location..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 border-none bg-white shadow-sm rounded-xl font-medium text-slate-700 placeholder:text-slate-400 transition-all ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500/20" 
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <Select defaultValue="all">
                <SelectTrigger className="h-12 px-4 min-w-[160px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Locations" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Locations</SelectItem></SelectContent>
            </Select>
            <Select defaultValue="all">
                <SelectTrigger className="h-12 px-4 min-w-[140px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Statuses</SelectItem></SelectContent>
            </Select>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "grid" | "list")} className="ml-2 bg-transparent border-none p-0 gap-1">
                <ToggleGroupItem value="grid" className="h-12 w-12 rounded-xl data-[state=on]:bg-white data-[state=on]:shadow-sm text-slate-400 data-[state=on]:text-slate-900"><LayoutGrid className="h-5 w-5" /></ToggleGroupItem>
                <ToggleGroupItem value="list" className="h-12 w-12 rounded-xl data-[state=on]:bg-white data-[state=on]:shadow-sm text-slate-400 data-[state=on]:text-slate-900"><List className="h-5 w-5" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {filteredLabs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 border-2 border-slate-100">
                <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No labs found</h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mt-1 mb-6">
                We couldn't find any laboratories matching your search.
            </p>
            <Button variant="outline" onClick={() => setSearch("")} className="border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:text-slate-900">
                Reset Filters
            </Button>
        </div>
      ) : viewMode === "list" ? (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-slate-100 hover:bg-transparent">
                    <TableHead className="pl-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Laboratory Profile</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Features</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Capacity</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</TableHead>
                    <TableHead className="text-right pr-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredLabs.map((lab) => (
                    <TableRow key={lab.id} onClick={() => { setSelectedLab(lab); setSheetOpen(true) }} className="group cursor-pointer hover:bg-slate-50 border-b-2 border-slate-50 last:border-0">
                        <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-sm">
                                    <FlaskConical className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{lab.name}</div>
                                    <div className="text-[11px] font-bold text-slate-400 mt-0.5 flex items-center gap-1 uppercase tracking-wide">
                                        <MapPin className="h-3 w-3" /> {lab.location}
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-1.5">
                                {lab.features.slice(0, 2).map(f => (
                                    <React.Fragment key={f}>
                                        <Badge variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100 font-bold text-[10px] px-2 py-0.5 rounded-lg shadow-none">{f}</Badge>
                                    </React.Fragment>
                                ))}
                                {lab.features.length > 2 && <Badge variant="secondary" className="bg-slate-50 text-slate-400 border border-slate-100 font-bold text-[10px] px-1.5 py-0.5 rounded-lg shadow-none">+{lab.features.length - 2}</Badge>}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4 text-slate-300" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-700 text-xs">{lab.workstations}</span>
                                    <span className="text-[9px] font-bold text-slate-400">Stations</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                lab.status === 'active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                                lab.status === 'maintenance' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                'bg-slate-100 border-slate-100 text-slate-500'
                            }`}>
                                {lab.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredLabs.map((lab) => (
                <div key={lab.id} onClick={() => { setSelectedLab(lab); setSheetOpen(true) }} className="group relative bg-white p-0 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer flex flex-col overflow-hidden hover:-translate-y-1 border-2 border-slate-200">
                    {/* Header Strip */}
                    <div className={`h-1.5 w-full ${lab.status === 'active' ? 'bg-emerald-500' : lab.status === 'maintenance' ? 'bg-orange-500' : 'bg-slate-300'}`} />
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${lab.status === 'active' ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-500 shadow-slate-200'}`}>
                                <FlaskConical className="h-7 w-7" />
                            </div>
                            <Badge className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                lab.status === 'active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-100 text-slate-500'
                            }`}>
                                {lab.status}
                            </Badge>
                        </div>
                        
                        <h3 className="font-black text-slate-900 text-xl mb-1 leading-tight group-hover:text-blue-700 transition-colors line-clamp-1">{lab.name}</h3>
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-8 uppercase tracking-wide">
                            <MapPin className="h-3 w-3" /> {lab.location}
                        </p>
                        
                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                <span className="text-lg font-black text-slate-800">{lab.workstations}</span>
                                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Stations</span>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                <span className="text-lg font-black text-slate-800">{lab.equipment.length + 5}</span>
                                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Assets</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      <LabDetailSheet
        lab={selectedLab}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onEdit={(lab) => {
          setEditingLab(lab)
          setSheetOpen(false)
          setFormOpen(true)
        }}
        onDelete={handleDeleteLab}
      />

      <LabFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        lab={editingLab}
        onSubmit={editingLab ? handleUpdateLab : handleCreateLab}
      />
    </div>
  )
}
