"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { isBackendAvailable } from "@/lib/api/health"

export function ApiStatusBanner() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    checkBackendStatus()
  }, [])

  const checkBackendStatus = async () => {
    const available = await isBackendAvailable()
    setStatus(available ? "online" : "offline")
  }

  if (!showBanner || status === "checking") {
    return null
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-sm ${
        status === "online"
          ? "bg-green-500/10 text-green-400 border-b border-green-500/20"
          : "bg-amber-500/10 text-amber-400 border-b border-amber-500/20"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status === "online" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>Backend API is connected</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              <span>Backend offline - Using mock data</span>
            </>
          )}
        </div>
        <button onClick={() => setShowBanner(false)} className="text-xs opacity-70 hover:opacity-100">
          Dismiss
        </button>
      </div>
    </div>
  )
}
