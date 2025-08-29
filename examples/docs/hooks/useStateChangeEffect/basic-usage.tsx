"use client"

import { useState } from "react"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BasicUsageExample() {
  const [data, setData] = useState("")
  const [filters, setFilters] = useState({})
  const [sortOrder, setSortOrder] = useState("asc")
  const [processed, setProcessed] = useState<string>("")

  useStateChangeEffect(() => {
    // This runs whenever data, filters, or sortOrder changes
    const processResult = `Processed data with ${Object.keys(filters).length} filters, sorted ${sortOrder}`
    setProcessed(processResult)
    console.log("Data processed:", { data, filters, sortOrder })
  }, [data, filters, sortOrder])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Basic Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data">Data</Label>
          <Input
            id="data"
            placeholder="Enter some data..."
            value={data}
            onChange={e => setData(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={() => setFilters({ category: "active", status: "enabled" })}>
            Add Filters
          </Button>
          <Button size="sm" variant="outline" onClick={() => setFilters({})}>
            Clear Filters
          </Button>
        </div>

        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm">
            <strong>Result:</strong> {processed || "No processing yet"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
