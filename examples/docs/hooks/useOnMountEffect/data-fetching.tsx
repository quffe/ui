"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useOnMountEffect } from "@/hooks/useOnMountEffect"

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

// Simulate API call
const fetchUser = async (userId: number): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
  
  // Simulate occasional failure
  if (Math.random() < 0.2) {
    throw new Error("Failed to fetch user")
  }
  
  return {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    avatar: `https://i.pravatar.cc/40?u=${userId}`
  }
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useOnMountEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true)
        setError(null)
        const userData = await fetchUser(userId)
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [userId]) // userId captured on mount, changes ignored

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Loading user...</span>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        <div>Error: {error}</div>
        <div className="text-xs text-muted-foreground mt-1">
          Note: Data is only fetched once on mount, even if userId prop changes
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <div className="p-4 text-center">User not found</div>
  }

  return (
    <div className="flex items-center space-x-3 p-4 border rounded">
      <img 
        src={user.avatar} 
        alt={`${user.name} avatar`}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </div>
      <div className="text-xs text-muted-foreground">
        ID: {user.id}
      </div>
    </div>
  )
}

export default function DataFetchingExample() {
  const [userId, setUserId] = useState(1)
  const [key, setKey] = useState(0)

  const changeUserId = () => {
    setUserId(prev => prev + 1)
  }

  const remountComponent = () => {
    setKey(prev => prev + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Fetching on Mount</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={changeUserId} variant="outline">
              Change User ID (current: {userId})
            </Button>
            <Button onClick={remountComponent}>
              Remount Component
            </Button>
          </div>
          
          <UserProfile key={key} userId={userId} />
          
          <div className="text-xs text-muted-foreground">
            <div>• "Change User ID" only updates the prop - data won't refetch</div>
            <div>• "Remount Component" forces a new mount - data will refetch</div>
            <div>• This demonstrates how useOnMountEffect ignores prop changes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}