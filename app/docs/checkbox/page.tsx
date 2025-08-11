import { Checkbox } from "@/components/Form/Checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CheckboxDocs() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Checkbox</h1>
        <p className="text-lg text-muted-foreground mb-4">
          A checkbox input component with optional label support.
        </p>
        <Badge variant="secondary">Form Component</Badge>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Installation</CardTitle>
          <CardDescription>Install the Checkbox component via CLI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md">
            <code className="text-sm">
              npx shadcn@latest add https://ui-components.dev/checkbox
            </code>
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
              {`import { Checkbox } from "@/components/Form/Checkbox"`}
            </code>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code className="text-sm">
              {`<Checkbox id="terms" label="Accept terms and conditions" />`}
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
            <h3 className="text-lg font-semibold mb-2">Default</h3>
            <Checkbox id="default" />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">With Label</h3>
            <Checkbox id="terms" label="I accept the terms and conditions" />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Multiple Options</h3>
            <div className="space-y-3">
              <Checkbox id="newsletter" label="Subscribe to newsletter" />
              <Checkbox id="updates" label="Receive product updates" />
              <Checkbox id="marketing" label="Marketing communications" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Disabled</h3>
            <div className="space-y-3">
              <Checkbox id="disabled1" label="Disabled unchecked" disabled />
              <Checkbox id="disabled2" label="Disabled checked" disabled defaultChecked />
            </div>
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
                  <td className="p-2 font-mono text-sm">label</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Label text for the checkbox</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">id</td>
                  <td className="p-2">string</td>
                  <td className="p-2">-</td>
                  <td className="p-2">Unique identifier for the checkbox</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-mono text-sm">disabled</td>
                  <td className="p-2">boolean</td>
                  <td className="p-2">false</td>
                  <td className="p-2">Whether the checkbox is disabled</td>
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
