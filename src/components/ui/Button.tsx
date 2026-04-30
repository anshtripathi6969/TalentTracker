import { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = true,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        buttonRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.2;
      const y = (clientY - (top + height / 2)) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      if (!magnetic) return;
      setPosition({ x: 0, y: 0 });
    };

    const variants = {
      primary:
        "bg-white text-dark-900 font-semibold hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
      secondary:
        "bg-neon-purple text-white font-semibold hover:bg-neon-purple/90 shadow-[0_0_20px_rgba(176,38,255,0.3)]",
      outline:
        "border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
      ghost: "text-white/70 hover:text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={(node) => {
          // @ts-ignore
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative rounded-full transition-colors duration-300 flex items-center justify-center overflow-hidden group",
          variants[variant],
          sizes[size],
          className
        )}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        animate={magnetic ? { x: position.x, y: position.y } : {}}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-0" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
