
"use client"

import React, { useState } from "react"
import { Plus, Search, MoreVertical, LayoutGrid, List, Users, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { users as allUsers } from "@/lib/mock-data"
import type { User } from "@/lib/types"
import { UserFormDialog } from "./user-form-dialog"

export function UsersContent() {
  const [usersList, setUsersList] = useState<User[]>(allUsers)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const filtered = usersList.filter((u) => {
    const matchSearch = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "all" || u.role === roleFilter
    const matchStatus = statusFilter === "all" || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const handleCreate = (user: User) => {
    setUsersList((prev) => [...prev, user])
    setFormOpen(false)
  }

  const handleUpdate = (updated: User) => {
    setUsersList((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    setEditingUser(null)
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id))
  }

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 bg-[#F8FAFC]">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="h-10 w-10 rounded-xl bg-transparent flex items-center justify-center text-slate-900">
                <Users className="h-8 w-8 stroke-[2.5]" />
             </div>
             <h1 className="text-4xl font-black tracking-tighter text-slate-900">Researchers & Staff</h1>
          </div>
          <p className="text-slate-500 font-medium ml-1 text-base">
            Manage user identities, role assignments, and system access levels.
          </p>
        </div>
        <Button onClick={() => { setEditingUser(null); setFormOpen(true) }} className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/10 px-6 transition-all hover:scale-105 active:scale-95 border-2 border-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Add Personnel
        </Button>
      </div>

      <div className="sticky top-0 z-20 mb-6 py-3 bg-[#F8FAFC]/95 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 group max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            <Input
              placeholder="Search personnel by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 border-none bg-white shadow-sm rounded-xl font-medium text-slate-700 placeholder:text-slate-400 transition-all ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-12 px-4 min-w-[140px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Roles" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Roles</SelectItem><SelectItem value="master">Master</SelectItem><SelectItem value="configurator">Configurator</SelectItem><SelectItem value="user">User</SelectItem></SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 px-4 min-w-[140px] border-none bg-slate-100 hover:bg-slate-200/70 rounded-xl font-bold text-slate-700 text-xs transition-all"><SelectValue placeholder="All Statuses" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent>
            </Select>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "grid" | "list")} className="ml-2 bg-transparent border-none p-0 gap-1">
                <ToggleGroupItem value="grid" className="h-12 w-12 rounded-xl data-[state=on]:bg-white data-[state=on]:shadow-sm text-slate-400 data-[state=on]:text-slate-900"><LayoutGrid className="h-5 w-5" /></ToggleGroupItem>
                <ToggleGroupItem value="list" className="h-12 w-12 rounded-xl data-[state=on]:bg-white data-[state=on]:shadow-sm text-slate-400 data-[state=on]:text-slate-900"><List className="h-5 w-5" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300 border-2 border-slate-100">
                <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">No personnel found</h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto mt-1 mb-6">
                Try adjusting your search terms or filters to find team members.
            </p>
            <Button variant="outline" onClick={() => { setSearch(""); setRoleFilter("all"); setStatusFilter("all"); }} className="border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:text-slate-900">
                Clear Filters
            </Button>
        </div>
      ) : viewMode === "list" ? (
        <Table>
            <TableHeader>
                <TableRow className="border-b-2 border-slate-100 hover:bg-transparent">
                    <TableHead className="pl-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Identity</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Role</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Cohorts</TableHead>
                    <TableHead className="h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Joined</TableHead>
                    <TableHead className="text-right pr-8 h-14 text-[10px] uppercase tracking-wider font-bold text-slate-400">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filtered.map((user) => (
                    <TableRow key={user.id} className="cursor-pointer group hover:bg-slate-50 border-b-2 border-slate-50 last:border-0">
                        <TableCell className="pl-8 py-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 shadow-sm rounded-xl border-2 border-white ring-1 ring-slate-100">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">{user.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">{user.firstName} {user.lastName}</div>
                                    <div className="text-xs font-medium text-slate-400">{user.email}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                user.role === 'master' ? 'bg-purple-50 border-purple-100 text-purple-700' : 
                                user.role === 'configurator' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                                'bg-slate-100 border-slate-100 text-slate-600'
                            }`}>
                                {user.role === 'configurator' ? 'Config' : user.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-none border-2 ${
                                user.status === 'active' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-100 text-slate-500'
                            }`}>
                                {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {user.groups.length > 0 ? (
                                <div className="flex gap-1.5">
                                    {user.groups.slice(0, 1).map(g => (
                                        <React.Fragment key={g}>
                                            <Badge variant="secondary" className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-bold border border-slate-100">{g.replace('ME-','').replace('EE-','').replace('CS-','')}</Badge>
                                        </React.Fragment>
                                    ))}
                                    {user.groups.length > 1 && <span className="text-[10px] font-bold text-slate-400 self-center">+{user.groups.length - 1}</span>}
                                </div>
                            ) : (
                                <span className="text-[10px] font-bold text-slate-300 italic">None</span>
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="text-xs font-bold text-slate-500">
                                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl border border-slate-100 shadow-xl p-1 w-40">
                                    <DropdownMenuItem onClick={() => { setEditingUser(user); setFormOpen(true) }} className="rounded-lg font-bold text-xs cursor-pointer">Edit Details</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(user.id)} className="rounded-lg font-bold text-xs text-rose-600 focus:text-rose-700 focus:bg-rose-50 cursor-pointer">Remove User</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((user) => (
                <div key={user.id} onClick={() => { setEditingUser(user); setFormOpen(true) }} className="group relative bg-white p-0 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-100/20 transition-all cursor-pointer flex flex-col overflow-hidden hover:-translate-y-1 border-2 border-slate-200 hover:border-slate-300">
                    {/* Status Strip */}
                    <div className={`h-1.5 w-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    
                    <div className="p-8 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-5 shadow-lg border-4 border-white ring-1 ring-slate-100">
                            <AvatarImage src={user.avatar} className="object-cover" />
                            <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-3xl">{user.firstName[0]}</AvatarFallback>
                        </Avatar>
                        
                        <h3 className="font-black text-slate-900 text-xl mb-1">{user.firstName} {user.lastName}</h3>
                        <p className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
                            <Mail className="h-3 w-3" />
                            {user.email}
                        </p>
                        
                        <div className="mt-auto flex gap-2 w-full justify-center">
                             <Badge className={`rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-wide shadow-sm border-2 border-transparent ${
                                user.role === 'master' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                                user.role === 'configurator' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                                {user.role}
                            </Badge>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:bg-slate-100 border-2 border-transparent hover:border-slate-200"><span className="sr-only">Prev</span>←</Button>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest px-4">Page 1 of 14</span>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:bg-slate-100 border-2 border-transparent hover:border-slate-200"><span className="sr-only">Next</span>→</Button>
        </div>
      )}

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={editingUser}
        onSubmit={editingUser ? handleUpdate : handleCreate}
      />
    </div>
  )
}
