import { useEffect, useState } from "react";
import { Check, Copy, Share2, Users, UserPlus, Send, Sparkles, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareToken?: string;
  studentName?: string;
  defaultTab?: "invite" | "results" | "email";
  onEmailCapture?: (email: string) => Promise<string | null>;
}

const ShareModal = ({ isOpen, onClose, shareToken, studentName, defaultTab = "invite", onEmailCapture }: ShareModalProps) => {
  const [copiedResults, setCopiedResults] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState(false);
  const [activeTab, setActiveTab] = useState<"invite" | "results" | "email">(defaultTab);
  const [emailInput, setEmailInput] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [localShareUrl, setLocalShareUrl] = useState<string | null>(null);

  // Generate share URLs
  const baseUrl = window.location.origin;
  const resultsShareUrl = localShareUrl 
    || (shareToken 
      ? `${baseUrl}/assessment/${shareToken}` 
      : '');
  const platformUrl = baseUrl;

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setLocalShareUrl(null);
    }
  }, [defaultTab, isOpen]);

  useEffect(() => {
    if (shareToken && !localShareUrl) {
      setLocalShareUrl(`${baseUrl}/assessment/${shareToken}`);
    }
  }, [shareToken]);

  const handleEmailSubmit = async () => {
    if (!emailInput || !emailInput.includes("@")) {
      return;
    }
    if (!onEmailCapture) {
      return;
    }

    try {
      setEmailLoading(true);
      const url = await onEmailCapture(emailInput.trim());
      if (url) {
        setLocalShareUrl(url);
        setActiveTab("results");
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'results' | 'platform') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'results') {
        setCopiedResults(true);
        setTimeout(() => setCopiedResults(false), 2000);
      } else {
        setCopiedPlatform(true);
        setTimeout(() => setCopiedPlatform(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const canUseWebShare = typeof navigator !== 'undefined' && !!(navigator as any).share;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Results
          </DialogTitle>
          <DialogDescription>
            Share your assessment results or invite friends to take the test
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="invite"
              className="gap-2 relative overflow-hidden border border-amber-200/70 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 text-amber-900 shadow-sm"
            >
              <motion.span
                className="absolute inset-0 opacity-40"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], backgroundImage: "linear-gradient(120deg, rgba(251,191,36,0.25), rgba(251,146,60,0.15), rgba(251,191,36,0.25))" }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="relative flex items-center gap-2"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4" />
                Invite Friends
              </motion.span>
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Save Email
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2">
              <Users className="h-4 w-4" />
              Share Results
            </TabsTrigger>
          </TabsList>

          <div className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-amber-900 text-sm flex items-start gap-2">
            <Sparkles className="h-4 w-4 mt-0.5" />
            <span className="font-medium">Help your friends discover their perfect university course match too — for free.</span>
          </div>

          {/* Capture Email */}
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Add your email to generate a share link
              </h4>
              <p className="text-sm text-slate-700">
                We use your email to save your session so your friends can view your results.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-input" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email-input"
                type="email"
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

            <Button className="w-full" onClick={handleEmailSubmit} disabled={emailLoading || !emailInput}>
              {emailLoading ? "Saving..." : "Save email & show link"}
            </Button>
          </TabsContent>

          {/* Share Results with Parents */}
          <TabsContent value="results" className="space-y-4 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Share with Parents/Guardians
              </h4>
              <p className="text-sm text-blue-800 mb-3">
                {studentName ? `Share ${studentName}'s` : 'Share your'} personalized course recommendations and university matches
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="results-link" className="text-sm font-medium">
                Shareable Results Link
              </Label>
              <div className="flex gap-2">
                <Input
                  id="results-link"
                  value={resultsShareUrl}
                  readOnly
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  onClick={() => copyToClipboard(resultsShareUrl, 'results')}
                  variant={copiedResults ? "default" : "outline"}
                  size="icon"
                  className={copiedResults ? "shrink-0 bg-green-600 hover:bg-green-700" : "shrink-0"}
                >
                  {copiedResults ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone with this link can view your assessment results
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => copyToClipboard(resultsShareUrl, 'results')}
                className="w-full gap-2"
                variant="default"
              >
                {copiedResults ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Results Link
                  </>
                )}
              </Button>
              {canUseWebShare && resultsShareUrl && (
                <Button
                  onClick={() => (navigator as any).share?.({ title: 'PathFinder Results', url: resultsShareUrl })}
                  className="w-full gap-2 mt-2"
                  variant="secondary"
                >
                  <Send className="h-4 w-4" />
                  Share via device
                </Button>
              )}
            </div>
          </TabsContent>

          {/* Invite Friends to Platform */}
          <TabsContent value="invite" className="space-y-4 mt-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-amber-900" />
                  <h4 className="font-semibold text-amber-900">Invite Friends to School Pathfinder</h4>
                </div>
                <motion.span
                  className="inline-flex items-center gap-1 rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-3 w-3" />
                  Growth Loop
                </motion.span>
              </div>
              <p className="text-sm text-amber-800 mt-2">
                Help your friends discover their perfect university course match for free.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform-link" className="text-sm font-medium">
                Platform Link
              </Label>
              <div className="flex gap-2">
                <Input
                  id="platform-link"
                  value={platformUrl}
                  readOnly
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  onClick={() => copyToClipboard(platformUrl, 'platform')}
                  variant={copiedPlatform ? "default" : "outline"}
                  size="icon"
                  className={copiedPlatform ? "shrink-0 bg-green-600 hover:bg-green-700" : "shrink-0"}
                >
                  {copiedPlatform ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this link with friends to help them find their path
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => copyToClipboard(platformUrl, 'platform')}
                className="w-full gap-2"
                variant="default"
              >
                {copiedPlatform ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Platform Link
                  </>
                )}
              </Button>
            </div>

            <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
              💡 <strong>Pro tip:</strong> Friends who sign up will get personalized course recommendations based on their unique profile
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
