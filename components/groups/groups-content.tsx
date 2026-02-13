"use client"

import React, { useState } from "react"
import { Plus, UsersRound, Search, MoreVertical, LayoutGrid, List, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { groups as allGroups } from "@/lib/mock-data"
import type { Group } from "@/lib/types"
import { GroupDetailDialog } from "./group-detail-dialog"
import { GroupFormDialog } from "./group-form-dialog"

export function GroupsContent() {
  const [groupsList, setGroupsList] = useState<Group[]>(allGroups)
  const [selected, setSelected] = useState<Group | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const handleCreate = (group: Group) => {
    setGroupsList((prev) => [...prev, group])
    setFormOpen(false)
  }

  const handleUpdate = (updated: Group) => {
    setGroupsList((prev) => prev.map((g) => (g.id === updated.id ? updated : g)))
    setEditingGroup(null)
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    setGroupsList((prev) => prev.filter((g) => g.id !== id))
    setDetailOpen(false)
  }

  return (
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Academic Cohorts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage student groups, academic programs, and semester assignments.
          </p>
        </div>
        <Button onClick={() => { setEditingGroup(null); setFormOpen(true) }} className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          New Cohort
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input 
              placeholder="Search cohorts..." 
              className="pl-9 h-9 text-sm" 
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
              <SelectTrigger className="h-9 px-3 min-w-[130px] text-sm"><SelectValue placeholder="All Programs" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Programs</SelectItem></SelectContent>
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

      {groupsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg">
            <UsersRound className="h-8 w-8 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-medium text-foreground">No cohorts found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1 mb-4">
                No academic groups match your current filters.
            </p>
            <Button variant="outline" size="sm">Clear Filters</Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="border border-border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5 h-10 text-xs font-medium text-muted-foreground">Cohort</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Program</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Academic Year</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Members</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right pr-5 h-10 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {groupsList.map((group) => (
                    <TableRow key={group.id} onClick={() => { setSelected(group); setDetailOpen(true) }} className="cursor-pointer">
                        <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                    <UsersRound className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{group.code}</p>
                                    <p className="text-xs text-muted-foreground">{group.name}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-foreground">{group.department.replace('Engineering', 'Eng')}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-foreground">{group.academicYear}</span>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-foreground">
                                <UsersRound className="h-3.5 w-3.5 text-muted-foreground" /> {group.studentCount}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded text-emerald-600 border-emerald-200 bg-emerald-50">
                                Active
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-5">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground">
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupsList.map((group) => (
                <div key={group.id} onClick={() => { setSelected(group); setDetailOpen(true) }} className="group bg-card rounded-lg p-5 border border-border hover:border-foreground/20 transition-colors cursor-pointer flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                            <UsersRound className="h-4.5 w-4.5" />
                        </div>
                        <Badge variant="outline" className="text-[11px] font-medium px-1.5 py-0 rounded text-emerald-600 border-emerald-200 bg-emerald-50">
                            Active
                        </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-foreground text-lg tracking-tight">{group.code}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{group.name}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground">Year</span>
                            <span className="text-sm font-medium text-foreground">{group.academicYear}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-md">
                            <UsersRound className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{group.studentCount}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      <GroupDetailDialog
        group={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={(g) => { setEditingGroup(g); setDetailOpen(false); setFormOpen(true) }}
        onDelete={handleDelete}
      />

      <GroupFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        group={editingGroup}
        onSubmit={editingGroup ? handleUpdate : handleCreate}
      />
    </div>
  )
}
