import fs from "fs"
import path from "path"

export function getExampleCode(file: string) {
  const filePath = path.join(process.cwd(), "examples", file)
  return fs.readFileSync(filePath, "utf8")
}
