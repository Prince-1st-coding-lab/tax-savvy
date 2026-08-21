interface AdSlotProps {
  id: string;
  height?: number;
  label?: string;
}

/** Reserved AdSense placement. Fixed height prevents layout shift when ads load. */
export function AdSlot({ id, height = 90, label = "Advertisement" }: AdSlotProps) {
  return (
    <div
      data-ad-slot={id}
      aria-hidden="true"
      className="flex w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/60"
      style={{ minHeight: height }}
    >
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
    </div>
  );
}
