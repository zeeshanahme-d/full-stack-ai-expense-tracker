import * as React from "react"

import { cn } from "@/lib/utils"
import { Field, FieldLabel } from "./field"


interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}


function Input({
  className,
  type,
  label,
  error,
  id,
  ...props
}: InputProps) {

  return (
    <Field>

      {label && (
        <FieldLabel htmlFor={id}>
          {label}
        </FieldLabel>
      )}

      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          `
          h-12.5 w-full
          rounded-3xl
          border
          bg-input/50
          px-4
          text-base
          outline-none
          transition
          focus-visible:bg-white
          focus-visible:ring-3
          focus-visible:ring-ring/30
          placeholder:text-muted-foreground
          disabled:opacity-50
          `,
          error && "border-destructive",
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}

    </Field>
  )
}


export { Input }