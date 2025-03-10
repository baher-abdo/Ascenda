import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse duration-700 rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
