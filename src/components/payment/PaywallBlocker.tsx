import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaywallBlockerProps {
  onUnlock: () => void;
  title?: string;
  description?: string;
}

export const PaywallBlocker = ({ 
  onUnlock, 
  title = "Unlock Full University List",
  description = "Get unlimited access to all Nigerian, African, and Global university rankings, plus personalized Fit Scores."
}: PaywallBlockerProps) => {
  return (
    <div className="relative mt-4 mb-12">
      {/* Blur effect */}
      <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center bg-white border border-purple-100 rounded-xl shadow-lg max-w-2xl mx-auto">
        <div className="bg-purple-100 p-4 rounded-full mb-4">
          <Lock className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">
           {description}
        </p>
        <Button 
          size="lg" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8"
          onClick={onUnlock}
        >
          Unlock Full Access
        </Button>
      </div>
    </div>
  );
};
