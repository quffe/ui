"use client"

import * as React from "react"
import { Upload, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onFileSelect?: (files: FileList | null) => void
  showPreview?: boolean
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFileSelect, showPreview = false, ...props }, ref) => {
    const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      setSelectedFiles(files)
      onFileSelect?.(files)
    }

    const clearFiles = () => {
      setSelectedFiles(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      onFileSelect?.(null)
    }

    return (
      <div className="space-y-2">
        <div
          className={cn(
            "flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-input bg-background hover:bg-accent hover:text-accent-foreground",
            className
          )}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
            {...props}
          />
        </div>
        
        {showPreview && selectedFiles && (
          <div className="space-y-2">
            {Array.from(selectedFiles).map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFiles}
                >
                  <X className="h-4 w-4" />
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
