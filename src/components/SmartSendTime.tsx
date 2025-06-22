
import { useState } from "react";
import { Clock, Zap, Globe, TrendingUp, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SmartSendTimeProps {
  onToggle: (enabled: boolean, settings: any) => void;
}

export function SmartSendTime({ onToggle }: SmartSendTimeProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [settings, setSettings] = useState({
    timezone: "auto",
    industry: "saas",
    sendWindow: { start: "09:00", end: "17:00" },
    excludeWeekends: true,
    optimizeFor: "opens"
  });

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(newState, settings);
  };

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onToggle(isEnabled, newSettings);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="w-5 h-5 text-neon-blue" />
          <div>
            <span className="text-dark-text font-medium">Auto-Optimize Send Time</span>
            <div className="flex items-center space-x-1 mt-1">
              <Info className="w-3 h-3 text-dark-muted" />
              <span className="text-xs text-dark-muted">
                Based on industry + time zone + past performance data
              </span>
            </div>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-neon-blue peer-checked:to-neon-purple"></div>
        </label>
      </div>

      {isEnabled && (
        <Card className="cyber-card">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-dark-text text-sm font-medium mb-2">
                  Target Industry
                </label>
                <select 
                  value={settings.industry}
                  onChange={(e) => updateSetting("industry", e.target.value)}
                  className="cyber-input w-full"
                >
                  <option value="saas">SaaS</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="fintech">Fintech</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-text text-sm font-medium mb-2">
                  Timezone Strategy
                </label>
                <select 
                  value={settings.timezone}
                  onChange={(e) => updateSetting("timezone", e.target.value)}
                  className="cyber-input w-full"
                >
                  <option value="auto">Auto-detect from leads</option>
                  <option value="sender">Use sender timezone</option>
                  <option value="est">Eastern Time</option>
                  <option value="pst">Pacific Time</option>
                  <option value="utc">UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-text text-sm font-medium mb-2">
                  Send Window
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={settings.sendWindow.start}
                    onChange={(e) => updateSetting("sendWindow", {...settings.sendWindow, start: e.target.value})}
                    className="cyber-input flex-1"
                  />
                  <span className="text-dark-muted">to</span>
                  <input
                    type="time"
                    value={settings.sendWindow.end}
                    onChange={(e) => updateSetting("sendWindow", {...settings.sendWindow, end: e.target.value})}
                    className="cyber-input flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-dark-text text-sm font-medium mb-2">
                  Optimize For
                </label>
                <select 
                  value={settings.optimizeFor}
                  onChange={(e) => updateSetting("optimizeFor", e.target.value)}
                  className="cyber-input w-full"
                >
                  <option value="opens">Open Rate</option>
                  <option value="clicks">Click Rate</option>
                  <option value="replies">Reply Rate</option>
                  <option value="engagement">Overall Engagement</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="exclude-weekends"
                checked={settings.excludeWeekends}
                onChange={(e) => updateSetting("excludeWeekends", e.target.checked)}
                className="w-4 h-4 rounded border-dark-border"
              />
              <label htmlFor="exclude-weekends" className="text-dark-text text-sm">
                Exclude weekends
              </label>
            </div>

            <div className="bg-dark-bg p-3 rounded-lg border border-neon-blue/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-medium text-dark-text">AI Recommendations</span>
              </div>
              <div className="space-y-1 text-xs text-dark-muted">
                <p>• Best time for {settings.industry}: Tuesday-Thursday, 10AM-2PM</p>
                <p>• Your audience opens emails 23% more at 11:30 AM</p>
                <p>• Avoid Mondays (26% lower open rates)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
