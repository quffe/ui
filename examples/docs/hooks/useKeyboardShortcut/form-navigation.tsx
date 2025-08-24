"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useKeyboardShortcut, useKeyboardShortcutElement } from "@/hooks/useKeyboardShortcut"

export function FormNavigationExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  // Quick field focus shortcuts
  const nameShortcutRef = useKeyboardShortcutElement(
    {
      id: 'focus-name',
      keys: 'alt+n',
      description: 'Focus name field',
      category: 'Form'
    },
    () => nameRef.current?.focus()
  )

  const emailShortcutRef = useKeyboardShortcutElement(
    {
      id: 'focus-email',
      keys: 'alt+e',
      description: 'Focus email field',
      category: 'Form'
    },
    () => emailRef.current?.focus()
  )

  const messageShortcutRef = useKeyboardShortcutElement(
    {
      id: 'focus-message',
      keys: 'alt+m',
      description: 'Focus message field',
      category: 'Form'
    },
    () => messageRef.current?.focus()
  )

  // Submit form
  useKeyboardShortcut(
    {
      id: 'submit-form',
      keys: 'ctrl+enter',
      description: 'Submit form',
      category: 'Form'
    },
    () => handleSubmit()
  )

  // Clear form
  useKeyboardShortcut(
    {
      id: 'clear-form',
      keys: 'ctrl+shift+c',
      description: 'Clear form',
      category: 'Form'
    },
    () => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }
  )

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {submitted && (
        <div className="bg-green-900/10 border border-green-200 rounded-lg p-3">
          <div className="text-secondary font-medium">Form submitted successfully!</div>
        </div>
      )}
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <div>
          <label className="block text-sm font-medium mb-2">
            Name (Alt+N to focus)
          </label>
          <Input
            ref={(el) => {
              nameRef.current = el
              if (nameShortcutRef.current !== el) {
                nameShortcutRef.current = el
              }
            }}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email (Alt+E to focus)
          </label>
          <Input
            ref={(el) => {
              emailRef.current = el
              if (emailShortcutRef.current !== el) {
                emailShortcutRef.current = el
              }
            }}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Message (Alt+M to focus)
          </label>
          <Textarea
            ref={(el) => {
              messageRef.current = el
              if (messageShortcutRef.current !== el) {
                messageShortcutRef.current = el
              }
            }}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Enter your message"
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!formData.name || !formData.email || !formData.message}>
            Submit (Ctrl+Enter)
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setFormData({ name: '', email: '', message: '' })
              setSubmitted(false)
            }}
          >
            Clear Form
          </Button>
        </div>
      </form>

      <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
        <div className="font-medium mb-2">Keyboard Shortcuts:</div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Alt</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">N</kbd> = Focus Name
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Alt</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">E</kbd> = Focus Email
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Alt</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">M</kbd> = Focus Message
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Enter</kbd> = Submit
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Shift</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">C</kbd> = Clear Form
        </div>
      </div>
    </div>
  )
}