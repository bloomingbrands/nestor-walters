import localFont from "next/font/local";

/** Logo only — place `bedross-font.otf` in `src/fonts/bedross/` */
export const fontBedross = localFont({
  src: [{ path: "./bedross/bedross-font.otf", weight: "400", style: "normal" }],
  variable: "--font-bedross",
  display: "swap",
});
