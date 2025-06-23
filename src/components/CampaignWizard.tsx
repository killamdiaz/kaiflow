import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, Upload, Eye, Rocket, Save, Bot, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmailFeedbackPanel } from "./EmailFeedbackPanel";
import { ABTestToggle } from "./ABTestToggle";
import { SmartSendTime } from "./SmartSendTime";

interface CampaignWizardProps {
  onBack: () => void;
}

interface CampaignData {
  name: string;
  description: string;
  emails: Array<{
    id: number;
    subject: string;
    content: string;
    delay: number;
  }>;
  leads: Array<{
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  }>;
  selectedMailbox: string;
}

export function CampaignWizard({ onBack }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: "",
    description: "",
    emails: [{ id: 1, subject: "", content: "", delay: 0 }],
    leads: [],
    selectedMailbox: ""
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [showEmailFeedback, setShowEmailFeedback] = useState(false);
  const [selectedEmailForFeedback, setSelectedEmailForFeedback] = useState<any>(null);

  const steps = [
    { id: 1, title: "Name Campaign", description: "Set up basic details" },
    { id: 2, title: "Create Sequence", description: "Build your email flow" },
    { id: 3, title: "Add Leads", description: "Import your contacts" },
    { id: 4, title: "Review Campaign", description: "Final check" },
    { id: 5, title: "Launch", description: "Go live!" }
  ];

  const mailboxes = [
    { id: "1", email: "john@company.com", provider: "Gmail", status: "active" },
    { id: "2", email: "sales@company.com", provider: "Outlook", status: "active" },
    { id: "3", email: "outreach@company.com", provider: "Gmail", status: "warming" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const launchCampaign = () => {
    setIsLaunched(true);
    setCurrentStep(5);
  };

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

  const handleABTestToggle = (emailId: number, enabled: boolean) => {
    console.log(`A/B testing ${enabled ? 'enabled' : 'disabled'} for email ${emailId}`);
  };

  const handleSmartSendTimeToggle = (enabled: boolean, settings: any) => {
    console.log('Smart send time:', enabled, settings);
  };

  const openEmailFeedback = (email: any) => {
    setSelectedEmailForFeedback(email);
    setShowEmailFeedback(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-2">Name Your Campaign</h2>
              <p className="text-dark-muted">Give your campaign a memorable name and description</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-dark-text font-medium mb-2">Campaign Name *</label>
                <input
                  type="text"
                  className="cyber-input w-full"
                  placeholder="e.g., Q1 Product Launch Outreach"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-dark-text font-medium mb-2">Description (optional)</label>
                <textarea
                  className="cyber-input w-full h-24 resize-none"
                  placeholder="Describe your campaign goals, target audience, and key messaging..."
                  value={campaignData.description}
                  onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-dark-text font-medium mb-2">Select Mailbox *</label>
                <div className="space-y-2">
                  {mailboxes.map((mailbox) => (
                    <div
                      key={mailbox.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        campaignData.selectedMailbox === mailbox.id
                          ? 'border-neon-blue bg-neon-blue/10'
                          : 'border-dark-border bg-dark-bg hover:border-dark-muted'
                      }`}
                      onClick={() => setCampaignData({...campaignData, selectedMailbox: mailbox.id})}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-neon-blue" />
                          <div>
                            <p className="font-medium text-dark-text">{mailbox.email}</p>
                            <p className="text-sm text-dark-muted">{mailbox.provider}</p>
                          </div>
                        </div>
                        <span className={`status-badge ${
                          mailbox.status === 'active' ? 'status-active' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                          {mailbox.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full p-4 border-2 border-dashed border-dark-border rounded-lg text-center text-dark-muted hover:border-neon-blue hover:text-neon-blue transition-colors">
                    + Connect New Mailbox
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-2">Create Email Sequence</h2>
              <p className="text-dark-muted">Build your multi-step email flow with personalization</p>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-dark-text">Email Steps</h3>
              <button onClick={addEmailStep} className="cyber-button">
                <Sparkles className="w-4 h-4 mr-2" />
                Add Follow-up
              </button>
            </div>

            <div className="space-y-4">
              {campaignData.emails.map((email, index) => (
                <Card key={email.id} className="cyber-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-dark-text flex items-center">
                        <div className="w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center text-dark-bg font-bold mr-3">
                          {index + 1}
                        </div>
                        {index === 0 ? "Initial Email" : `Follow-up ${index}`}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {index > 0 && (
                          <div className="text-sm text-neon-blue">
                            Send after {email.delay} days
                          </div>
                        )}
                        <button 
                          onClick={() => openEmailFeedback(email)}
                          className="text-neon-purple hover:text-neon-blue transition-colors text-sm flex items-center"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Improve Copy
                        </button>
                      </div>
                    </div>
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
                        placeholder="Hi {firstName},&#10;&#10;I noticed that {company} is..."
                        value={email.content}
                        onChange={(e) => {
                          const updatedEmails = campaignData.emails.map(em => 
                            em.id === email.id ? {...em, content: e.target.value} : em
                          );
                          setCampaignData({...campaignData, emails: updatedEmails});
                        }}
                      />
                      <div className="mt-2 text-xs text-dark-muted">
                        Available tokens: {'{firstName}'}, {'{lastName}'}, {'{company}'}, {'{title}'}
                      </div>
                    </div>

                    {/* A/B Testing Toggle */}
                    <ABTestToggle emailId={email.id} onToggle={handleABTestToggle} />

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

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-2">Add Your Leads</h2>
              <p className="text-dark-muted">Import contacts via CSV or add them manually</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="cyber-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-dark-bg" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-text mb-2">Upload CSV</h3>
                  <p className="text-dark-muted mb-6">Import your leads from a CSV file</p>
                  <button className="cyber-button w-full">
                    Choose File
                  </button>
                  <div className="mt-4 text-sm text-dark-muted">
                    <p>Required columns: firstName, lastName, email</p>
                    <p>Optional: company, title, phone</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-dark-bg" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-text mb-2">AI Lead Finder</h3>
                  <p className="text-dark-muted mb-6">Let KAIA find leads for you</p>
                  <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-6 py-3 rounded-lg font-semibold w-full">
                    Ask KAIA
                  </button>
                  <div className="mt-4 text-sm text-dark-muted">
                    <p>AI-powered lead discovery</p>
                    <p>Based on your target criteria</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-dark-muted">
                Current leads: <span className="text-neon-blue font-semibold">{campaignData.leads.length}</span>
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-2">Review Your Campaign</h2>
              <p className="text-dark-muted">Double-check everything before launching</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="cyber-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-dark-text mb-2">Campaign</h4>
                  <p className="text-neon-blue font-bold">{campaignData.name || "Untitled Campaign"}</p>
                  <p className="text-sm text-dark-muted mt-1">{campaignData.description || "No description"}</p>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-dark-text mb-2">Email Steps</h4>
                  <p className="text-neon-purple font-bold text-xl">{campaignData.emails.length}</p>
                  <p className="text-sm text-dark-muted mt-1">Sequence length</p>
                </CardContent>
              </Card>
              
              <Card className="cyber-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-dark-text mb-2">Total Leads</h4>
                  <p className="text-neon-green font-bold text-xl">{campaignData.leads.length}</p>
                  <p className="text-sm text-dark-muted mt-1">Ready to contact</p>
                </CardContent>
              </Card>
            </div>

            {/* Smart Send Time Optimization */}
            <SmartSendTime onToggle={handleSmartSendTimeToggle} />

            <div className="flex justify-center space-x-4">
              <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-8 py-3 rounded-lg font-semibold">
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview Emails
              </button>
              <button 
                className="cyber-button px-8"
                onClick={launchCampaign}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Launch Campaign
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="w-24 h-24 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-dark-bg" />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-4">Campaign Launched Successfully! 🚀</h2>
              <p className="text-dark-muted text-lg">
                Your campaign "{campaignData.name}" is now live and emails will be sent according to your schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="cyber-card p-4">
                <div className="text-neon-blue font-bold text-2xl">{campaignData.emails.length}</div>
                <div className="text-dark-muted text-sm">Email Steps</div>
              </div>
              <div className="cyber-card p-4">
                <div className="text-neon-purple font-bold text-2xl">{campaignData.leads.length}</div>
                <div className="text-dark-muted text-sm">Total Leads</div>
              </div>
              <div className="cyber-card p-4">
                <div className="text-neon-green font-bold text-2xl">0</div>
                <div className="text-dark-muted text-sm">Emails Sent</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                className="cyber-button px-8"
                onClick={() => window.location.href = '/'}
              >
                View Dashboard
              </button>
              <button 
                className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-8 py-3 rounded-lg font-semibold"
                onClick={() => window.location.href = '/campaigns'}
              >
                View Campaign
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Email Feedback Panel */}
      <EmailFeedbackPanel 
        isOpen={showEmailFeedback}
        onClose={() => setShowEmailFeedback(false)}
        emailContent={selectedEmailForFeedback?.content || ""}
        subject={selectedEmailForFeedback?.subject || ""}
      />

      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-dark-card rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-dark-text" />
        </button>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Campaign Wizard</h1>
          <p className="text-dark-muted mt-1">Create your email sequence step by step</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center space-x-4 py-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'mr-8' : ''}`}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-neon-blue border-neon-blue text-dark-bg shadow-neon-blue' 
                  : currentStep === step.id - 1
                  ? 'border-neon-blue/50 text-neon-blue'
                  : 'border-dark-border text-dark-muted'
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span className="font-bold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`font-medium text-sm ${currentStep >= step.id ? 'text-neon-blue' : 'text-dark-muted'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-dark-muted hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px ${currentStep > step.id ? 'bg-neon-blue' : 'bg-dark-border'} hidden md:block`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="cyber-card">
        <CardContent className="p-8 min-h-[500px]">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="flex justify-between max-w-4xl mx-auto">
          <button 
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
              currentStep === 1 
                ? 'bg-dark-card text-dark-muted cursor-not-allowed' 
                : 'bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border'
            }`}
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <div className="flex space-x-3">
            <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-6 py-3 rounded-lg font-semibold flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>
            
            <button 
              className="cyber-button px-6 flex items-center"
              onClick={nextStep}
              disabled={currentStep === steps.length}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
