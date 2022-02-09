import React, { HTMLAttributes, useCallback, useRef, ReactPortal } from "react";
import { createPortal } from "react-dom";
import mergeRefs from "react-merge-refs";

export default React.forwardRef<HTMLTemplateElement>(function Template({
  children,
  ...props
}: HTMLAttributes<HTMLTemplateElement>, ref) {
  const portalRef = useRef<ReactPortal>(null);
  const callbackRef = useCallback((el: HTMLTemplateElement) => {
    portalRef.current = createPortal(
      children,
      el.content as unknown as Element
    );
  }, []);

  if (typeof window === "undefined")
    return <template {...props}>{children}</template>;
  else return <template ref={mergeRefs([callbackRef, ref])} {...props} />;
});
