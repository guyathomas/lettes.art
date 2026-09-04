import type { Medium, Status } from "../types";

interface FiltersProps {
  selectedMedium: Medium | "All";
  selectedStatus: Status | "All";
  showLabels: boolean;
  onMediumChange: (medium: Medium | "All") => void;
  onStatusChange: (status: Status | "All") => void;
  onShowLabelsChange: (showLabels: boolean) => void;
}

function Chip({
  children,
  pressed,
  onClick,
}: {
  children: React.ReactNode;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-9 px-3.5 py-1.5 text-sm transition-all duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
        pressed
          ? "bg-foreground text-background font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
      }`}
    >
      {children}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-serif text-xs text-muted-foreground tracking-widest uppercase">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
        {children}
      </div>
    </div>
  );
}

export function Filters({
  selectedMedium,
  selectedStatus,
  showLabels,
  onMediumChange,
  onStatusChange,
  onShowLabelsChange,
}: FiltersProps) {
  const mediums: (Medium | "All")[] = ["All", "Acrylic", "Graphite", "Watercolour"];
  const statuses: (Status | "All")[] = ["All", "For Sale", "Sold"];

  return (
    <div className="flex flex-wrap gap-x-7 gap-y-4">
      <Group label="Medium">
        {mediums.map((medium) => (
          <Chip
            key={medium}
            pressed={selectedMedium === medium}
            onClick={() => onMediumChange(medium)}
          >
            {medium}
          </Chip>
        ))}
      </Group>

      <Group label="Status">
        {statuses.map((status) => (
          <Chip
            key={status}
            pressed={selectedStatus === status}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </Chip>
        ))}
      </Group>

      <Group label="Labels">
        <Chip pressed={!showLabels} onClick={() => onShowLabelsChange(false)}>
          Off
        </Chip>
        <Chip pressed={showLabels} onClick={() => onShowLabelsChange(true)}>
          On
        </Chip>
      </Group>
    </div>
  );
}
