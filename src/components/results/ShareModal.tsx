import { useEffect, useState } from "react";
import { Check, Copy, Share2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareToken?: string;
  studentName?: string;
  onEmailCapture?: (email: string) => Promise<string | null>;
}

const ShareModal = ({ isOpen, onClose, shareToken, studentName, onEmailCapture }: ShareModalProps) => {
  const [copiedResults, setCopiedResults] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [localShareUrl, setLocalShareUrl] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Generate share URLs
  const baseUrl = window.location.origin;
  const resultsShareUrl = localShareUrl 
    || (shareToken 
      ? `${baseUrl}/assessment/${shareToken}` 
      : '');
  const platformUrl = baseUrl;

  const hasShareLink = !!resultsShareUrl;

  useEffect(() => {
    if (isOpen) {
      setLocalShareUrl(null);
      setEmailError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (shareToken && !localShareUrl) {
      setLocalShareUrl(`${baseUrl}/assessment/${shareToken}`);
    }
  }, [shareToken, baseUrl, localShareUrl]);

  const handleEmailSubmit = async () => {
    if (!emailInput || !emailInput.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!onEmailCapture) {
      setEmailError("Email capture not available");
      return;
    }

    try {
      setEmailLoading(true);
      setEmailError(null);
      const url = await onEmailCapture(emailInput.trim());
      if (url) {
        setLocalShareUrl(url);
      } else {
        setEmailError("Failed to generate link. Please try again.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setEmailError(message);
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

        <div className="space-y-4">
          {/* Share Results Section */}
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-medium text-blue-900 text-sm flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Your Results
              </h4>
              <p className="text-xs text-blue-800 mt-1">
                {studentName ? `Share ${studentName}'s` : 'Share your'} recommendations with parents or guardians
              </p>
            </div>

            {!hasShareLink ? (
              /* Email capture when no link exists */
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email-input" className="text-xs font-medium">
                    Enter your email to generate a shareable link
                  </Label>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="you@example.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError(null);
                    }}
                  />
                  {emailError && (
                    <p className="text-sm text-red-600">{emailError}</p>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleEmailSubmit} 
                  disabled={emailLoading || !emailInput}
                >
                  {emailLoading ? "Generating link..." : "Generate Share Link"}
                </Button>
              </div>
            ) : (
              /* Show link once generated */
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="results-link" className="text-xs font-medium">
                    Your Shareable Results Link
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
                    Anyone with this link can view your results
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">and</span>
            </div>
          </div>

          {/* Invite Friends Section */}
          <div className="space-y-3">
            <motion.div 
              className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 border border-amber-200 rounded-lg p-3 shadow-sm"
              animate={{ 
                boxShadow: [
                  "0 1px 3px rgba(251,191,36,0.1)",
                  "0 4px 12px rgba(251,191,36,0.2)",
                  "0 1px 3px rgba(251,191,36,0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="h-4 w-4 text-amber-900" />
                <h4 className="font-medium text-amber-900 text-sm">Invite Friends</h4>
              </div>
              <p className="text-xs text-amber-800">
                Help friends discover their perfect course match for free!
              </p>
            </motion.div>

            <div className="space-y-1">
              <Label htmlFor="platform-link" className="text-xs font-medium">
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
                  className={copiedPlatform ? "shrink-0 bg-green-600 hover:bg-green-700" : "shrink-0 bg-amber-500 hover:bg-amber-600 text-white"}
                >
                  {copiedPlatform ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
