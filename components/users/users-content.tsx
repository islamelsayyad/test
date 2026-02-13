"use client"

import React, { useState } from "react"
import { Plus, Search, MoreVertical, LayoutGrid, List, Users, Mail } from "lucide-react"
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
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Researchers & Staff</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user identities, role assignments, and access levels.
          </p>
        </div>
        <Button onClick={() => { setEditingUser(null); setFormOpen(true) }} className="h-9 px-3.5 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Personnel
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-9 px-3 min-w-[120px] text-sm"><SelectValue placeholder="All Roles" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Roles</SelectItem><SelectItem value="master">Master</SelectItem><SelectItem value="configurator">Configurator</SelectItem><SelectItem value="user">User</SelectItem></SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 px-3 min-w-[120px] text-sm"><SelectValue placeholder="All Statuses" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent>
          </Select>
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as "grid" | "list")} className="ml-1">
              <ToggleGroupItem value="grid" className="h-9 w-9 rounded-md"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="list" className="h-9 w-9 rounded-md"><List className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg">
            <Users className="h-8 w-8 text-muted-foreground/30 mb-3" />
            <h3 className="text-sm font-medium text-foreground">No personnel found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1 mb-4">
                Try adjusting your search terms or filters.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setRoleFilter("all"); setStatusFilter("all"); }}>Clear Filters</Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="border border-border rounded-xl overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/30">
                    <TableHead className="pl-5 h-10 text-xs font-medium text-muted-foreground">Identity</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Role</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Cohorts</TableHead>
                    <TableHead className="h-10 text-xs font-medium text-muted-foreground">Joined</TableHead>
                    <TableHead className="text-right pr-5 h-10 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filtered.map((user) => (
                    <TableRow key={user.id} className="cursor-pointer">
                        <TableCell className="pl-5 py-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 rounded-lg border border-border">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-accent/10 text-accent font-medium text-xs rounded-lg">{user.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-sm font-medium text-foreground">{user.firstName} {user.lastName}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded-full ${
                                user.role === 'master' ? 'text-foreground border-foreground/20 bg-foreground/5' : 
                                user.role === 'configurator' ? 'text-accent border-accent/20 bg-accent/10' :
                                'text-muted-foreground'
                            }`}>
                                {user.role === 'configurator' ? 'Config' : user.role}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={`text-[11px] font-medium px-1.5 py-0 rounded-full ${
                                user.status === 'active' ? 'text-accent border-accent/20 bg-accent/10' : 'text-muted-foreground'
                            }`}>
                                {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {user.groups.length > 0 ? (
                                <div className="flex gap-1">
                                    {user.groups.slice(0, 1).map(g => (
                                        <Badge key={g} variant="secondary" className="text-[11px] font-normal px-1.5 py-0 rounded">{g.replace('ME-','').replace('EE-','').replace('CS-','')}</Badge>
                                    ))}
                                    {user.groups.length > 1 && <span className="text-xs text-muted-foreground self-center">+{user.groups.length - 1}</span>}
                                </div>
                            ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                            )}
                        </TableCell>
                        <TableCell>
                            <span className="text-sm text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </TableCell>
                        <TableCell className="text-right pr-5">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-md">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-36">
                                    <DropdownMenuItem onClick={() => { setEditingUser(user); setFormOpen(true) }} className="text-sm cursor-pointer">Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-sm text-destructive focus:text-destructive cursor-pointer">Remove</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((user) => (
                <div key={user.id} onClick={() => { setEditingUser(user); setFormOpen(true) }} className="group bg-card p-5 rounded-xl border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-3 border border-border">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback className="bg-muted text-muted-foreground font-medium text-xl">{user.firstName[0]}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-medium text-foreground text-sm">{user.firstName} {user.lastName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                    </p>
                    
                    <div className="mt-3">
                         <Badge variant="outline" className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            user.role === 'master' ? 'text-foreground border-foreground/20 bg-foreground/5' : 
                            user.role === 'configurator' ? 'text-accent border-accent/20 bg-accent/10' :
                            'text-muted-foreground'
                        }`}>
                            {user.role}
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-muted-foreground"><span className="sr-only">Prev</span>{'<'}</Button>
            <span className="text-xs text-muted-foreground px-3">Page 1 of 14</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-muted-foreground"><span className="sr-only">Next</span>{'>'}</Button>
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
