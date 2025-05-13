import {forwardRef} from "react";
import type { ElementType,ComponentPropsWithoutRef,ReactNode,Ref} from "react";
import clsx from "clsx";

export type TypographyVariant = "h1" | "h2" | "h3" | "body" | "caption";

/**
 * Mapping from variants to default HTML tag and Tailwind classes
 */
const variantMapping: Record<
  TypographyVariant,
  { as: ElementType; className: string }
> = {
  h1: { as: "h1", className: "text-2xl font-semibold leading-tight" },
  h2: { as: "h2", className: "text-xl font-semibold leading-snug" },
  h3: { as: "h3", className: "text-lg font-semibold leading-snug" },
  body: { as: "p", className: "text-base leading-relaxed" },
  caption: { as: "span", className: "text-sm text-gray-500" },
};
/**
 * Props for the Typography component, supporting polymorphic 'as' prop
 */
export type TypographyProps<T extends ElementType = 'p'> = {
  /**
   * Visual style variant (selects default tag and styles)
   */
  variant?: TypographyVariant;
  /**
   * Override the default HTML tag
   */
  as?: T;
  /**
   * Additional classes to apply
   */
  className?: string;
  /**
   * Children nodes to render inside the component
   */
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'className'>;

/**
 * Polymorphic Typography component using Tailwind CSS v4
 *
 * - variant: selects predefined text styles
 * - as: override the rendered HTML element
 * - inherits all native props for the specified element
 */
const TypographyInner = forwardRef(
  <T extends ElementType = 'p'>(
    {
      variant = 'body',
      as,
      className,
      children,
      ...rest
    }: TypographyProps<T>,
    ref: Ref<HTMLElement>
  ) => {
    const { as: defaultTag, className: variantClass } = variantMapping[variant];
    const Component = (as || defaultTag) as ElementType;

    return (
      <Component ref={ref} className={clsx(variantClass, className)} {...rest}>
        {children}
      </Component>
    );
  }
) as <T extends ElementType = 'p'>(
  props: TypographyProps<T> & { ref?: Ref<HTMLElement> }
) => React.ReactElement;

/**
 * Exported Typography component with proper displayName for React DevTools
 */
export const Typography = TypographyInner as typeof TypographyInner & { displayName?: string };
Typography.displayName = 'Typography';