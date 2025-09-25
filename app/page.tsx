"use client";
import { SyncToggleOption } from "@/components/sync-toggle-option"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Sync Settings</h1>
          <p className="text-muted-foreground">Choose how to store your data</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-2">
          <SyncToggleOption
            initialMode="local"
            isAuthenticated={false}
            onSyncModeChange={(mode) => console.log("Sync mode changed to:", mode)}
            onAuthRequired={() => console.log("Authentication required")}
          />
        </div>

        <div className="text-xs text-muted-foreground">
          This component would typically be used inside a custom select dropdown as an option.
        </div>
      </div>
    </main>
  )
}
