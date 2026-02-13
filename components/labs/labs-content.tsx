"use client"

import React, { useState } from "react"
import { Plus, MapPin, LayoutGrid, List, FlaskConical, Search, MoreVertical, Monitor } from "lucide-react"
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
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Laboratories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage lab spaces, equipment availability, and operational status.
          </p>
        </div>
        <Button onClick={() => { setEditingLab(null); setFormOpen(true) }} className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          New Lab
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input 
              placeholder="Search labs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm" 
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
              <SelectTrigger className="h-9 px-3 min-w-[140px] text-sm"><SelectValue placeholder="All Locations" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Locations</SelectItem></SelectContent>
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

      {filteredLabs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg">
            <Search className="h-8 w-8 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-medium text-foreground">No labs found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1 mb-4">
                No laboratories match your search criteria.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSearch("")}>Reset Filters</Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="border border-border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5 h-10 text-xs font-medium text-muted-foreground">Laboratory</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Features</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Capacity</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right pr-5 h-10 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredLabs.map((lab) => (
                    <TableRow key={lab.id} onClick={() => { setSelectedLab(lab); setSheetOpen(true) }} className="cursor-pointer">
                        <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                    <FlaskConical className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground">{lab.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                        <MapPin className="h-3 w-3" /> {lab.location}
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-1">
                                {lab.features.slice(0, 2).map(f => (
                                    <Badge key={f} variant="secondary" className="text-[11px] font-normal px-1.5 py-0 rounded">{f}</Badge>
                                ))}
                                {lab.features.length > 2 && <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0 rounded">+{lab.features.length - 2}</Badge>}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-foreground">
                                <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                                {lab.workstations}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                                lab.status === 'active' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 
                                lab.status === 'maintenance' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                'text-muted-foreground'
                            }`}>
                                {lab.status}
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
            {filteredLabs.map((lab) => (
                <div key={lab.id} onClick={() => { setSelectedLab(lab); setSheetOpen(true) }} className="group bg-card p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors cursor-pointer flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-muted text-muted-foreground">
                            <FlaskConical className="h-4.5 w-4.5" />
                        </div>
                        <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                            lab.status === 'active' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-muted-foreground'
                        }`}>
                            {lab.status}
                        </Badge>
                    </div>
                    
                    <h3 className="font-medium text-foreground text-sm mb-0.5 line-clamp-1">{lab.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
                        <MapPin className="h-3 w-3" /> {lab.location}
                    </p>
                    
                    <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-border">
                        <div className="text-center">
                            <span className="text-lg font-semibold text-foreground">{lab.workstations}</span>
                            <span className="block text-[10px] text-muted-foreground">Stations</span>
                        </div>
                        <div className="text-center">
                            <span className="text-lg font-semibold text-foreground">{lab.equipment.length + 5}</span>
                            <span className="block text-[10px] text-muted-foreground">Assets</span>
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
