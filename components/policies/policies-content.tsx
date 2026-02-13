"use client"

import React, { useState } from "react"
import { Plus, Scale, Search, MoreVertical, LayoutGrid, List, Lock, Clock, UserCheck, FileText } from "lucide-react"
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
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Usage Policies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Define access rules, booking limits, and supervision requirements.
          </p>
        </div>
        <Button onClick={() => { setEditingPolicy(null); setFormOpen(true) }} className="h-9 px-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          New Policy
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input 
              placeholder="Search policies..." 
              className="pl-9 h-9 text-sm" 
          />
        </div>
        
        <div className="flex items-center gap-2">
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

      {policiesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg">
            <Scale className="h-8 w-8 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-medium text-foreground">No policies found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1 mb-4">
                Try adjusting your search to find the policy you need.
            </p>
            <Button variant="outline" size="sm">Clear Search</Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="border border-border rounded-lg overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5 h-10 text-xs font-medium text-muted-foreground">Scope</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Constraints</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Supervision</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Validity</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right pr-5 h-10 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {policiesList.map((policy) => (
                    <TableRow key={policy.id} onClick={() => { setEditingPolicy(policy); setFormOpen(true) }} className="cursor-pointer">
                        <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{policy.name}</p>
                                    <p className="text-xs text-muted-foreground max-w-[200px] truncate">{policy.description}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-1.5">
                                <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0 rounded">
                                    {policy.maxHoursPerDay * 30}M
                                </Badge>
                                <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0 rounded">
                                    {policy.maxConcurrentBookings}-{policy.maxConcurrentBookings + 2} PPL
                                </Badge>
                            </div>
                        </TableCell>
                        <TableCell>
                            {policy.supervisionRequired ? (
                                <span className="flex items-center gap-1 text-xs text-amber-600">
                                    <Lock className="h-3 w-3" /> Full
                                </span>
                            ) : policy.autoApprovalEligible ? (
                                <span className="flex items-center gap-1 text-xs text-emerald-600">
                                    <UserCheck className="h-3 w-3" /> Auto
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" /> Standard
                                </span>
                            )}
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-muted-foreground font-mono">2024-01-01</span>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                                policy.active ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-muted-foreground'
                            }`}>
                                {policy.active ? "Active" : "Expired"}
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
            {policiesList.map((policy) => (
                <div key={policy.id} onClick={() => { setEditingPolicy(policy); setFormOpen(true) }} className="group bg-card p-5 rounded-lg border border-border hover:border-foreground/20 transition-colors cursor-pointer flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="text-[11px] font-normal px-1.5 py-0.5 rounded">
                            {policy.target}
                        </Badge>
                        <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded ${
                            policy.active ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-muted-foreground'
                        }`}>
                            {policy.active ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    
                    <h3 className="font-medium text-foreground text-sm leading-snug mb-1 pr-4">{policy.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{policy.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-border">
                        <div>
                            <span className="block text-[10px] text-muted-foreground mb-0.5">Max Duration</span>
                            <span className="text-lg font-semibold text-foreground">{policy.maxHoursPerSession}h</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-muted-foreground mb-0.5">Weekly Limit</span>
                            <span className="text-lg font-semibold text-foreground">{policy.maxHoursPerWeek}h</span>
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
