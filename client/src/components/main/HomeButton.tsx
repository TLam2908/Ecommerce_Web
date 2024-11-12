import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface HomeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const HomeButton = forwardRef<HTMLButtonElement, HomeButtonProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          `w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition`, className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

HomeButton.displayName = "Button";

export default HomeButton;
