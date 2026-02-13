
"use client"

import React, { useState } from "react"
import { Plus, Scale, Search, MoreVertical, LayoutGrid, List, ShieldCheck, Lock, Clock, UserCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { policies as allPolicies } from "@/lib/mock-data"
import type { Policy } from "@/lib/types"
import { PolicyFormDialog } from "./policy-form-dialog"

export function PoliciesContent() {
  const [policiesList, setPoliciesList] = useState<Policy[]>(allPolicies)
  const [formOpen, setFormOpen] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const handleCreate = (policy: Policy) => {
    setPoliciesList((prev) => [...prev, policy])
    setFormOpen(false)
  }

  const handleUpdate = (updated: Policy) => {
    setPoliciesList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setEditingPolicy(null)
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    setPoliciesList((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-transparent flex items-center justify-center text-slate-900">
                <Scale className="h-8 w-8 stroke-[2.5]" />
             </div>
             <h1 className="text-4xl font-black tracking-tighter text-slate-900">Usage Policies</h1>
          </div>
          <p className="text-slate-500 font-medium ml-1 text-base">
            Define access rules, booking limits, and supervision requirements.
          </p>
        </div>
        <Button onClick={() => { setEditingPolicy(null); setFormOpen(true) }} className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/10 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
          <Plus className="mr-2 h-4 w-4" />
          New Policy
        </Button>
      </div>

      <div className="sticky top-0 z-20 mb-6 py-3 bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 group max-w-lg">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            <Input 
                placeholder="Search policies..." 
                className="pl-11 h-12 border-none bg-white shadow-sm rounded-xl font-medium text-slate-700 placeholder:text-slate-400 transition-all ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500/20" 
            />
          </div>
          
          <div className="flex items-center gap-3">
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

      {policiesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 border-2 border-slate-100">
                <Scale className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No policies found</h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mt-1 mb-6">
                Try adjusting your search to find the policy you need.
            </p>
            <Button variant="outline" className="border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:text-slate-900">
                Clear Search
            </Button>
        </div>
      ) : viewMode === "list" ? (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-slate-100 hover:bg-transparent">
                    <TableHead className="pl-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Scope</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Constraints</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Supervision</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Validity</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</TableHead>
                    <TableHead className="text-right pr-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {policiesList.map((policy) => (
                    <TableRow key={policy.id} onClick={() => { setEditingPolicy(policy); setFormOpen(true) }} className="cursor-pointer group hover:bg-slate-50 border-b-2 border-slate-50 last:border-0">
                        <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-sm">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{policy.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 max-w-[200px] truncate">{policy.description}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-none border border-slate-100">
                                    {policy.maxHoursPerDay * 30}M
                                </Badge>
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-none border border-slate-100">
                                    {policy.maxConcurrentBookings}-{policy.maxConcurrentBookings + 2} PPL
                                </Badge>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {policy.supervisionRequired ? (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                                        <Lock className="h-3 w-3" /> Full
                                    </span>
                                ) : policy.autoApprovalEligible ? (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                        <UserCheck className="h-3 w-3" /> Auto
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                        <Clock className="h-3 w-3" /> Standard
                                    </span>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="text-xs font-mono font-bold text-slate-500">2024-01-01</div>
                        </TableCell>
                        <TableCell>
                            <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                policy.active ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-100 text-slate-500'
                            }`}>
                                {policy.active ? "Active" : "Expired"}
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
            {policiesList.map((policy) => (
                <div key={policy.id} onClick={() => { setEditingPolicy(policy); setFormOpen(true) }} className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer relative overflow-hidden hover:-translate-y-1 border-2 border-slate-200 hover:border-slate-300">
                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-500 border border-slate-100">
                                <Scale className="h-3.5 w-3.5" />
                                {policy.target}
                            </div>
                            <Badge className={`rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                policy.active ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-100 text-slate-500'
                            }`}>
                                {policy.active ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        
                        <h3 className="font-black text-slate-900 text-xl leading-snug mb-2 pr-4">{policy.name}</h3>
                        <p className="text-xs font-medium text-slate-500 line-clamp-2 mb-8 leading-relaxed">{policy.description}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-2 mt-auto">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1">Max Duration</span>
                                <span className="text-xl font-black text-slate-800">{policy.maxHoursPerSession}h</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1">Weekly Limit</span>
                                <span className="text-xl font-black text-slate-800">{policy.maxHoursPerWeek}h</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      <PolicyFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        policy={editingPolicy}
        onSubmit={editingPolicy ? handleUpdate : handleCreate}
      />
    </div>
  )
}
