import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function validateDesign(
  width: number,
  height: number,
  bgColor: string,
  textColor: string,
  fontSize: number,
  buttonSize: number
) {
  const contrastRatio = getContrastRatio(bgColor, textColor);
  const contrastPass = contrastRatio >= 4.5;
  const largeTextContrastPass = contrastRatio >= 3;
  const touchTargetPass = buttonSize >= 44;
  const fontSizePass = fontSize >= 12;
  const safeAreaPass = width >= 320 && height >= 568;

  return {
    contrastRatio: Number(contrastRatio.toFixed(2)),
    contrastPass,
    largeTextContrastPass,
    touchTargetPass,
    fontSizePass,
    safeAreaPass,
    overallStatus:
      contrastPass && touchTargetPass && fontSizePass
        ? "pass"
        : contrastPass && touchTargetPass
        ? "warning"
        : "error",
  };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCurrency(amount: number | string): string { const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]/g, '')) : amount; return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num || 0); }

export function formatNumber(num: number): string { return new Intl.NumberFormat('en-US').format(num); }

export function generateId(): string { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export function truncate(str: string, len: number): string { return str.length > len ? str.slice(0, len) + '...' : str; }

export function slugify(str: string): string { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
