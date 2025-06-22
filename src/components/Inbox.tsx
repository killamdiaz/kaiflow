
import { useState } from "react";
import { Search, Filter, Archive, Trash2, Star, Reply, Forward } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Inbox() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const emails = [
    {
      id: 1,
      from: "john.smith@acme.com",
      subject: "Re: Partnership Opportunity",
      preview: "Thanks for reaching out! I'm definitely interested in learning more about your solution...",
      campaign: "Product Launch Outreach",
      status: "replied",
      timestamp: "2 hours ago",
      starred: true
    },
    {
      id: 2,
      from: "sarah.j@techstart.io",
      subject: "Re: Quick question about your growth",
      preview: "Hi! Yes, we're currently looking for solutions like yours. Could we schedule a call?",
      campaign: "Growth Outreach",
      status: "interested",
      timestamp: "5 hours ago",
      starred: false
    },
    {
      id: 3,
      from: "mike.chen@globalcorp.com",
      subject: "Re: Proposal for Global Corp",
      preview: "Not interested at this time, but please keep us in mind for future opportunities.",
      campaign: "Enterprise Outreach",
      status: "not_interested",
      timestamp: "1 day ago",
      starred: false
    },
    {
      id: 4,
      from: "emma@innovate.co",
      subject: "Out of office auto-reply",
      preview: "I'm currently out of office and will return on Monday. For urgent matters...",
      campaign: "Sales Follow-up",
      status: "auto_reply",
      timestamp: "2 days ago",
      starred: false
    }
  ];

  const filters = [
    { key: "all", label: "All Replies", count: emails.length },
    { key: "interested", label: "Interested", count: emails.filter(e => e.status === "interested").length },
    { key: "replied", label: "Replied", count: emails.filter(e => e.status === "replied").length },
    { key: "not_interested", label: "Not Interested", count: emails.filter(e => e.status === "not_interested").length },
    { key: "auto_reply", label: "Auto Replies", count: emails.filter(e => e.status === "auto_reply").length }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'interested': return 'status-badge status-active';
      case 'replied': return 'status-badge status-pending';
      case 'not_interested': return 'status-badge bg-red-500/20 text-red-400 border border-red-500/30';
      case 'auto_reply': return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
      default: return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'interested': return 'Interested';
      case 'replied': return 'Replied';
      case 'not_interested': return 'Not Interested';
      case 'auto_reply': return 'Auto Reply';
      default: return status;
    }
  };

  const filteredEmails = activeFilter === "all" 
    ? emails 
    : emails.filter(email => email.status === activeFilter);

  const handleSelectEmail = (emailId: number) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(
      selectedEmails.length === filteredEmails.length 
        ? [] 
        : filteredEmails.map(email => email.id)
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Inbox</h1>
          <p className="text-dark-muted mt-1">Manage replies to your cold email campaigns</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-2 rounded-lg font-semibold">
            <Archive className="w-4 h-4 mr-2" />
            Archive
          </button>
          <button className="cyber-button">
            <Reply className="w-4 h-4 mr-2" />
            Quick Reply
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-dark-card rounded-lg p-1">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeFilter === filter.key
                ? 'bg-neon-blue text-dark-bg shadow-neon-blue'
                : 'text-dark-muted hover:text-dark-text'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Search and Actions */}
      <Card className="cyber-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
              <input
                type="text"
                placeholder="Search emails by sender, subject, or campaign..."
                className="cyber-input pl-10 w-full"
              />
            </div>
            
            {selectedEmails.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-dark-muted">
                  {selectedEmails.length} selected
                </span>
                <Button size="sm" variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                  <Star className="w-3 h-3 mr-1" />
                  Star
                </Button>
                <Button size="sm" variant="outline" className="border-dark-border text-dark-muted hover:bg-dark-card">
                  <Archive className="w-3 h-3 mr-1" />
                  Archive
                </Button>
                <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      <Card className="cyber-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-dark-text">
              {activeFilter === "all" ? "All Replies" : filters.find(f => f.key === activeFilter)?.label}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-dark-border"
              />
              <span className="text-sm text-dark-muted">Select all</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className="flex items-start space-x-4 p-4 rounded-lg bg-dark-bg hover:bg-dark-card/50 transition-colors cursor-pointer border border-transparent hover:border-dark-border"
              >
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(email.id)}
                  onChange={() => handleSelectEmail(email.id)}
                  className="w-4 h-4 rounded border-dark-border mt-1"
                />
                
                <button
                  className={`mt-1 transition-colors ${
                    email.starred ? 'text-yellow-400' : 'text-dark-muted hover:text-yellow-400'
                  }`}
                >
                  <Star className="w-4 h-4" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-dark-text truncate">{email.from}</h3>
                      <span className={getStatusClass(email.status)}>
                        {getStatusLabel(email.status)}
                      </span>
                    </div>
                    <span className="text-sm text-dark-muted">{email.timestamp}</span>
                  </div>
                  
                  <p className="font-medium text-dark-text mb-1 truncate">{email.subject}</p>
                  <p className="text-dark-muted text-sm mb-2 line-clamp-2">{email.preview}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-muted bg-dark-card px-2 py-1 rounded">
                      Campaign: {email.campaign}
                    </span>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                        <Reply className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button size="sm" variant="outline" className="border-dark-border text-dark-muted hover:bg-dark-card">
                        <Forward className="w-3 h-3 mr-1" />
                        Forward
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEmails.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">No emails found</h3>
              <p className="text-dark-muted">
                {activeFilter === "all" 
                  ? "Your inbox is empty. Start a campaign to begin receiving replies!"
                  : `No ${filters.find(f => f.key === activeFilter)?.label.toLowerCase()} found.`
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
