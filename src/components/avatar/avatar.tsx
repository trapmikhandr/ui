import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import {
  AVATAR_COLORS_COUNT,
  avatarRecipe,
  avatarWrapper,
  statusIndicatorRecipe,
} from "./avatar.css";

type AvatarRecipeVariants = NonNullable<RecipeVariants<typeof avatarRecipe>>;
type StatusIndicatorVariants = NonNullable<
  RecipeVariants<typeof statusIndicatorRecipe>
>;

export interface AvatarProps
  extends Omit<AvatarRecipeVariants, "colorIndex">,
    Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Name used to generate initials and color. */
  name: string;

  /** Image URL, if available. */
  src?: string | null;

  /** Image alt text. */
  alt?: string;

  /** Indicator status (success/warning/error). Hidden when omitted. */
  status?: StatusIndicatorVariants["status"];

  /** Additional classes. */
  className?: string;
}

/**
 * Generates a stable hash from a string.
 * Used to deterministically select a color from a name.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Extracts initials from a name.
 * "Ivan Petrov" -> "IP"
 * "Anna" -> "A"
 * "John Doe Smith" -> "JD"
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export function Avatar({
  name,
  src,
  alt,
  size = "medium",
  status,
  className,
  ...props
}: AvatarProps) {
  const colorIndex = (hashString(name) % AVATAR_COLORS_COUNT) as 0 | 1 | 2;
  const initials = getInitials(name);

  const avatarElement = (
    <div
      className={clsx(avatarRecipe({ size, colorIndex }), !status && className)}
      role="img"
      aria-label={alt || name}
      {...(!status && props)}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        initials
      )}
    </div>
  );

  if (!status) {
    return avatarElement;
  }

  return (
    <div className={clsx(avatarWrapper, className)} {...props}>
      {avatarElement}
      <span
        className={statusIndicatorRecipe({ size, status })}
        aria-hidden="true"
      />
    </div>
  );
}
