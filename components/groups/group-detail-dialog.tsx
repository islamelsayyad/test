
"use client"

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, UserMinus, GraduationCap, Users, Calendar } from "lucide-react"
import { users as allUsers } from "@/lib/mock-data"
import type { Group } from "@/lib/types"

interface Props {
  group: Group | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (group: Group) => void
  onDelete: (id: string) => void
}

export function GroupDetailDialog({ group, open, onOpenChange, onEdit, onDelete }: Props) {
  if (!group) return null

  const memberUsers = allUsers.filter((u) => group.students.includes(u.id))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0 rounded-[2.5rem] border-2 border-slate-200 shadow-2xl bg-white flex flex-col gap-0">
        
        {/* Header Section */}
        <div className="bg-slate-50/80 p-8 pb-6 border-b-2 border-slate-100 shrink-0 relative overflow-hidden">
          <div className="relative z-10 flex items-start justify-between mb-6">
             <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-md border-2 border-indigo-50">
                    <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                    <DialogTitle className="text-2xl font-black text-slate-900 leading-none tracking-tight">{group.name}</DialogTitle>
                    <p className="text-sm font-bold text-slate-500 mt-1">{group.department}</p>
                </div>
             </div>
             <Badge variant="outline" className="bg-white border-2 border-slate-200 text-slate-600 font-mono text-xs font-bold px-2.5 py-1 shadow-sm rounded-lg">
                {group.code}
             </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 relative z-10">
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col justify-center">
               <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Year</p>
               <p className="text-sm font-bold text-slate-800">{group.academicYear}</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col justify-center">
               <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Advisor</p>
               <p className="text-sm font-bold text-slate-800 truncate">{group.faculty}</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col justify-center">
               <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Size</p>
               <p className="text-sm font-bold text-slate-800">{group.studentCount} Students</p>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {group.description && (
            <div className="px-8 py-6 pb-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">About this Cohort</p>
              <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">{group.description}</p>
            </div>
          )}

          <div className="px-8 py-6">
            <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-indigo-500" />
                <p className="text-xs font-black uppercase tracking-wider text-slate-900">Members ({memberUsers.length})</p>
            </div>
            
            {memberUsers.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6">Student</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {memberUsers.map((user) => (
                        <TableRow key={user.id} className="group hover:bg-slate-50">
                            <TableCell className="pl-6 py-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-slate-100 rounded-lg">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="bg-indigo-50 text-indigo-600 font-black text-[10px]">{user.firstName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-bold text-slate-900 text-sm">{user.firstName} {user.lastName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="py-3 text-slate-500 font-bold text-xs">{user.email}</TableCell>
                            <TableCell className="text-right pr-6 py-3">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                    <UserMinus className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-slate-100 border-dashed">
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-100">
                        <Users className="h-5 w-5 text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-500 font-bold">No members assigned</p>
                </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-white border-t-2 border-slate-100 flex gap-3 shrink-0">
            <Button variant="outline" className="flex-1 h-12 rounded-xl border-2 border-slate-200 font-bold hover:bg-slate-50 text-slate-700 shadow-sm transition-all" onClick={() => onEdit(group)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
            <Button className="h-12 px-5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-2 border-red-100 font-bold shadow-none transition-colors" onClick={() => onDelete(group.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
