import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Check, Sparkles, FileText, GraduationCap, Globe, BadgePercent, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { usePaymentStore } from "@/store/paymentStore";
import { useAssessmentStore } from "@/store/assessmentStore";

// Paystack public key - this is safe to expose
const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const PaywallModal = ({ isOpen, onClose, onSuccess }: PaywallModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { createSession, verifyPayment, setEmail: storeEmail } = usePaymentStore();
  const { profile, recommendations } = useAssessmentStore();

  const benefits = [
    { icon: <Sparkles className="h-5 w-5" />, text: "Top 20 ranked course recommendations" },
    { icon: <Check className="h-5 w-5" />, text: "Fit scores + 'Why this fits you'" },
    { icon: <Globe className="h-5 w-5" />, text: "Nigeria vs Global comparison per course" },
    { icon: <BadgePercent className="h-5 w-5" />, text: "Salary insights (local & global)" },
    { icon: <GraduationCap className="h-5 w-5" />, text: "University options & scholarship info" },
    { icon: <FileText className="h-5 w-5" />, text: "Downloadable PDF report (auto-emailed)" },
  ];

  const handlePayment = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address to receive your report.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    storeEmail(email);

    try {
      // Create session in database
      const sessionId = await createSession(email, {
        profile,
        recommendations: recommendations.map(r => ({
          courseId: r.course.id,
          fitScore: r.fitScore,
        })),
      });

      // Load Paystack script if not already loaded
      if (!window.PaystackPop) {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v2/inline.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: 99900, // ₦999 in kobo
        currency: "NGN",
        ref: `PF_${sessionId}_${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Session ID",
              variable_name: "session_id",
              value: sessionId,
            },
          ],
        },
        callback: async (response: { reference: string }) => {
          console.log("Payment callback:", response);
          
          // Verify payment on backend
          const verified = await verifyPayment(response.reference);
          
          if (verified) {
            toast({
              title: "Payment Successful! 🎉",
              description: "Your personalized career & university report is now unlocked.",
            });
            onSuccess();
          } else {
            toast({
              title: "Verification Failed",
              description: "Please contact support if payment was deducted.",
              variant: "destructive",
            });
          }
          setIsProcessing(false);
        },
        onClose: () => {
          setIsProcessing(false);
          toast({
            title: "Payment cancelled",
            description: "You can complete your payment anytime.",
          });
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lock className="h-5 w-5 text-primary" />
            Unlock Your Full Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits List */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-foreground">
              What you'll unlock for ₦999:
            </p>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
            <p className="text-xs text-muted-foreground">
              Your PDF report will be sent to this email
            </p>
          </div>

          {/* Price & CTA */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
              <div>
                <p className="font-semibold text-foreground">One-time payment</p>
                <p className="text-xs text-muted-foreground">Valid for 24 hours</p>
              </div>
              <p className="text-2xl font-bold text-primary">₦999</p>
            </div>

            <Button
              className="w-full h-12 text-base"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Unlock Full Report – ₦999
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Paystack 🔒
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
