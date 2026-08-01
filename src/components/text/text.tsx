import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { textRecipe } from "./text.css";

// Extract variant types from the recipe.
type TextRecipeVariants = NonNullable<RecipeVariants<typeof textRecipe>>;

// Remove variant from the recipe types so it can be narrowed.
type BaseVariants = Omit<TextRecipeVariants, "variant">;

// Props interface.
export interface TextProps
  extends BaseVariants,
    Omit<HTMLAttributes<HTMLElement>, "color" | "align"> {
  font?: TextRecipeVariants["font"];
  /** Text content. */
  children: ReactNode;

  /** Material Design 3 typography variant. */
  variant?: TextRecipeVariants["variant"];

  /** HTML tag to render (h1, p, span...). Defaults based on variant. */
  as?: ElementType;

  /** Additional classes. */
  className?: string;

  /** HTML ID */
  id?: string;
  /** Manually set title when children is a complex structure. */
  title?: string;
}

// Default tag map for each variant (SEO and semantics).
const defaultTags: Record<NonNullable<TextProps["variant"]>, ElementType> = {
  displayLarge: "h1",
  displayMedium: "h2",
  displaySmall: "h3",

  headlineLarge: "h2",
  headlineMedium: "h3",
  headlineSmall: "h4",

  titleLarge: "h4",
  titleMedium: "h5",
  titleSmall: "h6",

  bodyLarge: "p",
  bodyMedium: "p",
  bodySmall: "p",

  labelLarge: "span",
  labelMedium: "span",
  labelSmall: "span",
};

export function Text({
  variant = "bodyMedium",
  font = "plain",
  as,
  children,
  className,
  color,
  weight,
  align,
  truncate,
  title,
  ...props
}: TextProps) {
  // Resolve the tag: use the explicit 'as' value or the variant default.
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    // 1. If title was provided explicitly, do not calculate anything.
    if (title) {
      props.onMouseEnter?.(e);
      return;
    }

    const el = e.currentTarget;

    // 2. Calculate immediately. This is inexpensive (0.01ms).
    if (truncate && el) {
      // Check for overflow.
      const isOverflowing = el.scrollWidth > el.clientWidth;

      if (isOverflowing && typeof children === "string") {
        // 3. DIRECT DOM MANIPULATION.
        // Do not change React state; set an attribute on the native node.
        // This does not re-render the Text component.
        el.setAttribute("title", children);
      } else {
        // Handle text becoming shorter dynamically.
        el.removeAttribute("title");
      }
    }

    // Forward the event.
    props.onMouseEnter?.(e);
  };

  const Component = as || defaultTags[variant] || "p";

  return (
    <Component
      className={clsx(
        textRecipe({
          variant,
          color,
          font,
          weight,
          align,
          truncate,
        }),
        className,
      )}
      onMouseEnter={handleMouseEnter}
      title={title}
      {...props}
    >
      {children}
    </Component>
  );
}
