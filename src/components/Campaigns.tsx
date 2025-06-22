
import { useState } from "react";
import { Plus, Play, Pause, BarChart3, Mail, Users, Calendar, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignWizard } from "./CampaignWizard";
import { AIAssistant } from "./AIAssistant";

interface Campaign {
  id: number;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  leads: number;
  sent: number;
  opened: number;
  replied: number;
  openRate: string;
  replyRate: string;
  createdAt: string;
  lastActivity: string;
}

export function Campaigns() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "Q1 Product Launch Outreach",
      status: "active",
      leads: 250,
      sent: 180,
      opened: 54,
      replied: 12,
      openRate: "30.0%",
      replyRate: "6.7%",
      createdAt: "2024-01-15",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Customer Success Follow-up",
      status: "paused",
      leads: 120,
      sent: 120,
      opened: 72,
      replied: 18,
      openRate: "60.0%",
      replyRate: "15.0%",
      createdAt: "2024-01-10",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Partnership Outreach Campaign",
      status: "draft",
      leads: 85,
      sent: 0,
      opened: 0,
      replied: 0,
      openRate: "0.0%",
      replyRate: "0.0%",
      createdAt: "2024-01-20",
      lastActivity: "3 days ago"
    }
  ];

  const savedDrafts = [
    { id: 1, name: "SaaS Founder Sequence", lastSaved: "2 hours ago", step: "Create Sequence" },
    { id: 2, name: "Enterprise Outreach", lastSaved: "1 day ago", step: "Add Leads" },
    { id: 3, name: "Product Demo Campaign", lastSaved: "3 days ago", step: "Name Campaign" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'draft': return <Calendar className="w-4 h-4" />;
      case 'completed': return <BarChart3 className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-badge status-active';
      case 'paused': return 'status-badge status-paused';
      case 'draft': return 'status-badge bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'completed': return 'status-badge bg-neon-green/20 text-neon-green border border-neon-green/30';
      default: return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (showBuilder) {
    return (
      <>
        <CampaignWizard onBack={() => setShowBuilder(false)} />
        <AIAssistant />
      </>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <AIAssistant />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Campaigns</h1>
          <p className="text-dark-muted mt-1">Manage your cold email campaigns and track performance</p>
        </div>
        <button 
          className="cyber-button"
          onClick={() => setShowBuilder(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </button>
      </div>

      {/* Saved Drafts */}
      {savedDrafts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-dark-text">Resume Drafts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedDrafts.map((draft) => (
              <Card key={draft.id} className="cyber-card hover:neon-glow transition-all duration-300 cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-dark-text">{draft.name}</h3>
                    <span className="text-xs text-neon-blue">{draft.step}</span>
                  </div>
                  <p className="text-sm text-dark-muted mb-3">Last saved {draft.lastSaved}</p>
                  <button 
                    className="cyber-button w-full text-sm py-2"
                    onClick={() => setShowBuilder(true)}
                  >
                    Continue
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm">Total Campaigns</p>
                <p className="text-2xl font-bold text-dark-text">{campaigns.length}</p>
              </div>
              <Mail className="w-8 h-8 text-neon-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm">Active</p>
                <p className="text-2xl font-bold text-neon-green">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-neon-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm">Total Leads</p>
                <p className="text-2xl font-bold text-neon-purple">
                  {campaigns.reduce((sum, c) => sum + c.leads, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-neon-purple" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm">Avg. Reply Rate</p>
                <p className="text-2xl font-bold text-neon-pink">8.2%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-neon-pink" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cyber-input pl-10 w-full"
          />
        </div>
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="cyber-input w-auto"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Campaigns Table */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-dark-text">All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 text-dark-muted font-medium">Campaign</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Status</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Leads</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Sent</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Open Rate</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Reply Rate</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors cursor-pointer">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-dark-text">{campaign.name}</p>
                        <p className="text-sm text-dark-muted">Created {campaign.createdAt}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={getStatusClass(campaign.status)}>
                        {getStatusIcon(campaign.status)}
                        <span className="ml-2 capitalize">{campaign.status}</span>
                      </span>
                    </td>
                    <td className="py-4 text-dark-text font-medium">{campaign.leads}</td>
                    <td className="py-4 text-dark-text">{campaign.sent}</td>
                    <td className="py-4">
                      <span className="text-neon-blue font-medium">{campaign.openRate}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-neon-green font-medium">{campaign.replyRate}</span>
                    </td>
                    <td className="py-4 text-dark-muted">{campaign.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
