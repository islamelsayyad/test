
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
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-transparent flex items-center justify-center text-slate-900">
                <GraduationCap className="h-8 w-8 stroke-[2.5]" />
             </div>
             <h1 className="text-4xl font-black tracking-tighter text-slate-900">Academic Cohorts</h1>
          </div>
          <p className="text-slate-500 font-medium ml-1 text-base">
            Manage student groups, academic programs, and semester assignments.
          </p>
        </div>
        <Button onClick={() => { setEditingGroup(null); setFormOpen(true) }} className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/10 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
          <Plus className="mr-2 h-4 w-4" />
          New Cohort
        </Button>
      </div>

      <div className="sticky top-0 z-20 mb-6 py-3 bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 group max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            <Input 
                placeholder="Search cohorts by name or program..." 
                className="pl-11 h-12 border-none bg-white shadow-sm rounded-xl font-medium text-slate-700 placeholder:text-slate-400 transition-all ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500/20" 
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <Select defaultValue="all">
                <SelectTrigger className="h-12 px-4 min-w-[160px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Programs" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Programs</SelectItem></SelectContent>
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

      {groupsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 border-2 border-slate-100">
                <UsersRound className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No cohorts found</h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mt-1 mb-6">
                No academic groups match your current filters.
            </p>
            <Button variant="outline" className="border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:text-slate-900">
                Clear Filters
            </Button>
        </div>
      ) : viewMode === "list" ? (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-slate-100 hover:bg-transparent">
                    <TableHead className="pl-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Cohort Profile</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Program</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Academic Year</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Members</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</TableHead>
                    <TableHead className="text-right pr-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {groupsList.map((group) => (
                    <TableRow key={group.id} onClick={() => { setSelected(group); setDetailOpen(true) }} className="cursor-pointer group hover:bg-slate-50 border-b-2 border-slate-50 last:border-0">
                        <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100 group-hover:border-blue-100">
                                    <UsersRound className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{group.code}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">{group.name}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="text-xs font-bold text-slate-700">{group.department.replace('Engineering', 'Eng')}</span>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-800">{group.academicYear}</span>
                                <span className="text-[10px] font-medium text-slate-400">Semester 1</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                <UsersRound className="h-3.5 w-3.5 text-slate-400" /> {group.studentCount}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className="bg-emerald-50 border-2 border-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-lg text-[10px] shadow-none">
                                Active
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groupsList.map((group) => (
                <div key={group.id} onClick={() => { setSelected(group); setDetailOpen(true) }} className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer flex flex-col h-[260px] hover:-translate-y-1 border-2 border-slate-200 hover:border-slate-300">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-sm">
                            <UsersRound className="h-7 w-7" />
                        </div>
                        <Badge className="bg-emerald-50 border-2 border-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-lg text-[10px] shadow-none">
                            Active
                        </Badge>
                    </div>
                    
                    <h3 className="font-black text-slate-900 text-2xl mb-1 tracking-tight">{group.code}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-6 line-clamp-1">{group.name}</p>
                    
                    <div className="mt-auto pt-6 border-t-2 border-slate-50 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Year</span>
                            <span className="text-sm font-bold text-slate-700">{group.academicYear}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                            <UsersRound className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-bold text-slate-600">{group.studentCount}</span>
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
