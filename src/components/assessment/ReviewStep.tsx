import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAssessmentStore } from "@/store/assessmentStore";
import { INDUSTRIES, PERSONALITY_TRAITS } from "@/types";
import { CheckCircle, User, GraduationCap, Brain, Target } from "lucide-react";

const ReviewStep = () => {
  const { profile } = useAssessmentStore();

  const topInterests = Object.entries(profile.interests || {})
    .filter(([_, score]) => score >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => INDUSTRIES.find(i => i.id === id)?.name || id);

  const getTrackLabel = (track: string | undefined) => {
    switch (track) {
      case "science": return "🔬 Science";
      case "art": return "📚 Art";
      case "commercial": return "💼 Commercial";
      default: return track;
    }
  };

  const getWaecLabel = (estimate: string | undefined) => {
    switch (estimate) {
      case "mostly_distinctions": return "Mostly Distinctions";
      case "mix_distinctions_credits": return "Mix of Distinctions & Credits";
      case "mostly_credits": return "Mostly Credits";
      default: return estimate;
    }
  };

  const getJambLabel = (estimate: string | undefined) => {
    switch (estimate) {
      case "very_confident": return "Very Confident";
      case "fairly_confident": return "Fairly Confident";
      case "not_confident": return "Not Very Confident";
      default: return estimate;
    }
  };

  const getLearningLabel = (style: string | undefined) => {
    switch (style) {
      case "fast_learner": return "Fast Learner";
      case "moderate_learner": return "Moderate Learner";
      case "practical_learner": return "Practical Learner";
      default: return style;
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Card variant="elevated">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Name:</span> <strong>{profile.fullName || "Not provided"}</strong></div>
            <div><span className="text-muted-foreground">Age:</span> <strong>{profile.age || "Not provided"}</strong></div>
            <div><span className="text-muted-foreground">Country:</span> <strong>{profile.country || "Not provided"}</strong></div>
            <div><span className="text-muted-foreground">Study Location:</span> <strong className="capitalize">{profile.preferredLocation || "Not selected"}</strong></div>
            <div><span className="text-muted-foreground">Budget:</span> <strong>{profile.budgetRange?.currency === "NGN" ? `₦${(profile.budgetRange.max / 1000000).toFixed(1)}M` : profile.budgetRange ? `$${profile.budgetRange.max}K` : "Not selected"}</strong></div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Profile */}
      <Card variant="elevated">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Academic Profile
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Track:</span> <strong>{getTrackLabel(profile.academicTrack)}</strong></div>
            <div><span className="text-muted-foreground">WAEC Estimate:</span> <strong>{getWaecLabel(profile.waecEstimate)}</strong></div>
            <div><span className="text-muted-foreground">JAMB Confidence:</span> <strong>{getJambLabel(profile.jambEstimate)}</strong></div>
            <div><span className="text-muted-foreground">Learning Style:</span> <strong>{getLearningLabel(profile.learningStyle)}</strong></div>
          </div>
        </CardContent>
      </Card>

      {/* Top Interests */}
      <Card variant="elevated">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Top Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {topInterests.length > 0 ? topInterests.map(interest => (
              <Badge key={interest} variant="default">{interest}</Badge>
            )) : (
              <span className="text-muted-foreground text-sm">No interests selected</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personality Summary */}
      <Card variant="elevated">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Personality Overview
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {PERSONALITY_TRAITS.map(trait => {
              const value = (profile.personality as any)?.[trait.id] || 0;
              const label = value < 0 ? trait.leftLabel : value > 0 ? trait.rightLabel : "Balanced";
              return (
                <div key={trait.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">{trait.leftLabel} vs {trait.rightLabel}</span>
                  <Badge variant="secondary">{label}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ready CTA */}
      <div className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/20">
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-3" />
        <p className="text-foreground font-medium text-lg">Ready to see your personalized course recommendations!</p>
        <p className="text-sm text-muted-foreground mt-2">Click "View My Results" to continue</p>
      </div>
    </div>
  );
};

export default ReviewStep;
