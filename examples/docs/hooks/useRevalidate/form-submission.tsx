"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import useRevalidate from "@/hooks/useRevalidate"

export default function FormSubmissionExample() {
  const [userForm, setUserForm] = useState({ name: "", email: "" })
  const [postForm, setPostForm] = useState({ title: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissions, setSubmissions] = useState<
    Array<{
      type: "User Created" | "Post Created"
      data: { name?: string; email?: string; title?: string; content?: string }
      timestamp: string
      revalidated: string[]
    }>
  >([])
  const { revalidate } = useRevalidate()

  const simulateApiCall = (
    endpoint: string,
    data: { name?: string; email?: string; title?: string; content?: string }
  ): Promise<Record<string, unknown>> => {
    return new Promise(resolve => {
      setTimeout(
        () => {
          resolve({ id: Date.now(), ...data, created_at: new Date().toISOString() })
        },
        1000 + Math.random() * 1000
      ) // 1-2 second delay
    })
  }

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userForm.name || !userForm.email) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await simulateApiCall("/api/users", userForm)

      // Revalidate related data after successful submission
      const revalidatedUrls = [
        "/api/users", // User list
        "/api/users/stats", // User statistics
        "/api/dashboard", // Dashboard data that includes user count
      ]

      revalidate(revalidatedUrls)

      // Track submission
      setSubmissions(prev => [
        ...prev.slice(-4), // Keep last 4
        {
          type: "User Created",
          data: userForm,
          timestamp: new Date().toLocaleTimeString(),
          revalidated: revalidatedUrls,
        },
      ])

      setUserForm({ name: "", email: "" })
    } catch (error) {
      console.error("Failed to create user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postForm.title || !postForm.content) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await simulateApiCall("/api/posts", postForm)

      // Revalidate related data after successful submission
      const revalidatedUrls = [
        "/api/posts", // Post list
        "/api/posts/recent", // Recent posts
        "/api/dashboard", // Dashboard statistics
        "/api/analytics/content", // Content analytics
      ]

      revalidate(revalidatedUrls)

      // Track submission
      setSubmissions(prev => [
        ...prev.slice(-4), // Keep last 4
        {
          type: "Post Created",
          data: postForm,
          timestamp: new Date().toLocaleTimeString(),
          revalidated: revalidatedUrls,
        },
      ])

      setPostForm({ title: "", content: "" })
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Form Submission with Revalidation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* User Form */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Create New User</h3>
            <form onSubmit={handleUserSubmit} className="space-y-3">
              <div>
                <Label htmlFor="user-name" className="text-sm">
                  Name
                </Label>
                <Input
                  id="user-name"
                  value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="Enter user name"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div>
                <Label htmlFor="user-email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userForm.email}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="Enter user email"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !userForm.name || !userForm.email}
                size="sm"
                className="w-full"
              >
                {isSubmitting ? "Creating User..." : "Create User"}
              </Button>
            </form>
            <div className="text-xs text-muted-foreground mt-2">
              Will revalidate: users list, user stats, dashboard
            </div>
          </div>

          {/* Post Form */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Create New Post</h3>
            <form onSubmit={handlePostSubmit} className="space-y-3">
              <div>
                <Label htmlFor="post-title" className="text-sm">
                  Title
                </Label>
                <Input
                  id="post-title"
                  value={postForm.title}
                  onChange={e => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="Enter post title"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div>
                <Label htmlFor="post-content" className="text-sm">
                  Content
                </Label>
                <Textarea
                  id="post-content"
                  value={postForm.content}
                  onChange={e => setPostForm({ ...postForm, content: e.target.value })}
                  placeholder="Enter post content"
                  disabled={isSubmitting}
                  required
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !postForm.title || !postForm.content}
                size="sm"
                className="w-full"
              >
                {isSubmitting ? "Creating Post..." : "Create Post"}
              </Button>
            </form>
            <div className="text-xs text-muted-foreground mt-2">
              Will revalidate: posts list, recent posts, dashboard, content analytics
            </div>
          </div>

          {/* Submission History */}
          {submissions.length > 0 && (
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-medium mb-3">Recent Submissions</h4>
              <div className="space-y-3">
                {submissions.map((submission, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">{submission.type}</div>
                      <div className="text-xs text-muted-foreground">{submission.timestamp}</div>
                    </div>

                    <div className="text-sm mb-2">
                      {submission.type === "User Created" ? (
                        <div>
                          <strong>Name:</strong> {submission.data.name}
                          <br />
                          <strong>Email:</strong> {submission.data.email}
                        </div>
                      ) : (
                        <div>
                          <strong>Title:</strong> {submission.data.title}
                          <br />
                          <strong>Content:</strong>{" "}
                          {submission.data.content?.substring(0, 50) || ""}...
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <strong>Revalidated:</strong> {submission.revalidated.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revalidation Flow Explanation */}
          <div className="bg-warn-soft/10 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Revalidation Flow</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary/100 text-white rounded-full flex items-center justify-center text-xs">
                  1
                </div>
                <span>User submits form with new data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-900/100 text-white rounded-full flex items-center justify-center text-xs">
                  2
                </div>
                <span>API call is made to create/update resource</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-900/100 text-white rounded-full flex items-center justify-center text-xs">
                  3
                </div>
                <span>On success, related SWR cache entries are revalidated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-900/100 text-white rounded-full flex items-center justify-center text-xs">
                  4
                </div>
                <span>UI components using those URLs automatically update</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>Form Submission Demo:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Fill out either form and submit to simulate API calls</li>
              <li>Each submission triggers revalidation of related endpoints</li>
              <li>Different forms revalidate different sets of URLs based on their impact</li>
              <li>This ensures all related data stays fresh after mutations</li>
              <li>Forms are disabled during submission to prevent duplicate requests</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
