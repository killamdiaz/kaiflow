
import { useState } from "react";
import { Plus, Play, Pause, MoreHorizontal, Edit, Trash2, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CampaignBuilder } from "./CampaignBuilder";

export function Campaigns() {
  const [showBuilder, setShowBuilder] = useState(false);
  
  const campaigns = [
    {
      id: 1,
      name: "Product Launch Outreach",
      status: "active",
      leads: 245,
      sent: 189,
      replies: 12,
      replyRate: 6.3,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Customer Success Follow-up",
      status: "paused",
      leads: 134,
      sent: 98,
      replies: 23,
      replyRate: 23.5,
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Partnership Outreach",
      status: "draft",
      leads: 67,
      sent: 0,
      replies: 0,
      replyRate: 0,
      lastActivity: "3 days ago"
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-badge status-active';
      case 'paused': return 'status-badge status-paused';
      case 'draft': return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
      default: return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  if (showBuilder) {
    return <CampaignBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Campaigns</h1>
          <p className="text-dark-muted mt-1">Manage your email sequences and outreach campaigns</p>
        </div>
        <button 
          className="cyber-button"
          onClick={() => setShowBuilder(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </button>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="cyber-card hover:neon-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-dark-text text-lg">{campaign.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={getStatusClass(campaign.status)}>
                      {campaign.status === 'active' && <Play className="w-3 h-3" />}
                      {campaign.status === 'paused' && <Pause className="w-3 h-3" />}
                      {campaign.status === 'draft' && <Edit className="w-3 h-3" />}
                      <span className="ml-1 capitalize">{campaign.status}</span>
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-dark-card">
                  <MoreHorizontal className="w-4 h-4 text-dark-muted" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-dark-muted text-sm">Leads</p>
                  <p className="text-dark-text font-semibold">{campaign.leads}</p>
                </div>
                <div>
                  <p className="text-dark-muted text-sm">Sent</p>
                  <p className="text-dark-text font-semibold">{campaign.sent}</p>
                </div>
                <div>
                  <p className="text-dark-muted text-sm">Replies</p>
                  <p className="text-neon-blue font-semibold">{campaign.replies}</p>
                </div>
                <div>
                  <p className="text-dark-muted text-sm">Reply Rate</p>
                  <p className="text-neon-green font-semibold">{campaign.replyRate}%</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-border">
                <p className="text-dark-muted text-xs mb-3">Last activity: {campaign.lastActivity}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-dark-border text-dark-muted hover:bg-dark-card">
                    <Copy className="w-3 h-3 mr-1" />
                    Clone
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for New Users */}
      {campaigns.length === 0 && (
        <Card className="cyber-card text-center py-12">
          <CardContent>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">Create Your First Campaign</h3>
              <p className="text-dark-muted mb-6">Start reaching out to prospects with personalized email sequences that convert.</p>
              <button 
                className="cyber-button"
                onClick={() => setShowBuilder(true)}
              >
                Create Campaign
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
