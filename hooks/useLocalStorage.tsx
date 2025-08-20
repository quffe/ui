"use client"

import { useState, useEffect } from "react"

export const useLocalStorage = <T,>(keyName: string, defaultValue?: T): [T, (val: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(defaultValue as T)

  // Initialize value from localStorage after component mounts (client-side only)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(keyName)
        if (value) {
          setStoredValue(JSON.parse(value))
        } else if (defaultValue !== undefined) {
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        }
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${keyName}":`, error)
    }
  }, [keyName, defaultValue])

  const setValue = (newValue: T) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          keyName,
          typeof newValue === "string" ? newValue : JSON.stringify(newValue)
        )
      }
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`Error setting localStorage key "${keyName}":`, error)
    }
  }

  return [storedValue, setValue]
}
