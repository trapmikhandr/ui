import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";
import type { LucideIcon, LucideProps } from "lucide-react";
import { iconStyle } from "./icon.css";

// Get variants from the recipe.
type IconVariants = NonNullable<RecipeVariants<typeof iconStyle>>;

interface IconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  className?: string;
  spinning?: boolean;
  size?: IconVariants["size"];
}

export function Icon({
  icon: IconComponent,
  spinning,
  className,
  size,
  ...props
}: IconProps) {
  return (
    <IconComponent
      // 1. Forward props first (id, events, and so on).
      {...props}
      // 2. Reset Lucide's native dimensions.
      size={undefined}
      width={undefined}
      height={undefined}
      // 3. Accessibility: icons are usually decorative.
      // Pass aria-label through ...props when needed.
      aria-hidden={props["aria-label"] ? undefined : "true"}
      // 4. Apply styles.
      className={clsx(iconStyle({ spinning, size }), className)}
    />
  );
}
