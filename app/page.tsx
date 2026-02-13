
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FlaskConical, Mail, Lock, Github, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 800)
  }

  return (
    <div className="flex min-h-svh bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[50%] flex-col justify-between bg-slate-950 p-16 text-white relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl ring-1 ring-white/5">
            <FlaskConical className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl font-bold tracking-tight text-white leading-none">LabNexus</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Research OS</p>
          </div>
        </div>

        <div className="space-y-8 max-w-lg relative z-10 my-auto animate-in slide-in-from-left-8 duration-700">
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-white">
            Accelerate your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300">Scientific</span> Impact.
          </h1>
          <p className="text-lg leading-relaxed text-slate-400 font-medium">
            The unified platform for intelligent laboratory scheduling, precision asset tracking, and seamless cohort management.
          </p>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-12 w-12 rounded-full border-[3px] border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold shadow-xl text-slate-300 hover:-translate-y-1 transition-transform">
                        U{i}
                    </div>
                ))}
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm tracking-tight">ISO 17025 Ready</span>
                </div>
                <p className="text-xs font-medium text-slate-500">Trusted by 50+ Institutions</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500 relative z-10">
          <span className="bg-white/5 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">v2.4.0 (Stable)</span>
          <span>&copy; 2024 LabNexus Inc.</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-16 relative">
        
        <div className="w-full max-w-[480px] space-y-8 animate-in fade-in zoom-in-95 duration-500 relative bg-white p-10 sm:p-14 rounded-[2.5rem] border-2 border-slate-200 shadow-xl shadow-slate-200/50">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden mb-8 justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <FlaskConical className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">LabNexus</p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 font-medium">
              Enter your credentials to access the workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black text-slate-500 ml-1 uppercase tracking-widest">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all font-bold text-slate-900 placeholder:text-slate-400 rounded-2xl shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</Label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline uppercase tracking-wide"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600 z-10" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all font-bold text-slate-900 placeholder:text-slate-400 rounded-2xl shadow-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm font-bold text-rose-600 bg-rose-50 p-4 rounded-2xl border-2 border-rose-100 flex items-center gap-3 animate-in slide-in-from-left-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-200 text-rose-700 shrink-0">
                    <span className="text-xs font-black">!</span>
                </div>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold shadow-xl shadow-slate-900/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 border-2 border-transparent"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="h-4 w-4 opacity-50" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="h-12 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-2xl font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="h-12 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 rounded-2xl font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300">
              <FlaskConical className="mr-2 h-5 w-5" />
              SSO
            </Button>
          </div>

          <p className="text-center text-xs text-slate-500 font-bold pt-2">
            Don{"'"}t have an account?{" "}
            <button className="font-black text-indigo-600 hover:text-indigo-700 hover:underline">
              Request Access
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
