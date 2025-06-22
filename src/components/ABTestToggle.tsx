
import { useState } from "react";
import { Split, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ABTestToggleProps {
  emailId: number;
  onToggle: (emailId: number, enabled: boolean) => void;
}

export function ABTestToggle({ emailId, onToggle }: ABTestToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [variantA, setVariantA] = useState({ subject: "", content: "" });
  const [variantB, setVariantB] = useState({ subject: "", content: "" });

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(emailId, newState);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Split className="w-5 h-5 text-neon-blue" />
          <span className="text-dark-text font-medium">A/B Test This Step</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="cyber-card border-neon-blue/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-dark-text font-medium">Variant A</h4>
                <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded">Control</span>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Subject line A"
                  value={variantA.subject}
                  onChange={(e) => setVariantA({...variantA, subject: e.target.value})}
                  className="cyber-input w-full text-sm"
                />
                <textarea
                  placeholder="Email content A"
                  value={variantA.content}
                  onChange={(e) => setVariantA({...variantA, content: e.target.value})}
                  className="cyber-input w-full h-24 resize-none text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card border-neon-purple/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-dark-text font-medium">Variant B</h4>
                <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">Test</span>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Subject line B"
                  value={variantB.subject}
                  onChange={(e) => setVariantB({...variantB, subject: e.target.value})}
                  className="cyber-input w-full text-sm"
                />
                <textarea
                  placeholder="Email content B"
                  value={variantB.content}
                  onChange={(e) => setVariantB({...variantB, content: e.target.value})}
                  className="cyber-input w-full h-24 resize-none text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isEnabled && (
        <div className="bg-dark-card p-4 rounded-lg border border-neon-blue/20">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-medium text-dark-text">A/B Test Settings</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-dark-muted">Split Ratio</label>
              <select className="cyber-input w-full mt-1">
                <option>50% / 50%</option>
                <option>60% / 40%</option>
                <option>70% / 30%</option>
                <option>80% / 20%</option>
              </select>
            </div>
            <div>
              <label className="text-dark-muted">Winner Metric</label>
              <select className="cyber-input w-full mt-1">
                <option>Reply Rate</option>
                <option>Open Rate</option>
                <option>Click Rate</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
