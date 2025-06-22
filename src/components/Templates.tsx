
import { useState } from "react";
import { Plus, Search, Edit, Copy, Trash2, Eye, Star, FileText, TrendingUp, BarChart3, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const templates = [
    {
      id: 1,
      name: "Product Demo Request",
      category: "sales",
      subject: "Quick demo of {product} for {company}?",
      preview: "Hi {firstName}, I noticed {company} is in the {industry} space. We've helped similar companies increase their {metric} by 40%...",
      useCount: 24,
      replyRate: 18.5,
      starred: true,
      lastUsed: "2 hours ago"
    },
    {
      id: 2,
      name: "Partnership Outreach",
      category: "partnership",
      subject: "Partnership opportunity between {ourCompany} and {company}",
      preview: "Hi {firstName}, I've been following {company}'s growth and I'm impressed by your recent {achievement}...",
      useCount: 12,
      replyRate: 15.2,
      starred: false,
      lastUsed: "1 day ago"
    },
    {
      id: 3,
      name: "Follow-up After Demo",
      category: "followup",
      subject: "Thoughts on yesterday's demo?",
      preview: "Hi {firstName}, Thanks for taking the time to see our demo yesterday. I'd love to get your thoughts...",
      useCount: 45,
      replyRate: 32.1,
      starred: true,
      lastUsed: "3 hours ago"
    },
    {
      id: 4,
      name: "Content Collaboration",
      category: "content",
      subject: "Guest post opportunity for {company}",
      preview: "Hi {firstName}, I've been reading {company}'s blog and really enjoyed your recent post about {topic}...",
      useCount: 8,
      replyRate: 12.8,
      starred: false,
      lastUsed: "1 week ago"
    }
  ];

  const categories = [
    { key: "all", label: "All Templates", count: templates.length },
    { key: "sales", label: "Sales", count: templates.filter(t => t.category === "sales").length },
    { key: "partnership", label: "Partnership", count: templates.filter(t => t.category === "partnership").length },
    { key: "followup", label: "Follow-up", count: templates.filter(t => t.category === "followup").length },
    { key: "content", label: "Content", count: templates.filter(t => t.category === "content").length }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30';
      case 'partnership': return 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30';
      case 'followup': return 'bg-neon-green/20 text-neon-green border border-neon-green/30';
      case 'content': return 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Templates</h1>
          <p className="text-dark-muted mt-1">Create and manage your email templates</p>
        </div>
        <button className="cyber-button">
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Total Templates</p>
                <p className="text-2xl font-bold text-dark-text mt-1">{templates.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-blue/20">
                <FileText className="w-6 h-6 text-neon-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Avg Reply Rate</p>
                <p className="text-2xl font-bold text-dark-text mt-1">19.7%</p>
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
                <p className="text-dark-muted text-sm font-medium">Most Used</p>
                <p className="text-lg font-bold text-dark-text mt-1">Follow-up Demo</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-purple/20">
                <Star className="w-6 h-6 text-neon-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-muted text-sm font-medium">Total Uses</p>
                <p className="text-2xl font-bold text-dark-text mt-1">89</p>
              </div>
              <div className="p-3 rounded-lg bg-neon-pink/20">
                <BarChart3 className="w-6 h-6 text-neon-pink" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-1 bg-dark-card rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.key
                ? 'bg-neon-blue text-dark-bg shadow-neon-blue'
                : 'text-dark-muted hover:text-dark-text'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <Card className="cyber-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-muted" />
            <input
              type="text"
              placeholder="Search templates by name, subject, or content..."
              className="cyber-input pl-10 w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="cyber-card hover:neon-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-dark-text">{template.name}</CardTitle>
                    {template.starred && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <span className={`status-badge ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-dark-card">
                  <MoreHorizontal className="w-4 h-4 text-dark-muted" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-dark-muted text-sm font-medium mb-1">Subject:</p>
                <p className="text-dark-text font-medium">{template.subject}</p>
              </div>
              
              <div>
                <p className="text-dark-muted text-sm font-medium mb-1">Preview:</p>
                <p className="text-dark-text text-sm line-clamp-3">{template.preview}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dark-border">
                <div className="text-center">
                  <p className="text-dark-muted text-xs">Uses</p>
                  <p className="text-dark-text font-semibold">{template.useCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-dark-muted text-xs">Reply Rate</p>
                  <p className="text-neon-green font-semibold">{template.replyRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-dark-muted text-xs">Last Used</p>
                  <p className="text-dark-text text-xs">{template.lastUsed}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-dark-border text-dark-muted hover:bg-dark-card">
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" className="border-dark-border text-dark-muted hover:bg-dark-card">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="cyber-card text-center py-12">
          <CardContent>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">No templates found</h3>
              <p className="text-dark-muted mb-6">
                {selectedCategory === "all" 
                  ? "Create your first email template to get started."
                  : `No ${selectedCategory} templates found. Create one to get started.`
                }
              </p>
              <button className="cyber-button">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
