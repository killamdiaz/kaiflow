
import { AlertTriangle, Clock, Mail } from "lucide-react";

interface LeadFatigueTrackerProps {
  campaignCount: number;
  lastContactDays: number;
  replyStatus?: "replied" | "no-reply" | "bounced";
}

export function LeadFatigueTracker({ campaignCount, lastContactDays, replyStatus }: LeadFatigueTrackerProps) {
  const getFatigueLevel = () => {
    if (campaignCount >= 5 && lastContactDays <= 30) return "high";
    if (campaignCount >= 3 && lastContactDays <= 14) return "medium";
    if (campaignCount >= 2 && lastContactDays <= 7) return "low";
    return "none";
  };

  const getFatigueColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-500";
      case "low": return "bg-yellow-500";
      default: return "bg-neon-green";
    }
  };

  const getFatiguePercentage = (level: string) => {
    switch (level) {
      case "high": return 90;
      case "medium": return 60;
      case "low": return 30;
      default: return 10;
    }
  };

  const getFatigueMessage = (level: string) => {
    switch (level) {
      case "high": return `High fatigue: ${campaignCount} campaigns, last contact ${lastContactDays} days ago`;
      case "medium": return `Medium fatigue: ${campaignCount} campaigns in last 2 weeks`;
      case "low": return `Low fatigue: ${campaignCount} campaigns recently`;
      default: return "Fresh lead - no fatigue detected";
    }
  };

  const fatigueLevel = getFatigueLevel();

  return (
    <div className="group relative">
      {/* Fatigue Meter */}
      <div className="flex items-center space-x-2">
        <div className="w-12 h-2 bg-dark-border rounded-full overflow-hidden">
          <div 
            className={`h-full ${getFatigueColor(fatigueLevel)} transition-all duration-300`}
            style={{ width: `${getFatiguePercentage(fatigueLevel)}%` }}
          ></div>
        </div>
        
        {fatigueLevel === "high" && (
          <AlertTriangle className="w-4 h-4 text-red-400" />
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
        <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-lg min-w-[220px]">
          <div className="text-xs space-y-2">
            <p className="text-dark-text font-medium">{getFatigueMessage(fatigueLevel)}</p>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-dark-muted flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  Total Campaigns
                </span>
                <span className="text-dark-text">{campaignCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-dark-muted flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Last Contact
                </span>
                <span className="text-dark-text">{lastContactDays} days ago</span>
              </div>
              
              {replyStatus && (
                <div className="flex items-center justify-between">
                  <span className="text-dark-muted">Reply Status</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    replyStatus === "replied" ? "bg-neon-green/20 text-neon-green" :
                    replyStatus === "bounced" ? "bg-red-500/20 text-red-400" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>
                    {replyStatus.replace("-", " ")}
                  </span>
                </div>
              )}
            </div>

            {fatigueLevel === "high" && (
              <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                <p className="text-red-400 text-xs">⚠️ Consider cooling off this lead</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
