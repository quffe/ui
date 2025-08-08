import { Select } from "@/components/form/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SelectDocs() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Select</h1>
        <p className="text-lg text-muted-foreground mb-4">
          A dropdown select component for choosing from multiple options.
        </p>
        <Badge variant="secondary">Form Component</Badge>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Installation</CardTitle>
          <CardDescription>Install the Select component via CLI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md">
            <code className="text-sm">npx shadcn@latest add https://ui-components.dev/select</code>
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
              {`import { Select } from "@/components/form/select"`}
            </code>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <pre className="text-sm">
{`<Select placeholder="Choose an option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Default</h3>
            <Select placeholder="Choose an option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">With Label</h3>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select id="country" placeholder="Select your country">
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </Select>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Disabled</h3>
            <Select placeholder="Disabled select" disabled>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-semibold">Prop</th>
                  <th className="text-left p-2 font-semibold">Type</th>
                  <th className="text-left p-2 font-semibold">Default</th>
                  <th className="text-left p-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">placeholder</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Placeholder text for empty state</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">disabled</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">Whether the select is disabled</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-sm">className</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
