"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useKeyboardShortcut, useKeyboardShortcutElement } from "@/hooks/useKeyboardShortcut"
import { X } from "lucide-react"

export function ModalShortcutsExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    autoSave: false,
  })
  const [saved, setSaved] = useState(false)

  // Close modal with Escape (only when modal is open)
  useKeyboardShortcut(
    {
      id: "close-modal",
      keys: "escape",
      description: "Close modal",
      category: "Modal",
    },
    () => setIsOpen(false),
    { enabled: isOpen }
  )

  // Save settings
  useKeyboardShortcut(
    {
      id: "save-settings",
      keys: "ctrl+s",
      description: "Save settings",
      category: "Modal",
    },
    () => saveSettings(),
    { enabled: isOpen }
  )

  // Tab navigation within modal
  const cancelRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "cancel-action",
      keys: "alt+c",
      description: "Cancel action",
      category: "Modal",
    },
    () => setIsOpen(false),
    { enabled: isOpen }
  )

  const saveRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "save-action",
      keys: "alt+s",
      description: "Save action",
      category: "Modal",
    },
    () => saveSettings(),
    { enabled: isOpen }
  )

  const saveSettings = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setIsOpen(false)
    }, 1000)
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="text-center">
        <Button onClick={() => setIsOpen(true)}>Open Settings Modal</Button>
        <div className="text-sm text-muted-foreground mt-2">
          Click to open modal and try keyboard shortcuts
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Settings</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {saved && (
              <div className="bg-green-900/10 border border-green-200 rounded-lg p-3 mb-4">
                <div className="text-secondary font-medium">Settings saved!</div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <div className="flex gap-2">
                  {["light", "dark", "auto"].map(theme => (
                    <Button
                      key={theme}
                      variant={settings.theme === theme ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings({ ...settings, theme })}
                    >
                      {theme}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Notifications</label>
                <Button
                  variant={settings.notifications ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSettings({ ...settings, notifications: !settings.notifications })
                  }
                >
                  {settings.notifications ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Auto Save</label>
                <Button
                  variant={settings.autoSave ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                >
                  {settings.autoSave ? "On" : "Off"}
                </Button>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button ref={cancelRef} variant="outline" onClick={() => setIsOpen(false)}>
                Cancel (Alt+C)
              </Button>
              <Button ref={saveRef} onClick={saveSettings}>
                Save (Alt+S)
              </Button>
            </div>

            <div className="text-xs text-muted-foreground mt-4 pt-4 border-t space-y-1">
              <div className="font-medium mb-2">Modal Shortcuts:</div>
              <div>
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Esc</kbd> = Close Modal
              </div>
              <div>
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">S</kbd> = Save
              </div>
              <div>
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Alt</kbd> +{" "}
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">C</kbd> = Cancel
              </div>
              <div>
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Alt</kbd> +{" "}
                <kbd className="bg-muted px-1 py-0.5 rounded text-xs">S</kbd> = Save
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="text-sm font-medium mb-2">Current Settings:</div>
        <div className="flex gap-2 justify-center">
          <Badge variant="secondary">Theme: {settings.theme}</Badge>
          <Badge variant="secondary">Notifications: {settings.notifications ? "On" : "Off"}</Badge>
          <Badge variant="secondary">Auto Save: {settings.autoSave ? "On" : "Off"}</Badge>
        </div>
      </div>
    </div>
  )
}
