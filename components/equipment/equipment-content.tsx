
"use client"

import React, { useState } from "react"
import { Plus, LayoutGrid, List, Search, Box, MoreVertical, Wrench, MapPin, Activity, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { equipment as allEquipment } from "@/lib/mock-data"
import type { Equipment } from "@/lib/types"
import { EquipmentDetailSheet } from "./equipment-detail-sheet"
import { EquipmentFormDialog } from "./equipment-form-dialog"
import { ServiceEventDialog } from "./service-event-dialog"

export function EquipmentContent() {
  const [items, setItems] = useState<Equipment[]>(allEquipment)
  const [selected, setSelected] = useState<Equipment | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Equipment | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [search, setSearch] = useState("")

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
    item.labName.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = (item: Equipment) => {
    setItems((prev) => [...prev, item])
    setFormOpen(false)
  }

  const handleUpdate = (updated: Equipment) => {
    setItems((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
    setEditingItem(null)
    setFormOpen(false)
    if (selected?.id === updated.id) setSelected(updated)
  }

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((e) => e.id !== id))
    setSheetOpen(false)
    setSelected(null)
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-transparent flex items-center justify-center text-slate-900">
                <Wrench className="h-8 w-8 stroke-[2.5]" />
             </div>
             <h1 className="text-4xl font-black tracking-tighter text-slate-900">Equipment & Assets</h1>
          </div>
          <p className="text-slate-500 font-medium ml-1 text-base">
            Inventory tracking, calibration schedules, and real-time status monitoring.
          </p>
        </div>
        <Button 
            onClick={() => { setEditingItem(null); setFormOpen(true) }}
            className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/10 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent"
        >
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
        </Button>
      </div>

      {/* Filters Toolbar */}
      <div className="sticky top-0 z-20 mb-6 py-3 bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 group max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            <Input 
                placeholder="Search by name, model or serial number..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 border-none bg-white shadow-sm rounded-xl font-medium text-slate-700 placeholder:text-slate-400 transition-all ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500/20" 
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <Select defaultValue="all">
                <SelectTrigger className="h-12 px-4 min-w-[160px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Laboratories" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Laboratories</SelectItem></SelectContent>
            </Select>
            <Select defaultValue="all">
                <SelectTrigger className="h-12 px-4 min-w-[140px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Statuses</SelectItem></SelectContent>
            </Select>
            <Select defaultValue="all">
                <SelectTrigger className="h-12 px-4 min-w-[140px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="Calibration: All" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Calibration: All</SelectItem></SelectContent>
            </Select>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "grid" | "list")} className="ml-2 bg-transparent border-none p-0 gap-1">
                <ToggleGroupItem value="grid" className="h-12 w-12 rounded-xl data-[state=on]:bg-white data-[state=on]:shadow-sm text-slate-400 data-[state=on]:text-slate-900"><LayoutGrid className="h-5 w-5" /></ToggleGroupItem>
                <ToggleGroupItem value="list" className="h-12 w-12 rounded-xl data-[state=on]:bg-white data-[state=on]:shadow-sm text-slate-400 data-[state=on]:text-slate-900"><List className="h-5 w-5" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 border-2 border-slate-100">
                <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No assets found</h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mt-1 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => setSearch("")} className="border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:text-slate-900">
                Clear Search
            </Button>
        </div>
      ) : viewMode === "list" ? (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-slate-100 hover:bg-transparent">
                    <TableHead className="pl-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Asset Profile</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Location</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Serial No.</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Health</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Next Calibration</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</TableHead>
                    <TableHead className="text-right pr-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredItems.map((item) => (
                    <TableRow key={item.id} onClick={() => { setSelected(item); setSheetOpen(true) }} className="group cursor-pointer hover:bg-slate-50 border-b-2 border-slate-50 last:border-0">
                        <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <Box className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                                    <div className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">{item.model}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                    {item.labName}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">Block A, 101</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-xs font-bold text-slate-500 font-mono">
                                {item.serialNumber}
                            </span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : item.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'}`} />
                                <span className="text-xs font-bold text-slate-700">
                                    {item.status === 'active' ? '100%' : item.status === 'maintenance' ? '70%' : '0%'}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <Activity className="h-3.5 w-3.5 text-slate-300" /> 
                                {new Date(item.nextCalibration).toLocaleDateString()}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                item.status === 'active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                                item.status === 'maintenance' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                'bg-slate-100 border-slate-100 text-slate-500'
                            }`}>
                                {item.status}
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
            {filteredItems.map((item) => (
                <div key={item.id} onClick={() => { setSelected(item); setSheetOpen(true) }} className="group relative bg-white p-0 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer flex flex-col overflow-hidden h-[280px] hover:-translate-y-1 border-2 border-slate-200">
                    {/* Status Strip */}
                    <div className={`h-1.5 w-full ${item.status === 'active' ? 'bg-emerald-500' : item.status === 'maintenance' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <Box className="h-6 w-6" />
                            </div>
                            <Badge className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                item.status === 'active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                                item.status === 'maintenance' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                'bg-slate-50 border-slate-100 text-slate-500'
                            }`}>
                                {item.status}
                            </Badge>
                        </div>
                        
                        <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">{item.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">{item.model}</p>
                        
                        <div className="mt-auto space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Serial</span>
                                <span className="text-xs font-mono font-bold text-slate-700">{item.serialNumber}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</span>
                                <span className="text-xs font-bold text-slate-700">{item.labName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      <EquipmentDetailSheet
        equipment={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onEdit={(eq) => { setEditingItem(eq); setSheetOpen(false); setFormOpen(true) }}
        onDelete={handleDelete}
        onLogService={(eq) => { setSelected(eq); setServiceOpen(true) }}
      />

      <EquipmentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        equipment={editingItem}
        onSubmit={editingItem ? handleUpdate : handleCreate}
      />

      <ServiceEventDialog
        open={serviceOpen}
        onOpenChange={setServiceOpen}
        equipment={selected}
        onSubmit={(log) => {
          if (selected) {
            const updated = { ...selected, maintenanceLogs: [log, ...selected.maintenanceLogs] }
            handleUpdate(updated)
          }
          setServiceOpen(false)
        }}
      />
    </div>
  )
}
