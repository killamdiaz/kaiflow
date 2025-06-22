
import { useState } from "react";
import { ArrowLeft, Users, Mail, Eye, Rocket, Plus, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CampaignBuilderProps {
  onBack: () => void;
}

export function CampaignBuilder({ onBack }: CampaignBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    leads: [],
    emails: [
      { id: 1, subject: "", content: "", delay: 0 }
    ]
  });

  const steps = [
    { id: 1, title: "Campaign Setup", icon: Mail },
    { id: 2, title: "Add Leads", icon: Users },
    { id: 3, title: "Email Sequence", icon: Mail },
    { id: 4, title: "Preview & Launch", icon: Rocket }
  ];

  const addEmailStep = () => {
    const newEmail = {
      id: campaignData.emails.length + 1,
      subject: "",
      content: "",
      delay: campaignData.emails.length === 0 ? 0 : 3
    };
    setCampaignData({
      ...campaignData,
      emails: [...campaignData.emails, newEmail]
    });
  };

  const removeEmailStep = (id: number) => {
    setCampaignData({
      ...campaignData,
      emails: campaignData.emails.filter(email => email.id !== id)
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-dark-text font-medium mb-2">Campaign Name</label>
              <input
                type="text"
                className="cyber-input w-full"
                placeholder="e.g., Product Launch Outreach"
                value={campaignData.name}
                onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-dark-text font-medium mb-2">Campaign Description</label>
              <textarea
                className="cyber-input w-full h-24 resize-none"
                placeholder="Describe your campaign goals and target audience..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-dark-text font-medium mb-2">Time Zone</label>
                <select className="cyber-input w-full">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
              <div>
                <label className="block text-dark-text font-medium mb-2">Sending Schedule</label>
                <select className="cyber-input w-full">
                  <option>Business Days Only</option>
                  <option>All Days</option>
                  <option>Custom Schedule</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">Add Your Leads</h3>
              <p className="text-dark-muted mb-6">Import contacts via CSV or add them manually</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                <button className="cyber-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload CSV
                </button>
                <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-6 py-3 rounded-lg font-semibold">
                  Add Manually
                </button>
              </div>
            </div>

            <div className="cyber-card p-4">
              <h4 className="font-medium text-dark-text mb-3">CSV Format Requirements</h4>
              <div className="text-sm text-dark-muted space-y-1">
                <p>• First Name (required)</p>
                <p>• Last Name (required)</p>
                <p>• Email (required)</p>
                <p>• Company (optional)</p>
                <p>• Title (optional)</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-dark-text">Email Sequence</h3>
              <button 
                className="cyber-button"
                onClick={addEmailStep}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Follow-up
              </button>
            </div>

            <div className="space-y-4">
              {campaignData.emails.map((email, index) => (
                <Card key={email.id} className="cyber-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-dark-text">
                        {index === 0 ? "Initial Email" : `Follow-up ${index}`}
                      </CardTitle>
                      {index > 0 && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeEmailStep(email.id)}
                          className="hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {index > 0 && (
                      <div className="flex items-center space-x-2 text-sm text-dark-muted">
                        <Clock className="w-4 h-4" />
                        <span>Send {email.delay} days after previous email</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-dark-text font-medium mb-2">Subject Line</label>
                      <input
                        type="text"
                        className="cyber-input w-full"
                        placeholder="Quick question about {company}"
                        value={email.subject}
                        onChange={(e) => {
                          const updatedEmails = campaignData.emails.map(em => 
                            em.id === email.id ? {...em, subject: e.target.value} : em
                          );
                          setCampaignData({...campaignData, emails: updatedEmails});
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-dark-text font-medium mb-2">Email Content</label>
                      <textarea
                        className="cyber-input w-full h-32 resize-none"
                        placeholder="Hi {firstName},

I noticed that {company} is..."
                        value={email.content}
                        onChange={(e) => {
                          const updatedEmails = campaignData.emails.map(em => 
                            em.id === email.id ? {...em, content: e.target.value} : em
                          );
                          setCampaignData({...campaignData, emails: updatedEmails});
                        }}
                      />
                      <div className="mt-2 text-xs text-dark-muted">
                        Use personalization tokens: {'{firstName}'}, {'{lastName}'}, {'{company}'}, {'{title}'}
                      </div>
                    </div>

                    {index > 0 && (
                      <div>
                        <label className="block text-dark-text font-medium mb-2">Send Delay</label>
                        <select 
                          className="cyber-input w-48"
                          value={email.delay}
                          onChange={(e) => {
                            const updatedEmails = campaignData.emails.map(em => 
                              em.id === email.id ? {...em, delay: parseInt(e.target.value)} : em
                            );
                            setCampaignData({...campaignData, emails: updatedEmails});
                          }}
                        >
                          <option value="1">1 day later</option>
                          <option value="3">3 days later</option>
                          <option value="7">1 week later</option>
                          <option value="14">2 weeks later</option>
                        </select>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">Ready to Launch!</h3>
              <p className="text-dark-muted">Review your campaign settings before launching</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cyber-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-dark-text mb-2">Campaign</h4>
                  <p className="text-dark-muted">{campaignData.name || "Untitled Campaign"}</p>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-dark-text mb-2">Leads</h4>
                  <p className="text-neon-blue font-bold text-xl">0</p>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-dark-text mb-2">Email Steps</h4>
                  <p className="text-neon-purple font-bold text-xl">{campaignData.emails.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-8 py-3 rounded-lg font-semibold">
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview Emails
              </button>
              <button className="cyber-button px-8">
                <Rocket className="w-4 h-4 mr-2" />
                Launch Campaign
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-dark-text" />
        </button>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Campaign Builder</h1>
          <p className="text-dark-muted mt-1">Create your email sequence step by step</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 py-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep >= step.id 
                ? 'bg-neon-blue border-neon-blue text-dark-bg' 
                : 'border-dark-border text-dark-muted'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="ml-3 hidden md:block">
              <p className={`font-medium ${currentStep >= step.id ? 'text-neon-blue' : 'text-dark-muted'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px mx-4 ${currentStep > step.id ? 'bg-neon-blue' : 'bg-dark-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="cyber-card">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <button 
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            currentStep === 1 
              ? 'bg-dark-card text-dark-muted cursor-not-allowed' 
              : 'bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border'
          }`}
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        
        {currentStep < steps.length ? (
          <button 
            className="cyber-button px-6"
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          >
            Next Step
          </button>
        ) : (
          <button className="cyber-button px-6">
            <Rocket className="w-4 h-4 mr-2" />
            Launch Campaign
          </button>
        )}
      </div>
    </div>
  );
}
