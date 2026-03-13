interface CardGridProps {
  children: React.ReactNode;
}

export function CardGrid({ children }: CardGridProps) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="grid grid-cols-1 divide-x-0 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {children}
      </div>
    </div>
  );
}

interface CardGridItemProps {
  icon?: React.ReactNode;
  title: string;
  value: string;
}

export function CardGridItem({ icon, title, value }: CardGridItemProps) {
  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium sm:text-sm">{title}</span>
      </div>
      <p className="text-2xl font-semibold tracking-tight sm:text-[28px]">
        {value}
      </p>
    </div>
  );
}
