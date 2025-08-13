// Poimandres color palette in OKLCH format
// Converted from hex values using OKLCH color space

export const poimandresColors = {
  // Base colors
  background1: "#1B1E28", // oklch(0.130 0.007 249.02)
  background2: "#171922", // oklch(0.114 0.008 249.02)
  background3: "#303340", // oklch(0.235 0.011 249.02)

  // Foreground colors
  text: "#E4F0FB", // oklch(0.936 0.010 235.76)
  white: "#FFFFFF", // oklch(1 0 0)

  // Blues
  blue1: "#89DDFF", // oklch(0.853 0.081 234.47)
  blue2: "#ADD7FF", // oklch(0.860 0.062 234.47)
  blue3: "#91B4D5", // oklch(0.735 0.053 234.47)

  // Blue Grays
  blueGray1: "#A6ACCD", // oklch(0.710 0.030 249.02)
  blueGray2: "#767C9D", // oklch(0.545 0.041 249.02)
  blueGray3: "#506477", // oklch(0.430 0.033 249.02)

  // Teals
  teal1: "#5DE4C7", // oklch(0.844 0.104 166.77)
  teal2: "#5FB3A1", // oklch(0.721 0.065 166.77)
  teal3: "#42675A", // oklch(0.430 0.041 166.77)

  // Accent colors for special cases
  yellow: "#FFFAC2", // oklch(0.972 0.088 102.85)
  pink: "#D0679D", // oklch(0.655 0.137 336.89)
  none: "transparent",
}

// Design system mapping - Dark Mode Only
export const poimandresDesignTokens = {
  // Backgrounds (use actual poimandres colors)
  background: "oklch(0.130 0.007 249.02)", // background1
  card: "oklch(0.114 0.008 249.02)", // background2
  popover: "oklch(0.114 0.008 249.02)", // background2

  // Foreground text
  foreground: "oklch(0.936 0.010 235.76)", // text
  cardForeground: "oklch(0.936 0.010 235.76)",
  popoverForeground: "oklch(0.936 0.010 235.76)",

  // Primary (teal1)
  primary: "oklch(0.844 0.104 166.77)", // teal1
  primaryForeground: "oklch(0.130 0.007 249.02)", // background1

  // Secondary (background3)
  secondary: "oklch(0.235 0.011 249.02)", // background3
  secondaryForeground: "oklch(0.936 0.010 235.76)", // text

  // Muted (background3 and blueGray2)
  muted: "oklch(0.235 0.011 249.02)", // background3
  mutedForeground: "oklch(0.710 0.030 249.02)", // blueGray1

  // Accent (background3)
  accent: "oklch(0.235 0.011 249.02)", // background3
  accentForeground: "oklch(0.936 0.010 235.76)", // text

  // Borders and inputs
  border: "oklch(0.545 0.041 249.02 / 15%)", // blueGray2 with opacity
  input: "oklch(0.545 0.041 249.02 / 20%)", // blueGray2 with opacity
  ring: "oklch(0.844 0.104 166.77)", // teal1

  // Destructive
  destructive: "oklch(0.655 0.137 336.89)", // pink

  // Sidebar colors (use background2 for sidebar)
  sidebar: "oklch(0.114 0.008 249.02)", // background2
  sidebarForeground: "oklch(0.936 0.010 235.76)", // text
  sidebarPrimary: "oklch(0.844 0.104 166.77)", // teal1
  sidebarPrimaryForeground: "oklch(0.130 0.007 249.02)", // background1
  sidebarAccent: "oklch(0.235 0.011 249.02)", // background3
  sidebarAccentForeground: "oklch(0.936 0.010 235.76)", // text
  sidebarBorder: "oklch(0.545 0.041 249.02 / 15%)", // blueGray2 with opacity
  sidebarRing: "oklch(0.844 0.104 166.77)", // teal1
}
