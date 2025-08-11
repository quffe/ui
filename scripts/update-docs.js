const fs = require("fs")
const path = require("path")

// Component mapping: folder name -> component name for CLI
const componentMap = {
  "otp-input": "otp-input",
  "date-range-picker": "date-range-picker",
  modal: "modal",
  dropdown: "dropdown",
  "input-select": "input-select",
  "select-dropdown": "select-dropdown",
  "app-sidebar": "app-sidebar",
}

// Function to update a documentation file
function updateDocFile(filePath, componentName) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filePath} - file not found`)
    return
  }

  let content = fs.readFileSync(filePath, "utf8")

  // Skip if already has InstallCommand import
  if (content.includes("InstallCommand")) {
    console.log(`Skipping ${filePath} - already updated`)
    return
  }

  // Add InstallCommand import
  content = content.replace(
    /(import\s+{[^}]+}\s+from\s+"@\/components\/ui\/breadcrumb")/,
    '$1\nimport { InstallCommand } from "@/components/InstallCommand"'
  )

  // Replace Installation section
  const installationPattern =
    /(<Card className="mb-8">\s*<CardHeader>\s*<CardTitle>Installation<\/CardTitle>\s*<CardDescription>[^<]*<\/CardDescription>\s*<\/CardHeader>\s*<CardContent>\s*<div className="bg-muted p-4 rounded-md">\s*<code className="text-sm">import[^<]*<\/code>\s*<\/div>\s*<\/CardContent>\s*<\/Card>)/s

  const newInstallationSection = `<Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the component using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallCommand componentName="${componentName}" />
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Then import the component:</p>
                <div className="bg-muted p-4 rounded-md">
                  <code className="text-sm">import {${getImportName(componentName)}} from "@/components/ui/${componentName}"</code>
                </div>
              </div>
            </CardContent>
          </Card>`

  if (installationPattern.test(content)) {
    content = content.replace(installationPattern, newInstallationSection)

    fs.writeFileSync(filePath, content, "utf8")
    console.log(`✅ Updated ${filePath}`)
  } else {
    console.log(`⚠️  Could not find installation section in ${filePath}`)
  }
}

function getImportName(componentName) {
  const nameMap = {
    "otp-input": "`{ OtpInput }`",
    "date-range-picker": "`{ DateRangePicker }`",
    modal: "`{ Modal }`",
    dropdown: "`{ Dropdown }`",
    "input-select": "`{ InputSelect }`",
    "select-dropdown": "`{ SelectDropdown }`",
    "app-sidebar": "`{ AppSidebar }`",
  }
  return nameMap[componentName] || `\`{ ${componentName} }\``
}

// Main execution
console.log("🚀 Updating documentation files...\n")

Object.entries(componentMap).forEach(([folder, componentName]) => {
  const filePath = path.join(__dirname, "../app/docs", folder, "page.tsx")
  updateDocFile(filePath, componentName)
})

console.log("\n✨ Documentation update complete!")
