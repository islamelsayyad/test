"use client"

import React, { useState } from "react"
import { Plus, LayoutGrid, List, Search, Box, MoreVertical, Wrench, Activity } from "lucide-react"
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
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Equipment & Assets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Inventory tracking, calibration schedules, and status monitoring.
          </p>
        </div>
        <Button 
            onClick={() => { setEditingItem(null); setFormOpen(true) }}
            className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90"
        >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Asset
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input 
              placeholder="Search by name, model or serial..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm" 
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
              <SelectTrigger className="h-9 px-3 min-w-[140px] text-sm"><SelectValue placeholder="All Labs" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Laboratories</SelectItem></SelectContent>
          </Select>
          <Select defaultValue="all">
              <SelectTrigger className="h-9 px-3 min-w-[130px] text-sm"><SelectValue placeholder="All Statuses" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Statuses</SelectItem></SelectContent>
          </Select>
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "grid" | "list")} className="ml-1">
              <ToggleGroupItem value="grid" className="h-9 w-9 rounded-md"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="list" className="h-9 w-9 rounded-md"><List className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg">
            <Search className="h-8 w-8 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-medium text-foreground">No assets found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1 mb-4">
                Try adjusting your search terms or filters.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSearch("")}>Clear Search</Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="border border-border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5 h-10 text-xs font-medium text-muted-foreground">Asset</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Location</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Serial No.</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Health</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Next Calibration</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right pr-5 h-10 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredItems.map((item) => (
                    <TableRow key={item.id} onClick={() => { setSelected(item); setSheetOpen(true) }} className="cursor-pointer">
                        <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                    <Box className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground">{item.name}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">{item.model}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-foreground">{item.labName}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-muted-foreground font-mono">{item.serialNumber}</span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1.5">
                                <div className={`h-1.5 w-1.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : item.status === 'maintenance' ? 'bg-amber-500' : 'bg-destructive'}`} />
                                <span className="text-sm text-foreground">
                                    {item.status === 'active' ? '100%' : item.status === 'maintenance' ? '70%' : '0%'}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Activity className="h-3.5 w-3.5" /> 
                                {new Date(item.nextCalibration).toLocaleDateString()}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                                item.status === 'active' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 
                                item.status === 'maintenance' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                'text-muted-foreground'
                            }`}>
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-5">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-md">
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
                <div key={item.id} onClick={() => { setSelected(item); setSheetOpen(true) }} className="group bg-card p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors cursor-pointer flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                            <Box className="h-4.5 w-4.5" />
                        </div>
                        <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                            item.status === 'active' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 
                            item.status === 'maintenance' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                            'text-muted-foreground'
                        }`}>
                            {item.status}
                        </Badge>
                    </div>
                    
                    <h3 className="font-medium text-foreground text-sm mb-0.5 line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{item.model}</p>
                    
                    <div className="mt-auto space-y-1.5 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Serial</span>
                            <span className="text-xs font-mono text-foreground">{item.serialNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Location</span>
                            <span className="text-xs text-foreground">{item.labName}</span>
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
