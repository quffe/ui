"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PreviewTabs } from "@/components/ui/preview-tabs"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Component examples
import { DataTable } from "@/components/Data/DataTable"
import { InputAmount } from "@/components/Input/InputAmount"
import { OtpInput } from "@/components/Input/OtpInput"
import { DateRangePicker } from "@/components/Input/DateRangePicker"
import { Modal } from "@/components/Modal/Modal"
import { Dropdown } from "@/components/Navigation/Dropdown"
import { InputSelect } from "@/components/Navigation/Select"

// Modal Preview Component
function ModalPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <Button onClick={() => setIsOpen(true)}>
          Open Demo Modal
        </Button>
        <div className="text-xs text-muted-foreground">
          Click to see modal with all features
        </div>
      </div>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Demo Modal"
        description="This is a live preview of the Modal component"
        size="lg"
        position="center"
      >
        <div className="space-y-4">
          <p>This modal demonstrates the component working in the preview!</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// Advanced Modal Preview Component
function AdvancedModalPreview() {
  const [basicModal, setBasicModal] = useState(false)
  const [largeModal, setLargeModal] = useState(false)
  const [restrictedModal, setRestrictedModal] = useState(false)

  return (
    <div className="space-y-4">
      {/* Basic Modal */}
      <Button onClick={() => setBasicModal(true)}>
        Basic Modal
      </Button>
      <Modal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        title="Basic Modal"
        description="A simple modal with default settings"
      >
        <div className="space-y-4">
          <p>This is a basic modal with all default behaviors enabled.</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setBasicModal(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      {/* Large Modal */}
      <Button onClick={() => setLargeModal(true)} variant="outline">
        Large Modal
      </Button>
      <Modal
        open={largeModal}
        onClose={() => setLargeModal(false)}
        title="Large Modal"
        description="A large modal with custom content"
        size="2xl"
        position="top"
      >
        <div className="space-y-4">
          <p>This is a large modal positioned at the top.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLargeModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setLargeModal(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Restricted Modal */}
      <Button onClick={() => setRestrictedModal(true)} variant="destructive">
        Restricted Modal
      </Button>
      <Modal
        open={restrictedModal}
        onClose={() => setRestrictedModal(false)}
        title="Restricted Modal"
        description="No close button, outside click, or ESC key closing"
        showCloseButton={false}
        closeOnOutsideClick={false}
        closeOnEsc={false}
      >
        <div className="space-y-4">
          <p>This modal can only be closed using the button below.</p>
          <div className="flex justify-center">
            <Button onClick={() => setRestrictedModal(false)}>
              Close Modal (Only Way)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// Advanced DataTable Preview Component
function AdvancedDataTablePreview() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-01-10" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active", lastLogin: "2024-01-16" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", lastLogin: "2024-01-13" },
  ]

  const columns = [
    { accessorKey: "name", header: "Name", enableSorting: true },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role", enableSorting: true },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "lastLogin", header: "Last Login", enableSorting: true },
  ]

  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row)
  }

  const handlePaginationChange = ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    setPageIndex(pageIndex)
    setPageSize(pageSize)
    console.log("Pagination changed:", { pageIndex, pageSize })
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={handleRowClick}
      singleAction={true}
      pageSize={pageSize}
      pageIndex={pageIndex}
      totalCount={data.length}
      onPaginationChange={handlePaginationChange}
    />
  )
}

const components = [
  {
    name: "data-table",
    title: "DataTable",
    description: "A powerful data table with sorting, filtering, and pagination",
    category: "Data",
    preview: (
      <DataTable
        data={[
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-01-10" },
          { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active", lastLogin: "2024-01-16" },
          { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", lastLogin: "2024-01-13" },
        ]}
        columns={[
          { accessorKey: "name", header: "Name", enableSorting: true },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "role", header: "Role", enableSorting: true },
          { accessorKey: "status", header: "Status" },
          { accessorKey: "lastLogin", header: "Last Login", enableSorting: true },
        ]}
        onRowClick={(row) => console.log("Row clicked:", row)}
        singleAction={true}
        pageSize={3}
        pageIndex={1}
        totalCount={5}
        onPaginationChange={(pagination) => console.log("Pagination changed:", pagination)}
      />
    ),
    code: `import { DataTable } from "@/components/Data/DataTable"

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-01-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active", lastLogin: "2024-01-16" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", lastLogin: "2024-01-13" },
]

const columns = [
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", enableSorting: true },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "lastLogin", header: "Last Login", enableSorting: true },
]

export function Example() {
  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={(row) => console.log("Row clicked:", row)}
      singleAction={true}
      pageSize={3}
      pageIndex={1}
      totalCount={5}
      onPaginationChange={(pagination) => console.log("Pagination changed:", pagination)}
    />
  )
}`,
    advancedCode: `import { DataTable } from "@/components/Data/DataTable"
import { useState } from "react"

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "2024-01-14" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-01-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active", lastLogin: "2024-01-16" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Active", lastLogin: "2024-01-13" },
]

const columns = [
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", enableSorting: true },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "lastLogin", header: "Last Login", enableSorting: true },
]

export function AdvancedExample() {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  const handleRowClick = (row) => {
    console.log("Row clicked:", row)
    // Handle row click action
  }

  const handlePaginationChange = ({ pageIndex, pageSize }) => {
    setPageIndex(pageIndex)
    setPageSize(pageSize)
    console.log("Pagination changed:", { pageIndex, pageSize })
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={handleRowClick}
      singleAction={true}
      pageSize={pageSize}
      pageIndex={pageIndex}
      totalCount={data.length}
      onPaginationChange={handlePaginationChange}
    />
  )
}`,
    docUrl: "/docs/data-table",
  },
  {
    name: "input-amount",
    title: "InputAmount",
    description: "Specialized input for monetary amounts with currency support",
    category: "Input",
    preview: <InputAmount value={null} onChange={() => { }} placeholder="Enter amount" currency="USD" />,
    code: `import { InputAmount } from "@/components/form/InputAmount"

export function Example() {
  const [value, setValue] = useState(null)
  
  return (
    <InputAmount 
      value={value}
      onChange={setValue}
      placeholder="Enter amount" 
      currency="USD" 
    />
  )
}`,
    docUrl: "/docs/input-amount",
  },
  {
    name: "otp-input",
    title: "OtpInput",
    description: "One-time password input with multiple fields",
    category: "Input",
    preview: <OtpInput value="" onChange={() => { }} length={6} onComplete={value => console.log(value)} />,
    code: `import { OtpInput } from "@/components/form/OtpInput"

export function Example() {
  const [value, setValue] = useState("")
  
  return (
    <OtpInput 
      value={value}
      onChange={setValue}
      length={6} 
      onComplete={(value) => console.log(value)} 
    />
  )
}`,
    docUrl: "/docs/otp-input",
  },
  {
    name: "date-range-picker",
    title: "DateRangePicker",
    description: "Date range picker with presets and dual calendar view",
    category: "Input",
    preview: <DateRangePicker onChange={range => console.log(range)} />,
    code: `import { DateRangePicker } from "@/components/DateRangePicker"

  export function Example() {
    return (
      <DateRangePicker 
        onChange={(range) => console.log(range)} 
      />
    )
  }`,
    docUrl: "/docs/date-range-picker",
  },
  {
    name: "modal",
    title: "Modal",
    description: "Flexible modal component with customizable sizing and positioning",
    category: "Modal",
    preview: <ModalPreview />,
    code: `import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <Button onClick={() => setIsOpen(true)}>
          Open Demo Modal
        </Button>
        <div className="text-xs text-muted-foreground">
          Click to see modal with all features
        </div>
      </div>
      
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Demo Modal"
        description="This is a live preview of the Modal component"
        size="lg"
        position="center"
      >
        <div className="space-y-4">
          <p>This modal demonstrates the component working in the preview!</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}`,
    docUrl: "/docs/modal",
    advancedCode: `import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AdvancedExample() {
  const [basicModal, setBasicModal] = useState(false)
  const [largeModal, setLargeModal] = useState(false)
  const [restrictedModal, setRestrictedModal] = useState(false)

  return (
    <div className="space-y-4">
      {/* Basic Modal */}
      <Button onClick={() => setBasicModal(true)}>
        Basic Modal
      </Button>
      <Modal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        title="Basic Modal"
        description="A simple modal with default settings"
      >
        <div className="space-y-4">
          <p>This is a basic modal with all default behaviors enabled.</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setBasicModal(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      {/* Large Modal */}
      <Button onClick={() => setLargeModal(true)} variant="outline">
        Large Modal
      </Button>
      <Modal
        open={largeModal}
        onClose={() => setLargeModal(false)}
        title="Large Modal"
        description="A large modal with custom content"
        size="2xl"
        position="top"
      >
        <div className="space-y-4">
          <p>This is a large modal positioned at the top.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLargeModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setLargeModal(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Restricted Modal */}
      <Button onClick={() => setRestrictedModal(true)} variant="destructive">
        Restricted Modal
      </Button>
      <Modal
        open={restrictedModal}
        onClose={() => setRestrictedModal(false)}
        title="Restricted Modal"
        description="No close button, outside click, or ESC key closing"
        showCloseButton={false}
        closeOnOutsideClick={false}
        closeOnEsc={false}
      >
        <div className="space-y-4">
          <p>This modal can only be closed using the button below.</p>
          <div className="flex justify-center">
            <Button onClick={() => setRestrictedModal(false)}>
              Close Modal (Only Way)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}`,
  },
  {
    name: "dropdown",
    title: "Dropdown",
    description: "Searchable dropdown component with keyboard navigation",
    category: "Input",
    preview: (
      <Dropdown
        value="option2"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3", disabled: true },
        ]}
        onChange={(value) => console.log("Selected:", value)}
        placeholder="Choose an option..."
        searchable={true}
      />
    ),
    code: `import { Dropdown } from "@/components/Navigation/Dropdown"
import { useState } from "react"

export function Example() {
  const [basicValue, setBasicValue] = useState<string>("")
  const [searchableValue, setSearchableValue] = useState<string>("framework-react")
  const [disabledValue, setDisabledValue] = useState<string>("")

  const basicOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
  ]

  const frameworkOptions = [
    { value: "framework-react", label: "React" },
    { value: "framework-vue", label: "Vue.js" },
    { value: "framework-angular", label: "Angular" },
    { value: "framework-svelte", label: "Svelte", disabled: true },
    { value: "framework-nextjs", label: "Next.js" },
    { value: "framework-nuxt", label: "Nuxt.js" },
  ]

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive", disabled: true },
    { value: "pending", label: "Pending" },
  ]

  return (
    <div className="space-y-6">
      {/* Basic Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Basic Dropdown</label>
        <Dropdown
          value={basicValue}
          options={basicOptions}
          onChange={setBasicValue}
          placeholder="Select a fruit..."
          searchable={false}
        />
        <p className="text-xs text-muted-foreground">
          Selected: {basicValue || "None"}
        </p>
      </div>

      {/* Searchable Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Searchable Dropdown</label>
        <Dropdown
          value={searchableValue}
          options={frameworkOptions}
          onChange={setSearchableValue}
          placeholder="Search frameworks..."
          searchable={true}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Selected: {searchableValue}
        </p>
      </div>

      {/* Disabled Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled Dropdown</label>
        <Dropdown
          value={disabledValue}
          options={statusOptions}
          onChange={setDisabledValue}
          placeholder="This dropdown is disabled"
          disabled={true}
          searchable={false}
        />
      </div>

      {/* Custom Styling */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Styled Dropdown</label>
        <Dropdown
          value={basicValue}
          options={basicOptions}
          onChange={setBasicValue}
          placeholder="Custom styling..."
          searchable={true}
          className="w-64 border-2 border-primary"
        />
      </div>
    </div>
  )
}

`,
    docUrl: "/docs/dropdown",
  },
  {
    name: "input-select",
    title: "InputSelect",
    description: "Form-ready select component with label, error handling, and size variants",
    category: "Input",
    preview: (
      <InputSelect
        options={[
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ]}
        value="md"
        onChange={() => {}}
        label="Size"
        placeholder="Choose size..."
      />
    ),
    code: `import { InputSelect } from "@/components/Navigation/Select"
import { useState } from "react"

interface User {
  id: number
  name: string
  email: string
}

export function Example() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("medium")
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ]

  const userOptions = users.map(user => ({
    label: \`\${user.name} (\${user.email})\`,
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
        labelClassName="text-primary font-bold"
        onOpenChange={(open) => console.log("Select opened:", open)}
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
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

`,
    docUrl: "/docs/input-select",
  },
]

export default function ComponentsPage() {
  const groupedComponents = components.reduce(
    (acc, component) => {
      const category = component.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(component)
      return acc
    },
    {} as Record<string, typeof components>
  )

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">All Components</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Browse and preview all available UI components. Each component includes live examples
              and source code.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{components.length} Components</Badge>
              <Badge variant="outline">Live Preview</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl font-bold text-primary">{category} Components</h2>
                  <Badge variant="outline">{categoryComponents.length} components</Badge>
                </div>

                <div className="space-y-8">
                  {categoryComponents.map(component => (
                    <Card key={component.name} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="flex gap-2 items-end text-2xl mb-2">
                              {component.title}
                              <Badge variant="secondary" className="text-sm">
                                {category}
                              </Badge>

                            </CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                              {component.description}
                            </CardDescription>
                          </div>
                          <Link href={component.docUrl}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Docs
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          <PreviewTabs
                            title="Basic Example"
                            preview={component.preview}
                            code={component.code}
                          />
                          {component.advancedCode && (
                            <PreviewTabs
                              title={
                                component.name === "modal" ? "Multiple Modal Types with Different Configurations" :
                                component.name === "data-table" ? "State Management with Dynamic Pagination" :
                                "Advanced Usage"
                              }
                              preview={
                                component.name === "modal" ? <AdvancedModalPreview /> :
                                component.name === "data-table" ? <AdvancedDataTablePreview /> :
                                <div className="text-center p-4 text-muted-foreground">Advanced functionality - see code example</div>
                              }
                              code={component.advancedCode}
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-16">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Ready to use these components in your project?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📋</div>
                  <div className="font-semibold mb-2">Copy & Paste</div>
                  <div className="text-sm text-muted-foreground">
                    Copy the code from any example and paste it into your project
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">📚</div>
                  <div className="font-semibold mb-2">View Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Click &quot;View Docs&quot; for detailed API reference and more examples
                  </div>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-3xl mb-4">🎨</div>
                  <div className="font-semibold mb-2">Customize</div>
                  <div className="text-sm text-muted-foreground">
                    All components are built with Tailwind CSS and fully customizable
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
