import { useState } from "react";
import { Plus, Play, Pause, BarChart3, Mail, Users, Calendar, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignWizard } from "./CampaignWizard";
import { AIAssistant } from "./AIAssistant";
import { CampaignTableControls } from "./CampaignTableControls";

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
  bounceRate?: string;
  clickRate?: string;
  unsubscribeRate?: string;
}

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

export function Campaigns() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Campaign', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'leads', label: 'Leads', visible: true },
    { key: 'sent', label: 'Sent', visible: true },
    { key: 'openRate', label: 'Open Rate', visible: true },
    { key: 'replyRate', label: 'Reply Rate', visible: true },
    { key: 'lastActivity', label: 'Last Activity', visible: true },
    { key: 'bounceRate', label: 'Bounce Rate', visible: false },
    { key: 'clickRate', label: 'Click Rate', visible: false },
    { key: 'unsubscribeRate', label: 'Unsubscribe Rate', visible: false },
  ]);

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
      lastActivity: "2 hours ago",
      bounceRate: "2.1%",
      clickRate: "8.5%",
      unsubscribeRate: "0.8%"
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
      lastActivity: "1 day ago",
      bounceRate: "1.5%",
      clickRate: "12.3%",
      unsubscribeRate: "0.5%"
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
      lastActivity: "3 days ago",
      bounceRate: "0.0%",
      clickRate: "0.0%",
      unsubscribeRate: "0.0%"
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

  const handleColumnToggle = (key: string) => {
    setColumns(prev => prev.map(col => 
      col.key === key ? { ...col, visible: !col.visible } : col
    ));
  };

  const visibleColumns = columns.filter(col => col.visible);

  const renderCellValue = (campaign: Campaign, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div>
            <p className="font-medium text-dark-text">{campaign.name}</p>
            <p className="text-sm text-dark-muted">Created {campaign.createdAt}</p>
          </div>
        );
      case 'status':
        return (
          <span className={getStatusClass(campaign.status)}>
            {getStatusIcon(campaign.status)}
            <span className="ml-2 capitalize">{campaign.status}</span>
          </span>
        );
      case 'leads':
        return <span className="text-dark-text font-medium">{campaign.leads}</span>;
      case 'sent':
        return <span className="text-dark-text">{campaign.sent}</span>;
      case 'openRate':
        return <span className="text-neon-blue font-medium">{campaign.openRate}</span>;
      case 'replyRate':
        return <span className="text-neon-green font-medium">{campaign.replyRate}</span>;
      case 'lastActivity':
        return <span className="text-dark-muted">{campaign.lastActivity}</span>;
      case 'bounceRate':
        return <span className="text-red-400 font-medium">{campaign.bounceRate}</span>;
      case 'clickRate':
        return <span className="text-neon-purple font-medium">{campaign.clickRate}</span>;
      case 'unsubscribeRate':
        return <span className="text-orange-400 font-medium">{campaign.unsubscribeRate}</span>;
      default:
        return null;
    }
  };

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

      {/* Table Controls */}
      <CampaignTableControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        columns={columns}
        onColumnToggle={handleColumnToggle}
      />

      {/* Campaigns Table */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-dark-text">All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-dark-border">
                  {visibleColumns.map((column) => (
                    <th key={column.key} className="text-left py-3 px-4 text-dark-muted font-medium whitespace-nowrap">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors cursor-pointer">
                    {visibleColumns.map((column) => (
                      <td key={column.key} className="py-4 px-4 whitespace-nowrap">
                        {renderCellValue(campaign, column.key)}
                      </td>
                    ))}
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
