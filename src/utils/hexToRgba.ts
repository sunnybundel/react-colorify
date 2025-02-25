type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const hexToRgba = (hex: string, alpha = 1): RGBA => {
  // Validate hex color format (#RRGGBB or #RRGGBBAA)
  //if (!/^#[0-9A-F]{6}$/i.test(hex)) return { r: 0, g: 0, b: 0, a: alpha };
  if (!/^#([0-9A-F]{6}|[0-9A-F]{8})$/i.test(hex))
    return { r: 0, g: 0, b: 0, a: alpha };

  const bigint = parseInt(hex.slice(1, 7), 16); // Extract RRGGBB part
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  if (hex.length === 9) {
    const alphaHex = hex.slice(7, 9); // Extract AA part
    alpha = parseInt(alphaHex, 16) / 255; // Convert to a float between 0 and 1
  }

  return { r, g, b, a: alpha };
};

export const generateColorStyles = (baseColor: string, increment: number) => {
  // Ensure baseColor is in the correct format
  const processedColor = baseColor.startsWith("#")
    ? baseColor
    : `#${baseColor}`;

  const { r, g, b, a } = hexToRgba(processedColor, 1);

  return {
    backgroundColor: `rgba(${Math.min(255, r + increment)}, ${Math.min(
      255,
      g + increment
    )}, ${Math.min(255, b + increment)}, ${a})`,
  };
};
