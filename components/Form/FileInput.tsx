"use client"

import * as React from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onFileSelect?: (files: FileList | null) => void
  showPreview?: boolean
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFileSelect, showPreview = false, id, onChange, ...props }, ref) => {
    const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target
      const fileList = files && files.length > 0 ? files : null
      setSelectedFiles(fileList)
      onFileSelect?.(fileList)
      onChange?.(event)
    }

    const clearFiles = () => {
      setSelectedFiles(null)
      if (inputRef.current) {
        inputRef.current.value = ""
        const event = new Event("change", { bubbles: true })
        inputRef.current.dispatchEvent(event)
      }
      onFileSelect?.(null)
    }

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      const files = event.dataTransfer.files
      if (!files?.length) return

      if (inputRef.current && typeof DataTransfer !== "undefined") {
        const dataTransfer = new DataTransfer()
        Array.from(files).forEach(file => dataTransfer.items.add(file))
        inputRef.current.files = dataTransfer.files
        const changeEvent = new Event("change", { bubbles: true })
        inputRef.current.dispatchEvent(changeEvent)
      } else {
        setSelectedFiles(files)
        onFileSelect?.(files)
      }
    }

    return (
      <div className="space-y-2">
        <div
          className={cn(
            "group rounded-md border-2 border-dashed border-input bg-background transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background hover:bg-accent hover:text-accent-foreground",
            className
          )}
        >
          <label
            htmlFor={inputId}
            onDragOver={event => event.preventDefault()}
            onDrop={handleDrop}
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
          >
            <Upload
              aria-hidden="true"
              focusable="false"
              className="h-8 w-8 text-muted-foreground"
            />
            <p id={`${inputId}-instructions`} className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </p>
          </label>
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            className="sr-only"
            aria-describedby={`${inputId}-instructions`}
            onChange={handleFileChange}
            {...props}
          />
        </div>

        {showPreview && selectedFiles && selectedFiles.length > 0 && (
          <div className="space-y-2" aria-live="polite">
            {Array.from(selectedFiles).map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-md bg-muted p-2"
              >
                <span className="truncate text-sm" title={file.name}>
                  {file.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFiles}
                  aria-label={`Remove ${file.name}`}
                >
                  <X aria-hidden="true" focusable="false" className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
