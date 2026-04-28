export const normalizeDecimalInput = (
  raw: string,
  options?: { max?: number },
) => {
  // allow only digits + one dot
  if (!/^\d*\.?\d*$/.test(raw)) return null;

  // ".5" → "0.5"
  if (raw.startsWith(".")) {
    raw = "0" + raw;
  }

  // remove leading zeros (except 0.x)
  if (/^0\d+/.test(raw) && !/^0\./.test(raw)) {
    raw = raw.replace(/^0+/, "");
  }

  // limit to 2 decimal places
  if (raw.includes(".")) {
    const [int, dec] = raw.split(".");
    raw = int + "." + dec.slice(0, 2);
  }

  // clamp if max is provided
  if (options?.max !== undefined && raw !== "" && raw !== ".") {
    const num = parseFloat(raw);
    if (!isNaN(num) && num > options.max) {
      raw = String(options.max);
    }
  }

  return raw;
};
