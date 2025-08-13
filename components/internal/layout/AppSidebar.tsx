"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  FileText,
  Home,
  Download,
  Type,
  Lock,
  AlignLeft,
  ChevronDown,
  CheckSquare,
  Circle,
  Upload,
  Search,
  Table,
  DollarSign,
  Hash,
  Calendar,
  SquareStack,
  Menu,
  MousePointer,
  List,
  Copy,
  Timer,
  Database,
  Play,
  Monitor,
  Package,
  RefreshCw,
  Zap,
  Smartphone,
  BookOpen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"

const components = [
  // Data Components
  {
    title: "DataTable",
    url: "/docs/data-table",
    icon: Table,
    description: "Powerful data table with sorting and pagination",
    category: "Data & Display",
  },
  // Advanced Input Components
  {
    title: "InputAmount",
    url: "/docs/input-amount",
    icon: DollarSign,
    description: "Specialized input for monetary amounts",
    category: "Advanced Inputs",
  },
  {
    title: "OtpInput",
    url: "/docs/otp-input",
    icon: Hash,
    description: "One-time password input with multiple fields",
    category: "Advanced Inputs",
  },
  {
    title: "DateRangePicker",
    url: "/docs/date-range-picker",
    icon: Calendar,
    description: "Date range picker with presets",
    category: "Advanced Inputs",
  },
  // Modal Components
  {
    title: "Modal",
    url: "/docs/modal",
    icon: SquareStack,
    description: "Flexible modal component with customizable sizing",
    category: "Overlays & Modals",
  },
  // Navigation Components
  {
    title: "Dropdown",
    url: "/docs/dropdown",
    icon: ChevronDown,
    description: "Searchable dropdown with Command and Popover",
    category: "Layout & Navigation",
  },
  {
    title: "InputSelect",
    url: "/docs/input-select",
    icon: List,
    description: "Type-safe select input with labels and validation",
    category: "Layout & Navigation",
  },
  {
    title: "SelectDropdown",
    url: "/docs/select-dropdown",
    icon: MousePointer,
    description: "Custom dropdown with keyboard navigation",
    category: "Layout & Navigation",
  },
  // Form Components
  {
    title: "Input",
    url: "/docs/input",
    icon: Type,
    description: "Basic text input field",
    category: "Form Controls",
  },
  {
    title: "Password Input",
    url: "/docs/password-input",
    icon: Lock,
    description: "Password input with toggle",
    category: "Form Controls",
  },
  {
    title: "Textarea",
    url: "/docs/textarea",
    icon: AlignLeft,
    description: "Multi-line text input",
    category: "Form Controls",
  },
  {
    title: "Select",
    url: "/docs/select",
    icon: ChevronDown,
    description: "Dropdown select component",
    category: "Form Controls",
  },
  {
    title: "Checkbox",
    url: "/docs/checkbox",
    icon: CheckSquare,
    description: "Checkbox with label",
    category: "Form Controls",
  },
  {
    title: "Radio Group",
    url: "/docs/radio-group",
    icon: Circle,
    description: "Radio button group",
    category: "Form Controls",
  },
  {
    title: "File Input",
    url: "/docs/file-input",
    icon: Upload,
    description: "File upload component",
    category: "Form Controls",
  },
]

const hooks = [
  // Device & Layout Hooks
  {
    title: "useMobile",
    url: "/docs/hooks/use-mobile",
    icon: Smartphone,
    description: "Responsive viewport detection with SSR support",
    category: "Device & Layout",
  },
  {
    title: "useOnWindowResize",
    url: "/docs/hooks/useOnWindowResize",
    icon: Monitor,
    description: "Window resize event handling",
    category: "Device & Layout",
  },
  // State Management Hooks
  {
    title: "useLocalStorage",
    url: "/docs/hooks/useLocalStorage",
    icon: Database,
    description: "Persistent localStorage state management",
    category: "State Management",
  },
  {
    title: "useStateChangeEffect",
    url: "/docs/hooks/useStateChangeEffect",
    icon: Zap,
    description: "Effect triggered by state changes",
    category: "State Management",
  },
  // Utility Hooks
  {
    title: "useCopyToClipboard",
    url: "/docs/hooks/use-copy-to-clipboard",
    icon: Copy,
    description: "Advanced clipboard operations",
    category: "Utilities",
  },
  {
    title: "useCountdown",
    url: "/docs/hooks/useCountdown",
    icon: Timer,
    description: "Countdown timers with loop support",
    category: "Utilities",
  },
  {
    title: "useOnMountEffect",
    url: "/docs/hooks/useOnMountEffect",
    icon: Play,
    description: "Mount-only effect execution",
    category: "Utilities",
  },
  {
    title: "useRevalidate",
    url: "/docs/hooks/useRevalidate",
    icon: RefreshCw,
    description: "SWR cache revalidation helper",
    category: "Utilities",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredComponents = components.filter(
    component =>
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredHooks = hooks.filter(
    hook =>
      hook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hook.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group components by category
  const groupedComponents = filteredComponents.reduce(
    (acc, component) => {
      const category = component.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(component)
      return acc
    },
    {} as Record<string, typeof components>
  )

  // Group hooks by category
  const groupedHooks = filteredHooks.reduce(
    (acc, hook) => {
      const category = hook.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(hook)
      return acc
    },
    {} as Record<string, typeof hooks>
  )

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <FileText className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">UI Components</span>
            <span className="text-xs">Documentation</span>
          </div>
        </div>

        <form className="px-2">
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search components
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search components & hooks..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="size-4" />
                    <span>Introduction</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/installation"}>
                  <Link href="/installation">
                    <Download className="size-4" />
                    <span>Installation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/components"}>
                  <Link href="/components">
                    <SquareStack className="size-4" />
                    <span>All Components</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/hooks"}>
                  <Link href="/hooks">
                    <BookOpen className="size-4" />
                    <span>React Hooks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categoryComponents.map(component => (
                  <SidebarMenuItem key={component.title}>
                    <SidebarMenuButton asChild isActive={pathname === component.url}>
                      <Link href={component.url}>
                        <component.icon className="size-4" />
                        <span>{component.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {Object.entries(groupedHooks).map(([category, categoryHooks]) => (
          <SidebarGroup key={`hooks-${category}`}>
            <SidebarGroupLabel>{category} Hooks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categoryHooks.map(hook => (
                  <SidebarMenuItem key={hook.title}>
                    <SidebarMenuButton asChild isActive={pathname === hook.url}>
                      <Link href={hook.url}>
                        <hook.icon className="size-4" />
                        <span>{hook.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {searchQuery && filteredComponents.length === 0 && filteredHooks.length === 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-2 py-4 text-sm text-muted-foreground">
                No components or hooks found for "{searchQuery}"
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
