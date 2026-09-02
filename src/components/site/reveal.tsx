import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Fires on mount (not IntersectionObserver-gated) so content is never stuck
// invisible -- static HTML is complete on first paint, this only adds a
// short entrance flourish on top of it.
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const style: CSSProperties = delay ? { animationDelay: `${delay}ms` } : {};
  return (
    <div className={`pf-reveal ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
