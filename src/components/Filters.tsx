type Medium = "Acrylic" | "Graphite" | "Watercolour";
type Status = "For Sale" | "Sold";

interface FiltersProps {
  selectedMedium: Medium | "All";
  selectedStatus: Status | "All";
  onMediumChange: (medium: Medium | "All") => void;
  onStatusChange: (status: Status | "All") => void;
}

export function Filters({
  selectedMedium,
  selectedStatus,
  onMediumChange,
  onStatusChange,
}: FiltersProps) {
  const mediums: (Medium | "All")[] = ["All", "Acrylic", "Graphite", "Watercolour"];
  const statuses: (Status | "All")[] = ["All", "For Sale", "Sold"];

  return (
    <div className="flex flex-col sm:flex-row gap-8 mb-14">
      <div>
        <span className="font-serif text-sm text-muted-foreground tracking-wide uppercase mb-3 block">
          Medium
        </span>
        <div className="flex flex-wrap gap-2">
          {mediums.map((medium) => (
            <button
              key={medium}
              onClick={() => onMediumChange(medium)}
              className={`px-4 py-1.5 text-sm transition-all border ${
                selectedMedium === medium
                  ? "border-foreground text-foreground bg-foreground/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {medium}
            </button>
          ))}
        </div>
      </div>

      <div className="sm:ml-auto">
        <span className="font-serif text-sm text-muted-foreground tracking-wide uppercase mb-3 block">
          Status
        </span>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-4 py-1.5 text-sm transition-all border ${
                selectedStatus === status
                  ? "border-foreground text-foreground bg-foreground/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
