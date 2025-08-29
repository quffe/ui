"use client"

import { InputSelect } from "@/components/Navigation/Select"
import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
}

export function Example() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>("medium")
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ]

  const userOptions = users.map(user => ({
    label: `${user.name} (${user.email})`,
    value: user.id,
  }))

  const sizeOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
    { label: "Extra Large", value: "xl", disabled: true },
  ]

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
  ]

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedUser) {
      newErrors.user = "Please select a user"
    }
    if (!selectedPriority) {
      newErrors.priority = "Priority is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", { selectedUser, selectedSize, selectedPriority })
    }
  }

  return (
    <div className="space-y-6 max-w-md">
      {/* Basic Select with Label */}
      <InputSelect
        options={userOptions}
        value={selectedUser}
        onChange={setSelectedUser}
        label="Assign to User"
        placeholder="Select a user..."
        error={errors.user}
        id="user-select"
        name="assignedUser"
      />

      {/* Different Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Size Variants</h4>

        <InputSelect
          options={sizeOptions}
          value={selectedSize}
          onChange={setSelectedSize}
          label="Small Size"
          size="sm"
          placeholder="Choose size..."
        />

        <InputSelect
          options={sizeOptions}
          value={selectedSize}
          onChange={setSelectedSize}
          label="Default Size"
          size="default"
          placeholder="Choose size..."
        />

        <InputSelect
          options={sizeOptions}
          value={selectedSize}
          onChange={setSelectedSize}
          label="Large Size"
          size="lg"
          placeholder="Choose size..."
        />
      </div>

      {/* Required Field with Error */}
      <InputSelect
        options={priorityOptions}
        value={selectedPriority}
        onChange={setSelectedPriority}
        label="Priority Level"
        placeholder="Select priority..."
        required={true}
        error={errors.priority}
        id="priority-select"
        name="priority"
      />

      {/* Disabled Select */}
      <InputSelect
        options={sizeOptions}
        value="large"
        onChange={() => {}}
        label="Disabled Select"
        placeholder="This is disabled"
        disabled={true}
      />

      {/* Custom Styling */}
      <InputSelect
        options={priorityOptions}
        value={selectedPriority}
        onChange={setSelectedPriority}
        label="Custom Styled"
        placeholder="Custom classes..."
        className="bg-muted/50"
        triggerClassName="border-2 border-primary"
        labelClassName="text-secondary font-bold"
        onOpenChange={open => console.log("Select opened:", open)}
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-6 px-4 py-2 bg-primary text-secondary-foreground rounded-md hover:bg-primary/90"
      >
        Submit Form
      </button>

      {/* Display Current Values */}
      <div className="p-4 bg-muted rounded-md text-sm">
        <h5 className="font-medium mb-2">Current Values:</h5>
        <div className="space-y-1 text-xs">
          <div>User: {selectedUser || "None"}</div>
          <div>Size: {selectedSize}</div>
          <div>Priority: {selectedPriority || "None"}</div>
        </div>
      </div>
    </div>
  )
}
