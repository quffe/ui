const fs = require("fs")
const path = require("path")

// Component mapping: folder name -> component name for CLI
const componentMap = {
  "input-amount": "input-amount",
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

  // Skip if already has InstallationTabs import
  if (content.includes("InstallationTabs")) {
    console.log(`Skipping ${filePath} - already updated`)
    return
  }

  // Replace InstallCommand import with InstallationTabs
  content = content.replace(
    /import { InstallCommand } from "@\/components\/InstallCommand"/,
    'import { InstallationTabs } from "@/components/InstallationTabs"'
  )

  // Replace the installation section content
  const installationContentPattern =
    /(InstallCommand componentName="[^"]*" \/>\s*<div className="mt-4 pt-4 border-t">\s*<p className="text-sm text-muted-foreground mb-2">Then import the component:<\/p>\s*<div className="bg-muted p-4 rounded-md">\s*<code className="text-sm">import[^<]*<\/code>\s*<\/div>\s*<\/div>)/s

  const newInstallationContent = `InstallationTabs componentName="${componentName}" />`

  if (installationContentPattern.test(content)) {
    content = content.replace(installationContentPattern, newInstallationContent)

    fs.writeFileSync(filePath, content, "utf8")
    console.log(`✅ Updated ${filePath}`)
  } else {
    console.log(`⚠️  Could not find installation content pattern in ${filePath}`)
  }
}

// Main execution
console.log("🚀 Updating documentation files to use InstallationTabs...\n")

Object.entries(componentMap).forEach(([folder, componentName]) => {
  const filePath = path.join(__dirname, "../app/docs", folder, "page.tsx")
  updateDocFile(filePath, componentName)
})

console.log("\n✨ Documentation update complete!")
