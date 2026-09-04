import { Check, ChevronDown, ChevronLeft, ChevronRight, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The site's icon set. Every glyph is lucide at stroke 2 with round joins;
 * naming them here keeps the inventory closed and the sizing consistent
 * instead of each component reaching into lucide-react for its own.
 */
const GLYPHS = {
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  moon: Moon,
  sun: Sun,
  x: X,
} as const;

export type IconName = keyof typeof GLYPHS;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 16, className, ...props }: IconProps) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
