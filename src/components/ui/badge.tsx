import type { ComponentProps } from "react";
import { cn } from "cn";

const badgeVariants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border bg-background text-foreground",
};

type BadgeProps = ComponentProps<"span"> & {
    variant?: keyof typeof badgeVariants;
    status?: "enrolled" | "open";
};

function Badge({ className, variant = "secondary", status, ...props }: BadgeProps) {
    const statusClassName = status
        ? status === "enrolled"
            ? "bg-amber-100 text-amber-800 dark:bg-purple-900/70 dark:text-purple-100"
            : "bg-purple-100 text-purple-800 dark:bg-amber-900/70 dark:text-amber-100"
        : badgeVariants[variant];

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium leading-none",
                statusClassName,
                className
            )}
            {...props}
        />
    );
}

export { Badge };