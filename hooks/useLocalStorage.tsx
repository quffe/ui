"use client"

import { useState, useLayoutEffect, useRef, SetStateAction, Dispatch } from "react"

export const useLocalStorage = <T,>(
  keyName: string,
  defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] => {
  const defaultValueRef = useRef(defaultValue)
  const initializedRef = useRef(false)

  // Always start with the default value to ensure SSR/client consistency
  const [storedValue, setStoredValue] = useState<T>(defaultValue as T)

  // Update ref when defaultValue changes
  defaultValueRef.current = defaultValue

  // Load from localStorage after hydration (before paint)
  useLayoutEffect(() => {
    if (initializedRef.current) return // Prevent re-initialization

    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(keyName)
        if (value !== null) {
          // Value exists in localStorage (even if it's an empty string)
          const parsedValue = JSON.parse(value)
          setStoredValue(parsedValue)
        } else if (defaultValueRef.current !== undefined) {
          // No value in localStorage, store the default
          window.localStorage.setItem(keyName, JSON.stringify(defaultValueRef.current))
        }
        initializedRef.current = true
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${keyName}":`, error)
      initializedRef.current = true
    }
  }, [keyName]) // Remove defaultValue from dependencies

  const setValue = (newValue: Parameters<typeof setStoredValue>[0]) => {
    try {
      if (typeof window !== "undefined") {
        // Always use JSON serialization for consistency
        window.localStorage.setItem(keyName, JSON.stringify(newValue))
      }
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`Error setting localStorage key "${keyName}":`, error)
    }
  }

  return [storedValue, setValue]
}
