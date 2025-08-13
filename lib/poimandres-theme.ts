// Poimandres theme for react-syntax-highlighter
// Based on https://github.com/olivercederborg/poimandres.nvim

export const poimandresTheme = {
  'code[class*="language-"]': {
    color: "#E4F0FB",
    background: "none",
    textShadow: "none",
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "14px",
    lineHeight: "1.5",
    direction: "ltr" as const,
    textAlign: "left" as const,
    whiteSpace: "pre" as const,
    wordSpacing: "normal",
    wordBreak: "normal" as const,
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none" as const,
  },
  'pre[class*="language-"]': {
    color: "#E4F0FB",
    background: "#1B1E28",
    textShadow: "none",
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "14px",
    lineHeight: "1.5",
    direction: "ltr" as const,
    textAlign: "left" as const,
    whiteSpace: "pre" as const,
    wordSpacing: "normal",
    wordBreak: "normal" as const,
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none" as const,
    padding: "1rem",
    margin: "0",
    overflow: "auto",
    borderRadius: "0.375rem",
  },
  // Comments
  comment: {
    color: "#506477", // blueGray3
    fontStyle: "italic",
  },
  prolog: {
    color: "#506477",
  },
  doctype: {
    color: "#506477",
  },
  cdata: {
    color: "#506477",
  },
  // Punctuation
  punctuation: {
    color: "#767C9D", // blueGray2
  },
  ".namespace": {
    opacity: 0.7,
  },
  // Strings
  string: {
    color: "#5FB3A1", // teal2
  },
  "attr-value": {
    color: "#5FB3A1",
  },
  // Keywords
  keyword: {
    color: "#91B4D5", // blue3
    fontWeight: "bold",
  },
  control: {
    color: "#91B4D5",
  },
  directive: {
    color: "#91B4D5",
  },
  unit: {
    color: "#91B4D5",
  },
  // Functions
  function: {
    color: "#5DE4C7", // teal1
  },
  "function-name": {
    color: "#5DE4C7",
  },
  // Variables and identifiers
  variable: {
    color: "#ADD7FF", // blue2
  },
  property: {
    color: "#A6ACCD", // blueGray1
  },
  "property-access": {
    color: "#A6ACCD",
  },
  // Types and classes
  "class-name": {
    color: "#89DDFF", // blue1
  },
  "type-definition": {
    color: "#89DDFF",
  },
  builtin: {
    color: "#89DDFF",
  },
  // Numbers and constants
  number: {
    color: "#ADD7FF", // blue2
  },
  boolean: {
    color: "#ADD7FF",
  },
  constant: {
    color: "#ADD7FF",
  },
  // Operators
  operator: {
    color: "#767C9D", // blueGray2
  },
  entity: {
    color: "#767C9D",
  },
  url: {
    color: "#767C9D",
  },
  // HTML/XML
  tag: {
    color: "#5FB3A1", // teal2
  },
  "attr-name": {
    color: "#ADD7FF", // blue2
  },
  selector: {
    color: "#5DE4C7", // teal1
  },
  // Special
  inserted: {
    color: "#5DE4C7",
  },
  deleted: {
    color: "#D0679D",
  },
  changed: {
    color: "#FFFAC2",
  },
  regex: {
    color: "#5FB3A1", // teal2
  },
  important: {
    color: "#FFFAC2",
    fontWeight: "bold",
  },
  // JSX
  "attr-equals": {
    color: "#767C9D", // blueGray2
  },
  "template-punctuation": {
    color: "#767C9D",
  },
  "template-string": {
    color: "#5FB3A1", // teal2
  },
  // TypeScript specific
  "typescript-keyword": {
    color: "#91B4D5", // blue3
  },
  "typescript-type": {
    color: "#89DDFF", // blue1
  },
  // Import/Export
  import: {
    color: "#767C9D", // blueGray2 (based on your config)
  },
  export: {
    color: "#506477", // blueGray3 (based on your config)
  },
} as const
