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
    <div className="flex min-h-svh bg-background font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[50%] flex-col justify-between bg-foreground p-14 text-primary-foreground relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
            <FlaskConical className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold tracking-tight text-primary-foreground leading-none">LabNexus</p>
            <p className="text-[10px] font-medium text-primary-foreground/50 uppercase tracking-widest mt-0.5">Research OS</p>
          </div>
        </div>

        <div className="max-w-lg relative z-10 my-auto">
          <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-primary-foreground text-balance">
            Accelerate your Scientific Impact.
          </h1>
          <p className="text-base leading-relaxed text-primary-foreground/50 mt-6">
            The unified platform for intelligent laboratory scheduling, precision asset tracking, and seamless cohort management.
          </p>
          
          <div className="flex items-center gap-5 mt-10">
            <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-9 w-9 rounded-full border-2 border-foreground bg-primary-foreground/10 flex items-center justify-center text-[10px] font-medium text-primary-foreground/60">
                        U{i}
                    </div>
                ))}
            </div>
            <div className="h-8 w-px bg-primary-foreground/10"></div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="text-xs">ISO 17025 Ready</span>
                </div>
                <p className="text-[11px] text-primary-foreground/40 mt-0.5">Trusted by 50+ institutions</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-primary-foreground/30 relative z-10">
          <span>v2.4.0</span>
          <span>&copy; 2024 LabNexus Inc.</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 lg:hidden mb-10 justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-primary-foreground">
              <FlaskConical className="h-4.5 w-4.5" />
            </div>
            <p className="text-lg font-semibold text-foreground tracking-tight">LabNexus</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Enter your credentials to access the workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@institution.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <button
                  type="button"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/5 p-3 rounded-lg border border-destructive/10 flex items-center gap-2">
                <span className="text-xs font-medium">!</span>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin"/>
                    Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                    Sign in <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="h-10 text-sm font-medium text-foreground">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="h-10 text-sm font-medium text-foreground">
              <FlaskConical className="mr-2 h-4 w-4" />
              SSO
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don{"'"}t have an account?{" "}
            <button className="font-medium text-foreground hover:underline">
              Request Access
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
