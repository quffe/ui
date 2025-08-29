"use client"

import { useState } from "react"
import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
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
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface SearchResult {
  id: number
  title: string
  category: string
  price: number
}

export default function SearchDebouncingExample() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({ category: "", priceRange: [0, 100] })
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  // Debounced search effect
  useStateChangeEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query, filters)
      } else {
        setResults([])
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [query, filters])

  const performSearch = async (searchQuery: string, searchFilters: typeof filters) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock search results
      const mockResults: SearchResult[] = [
        { id: 1, title: `${searchQuery} - Product A`, category: "electronics", price: 299 },
        { id: 2, title: `${searchQuery} - Product B`, category: "books", price: 25 },
        { id: 3, title: `${searchQuery} - Product C`, category: "clothing", price: 79 },
        { id: 4, title: `${searchQuery} - Product D`, category: "electronics", price: 450 },
        { id: 5, title: `${searchQuery} - Product E`, category: "books", price: 15 },
      ]
        .filter(item => !searchFilters.category || item.category === searchFilters.category)
        .filter(
          item =>
            item.price >= searchFilters.priceRange[0] && item.price <= searchFilters.priceRange[1]
        )

      setResults(mockResults)
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const renderResult = (result: SearchResult) => (
    <div key={result.id} className="p-3 border rounded-md space-y-1">
      <div className="font-medium">{result.title}</div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {result.category}
        </Badge>
        <span className="text-sm text-muted-foreground">${result.price}</span>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Search with Debouncing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={filters.category}
              onValueChange={value => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={filters.priceRange[0]}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    priceRange: [Number(e.target.value), prev.priceRange[1]],
                  }))
                }
                placeholder="Min"
                min="0"
                max="1000"
              />
              <Input
                type="number"
                value={filters.priceRange[1]}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], Number(e.target.value)],
                  }))
                }
                placeholder="Max"
                min="0"
                max="1000"
              />
            </div>
          </div>
        </div>

        <div className="min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Found {results.length} results for "{query}"
              </div>
              <div className="space-y-2">{results.map(renderResult)}</div>
            </div>
          ) : query.trim() ? (
            <div className="text-center text-muted-foreground py-8">
              No results found for "{query}"
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Start typing to search products
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
