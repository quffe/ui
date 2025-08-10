'use client'

import { InputAmount } from "@/components/Input/InputAmount"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { useState } from "react"

export default function InputAmountDocs() {
  const [amount, setAmount] = useState<number | null>(null)
  const [currencyAmount, setCurrencyAmount] = useState<number | null>(1000)

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
              <BreadcrumbPage>InputAmount</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">InputAmount</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A specialized input component for entering monetary amounts with automatic formatting, validation, and currency symbol support.
            </p>
            <Badge variant="secondary">Input Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Import the InputAmount component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm">import {`{ InputAmount }`} from "@/components/Input"</code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { InputAmount } from "@/components/Input/InputAmount"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<InputAmount
  value={amount}
  onChange={setAmount}
  label="Enter amount"
  placeholder="0.00"
/>`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Basic Amount Input</h3>
                <InputAmount
                  value={amount}
                  onChange={setAmount}
                  label="Amount"
                  placeholder="0.00"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Current value: {amount?.toString() || 'null'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">With Currency Symbol</h3>
                <InputAmount
                  value={currencyAmount}
                  onChange={setCurrencyAmount}
                  label="Price"
                  placeholder="0.00"
                  showCurrency
                  currency="$"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Current value: {currencyAmount?.toString() || 'null'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">With Error State</h3>
                <InputAmount
                  value={null}
                  onChange={() => {}}
                  label="Budget"
                  placeholder="0.00"
                  error="Amount is required"
                  showCurrency
                  currency="€"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">number | null</td>
                      <td className="p-2">null</td>
                      <td className="p-2">Current numeric value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: number | null) => void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback fired when value changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">label</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Optional label for the input</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">"0.00"</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxDecimals</td>
                      <td className="p-2">number</td>
                      <td className="p-2">2</td>
                      <td className="p-2">Maximum decimal places allowed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">showCurrency</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether to show currency symbol</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">currency</td>
                      <td className="p-2">string</td>
                      <td className="p-2">"$"</td>
                      <td className="p-2">Currency symbol to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Error message to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether the input is disabled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}