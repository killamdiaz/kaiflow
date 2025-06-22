
import { useState } from "react";
import { Sparkles, CheckCircle, AlertTriangle, Target, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmailFeedbackPanelProps {
  isOpen: boolean;
  onClose: () => void;
  emailContent: string;
  subject: string;
}

export function EmailFeedbackPanel({ isOpen, onClose, emailContent, subject }: EmailFeedbackPanelProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  if (!isOpen) return null;

  const analyzeEmail = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        tone: {
          score: 85,
          suggestions: ["Consider adding more warmth", "Professional but could be friendlier"]
        },
        clarity: {
          score: 92,
          suggestions: ["Clear value proposition", "Good structure"]
        },
        length: {
          score: 78,
          suggestions: ["Consider shortening by 20%", "Move details to follow-up"]
        },
        cta: {
          score: 88,
          suggestions: ["Strong call-to-action", "Consider adding urgency"]
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="cyber-card w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-dark-text flex items-center">
              <Sparkles className="w-5 h-5 text-neon-blue mr-2" />
              AI Email Feedback
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!analysis && !isAnalyzing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-dark-bg" />
              </div>
              <h3 className="text-xl font-semibold text-dark-text mb-2">Improve Your Email Copy</h3>
              <p className="text-dark-muted mb-6">
                Let KAIA analyze your email for tone, clarity, length, and effectiveness.
              </p>
              <button className="cyber-button" onClick={analyzeEmail}>
                Analyze Email
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-pulse space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-dark-bg animate-spin" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-neon-blue/30 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-2 bg-neon-purple/30 rounded-full w-1/2 mx-auto"></div>
                </div>
              </div>
              <p className="text-dark-muted mt-4">Analyzing your email...</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="cyber-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-text font-medium">Tone</span>
                    <span className="text-neon-blue font-bold">{analysis.tone.score}%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
                      style={{ width: `${analysis.tone.score}%` }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    {analysis.tone.suggestions.map((suggestion: string, index: number) => (
                      <p key={index} className="text-xs text-dark-muted">{suggestion}</p>
                    ))}
                  </div>
                </div>

                <div className="cyber-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-text font-medium">Clarity</span>
                    <span className="text-neon-green font-bold">{analysis.clarity.score}%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full"
                      style={{ width: `${analysis.clarity.score}%` }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    {analysis.clarity.suggestions.map((suggestion: string, index: number) => (
                      <p key={index} className="text-xs text-dark-muted">{suggestion}</p>
                    ))}
                  </div>
                </div>

                <div className="cyber-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-text font-medium">Length</span>
                    <span className="text-neon-pink font-bold">{analysis.length.score}%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-neon-pink to-neon-purple h-2 rounded-full"
                      style={{ width: `${analysis.length.score}%` }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    {analysis.length.suggestions.map((suggestion: string, index: number) => (
                      <p key={index} className="text-xs text-dark-muted">{suggestion}</p>
                    ))}
                  </div>
                </div>

                <div className="cyber-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-text font-medium">Call-to-Action</span>
                    <span className="text-neon-purple font-bold">{analysis.cta.score}%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-neon-purple to-neon-pink h-2 rounded-full"
                      style={{ width: `${analysis.cta.score}%` }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    {analysis.cta.suggestions.map((suggestion: string, index: number) => (
                      <p key={index} className="text-xs text-dark-muted">{suggestion}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="cyber-button flex-1">
                  Apply Suggestions
                </button>
                <button className="bg-dark-card border border-dark-border text-dark-text hover:bg-dark-border transition-colors px-4 py-2 rounded-lg font-semibold">
                  Re-analyze
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
