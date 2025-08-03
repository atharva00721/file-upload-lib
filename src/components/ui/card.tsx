import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: "sm" | "md" | "lg" | "xl";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
  headerContent,
  footerContent,
  variant = "default",
  padding = "lg",
}) => {
  const baseClasses =
    "bg-card rounded-xl border transition-all duration-200";

  const variantClasses = {
    default: "border-muted",
    elevated: "border-muted shadow-lg ",
    outlined: "border-muted shadow-none ",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
    >
      {(title || subtitle || headerContent) && (
        <div className="mb-6">
          {headerContent ? (
            headerContent
          ) : (
            <>
              {title && (
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h2>
              )}
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </>
          )}
        </div>
      )}

      <div className="flex-1">{children}</div>

      {footerContent && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {footerContent}
        </div>
      )}
    </div>
  );
};
