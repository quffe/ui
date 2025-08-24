"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Crown, User, Edit, Trash2, MessageSquare, FileText } from "lucide-react"
import { useState } from "react"
import useRevalidate from "@/hooks/useRevalidate"

type UserRole = 'admin' | 'moderator' | 'user'
type ActionType = 'create-post' | 'update-profile' | 'delete-comment' | 'moderate-content' | 'view-analytics'

const mockUser = {
  id: 'user_123',
  role: 'user' as UserRole,
  permissions: ['read', 'write']
}

export default function ConditionalRevalidationExample() {
  const [currentUser, setCurrentUser] = useState(mockUser)
  const [actionHistory, setActionHistory] = useState<Array<{
    action: ActionType
    timestamp: string
    revalidated: string[]
    userRole: UserRole
  }>>([])
  const { revalidate } = useRevalidate()

  const simulateApiCall = async (action: ActionType, payload?: any): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))
    
    // Simulate different success rates based on action
    const successRate = action === 'view-analytics' ? 0.95 : 0.9
    return Math.random() < successRate
  }

  const handleUserAction = async (action: ActionType, payload?: any) => {
    try {
      const response = await simulateApiCall(action, payload)

      if (response) {
        // Conditional revalidation based on user role and action
        const urlsToRevalidate: string[] = []

        // Always revalidate user's own data
        urlsToRevalidate.push(`/api/users/${currentUser.id}`)

        // Role-based revalidations
        if (currentUser.role === 'admin') {
          urlsToRevalidate.push(
            '/api/users',
            '/api/analytics',
            '/api/reports',
            '/api/system/stats'
          )
        } else if (currentUser.role === 'moderator') {
          urlsToRevalidate.push(
            '/api/posts/moderation',
            '/api/comments/reported',
            '/api/users/flagged'
          )
        }

        // Action-specific revalidations
        switch (action) {
          case 'create-post':
            urlsToRevalidate.push(
              '/api/posts',
              '/api/posts/recent',
              `/api/users/${currentUser.id}/posts`
            )
            if (currentUser.role === 'admin') {
              urlsToRevalidate.push('/api/analytics/content')
            }
            break

          case 'update-profile':
            urlsToRevalidate.push('/api/profile')
            if (currentUser.role !== 'user') {
              urlsToRevalidate.push('/api/users')
            }
            break

          case 'delete-comment':
            urlsToRevalidate.push(
              '/api/comments',
              `/api/posts/${payload?.postId}/comments`
            )
            if (currentUser.role === 'admin') {
              urlsToRevalidate.push('/api/analytics/moderation')
            }
            break

          case 'moderate-content':
            if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
              urlsToRevalidate.push(
                '/api/posts/moderation',
                '/api/moderation/queue',
                '/api/analytics/moderation'
              )
            }
            break

          case 'view-analytics':
            if (currentUser.role === 'admin') {
              urlsToRevalidate.push(
                '/api/analytics/dashboard',
                '/api/reports/summary'
              )
            }
            break
        }

        // Remove duplicates
        const uniqueUrls = [...new Set(urlsToRevalidate)]
        revalidate(uniqueUrls)

        // Track action
        setActionHistory(prev => [
          ...prev.slice(-6), // Keep last 6 actions
          {
            action,
            timestamp: new Date().toLocaleTimeString(),
            revalidated: uniqueUrls,
            userRole: currentUser.role
          }
        ])
      }
    } catch (error) {
      console.error('Action failed:', error)
    }
  }

  const changeUserRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }))
  }

  const actions = [
    {
      id: 'create-post' as ActionType,
      label: 'Create Post',
      icon: FileText,
      description: 'Create a new blog post',
      availableFor: ['admin', 'moderator', 'user'],
      color: 'bg-secondary/10 text-secondary border-secondary/30'
    },
    {
      id: 'update-profile' as ActionType,
      label: 'Update Profile',
      icon: User,
      description: 'Update user profile information',
      availableFor: ['admin', 'moderator', 'user'],
      color: 'bg-green-900/10 text-secondary border-green-200'
    },
    {
      id: 'delete-comment' as ActionType,
      label: 'Delete Comment',
      icon: Trash2,
      description: 'Remove a comment from a post',
      availableFor: ['admin', 'moderator'],
      color: 'bg-red-900/10 text-muted-foreground border-red-900/30'
    },
    {
      id: 'moderate-content' as ActionType,
      label: 'Moderate Content',
      icon: Edit,
      description: 'Review and moderate user content',
      availableFor: ['admin', 'moderator'],
      color: 'bg-purple-900/10 text-secondary-foreground border-purple-200'
    },
    {
      id: 'view-analytics' as ActionType,
      label: 'View Analytics',
      icon: Crown,
      description: 'Access detailed analytics dashboard',
      availableFor: ['admin'],
      color: 'bg-warn-soft/10 text-warn-soft border-warn-soft/30'
    }
  ]

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />
      case 'moderator': return <Edit className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'text-foreground bg-warn-soft/10'
      case 'moderator': return 'text-secondary-foreground bg-purple-900/10'
      default: return 'text-secondary bg-secondary/10'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Conditional Revalidation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* User Role Selector */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-semibold mb-4">Current User Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded p-3">
                <div className="text-sm text-muted-foreground mb-2">User Role</div>
                <Select value={currentUser.role} onValueChange={changeUserRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Regular User
                      </div>
                    </SelectItem>
                    <SelectItem value="moderator">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Moderator
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        Administrator
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-card rounded p-3">
                <div className="text-sm text-muted-foreground mb-2">Permissions</div>
                <div className="flex items-center gap-2">
                  {getRoleIcon(currentUser.role)}
                  <Badge className={getRoleColor(currentUser.role)}>
                    {currentUser.role.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ID: {currentUser.id}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Available Actions */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-4">Available Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {actions.map(action => {
                const isAvailable = action.availableFor.includes(currentUser.role)
                const IconComponent = action.icon

                return (
                  <div
                    key={action.id}
                    className={`border rounded-lg p-3 ${
                      isAvailable ? action.color : 'bg-muted/50 text-gray-400 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium text-sm">{action.label}</span>
                      </div>
                      <Button
                        onClick={() => handleUserAction(action.id, { postId: 'post_123' })}
                        disabled={!isAvailable}
                        size="sm"
                        variant="outline"
                        className="bg-card text-xs h-6"
                      >
                        Execute
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {action.description}
                    </div>
                    <div className="text-xs">
                      <strong>Available to:</strong> {action.availableFor.join(', ')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action History */}
          {actionHistory.length > 0 && (
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-medium mb-4">Recent Actions & Revalidations</h4>
              <div className="space-y-3">
                {actionHistory.map((entry, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {entry.action.replace('-', ' ')}
                        </Badge>
                        <Badge className={getRoleColor(entry.userRole)}>
                          {entry.userRole}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                    </div>
                    
                    <div className="text-sm">
                      <strong>Revalidated {entry.revalidated.length} endpoints:</strong>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        {entry.revalidated.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revalidation Logic */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Conditional Revalidation Logic</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-card rounded p-3">
                <strong className="text-secondary">Base Revalidation (All Users):</strong>
                <div className="text-muted-foreground mt-1">
                  • Always revalidate user's own data: `/api/users/{currentUser.id}`
                </div>
              </div>
              
              <div className="bg-card rounded p-3">
                <strong className="text-secondary-foreground">Role-Based Revalidation:</strong>
                <div className="text-muted-foreground mt-1">
                  • <strong>Admin:</strong> All analytics, reports, system stats<br/>
                  • <strong>Moderator:</strong> Moderation queues, flagged content<br/>
                  • <strong>User:</strong> Personal data only
                </div>
              </div>
              
              <div className="bg-card rounded p-3">
                <strong className="text-secondary">Action-Based Revalidation:</strong>
                <div className="text-muted-foreground mt-1">
                  • Different actions trigger different endpoint combinations<br/>
                  • Content creation → posts, recent, user posts<br/>
                  • Moderation → moderation queues, analytics
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-warn-soft/10 p-3 rounded">
            <strong>Conditional Revalidation Demo:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Change user role to see different available actions</li>
              <li>Execute actions to see role and action-specific revalidation</li>
              <li>Admins get more revalidations, users get minimal revalidations</li>
              <li>Each role/action combination triggers different endpoint sets</li>
              <li>This pattern optimizes performance by only refreshing relevant data</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}