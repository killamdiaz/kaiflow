import { useState } from "react";
import { ArrowLeft, Users, Mail, Eye, Rocket, Plus, Clock, Trash2 } from "lucide-react";

interface CampaignBuilderProps {
  onBack: () => void;
}

export function CampaignBuilder({ onBack }: CampaignBuilderProps) {
  // This component is now deprecated in favor of CampaignWizard
  // Redirecting to the new wizard
  return (
    <div className="p-6 space-y-6 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold gradient-text mb-4">Campaign Builder Updated!</h2>
        <p className="text-dark-muted mb-6">
          We've upgraded the campaign builder with a new step-by-step wizard experience.
        </p>
        <button 
          onClick={onBack}
          className="cyber-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </button>
      </div>
    </div>
  );
}
