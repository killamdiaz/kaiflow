import { useState } from "react";
import { Plus, Upload, Download, Filter, Search, MoreHorizontal, Tag, Users, Mail, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadQualityScore } from "./LeadQualityScore";
import { LeadFatigueTracker } from "./LeadFatigueTracker";

export function Leads() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  
  const leads = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@acme.com",
      company: "Acme Corp",
      title: "CEO",
      status: "new",
      lastActivity: "2 hours ago",
      tags: ["Enterprise", "Hot Lead"],
      qualityScore: 5,
      qualityFactors: {
        companySize: 250,
        funding: "Series B",
        relevance: 5,
        engagement: 4
      },
      campaignCount: 1,
      lastContactDays: 0
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson", 
      email: "sarah.j@techstart.io",
      company: "TechStart",
      title: "CTO",
      status: "contacted",
      lastActivity: "1 day ago",
      tags: ["Startup", "Tech"],
      qualityScore: 4,
      qualityFactors: {
        companySize: 15,
        funding: "Seed",
        relevance: 4,
        engagement: 5
      },
      campaignCount: 2,
      lastContactDays: 5
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Chen",
      email: "m.chen@globalcorp.com",
      company: "Global Corp",
      title: "Marketing Director",
      status: "replied",
      lastActivity: "3 days ago", 
      tags: ["Enterprise", "Marketing"],
      qualityScore: 3,
      qualityFactors: {
        companySize: 500,
        funding: "Public",
        relevance: 3,
        engagement: 3
      },
      campaignCount: 4,
      lastContactDays: 15
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Davis",
      email: "emma@innovate.co",
      company: "Innovate Co",
      title: "VP Sales",
      status: "bounced",
      lastActivity: "1 week ago",
      tags: ["Sales", "B2B"],
      qualityScore: 2,
      qualityFactors: {
        companySize: 50,
        funding: "Bootstrap",
        relevance: 2,
        engagement: 1
      },
      campaignCount: 6,
      lastContactDays: 8
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new': return 'status-badge bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'contacted': return 'status-badge status-pending';
      case 'replied': return 'status-badge status-active';
      case 'bounced': return 'status-badge bg-red-500/20 text-red-400 border border-red-500/30';
      default: return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const handleSelectLead = (leadId: number) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(
      selectedLeads.length === leads.length ? [] : leads.map(lead => lead.id)
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Leads</h1>
          <p className="text-dark-muted mt-1">Manage your prospects and contact database</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-2 rounded-lg font-semibold">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </button>
          <button className="cyber-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Total Leads</p>
                <p className="text-2xl font-bold text-dark-text mt-1">1,247</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-blue/20">
                <Users className="w-6 h-6 text-neon-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Hot Leads</p>
                <p className="text-2xl font-bold text-dark-text mt-1">83</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-green/20">
                <TrendingUp className="w-6 h-6 text-neon-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Replied</p>
                <p className="text-2xl font-bold text-dark-text mt-1">156</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-purple/20">
                <Mail className="w-6 h-6 text-neon-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Avg Quality Score</p>
                <p className="text-2xl font-bold text-dark-text mt-1">3.5/5</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-pink/20">
                <TrendingUp className="w-6 h-6 text-neon-pink" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="cyber-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
              <input
                type="text"
                placeholder="Search leads by name, email, or company..."
                className="cyber-input pl-10 w-full"
              />
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-3 rounded-lg font-semibold flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-3 rounded-lg font-semibold flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags
              </button>
              
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-3 rounded-lg font-semibold flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="cyber-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-dark-text">All Leads</CardTitle>
            {selectedLeads.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-dark-muted">
                  {selectedLeads.length} selected
                </span>
                <button className="cyber-button py-2 px-4 text-sm">
                  Add to Campaign
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.length === leads.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-dark-border"
                    />
                  </th>
                  <th className="text-left py-3 text-dark-muted font-medium">Name</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Email</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Company</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Title</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Quality</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Fatigue</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Status</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Tags</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Last Activity</th>
                  <th className="text-left py-3 text-dark-muted font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleSelectLead(lead.id)}
                        className="w-4 h-4 rounded border-dark-border"
                      />
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-dark-text">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </td>
                    <td className="py-4 text-dark-text">{lead.email}</td>
                    <td className="py-4 text-dark-text">{lead.company}</td>
                    <td className="py-4 text-dark-muted">{lead.title}</td>
                    <td className="py-4">
                      <LeadQualityScore 
                        score={lead.qualityScore} 
                        factors={lead.qualityFactors}
                      />
                    </td>
                    <td className="py-4">
                      <LeadFatigueTracker 
                        campaignCount={lead.campaignCount}
                        lastContactDays={lead.lastContactDays}
                        replyStatus={lead.status === "replied" ? "replied" : "no-reply"}
                      />
                    </td>
                    <td className="py-4">
                      <span className={getStatusClass(lead.status)}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full border border-neon-blue/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-dark-muted text-sm">{lead.lastActivity}</td>
                    <td className="py-4">
                      <Button variant="ghost" size="icon" className="hover:bg-dark-card">
                        <MoreHorizontal className="w-4 h-4 text-dark-muted" />
                      </Button>
                    </td>
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
