import localFont from "next/font/local";

/**
 * Nacelle — Dot Colon / ドットコロン (SIL Open Font License 1.1)
 * https://dotcolon.net/fonts/nacelle/
 */
export const fontNacelle = localFont({
  src: [
    { path: "./nacelle/Nacelle-UltraLight.otf", weight: "200", style: "normal" },
    { path: "./nacelle/Nacelle-Light.otf", weight: "300", style: "normal" },
    { path: "./nacelle/Nacelle-Regular.otf", weight: "400", style: "normal" },
    { path: "./nacelle/Nacelle-Italic.otf", weight: "400", style: "italic" },
    { path: "./nacelle/Nacelle-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./nacelle/Nacelle-Bold.otf", weight: "700", style: "normal" },
    { path: "./nacelle/Nacelle-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "./nacelle/Nacelle-Heavy.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-nacelle",
  display: "swap",
});
