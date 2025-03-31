import React from "react";
import { clsx } from "clsx";

export const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={clsx(className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
