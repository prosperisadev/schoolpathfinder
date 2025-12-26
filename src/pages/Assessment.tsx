import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAssessmentStore } from "@/store/assessmentStore";
import OnboardingStep from "@/components/assessment/OnboardingStep";
import InterestStep from "@/components/assessment/InterestStep";
import PersonalityStep from "@/components/assessment/PersonalityStep";
import ReviewStep from "@/components/assessment/ReviewStep";

const Assessment = () => {
  const navigate = useNavigate();
  const { step, totalSteps, nextStep, prevStep, profile, completeAssessment } = useAssessmentStore();
  
  const progress = ((step + 1) / totalSteps) * 100;

  const handleComplete = () => {
    completeAssessment();
    navigate("/results");
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return profile.age && profile.country && profile.preferredLocation && profile.budgetRange;
      case 1:
        return Object.keys(profile.interests || {}).length >= 3;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <OnboardingStep />;
      case 1:
        return <InterestStep />;
      case 2:
        return <PersonalityStep />;
      case 3:
        return <ReviewStep />;
      default:
        return <OnboardingStep />;
    }
  };

  const stepTitles = [
    "Tell us about yourself",
    "What interests you?",
    "Your personality",
    "Review & confirm",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Compass className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">PathFinder</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Step {step + 1} of {totalSteps}
              </span>
              <div className="w-32 sm:w-48">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Step Title */}
          <motion.div
            key={`title-${step}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Step {step + 1}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {stepTitles[step]}
            </h1>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {step < totalSteps - 1 ? (
              <Button
                variant="hero"
                onClick={nextStep}
                disabled={!canProceed()}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="accent"
                onClick={handleComplete}
                className="gap-2"
              >
                View My Results
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
