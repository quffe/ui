"use client"

import { useState } from "react"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function FormValidationExample() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useStateChangeEffect(() => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
  }, [formData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      Object.keys(errors).length === 0 &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      alert("Form submitted successfully!")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Form Validation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "border-destructive" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              Object.keys(errors).length > 0 ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
          >
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
