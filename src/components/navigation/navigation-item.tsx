import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";
import { useRouter } from "../../provider/router-context";
import {
  item,
  itemBadge,
  itemBadgeDot,
  itemIconWrap,
  itemIndicator,
  itemLabel,
} from "./navigation-item.css";

export type NavigationMode = "drawer" | "rail" | "bar";

export const NavigationContext = createContext<NavigationMode>("drawer");

export interface NavigationItemProps extends HTMLAttributes<HTMLElement> {
  icon?: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
  href?: string;
  /** A number shows a count; true shows a dot. */
  badge?: number | boolean;
}

export function NavigationItem({
  icon,
  children,
  className,
  isActive,
  href,
  badge,
  onClick,
  ...props
}: NavigationItemProps) {
  const mode = useContext(NavigationContext);
  const router = useRouter();
  // router.useHref is itself a hook, so it cannot be called conditionally
  // without violating the rules of hooks. Always call it, using an identity
  // fallback when the router provider does not supply useHref.
  const useHref = router?.useHref ?? ((path: string) => path);
  const resolvedHref = useHref(href ?? "");

  const itemClass = clsx(item({ mode }), className);

  const badgeEl =
    badge === true ? (
      <span className={itemBadgeDot} />
    ) : typeof badge === "number" ? (
      <span className={itemBadge}>{badge > 99 ? "99+" : badge}</span>
    ) : null;

  const content = (
    <>
      {icon ? (
        <span className={itemIndicator({ mode })}>
          <span className={itemIconWrap}>{icon}</span>
          {badgeEl}
        </span>
      ) : null}
      <span className={itemLabel({ mode })}>{children}</span>
    </>
  );

  if (href !== undefined) {
    return (
      <a
        href={resolvedHref}
        className={itemClass}
        data-active={isActive || undefined}
        onClick={(e) => {
          (onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined)?.(
            e,
          );
          if (router && !e.defaultPrevented) {
            e.preventDefault();
            router.navigate(href);
          }
        }}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={itemClass}
      data-active={isActive || undefined}
      onClick={
        onClick as React.MouseEventHandler<HTMLButtonElement> | undefined
      }
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
