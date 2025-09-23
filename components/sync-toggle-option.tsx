"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Cloud, HardDrive, Key, Mail, Shield, Check, Loader2 } from "lucide-react"

type SyncMode = "local" | "cloud"

interface SyncToggleOptionProps {
  initialMode?: SyncMode
  isAuthenticated?: boolean
  onSyncModeChange?: (mode: SyncMode) => void
  onAuthRequired?: () => void
}

export function SyncToggleOption({
  initialMode = "local",
  isAuthenticated = false,
  onSyncModeChange,
  onAuthRequired,
}: SyncToggleOptionProps) {
  const [syncMode, setSyncMode] = useState<SyncMode>(initialMode)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "webauthn">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleToggle = () => {
    if (syncMode === "local" && !isAuthenticated) {
      setShowAuthDialog(true)
      onAuthRequired?.()
    } else {
      const newMode = syncMode === "local" ? "cloud" : "local"
      setSyncMode(newMode)
      onSyncModeChange?.(newMode)
    }
  }

  const handleEmailAuth = async () => {
    setIsLoading(true)
    // Simulate auth process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowAuthDialog(false)
    setSyncMode("cloud")
    onSyncModeChange?.("cloud")
  }

  const handleWebAuthnAuth = async () => {
    setIsLoading(true)
    try {
      // Simulate WebAuthn process
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      setShowAuthDialog(false)
      setSyncMode("cloud")
      onSyncModeChange?.("cloud")
    } catch (error) {
      setIsLoading(false)
      console.error("WebAuthn failed:", error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-3 hover:bg-hsl(var(--sync-hover)) rounded-lg transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md transition-colors ${
              syncMode === "cloud" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
            }`}
          >
            {syncMode === "cloud" ? <Cloud className="h-4 w-4" /> : <HardDrive className="h-4 w-4" />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {syncMode === "cloud" ? "Cloud Sync" : "Local Storage"}
            </span>
            <span className="text-xs text-muted-foreground">
              {syncMode === "cloud" ? "Synced across devices" : "Stored on this device"}
            </span>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
            syncMode === "cloud" ? "bg-blue-600" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              syncMode === "cloud" ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-400" />
              Enable Cloud Sync
            </DialogTitle>
            <DialogDescription>Sign in to sync your data across all your devices securely.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={authMethod === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthMethod("email")}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant={authMethod === "webauthn" ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthMethod("webauthn")}
                className="flex-1"
              >
                <Key className="h-4 w-4 mr-2" />
                Passwordless
              </Button>
            </div>

            <Separator />

            {authMethod === "email" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleEmailAuth} className="w-full" disabled={isLoading || !email || !password}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-6">
                  <Shield className="h-12 w-12 mx-auto text-blue-400 mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Use your device's built-in security to sign in quickly and securely.
                  </p>
                </div>
                <Button onClick={handleWebAuthnAuth} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Use Passwordless
                    </>
                  )}
                </Button>
              </div>
            )}

            <div className="text-xs text-muted-foreground text-center">
              Your data is encrypted and secure. We never store your passwords.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
