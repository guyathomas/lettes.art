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
    <div className="flex flex-col sm:flex-row gap-6 mb-12">
      <div className="flex-1">
        <label className="block text-sm text-neutral-600 mb-2">Medium</label>
        <div className="flex flex-wrap gap-2">
          {mediums.map((medium) => (
            <button
              key={medium}
              onClick={() => onMediumChange(medium)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedMedium === medium
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {medium}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm text-neutral-600 mb-2">Status</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedStatus === status
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
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
