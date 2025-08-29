"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { cn } from "@/lib/utils"
import { Bold, Italic, Search, Save, Undo2, Redo2 } from "lucide-react"

export function TextEditorExample() {
  const [content, setContent] = useState(
    "Start typing here...\n\nTry the keyboard shortcuts:\n- Ctrl+B for bold\n- Ctrl+I for italic\n- Ctrl+S to save\n- Ctrl+F to find\n- Ctrl+Z to undo\n- Ctrl+Y to redo"
  )
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [showFind, setShowFind] = useState(false)
  const [findText, setFindText] = useState("")
  const [saved, setSaved] = useState(false)
  const [history, setHistory] = useState([content])
  const [historyIndex, setHistoryIndex] = useState(0)

  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Text formatting
  useKeyboardShortcut(
    {
      id: "bold-text",
      keys: "ctrl+b",
      description: "Toggle bold text",
      category: "Editor",
    },
    () => setIsBold(prev => !prev)
  )

  useKeyboardShortcut(
    {
      id: "italic-text",
      keys: "ctrl+i",
      description: "Toggle italic text",
      category: "Editor",
    },
    () => setIsItalic(prev => !prev)
  )

  // Save document
  useKeyboardShortcut(
    {
      id: "save-document",
      keys: "ctrl+s",
      description: "Save document",
      category: "Editor",
    },
    () => saveDocument()
  )

  // Find and replace
  useKeyboardShortcut(
    {
      id: "find-text",
      keys: "ctrl+f",
      description: "Find in document",
      category: "Editor",
    },
    () => setShowFind(true)
  )

  // Undo/Redo
  useKeyboardShortcut(
    {
      id: "undo",
      keys: "ctrl+z",
      description: "Undo last action",
      category: "Editor",
    },
    () => undo()
  )

  useKeyboardShortcut(
    {
      id: "redo",
      keys: "ctrl+y",
      description: "Redo last action",
      category: "Editor",
    },
    () => redo()
  )

  const saveDocument = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addToHistory = (newContent: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newContent)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setContent(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setContent(history[historyIndex + 1])
    }
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    // Add to history after a delay to avoid too many history entries
    const timeoutId = setTimeout(() => {
      addToHistory(newContent)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }

  const highlightText = (text: string, search: string) => {
    if (!search) return text
    const parts = text.split(new RegExp(`(${search})`, "gi"))
    return parts
      .map((part, i) => (part.toLowerCase() === search.toLowerCase() ? `**${part}**` : part))
      .join("")
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {saved && (
        <div className="bg-green-900/10 border border-green-200 rounded-lg p-3">
          <div className="text-secondary font-medium">Document saved!</div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isBold ? "default" : "outline"}
            onClick={() => setIsBold(!isBold)}
          >
            <Bold className="h-4 w-4 mr-1" />
            Bold (Ctrl+B)
          </Button>
          <Button
            size="sm"
            variant={isItalic ? "default" : "outline"}
            onClick={() => setIsItalic(!isItalic)}
          >
            <Italic className="h-4 w-4 mr-1" />
            Italic (Ctrl+I)
          </Button>
          <Button size="sm" variant="outline" onClick={() => saveDocument()}>
            <Save className="h-4 w-4 mr-1" />
            Save (Ctrl+S)
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowFind(!showFind)}>
            <Search className="h-4 w-4 mr-1" />
            Find (Ctrl+F)
          </Button>
          <Button size="sm" variant="outline" onClick={undo} disabled={historyIndex === 0}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={redo}
            disabled={historyIndex === history.length - 1}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFind && (
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Find in document..."
              value={findText}
              onChange={e => setFindText(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded"
            />
            <Button size="sm" onClick={() => setShowFind(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Formatting:</span>
          {isBold && <Badge variant="secondary">Bold</Badge>}
          {isItalic && <Badge variant="secondary">Italic</Badge>}
          {!isBold && !isItalic && <Badge variant="outline">Normal</Badge>}
        </div>

        <Textarea
          ref={editorRef}
          value={content}
          onChange={e => handleContentChange(e.target.value)}
          className={cn("min-h-32 font-mono text-sm", isBold && "font-bold", isItalic && "italic")}
          placeholder="Start typing... Use keyboard shortcuts for formatting"
        />
      </div>

      <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
        <div className="font-medium mb-2">Editor Shortcuts:</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">B</kbd> = Bold
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">I</kbd> = Italic
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">S</kbd> = Save
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">F</kbd> = Find
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Z</kbd> = Undo
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Y</kbd> = Redo
          </div>
        </div>
      </div>
    </div>
  )
}
