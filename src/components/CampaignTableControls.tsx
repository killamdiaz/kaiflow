
import { useState } from "react";
import { Columns, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Column {
  key: string;
  label: string;
  visible: boolean;
  width?: number;
}

interface CampaignTableControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  columns: Column[];
  onColumnToggle: (key: string) => void;
  onColumnResize?: (key: string, width: number) => void;
}

export function CampaignTableControls({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  columns,
  onColumnToggle,
  onColumnResize
}: CampaignTableControlsProps) {
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="cyber-input pl-10 w-full"
        />
      </div>
      
      <select 
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="cyber-input w-auto min-w-[140px]"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="draft">Draft</option>
        <option value="completed">Completed</option>
      </select>

      <div className="relative">
        <Button
          variant="outline"
          className="bg-dark-card border-dark-border text-dark-text hover:bg-dark-border hover:border-neon-blue/50"
          onClick={() => setShowColumnMenu(!showColumnMenu)}
        >
          <Columns className="w-4 h-4 mr-2" />
          Columns
        </Button>
        
        {showColumnMenu && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-dark-card border border-dark-border rounded-lg shadow-lg z-10">
            <div className="p-4 space-y-3">
              <h4 className="font-medium text-dark-text mb-3">Show/Hide Columns</h4>
              {columns.map((column) => (
                <div key={column.key} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={column.visible}
                      onChange={() => onColumnToggle(column.key)}
                      className="w-4 h-4 rounded border-dark-border bg-dark-bg checked:bg-neon-blue"
                    />
                    <span className="text-sm text-dark-text">{column.label}</span>
                  </label>
                  {column.visible && onColumnResize && (
                    <input
                      type="range"
                      min="100"
                      max="300"
                      value={column.width || 150}
                      onChange={(e) => onColumnResize(column.key, parseInt(e.target.value))}
                      className="w-16 ml-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
