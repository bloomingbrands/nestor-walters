import sharp from "sharp";

const input  = "public/assets/nestor-and-rider.jpg";
const output = "public/assets/nestor-and-rider-enhanced.jpg";

await sharp(input)
  // Adaptive histogram equalization — pulls out local detail (face, fur, shadows)
  .clahe({ width: 4, height: 4, maxSlope: 3 })
  // Lift saturation so colors feel alive without blowing out skin tones
  .modulate({ saturation: 1.18, brightness: 1.03 })
  // Edge sharpening — sigma 1.2 adds crispness, m1/m2 keep halos subtle
  .sharpen({ sigma: 1.2, m1: 1.2, m2: 0.6 })
  // Slight contrast S-curve via linear: stretches midtones without clipping
  .linear(1.07, -6)
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(output);

console.log(`Saved → ${output}`);
