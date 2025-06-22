
import { useState } from "react";
import { Save, Mail, Clock, Globe, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Settings() {
  const [activeTab, setActiveTab] = useState("smtp");
  
  const tabs = [
    { key: "smtp", label: "SMTP Configuration", icon: Mail },
    { key: "limits", label: "Sending Limits", icon: Clock },
    { key: "schedule", label: "Schedule", icon: Globe },
    { key: "security", label: "Security", icon: Shield },
    { key: "notifications", label: "Notifications", icon: Bell }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "smtp":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">SMTP Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark-text font-medium mb-2">SMTP Host</label>
                  <input
                    type="text"
                    className="cyber-input w-full"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Port</label>
                  <input
                    type="number"
                    className="cyber-input w-full"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Username</label>
                  <input
                    type="email"
                    className="cyber-input w-full"
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Password</label>
                  <input
                    type="password"
                    className="cyber-input w-full"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-dark-border" />
                  <label className="text-dark-text">Use SSL/TLS encryption</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-dark-border" />
                  <label className="text-dark-text">Enable SMTP authentication</label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dark-border">
              <h4 className="font-semibold text-dark-text mb-3">Connected Accounts</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-dark-bg" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-text">john@company.com</p>
                      <p className="text-sm text-dark-muted">Connected via Gmail</p>
                    </div>
                  </div>
                  <span className="status-badge status-active">Active</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "limits":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Daily Sending Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark-text font-medium mb-2">Emails per day</label>
                  <input
                    type="number"
                    className="cyber-input w-full"
                    placeholder="200"
                    defaultValue="200"
                  />
                  <p className="text-sm text-dark-muted mt-1">Recommended: 200-500 for new domains</p>
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Delay between emails (seconds)</label>
                  <input
                    type="number"
                    className="cyber-input w-full"
                    placeholder="30"
                    defaultValue="30"
                  />
                  <p className="text-sm text-dark-muted mt-1">Minimum: 10 seconds</p>
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Max emails per hour</label>
                  <input
                    type="number"
                    className="cyber-input w-full"
                    placeholder="50"
                    defaultValue="50"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Warm-up period (days)</label>
                  <input
                    type="number"
                    className="cyber-input w-full"
                    placeholder="14"
                    defaultValue="14"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dark-border">
              <h4 className="font-semibold text-dark-text mb-4">Current Usage</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="cyber-card p-4">
                  <p className="text-dark-muted text-sm">Today</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-2xl font-bold text-neon-blue">147</p>
                    <p className="text-dark-muted">/ 200</p>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mt-2">
                    <div className="bg-neon-blue h-2 rounded-full" style={{ width: '73.5%' }}></div>
                  </div>
                </div>
                
                <div className="cyber-card p-4">
                  <p className="text-dark-muted text-sm">This Hour</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-2xl font-bold text-neon-green">23</p>
                    <p className="text-dark-muted">/ 50</p>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mt-2">
                    <div className="bg-neon-green h-2 rounded-full" style={{ width: '46%' }}></div>
                  </div>
                </div>
                
                <div className="cyber-card p-4">
                  <p className="text-dark-muted text-sm">This Week</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-2xl font-bold text-neon-purple">1,024</p>
                    <p className="text-dark-muted">/ 1,400</p>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mt-2">
                    <div className="bg-neon-purple h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Sending Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark-text font-medium mb-2">Time Zone</label>
                  <select className="cyber-input w-full">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">Sending Days</label>
                  <select className="cyber-input w-full">
                    <option>Business Days Only (Mon-Fri)</option>
                    <option>All Days</option>
                    <option>Custom Schedule</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-dark-text mb-4">Sending Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-dark-text font-medium mb-2">Start Time</label>
                  <input
                    type="time"
                    className="cyber-input w-full"
                    defaultValue="09:00"
                  />
                </div>
                <div>
                  <label className="block text-dark-text font-medium mb-2">End Time</label>
                  <input
                    type="time"
                    className="cyber-input w-full"
                    defaultValue="17:00"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-dark-text mb-4">Weekly Schedule</h4>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-dark-border"
                        defaultChecked={!['Saturday', 'Sunday'].includes(day)}
                      />
                      <span className="text-dark-text font-medium">{day}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-dark-muted">
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <div>
                    <p className="font-medium text-dark-text">Two-Factor Authentication</p>
                    <p className="text-sm text-dark-muted">Add an extra layer of security to your account</p>
                  </div>
                  <button className="cyber-button py-2 px-4 text-sm">Enable</button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <div>
                    <p className="font-medium text-dark-text">Login Notifications</p>
                    <p className="text-sm text-dark-muted">Get notified when someone logs into your account</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-border" defaultChecked />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <div>
                    <p className="font-medium text-dark-text">Session Timeout</p>
                    <p className="text-sm text-dark-muted">Automatically log out after inactivity</p>
                  </div>
                  <select className="cyber-input w-32">
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>8 hours</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dark-border">
              <h4 className="font-semibold text-dark-text mb-4">API Access</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <div>
                    <p className="font-medium text-dark-text">API Key</p>
                    <p className="text-sm text-dark-muted">••••••••••••••••••••••••••••••••</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-3 py-2 rounded text-sm">
                      Copy
                    </button>
                    <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-3 py-2 rounded text-sm">
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { title: "Campaign Completed", desc: "When a campaign finishes sending all emails" },
                  { title: "New Replies", desc: "When someone replies to your emails" },
                  { title: "Bounce Notifications", desc: "When emails bounce or fail to deliver" },
                  { title: "Daily Reports", desc: "Daily summary of your campaign performance" },
                  { title: "Weekly Analytics", desc: "Weekly performance and insights report" }
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                    <div>
                      <p className="font-medium text-dark-text">{notification.title}</p>
                      <p className="text-sm text-dark-muted">{notification.desc}</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-border" defaultChecked />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-dark-border">
              <h4 className="font-semibold text-dark-text mb-4">Push Notifications</h4>
              <div className="space-y-4">
                {[
                  { title: "Browser Notifications", desc: "Show notifications in your browser" },
                  { title: "Mobile Push", desc: "Send notifications to your mobile device" },
                  { title: "Desktop Alerts", desc: "Show desktop notifications" }
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
                    <div>
                      <p className="font-medium text-dark-text">{notification.title}</p>
                      <p className="text-sm text-dark-muted">{notification.desc}</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-border" />
                  </div>
                ))}
              </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-dark-muted mt-1">Configure your account and email sending preferences</p>
        </div>
        <button className="cyber-button">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="cyber-card lg:col-span-1">
          <CardContent className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'text-dark-text hover:bg-dark-card'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="cyber-card lg:col-span-3">
          <CardContent className="p-8">
            {renderTabContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
