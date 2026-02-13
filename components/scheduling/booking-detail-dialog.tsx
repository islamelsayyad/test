
"use client"

import React from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock, CalendarDays, MapPin, User, FileText, Users, AlertCircle } from "lucide-react"
import type { BookingRequest } from "@/lib/types"

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode; label: string; border: string }> = {
  pending: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100", icon: <Clock className="h-4 w-4" />, label: "Pending Approval" },
  approved: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100", icon: <CheckCircle2 className="h-4 w-4" />, label: "Approved" },
  rejected: { color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-100", icon: <XCircle className="h-4 w-4" />, label: "Rejected" },
  cancelled: { color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200", icon: <XCircle className="h-4 w-4" />, label: "Cancelled" },
}

interface Props {
  booking: BookingRequest | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function BookingDetailDialog({ booking, open, onOpenChange, onApprove, onReject }: Props) {
  if (!booking) return null

  const cfg = statusConfig[booking.status]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-[2.5rem] border-2 border-slate-200 shadow-2xl bg-white gap-0">
        
        {/* Status Header Strip */}
        <div className={`${cfg.bg} px-8 py-6 border-b-2 ${cfg.border} flex items-center justify-between`}>
            <div>
                <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">Booking Details</DialogTitle>
                <p className="text-[10px] font-bold text-slate-500 mt-1 opacity-70 uppercase tracking-widest font-mono">ID: {booking.id.toUpperCase()}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-sm border-2 ${cfg.border} ${cfg.color} shadow-sm`}>
                {cfg.icon}
                <span className="text-[10px] font-black uppercase tracking-wide">{cfg.label}</span>
            </div>
        </div>

        <div className="p-8 space-y-6 relative">
          <div className="space-y-4">
            {/* User Card */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center border-2 border-slate-200 text-slate-400 shadow-sm">
                    <User className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">{booking.userName}</p>
                    <Badge variant="outline" className="text-[9px] capitalize bg-white border-slate-200 text-slate-500 font-bold px-1.5 py-0 mt-0.5 border-2 shadow-sm rounded-md">{booking.userRole}</Badge>
                </div>
            </div>

            {/* Info Grid */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-500 border border-indigo-100">
                        <MapPin className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-slate-700">{booking.labName}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-500 border border-indigo-100">
                        <CalendarDays className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        <span className="text-xs font-medium text-slate-500">{booking.startTime} - {booking.endTime}</span>
                    </div>
                </div>

                {booking.groupName && (
                    <div className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-500 border border-indigo-100">
                            <Users className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-slate-700">{booking.groupName}</span>
                    </div>
                )}
            </div>

            <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Purpose</span>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                    {booking.purpose}
                </p>
            </div>

            {booking.reason && (
                <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2 text-rose-500">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Rejection Reason</span>
                    </div>
                    <p className="text-sm text-rose-700 font-medium leading-relaxed bg-rose-50 p-4 rounded-2xl border-2 border-rose-100">
                        {booking.reason}
                    </p>
                </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 gap-3 bg-white border-t-2 border-slate-100">
            {booking.status === 'pending' ? (
                <>
                    <Button variant="outline" onClick={() => onReject(booking.id)} className="flex-1 h-12 rounded-xl font-bold border-2 border-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200">
                        Reject
                    </Button>
                    <Button onClick={() => onApprove(booking.id)} className="flex-1 h-12 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 border-2 border-transparent">
                        Approve Request
                    </Button>
                </>
            ) : (
                <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full h-12 rounded-xl font-bold border-2 border-slate-200 hover:bg-slate-50 text-slate-700">
                    Close Details
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
