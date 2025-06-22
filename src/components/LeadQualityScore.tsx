
import { Star, TrendingUp, Building2, DollarSign, Users } from "lucide-react";

interface LeadQualityScoreProps {
  score: number;
  factors?: {
    companySize?: number;
    funding?: string;
    relevance?: number;
    engagement?: number;
  };
}

export function LeadQualityScore({ score, factors }: LeadQualityScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-neon-green";
    if (score >= 3) return "text-neon-blue";
    if (score >= 2) return "text-neon-purple";
    return "text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 4) return "bg-neon-green/20 text-neon-green border border-neon-green/30";
    if (score >= 3) return "bg-neon-blue/20 text-neon-blue border border-neon-blue/30";
    if (score >= 2) return "bg-neon-purple/20 text-neon-purple border border-neon-purple/30";
    return "bg-red-500/20 text-red-400 border border-red-500/30";
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < score 
            ? `${getScoreColor(score)} fill-current` 
            : "text-dark-border"
        }`}
      />
    ));
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "Hot";
    if (score >= 3) return "Warm";
    if (score >= 2) return "Cold";
    return "Ice";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {renderStars(score)}
      </div>
      
      {factors && (
        <div className="group relative">
          <span className={`status-badge ${getScoreBadge(score)}`}>
            {getScoreLabel(score)}
          </span>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
            <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-lg min-w-[200px]">
              <div className="text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-dark-muted flex items-center">
                    <Building2 className="w-3 h-3 mr-1" />
                    Company Size
                  </span>
                  <span className="text-dark-text">{factors.companySize || "Unknown"}</span>
                </div>
                
                {factors.funding && (
                  <div className="flex items-center justify-between">
                    <span className="text-dark-muted flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Funding
                    </span>
                    <span className="text-dark-text">{factors.funding}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-dark-muted flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Relevance
                  </span>
                  <span className="text-dark-text">{factors.relevance || 0}/5</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-dark-muted flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    Engagement
                  </span>
                  <span className="text-dark-text">{factors.engagement || 0}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
