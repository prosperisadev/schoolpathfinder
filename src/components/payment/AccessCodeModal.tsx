import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Check, Sparkles, GraduationCap, Globe, BadgePercent, MessageCircle, TrendingUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAccessStore } from "@/store/accessStore";
import { useAssessmentStore } from "@/store/assessmentStore";

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const WHATSAPP_LINK = "https://wa.me/2347031279128";

const AccessCodeModal = ({ isOpen, onClose, onSuccess }: AccessCodeModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { validateAccessCode, setEmail: storeEmail } = useAccessStore();
  const { profile } = useAssessmentStore();

  const benefits = [
    { icon: <Sparkles className="h-5 w-5" />, text: "20 best-fit courses ranked for you" },
    { icon: <Check className="h-5 w-5" />, text: "Why each course fits your strengths" },
    { icon: <Globe className="h-5 w-5" />, text: "Nigeria vs Global career comparison" },
    { icon: <BadgePercent className="h-5 w-5" />, text: "Salary & future relevance insights" },
    { icon: <GraduationCap className="h-5 w-5" />, text: "Universities & scholarship options" },
    { icon: <Share2 className="h-5 w-5" />, text: "A shareable results link" },
  ];

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!accessCode.trim()) {
      toast({
        title: "Access code required",
        description: "Please enter your access code.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    storeEmail(email);

    const isValid = await validateAccessCode(accessCode, email);

    if (isValid) {
      toast({
        title: "Access Granted! 🎉",
        description: "Your personalized career & university report is now unlocked for 24 hours.",
      });
      onSuccess();
    } else {
      toast({
        title: "Invalid Access Code",
        description: "This code is invalid, already used, or expired. Request a new code on WhatsApp.",
        variant: "destructive",
      });
    }
    setIsValidating(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lock className="h-5 w-5 text-primary" />
            Unlock Your Personalized Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits List */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-foreground">
              What you'll get:
            </p>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-primary">{benefit.icon}</span>
                  {benefit.text}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Access Code Input */}
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              type="text"
              placeholder="Enter your access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              className="w-full font-mono tracking-wider"
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full h-12 text-base"
            onClick={handleSubmit}
            disabled={isValidating}
          >
            {isValidating ? (
              "Validating..."
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Enter Access Code
              </>
            )}
          </Button>

          {/* WhatsApp CTA */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Don't have a code?
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 text-base gap-2 border-green-500/50 text-green-600 hover:bg-green-500/10 hover:text-green-600"
            onClick={() => window.open(WHATSAPP_LINK, "_blank")}
          >
            <MessageCircle className="h-5 w-5" />
            Request Access Code on WhatsApp
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Access valid for 24 hours after activation 🔒
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessCodeModal;
