
import { BarChart3, Mail, Users, TrendingUp, Play, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  const stats = [
    {
      title: "Total Campaigns",
      value: "24",
      change: "+12%",
      icon: Mail,
      color: "text-neon-blue"
    },
    {
      title: "Active Leads",
      value: "1,247",
      change: "+8%",
      icon: Users,
      color: "text-neon-purple"
    },
    {
      title: "Reply Rate",
      value: "18.5%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-neon-green"
    },
    {
      title: "Emails Sent",
      value: "12,847",
      change: "+24%",
      icon: BarChart3,
      color: "text-neon-pink"
    }
  ];

  const recentCampaigns = [
    { name: "Product Launch Outreach", status: "active", sent: 245, replies: 12, rate: "4.9%" },
    { name: "Customer Success Follow-up", status: "paused", sent: 189, replies: 23, rate: "12.2%" },
    { name: "New Feature Announcement", status: "completed", sent: 567, replies: 45, rate: "7.9%" },
    { name: "Partnership Outreach", status: "active", sent: 123, replies: 8, rate: "6.5%" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'paused': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-badge status-active';
      case 'paused': return 'status-badge status-paused';
      case 'completed': return 'status-badge bg-neon-green/20 text-neon-green border border-neon-green/30';
      default: return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-dark-muted mt-1">Monitor your cold email campaigns performance</p>
        </div>
        <button className="cyber-button">
          <Mail className="w-4 h-4 mr-2" />
          New Campaign
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="cyber-card hover:neon-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-muted text-sm font-medium">{stat.title}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl font-bold text-dark-text">{stat.value}</p>
                    <span className="text-neon-green text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-dark-bg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="cyber-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-dark-text">Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-dark-bg rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-neon-blue mx-auto mb-4" />
                <p className="text-dark-muted">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-dark-text">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg bg-dark-bg hover:bg-neon-blue/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-neon-blue" />
                <div>
                  <p className="font-medium text-dark-text">Create Campaign</p>
                  <p className="text-sm text-dark-muted">Start a new email sequence</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg bg-dark-bg hover:bg-neon-purple/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-neon-purple" />
                <div>
                  <p className="font-medium text-dark-text">Import Leads</p>
                  <p className="text-sm text-dark-muted">Upload your contact list</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 rounded-lg bg-dark-bg hover:bg-neon-green/10 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-neon-green" />
                <div>
                  <p className="font-medium text-dark-text">Email Templates</p>
                  <p className="text-sm text-dark-muted">Manage your templates</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-dark-text">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 text-dark-muted font-medium">Campaign</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Status</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Sent</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Replies</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Reply Rate</th>
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((campaign, index) => (
                  <tr key={index} className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors">
                    <td className="py-4 text-dark-text font-medium">{campaign.name}</td>
                    <td className="py-4">
                      <span className={getStatusClass(campaign.status)}>
                        {getStatusIcon(campaign.status)}
                        <span className="ml-2 capitalize">{campaign.status}</span>
                      </span>
                    </td>
                    <td className="py-4 text-dark-text">{campaign.sent}</td>
                    <td className="py-4 text-dark-text">{campaign.replies}</td>
                    <td className="py-4">
                      <span className="text-neon-blue font-medium">{campaign.rate}</span>
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
