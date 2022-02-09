import React, { HTMLAttributes, useCallback, useRef, ReactPortal } from "react";
import { createPortal } from "react-dom";

export default function Template({
  children,
  ...props
}: HTMLAttributes<HTMLTemplateElement>) {
  const portalRef = useRef<ReactPortal>(null);
  const ref = useCallback((el: HTMLTemplateElement) => {
    portalRef.current = createPortal(
      children,
      el.content as unknown as Element
    );
  }, []);

  if (typeof window === "undefined") return <template {...props}>{children}</template>;
  else return <template ref={ref} />;
}
