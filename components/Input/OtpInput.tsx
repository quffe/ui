'use client'

import React, { useImperativeHandle, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/**
 * Props for the OtpInput component
 */
interface OtpInputProps {
  /** Number of OTP input fields */
  length?: number
  /** Current OTP value */
  value: string
  /** Callback when OTP value changes */
  onChange: (value: string) => void
  /** Whether the input is disabled */
  disabled?: boolean
  /** Placeholder character for empty fields */
  placeholder?: string
  /** Whether to mask the input (for sensitive data) */
  mask?: boolean
  /** Custom className for the container */
  className?: string
  /** Custom className for individual input fields */
  inputClassName?: string
  /** Whether to auto-submit when complete */
  autoSubmit?: boolean
  /** Callback when OTP is complete */
  onComplete?: (value: string) => void
  /** Error state */
  error?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Ref interface for OtpInput component
 */
export interface OtpInputRef {
  /** Focus the first input field */
  focus: () => void
  /** Clear all input fields */
  clear: () => void
  /** Get the current value */
  getValue: () => string
}

/**
 * A one-time password (OTP) input component with multiple input fields
 * 
 * Features:
 * - Configurable number of digits
 * - Auto-focus next field on input
 * - Backspace navigation
 * - Paste support
 * - Keyboard navigation (arrow keys)
 * - Accessibility support
 * - Size variants
 * - Error states
 * - Auto-submit on completion
 * 
 * @example
 * ```tsx
 * <OtpInput
 *   length={6}
 *   value={otpValue}
 *   onChange={setOtpValue}
 *   onComplete={(code) => console.log('Complete:', code)}
 *   size="md"
 * />
 * ```
 */
export const OtpInput = React.forwardRef<OtpInputRef, OtpInputProps>(
  ({
    length = 6,
    value,
    onChange,
    disabled = false,
    placeholder = '',
    mask = false,
    className,
    inputClassName,
    autoSubmit = false,
    onComplete,
    error = false,
    size = 'md',
  }, ref) => {
    const inputRefs = useRef<HTMLInputElement[]>([])

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRefs.current[0]?.focus()
      },
      clear: () => {
        onChange('')
        inputRefs.current[0]?.focus()
      },
      getValue: () => value,
    }))

    // Ensure refs array matches length
    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    // Handle auto-submit when OTP is complete
    useEffect(() => {
      if (value.length === length && onComplete) {
        onComplete(value)
        if (autoSubmit) {
          // Blur all inputs when auto-submitting
          inputRefs.current.forEach(input => input?.blur())
        }
      }
    }, [value, length, onComplete, autoSubmit])

    /**
     * Handle input value changes with validation and navigation
     */
    const handleChange = (index: number, inputValue: string) => {
      // Restrict to numbers only
      if (inputValue && !/^\d+$/.test(inputValue)) return

      if (inputValue.length > 1) {
        // Handle paste - extract only numeric characters
        const pastedValue = inputValue.replace(/\D/g, '').slice(0, length)
        onChange(pastedValue)

        // Focus the appropriate input after paste
        const nextIndex = Math.min(pastedValue.length, length - 1)
        setTimeout(() => {
          inputRefs.current[nextIndex]?.focus()
        }, 0)
        return
      }

      // Handle single character input
      const newValue = value.split('')
      newValue[index] = inputValue
      const updatedValue = newValue.join('')
      onChange(updatedValue)

      // Move to next input if current input is filled
      if (inputValue && index < length - 1) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus()
        }, 0)
      }
    }

    /**
     * Handle keyboard navigation and special keys
     */
    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      switch (e.key) {
        case 'Backspace':
          if (!value[index] && index > 0) {
            // Move to previous input on backspace if current input is empty
            setTimeout(() => {
              inputRefs.current[index - 1]?.focus()
            }, 0)
          }
          break
        case 'ArrowLeft':
          if (index > 0) {
            e.preventDefault()
            inputRefs.current[index - 1]?.focus()
          }
          break
        case 'ArrowRight':
          if (index < length - 1) {
            e.preventDefault()
            inputRefs.current[index + 1]?.focus()
          }
          break
        case 'Delete':
          // Clear current field and stay focused
          e.preventDefault()
          const newValue = value.split('')
          newValue[index] = ''
          onChange(newValue.join(''))
          break
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData
        .getData('Text')
        .replace(/\D/g, '')
        .slice(0, length)
      if (!pasted) return

      const newValues = []
      for (let i = 0; i < length; i++) {
        newValues[i] = pasted[i] || ''
        if (inputRefs.current[i]) {
          inputRefs.current[i]!.value = pasted[i] || ''
        }
      }
      onChange(newValues.join(''))

      // Focus the last filled input
      const last = Math.min(pasted.length, length) - 1
      inputRefs.current[last]?.focus()
    }

    // Size variants
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-lg',
      lg: 'w-16 h-16 text-xl',
    }

    return (
      <div className={cn('flex gap-2 justify-center', className)}>
        {Array.from({ length }, (_, index) => {
          const fieldValue = value[index] || ''
          const displayValue = mask && fieldValue ? '•' : fieldValue
          
          return (
            <Input
              key={index}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el
                } else {
                  delete inputRefs.current[index]
                }
              }}
              onPaste={handlePaste}
              type={mask ? 'password' : 'text'}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={length} // Allow paste of full value
              value={displayValue}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                'text-center font-semibold transition-colors',
                sizeClasses[size],
                error && 'border-destructive focus-visible:ring-destructive',
                inputClassName
              )}
              aria-label={`OTP digit ${index + 1} of ${length}`}
              aria-describedby={error ? 'otp-error' : undefined}
              autoComplete="one-time-code"
            />
          )
        })}
      </div>
    )
  }
)

OtpInput.displayName = 'OtpInput'
