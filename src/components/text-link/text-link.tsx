import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import {
  type AnchorHTMLAttributes,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
} from "react";
import { textLinkRecipe } from "./text-link.css";

type TextLinkRecipeVariants = NonNullable<
  RecipeVariants<typeof textLinkRecipe>
>;

export interface TextLinkProps
  extends TextLinkRecipeVariants,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  /** Link content. */
  children: ReactNode;

  /** Additional classes. */
  className?: string;

  /**
   * Delegates rendering to a child element.
   * Useful with React Router Link:
   * <TextLink asChild><Link to="/path">Text</Link></TextLink>
   */
  asChild?: boolean;
}

export function TextLink({
  variant = "bodyMedium",
  color = "primary",
  underline = "hover",
  children,
  className,
  asChild = false,
  ...props
}: TextLinkProps) {
  const linkClassName = clsx(
    textLinkRecipe({ variant, color, underline }),
    className,
  );

  if (asChild) {
    const child = Children.only(children);

    if (isValidElement<{ className?: string }>(child)) {
      return cloneElement(child, {
        ...props,
        className: clsx(linkClassName, child.props.className),
      });
    }

    return <>{children}</>;
  }

  return (
    <a className={linkClassName} {...props}>
      {children}
    </a>
  );
}
