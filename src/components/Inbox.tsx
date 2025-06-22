import { useState } from "react";
import { Search, Filter, Archive, Star, Reply, Forward, Trash2, Tag, CheckCircle, XCircle, Clock, TrendingUp, Users, Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  campaign: string;
  status: 'replied' | 'opened' | 'bounced' | 'pending';
  starred: boolean;
  date: string;
  sentiment: 'interested' | 'polite-no' | 'info-requested' | 'neutral';
}

interface Stat {
  title: string;
  value: string;
  icon: any;
  bgColor: string;
  iconColor: string;
}

export function Inbox() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const emails: Email[] = [
    {
      id: 1,
      sender: "John Smith",
      senderEmail: "john.smith@acme.com",
      subject: "Re: Quick question about Acme Corp",
      preview: "Hi, thanks for reaching out! We are definitely interested in exploring this further...",
      campaign: "Q1 Product Launch",
      status: "replied",
      starred: true,
      date: "2 hours ago",
      sentiment: 'interested'
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      senderEmail: "sarah.j@techstart.io",
      subject: "Partnership Opportunity",
      preview: "Hi, I appreciate you thinking of us, but we are not looking for new partners at the moment...",
      campaign: "Partnership Outreach",
      status: "replied",
      starred: false,
      date: "1 day ago",
      sentiment: 'polite-no'
    },
    {
      id: 3,
      sender: "Mike Chen",
      senderEmail: "m.chen@globalcorp.com",
      subject: "New Feature Announcement",
      preview: "Hi, can you send me more information about the new feature and pricing?",
      campaign: "New Feature Campaign",
      status: "replied",
      starred: false,
      date: "3 days ago",
      sentiment: 'info-requested'
    },
    {
      id: 4,
      sender: "Emma Davis",
      senderEmail: "emma@innovate.co",
      subject: "Product Demo Request",
      preview: "Your email could not be delivered because the domain was not found or the recipient address was incorrect...",
      campaign: "Product Demo Campaign",
      status: "bounced",
      starred: false,
      date: "1 week ago",
      sentiment: 'neutral'
    },
    {
      id: 5,
      sender: "David Lee",
      senderEmail: "david.lee@example.com",
      subject: "Follow-up on our meeting",
      preview: "Hi, just following up on our meeting last week. Let me know if you have any questions...",
      campaign: "Customer Success Follow-up",
      status: "opened",
      starred: false,
      date: "2 weeks ago",
      sentiment: 'neutral'
    }
  ];

  const stats: Stat[] = [
    {
      title: "Total Replies",
      value: "247",
      icon: MessageSquare,
      bgColor: "bg-neon-blue/20",
      iconColor: "text-neon-blue"
    },
    {
      title: "Opened",
      value: "893",
      icon: Mail,
      bgColor: "bg-neon-green/20",
      iconColor: "text-neon-green"
    },
    {
      title: "Bounced",
      value: "23",
      icon: XCircle,
      bgColor: "bg-red-500/20",
      iconColor: "text-red-400"
    },
    {
      title: "Pending",
      value: "124",
      icon: Clock,
      bgColor: "bg-orange-500/20",
      iconColor: "text-orange-400"
    }
  ];

  const handleSelectEmail = (emailId: number) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(
      selectedEmails.length === emails.length ? [] : emails.map(email => email.id)
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'replied': return <Reply className="w-4 h-4" />;
      case 'opened': return <Mail className="w-4 h-4" />;
      case 'bounced': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'replied': return 'status-badge status-active';
      case 'opened': return 'status-badge bg-neon-green/20 text-neon-green border border-neon-green/30';
      case 'bounced': return 'status-badge bg-red-500/20 text-red-400 border border-red-500/30';
      case 'pending': return 'status-badge status-paused';
      default: return 'status-badge bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  if (selectedEmail) {
    return (
      <div className="p-6 space-y-6">
        {/* Back to inbox header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedEmail(null)}
            className="cyber-button"
          >
            ← Back to Inbox
          </button>
          <div>
            <h1 className="text-2xl font-bold gradient-text">{selectedEmail.subject}</h1>
            <p className="text-dark-muted">From: {selectedEmail.sender}</p>
          </div>
        </div>

        {/* Email thread */}
        <Card className="cyber-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-dark-text">Email Thread</CardTitle>
                <p className="text-dark-muted text-sm mt-1">Campaign: {selectedEmail.campaign}</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Reply Sentiment Detection */}
                <span className={`status-badge ${getSentimentClass(selectedEmail.sentiment)}`}>
                  {getSentimentIcon(selectedEmail.sentiment)}
                  <span className="ml-2">{selectedEmail.sentiment}</span>
                </span>
                <span className={getStatusClass(selectedEmail.status)}>
                  {getStatusIcon(selectedEmail.status)}
                  <span className="ml-2 capitalize">{selectedEmail.status}</span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Original email */}
            <div className="bg-dark-bg p-4 rounded-lg border-l-4 border-neon-blue">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium text-dark-text">You</p>
                <p className="text-dark-muted text-sm">{selectedEmail.date}</p>
              </div>
              <p className="text-dark-text">
                Hi {selectedEmail.sender.split(' ')[0]},
                <br /><br />
                I noticed your company is expanding into new markets. We've helped similar companies increase their lead generation by 40% using our automated outreach platform.
                <br /><br />
                Would you be interested in a quick 15-minute demo this week?
                <br /><br />
                Best regards,<br />
                Your Name
              </p>
            </div>

            {/* Reply */}
            <div className="bg-dark-card p-4 rounded-lg border-l-4 border-neon-green">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium text-dark-text">{selectedEmail.sender}</p>
                <p className="text-dark-muted text-sm">{selectedEmail.date}</p>
              </div>
              <p className="text-dark-text">{selectedEmail.preview}</p>
            </div>

            {/* Reply actions */}
            <div className="flex space-x-3">
              <button className="cyber-button flex-1">
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </button>
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-2 rounded-lg font-semibold">
                <Forward className="w-4 h-4 mr-2 inline" />
                Forward
              </button>
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-2 rounded-lg font-semibold">
                <Archive className="w-4 h-4 mr-2 inline" />
                Archive
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Inbox</h1>
          <p className="text-dark-muted mt-1">Manage replies and conversations from your campaigns</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-2 rounded-lg font-semibold">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Sentiment
          </button>
          <button className="cyber-button">
            <Archive className="w-4 h-4 mr-2" />
            Archive Selected
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="cyber-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-muted text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-dark-text mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="cyber-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
              <input
                type="text"
                placeholder="Search emails by sender, subject, or campaign..."
                className="cyber-input pl-10 w-full"
              />
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="cyber-input w-auto"
            >
              <option value="all">All Status</option>
              <option value="replied">Replied</option>
              <option value="opened">Opened</option>
              <option value="bounced">Bounced</option>
            </select>

            <select className="cyber-input w-auto">
              <option value="all">All Sentiments</option>
              <option value="interested">Interested</option>
              <option value="polite-no">Polite No</option>
              <option value="info-requested">Info Requested</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Emails Table */}
      <Card className="cyber-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-dark-text">Recent Replies</CardTitle>
            {selectedEmails.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-dark-muted">
                  {selectedEmails.length} selected
                </span>
                <button className="cyber-button py-2 px-4 text-sm">
                  Archive Selected
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
                      checked={selectedEmails.length === emails.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-dark-border"
                    />
                  </th>
                  <th className="text-left py-3 text-dark-muted font-medium">Sender</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Subject</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Campaign</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Status</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Sentiment</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Date</th>
                  <th className="text-left py-3 text-dark-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr 
                    key={email.id} 
                    className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(email.id)}
                        onChange={() => handleSelectEmail(email.id)}
                        className="w-4 h-4 rounded border-dark-border"
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        {email.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        <div>
                          <p className="font-medium text-dark-text">{email.sender}</p>
                          <p className="text-sm text-dark-muted">{email.senderEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-dark-text">{email.subject}</p>
                        <p className="text-sm text-dark-muted line-clamp-1">{email.preview}</p>
                      </div>
                    </td>
                    <td className="py-4 text-dark-text">{email.campaign}</td>
                    <td className="py-4">
                      <span className={getStatusClass(email.status)}>
                        {getStatusIcon(email.status)}
                        <span className="ml-2 capitalize">{email.status}</span>
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`status-badge ${getSentimentClass(email.sentiment)}`}>
                        {getSentimentIcon(email.sentiment)}
                        <span className="ml-2">{email.sentiment}</span>
                      </span>
                    </td>
                    <td className="py-4 text-dark-muted">{email.date}</td>
                    <td className="py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="hover:bg-dark-card">
                          <Reply className="w-4 h-4 text-dark-muted" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-dark-card">
                          <Archive className="w-4 h-4 text-dark-muted" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-dark-card">
                          <Trash2 className="w-4 h-4 text-dark-muted" />
                        </Button>
                      </div>
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

  function getSentimentIcon(sentiment: string) {
    switch (sentiment) {
      case 'interested': return '😊';
      case 'polite-no': return '😔';
      case 'info-requested': return '❓';
      default: return '😐';
    }
  }

  function getSentimentClass(sentiment: string) {
    switch (sentiment) {
      case 'interested': return 'bg-neon-green/20 text-neon-green border border-neon-green/30';
      case 'polite-no': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'info-requested': return 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  }
}
