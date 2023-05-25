// Colors
export const colors = {
  black: "#000000",
  white: "#ffffff",
  gray200: "#D7D8D8",
  gray300: "#BCC1C9",
  blue: "#B8CEFF",
  brandPrimary: "#F2BF45",
  backgroundColor: "#000000",

  // Light colors
  lightPrimary: "#f5f5f5", // 100
  lightSecondary: "#a3a3a3", // 400
  lightTertiary: "#404040", // 700

  // Dark colors
  darkPrimary: "#262626", // 800
  darkSecondary: "#525252", // 600
  darkTertiary: "#d4d4d4", // 300

  // Accent colors
  lightAccent: "#5588ee",
  darkAccent: "#0066ff",

  // Other colors
  neutral900: "#171717",
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 24,
  xxl: 30,
  xxxl: 40,
};

export const fontWeight = {
  normal: 400,
  bold: 700,
  extrabold: 800,
};

export const lineHeight = {
  tight: "120%",
  base: "155%",
  loose: "190%",
};

export const borderRadius = {
  base: 12,
  full: 9999,
};

export const fontFamily = {
  sans: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const spacing = {
  desktopGutter: 40,
  mobileGutter: 20,
};

export const screens = {
  xs: "480px",
  sm: "640px",
};

export const themeDefaults = {
  fontFamily: fontFamily.sans,
  lineHeight: lineHeight.base,
  fontWeight: fontWeight.normal,
  fontSize: fontSize.base,
  color: colors.lightPrimary,
  padding: 0,
};
