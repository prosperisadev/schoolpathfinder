import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAssessmentStore } from "@/store/assessmentStore";
import { AlertCircle } from "lucide-react";

const OnboardingStep = () => {
  const { profile, updateProfile } = useAssessmentStore();

  return (
    <div className="space-y-6">
      {/* Honesty Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-sm text-foreground">
          <strong>Please answer honestly.</strong> Your responses directly affect the quality of your results.
        </p>
      </div>

      <Card variant="elevated">
        <CardContent className="pt-6 space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="e.g., Chinedu Okonkwo"
              value={profile.fullName || ""}
              onChange={(e) => updateProfile({ fullName: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">For personalizing your results</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., chinedu@example.com"
              value={profile.email || ""}
              onChange={(e) => updateProfile({ email: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">We'll send your results here</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Your Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 17"
                value={profile.age || ""}
                onChange={(e) => updateProfile({ age: parseInt(e.target.value) || undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g., Nigeria"
                value={profile.country || ""}
                onChange={(e) => updateProfile({ country: e.target.value })}
              />
            </div>
          </div>

          {/* Academic Track */}
          <div className="space-y-3">
            <Label>Academic Track *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "science", label: "🔬 Science", desc: "Physics, Chemistry, Biology" },
                { value: "art", label: "📚 Art", desc: "Literature, History, Languages" },
                { value: "commercial", label: "💼 Commercial", desc: "Accounting, Economics, Commerce" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProfile({ academicTrack: option.value as any })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    profile.academicTrack === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.label.split(" ")[0]}</span>
                  <span className="text-sm font-medium block">{option.label.split(" ")[1]}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* WAEC Estimate */}
          <div className="space-y-3">
            <Label>How would you describe your WAEC performance? *</Label>
            <p className="text-xs text-muted-foreground">Be honest - this helps us match you better</p>
            <div className="grid gap-2">
              {[
                { value: "mostly_distinctions", label: "💯 Mostly Distinctions (A1-B3)", desc: "I usually get top grades" },
                { value: "mix_distinctions_credits", label: "✨ Mix of Distinctions & Credits", desc: "Good grades with some room for improvement" },
                { value: "mostly_credits", label: "📝 Mostly Credits (C4-C6)", desc: "I pass my subjects comfortably" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProfile({ waecEstimate: option.value as any })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    profile.waecEstimate === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium block">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* JAMB Estimate */}
          <div className="space-y-3">
            <Label>How confident are you about JAMB? *</Label>
            <div className="grid gap-2">
              {[
                { value: "very_confident", label: "🚀 Very Confident", desc: "I'm well-prepared and expecting high scores" },
                { value: "fairly_confident", label: "👍 Fairly Confident", desc: "I've studied but still have some concerns" },
                { value: "not_confident", label: "😅 Not Very Confident", desc: "I need more preparation time" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProfile({ jambEstimate: option.value as any })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    profile.jambEstimate === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium block">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-3">
            <Label>How do you usually learn best? *</Label>
            <div className="grid gap-2">
              {[
                { value: "fast_learner", label: "⚡ I understand things very fast", desc: "Quick to grasp new concepts" },
                { value: "moderate_learner", label: "🎯 I need some time but I get it", desc: "Takes a bit but I master it eventually" },
                { value: "practical_learner", label: "🛠️ I struggle unless it's practical", desc: "I learn best by doing, not just reading" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProfile({ learningStyle: option.value as any })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    profile.learningStyle === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="font-medium block">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Location */}
          <div className="space-y-3">
            <Label>Preferred Study Location</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "nigeria", label: "🇳🇬 Nigeria" },
                { value: "africa", label: "🌍 Africa" },
                { value: "global", label: "🌐 Global" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateProfile({ preferredLocation: option.value as any })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    profile.preferredLocation === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl block mb-1">{option.label.split(" ")[0]}</span>
                  <span className="text-sm font-medium">{option.label.split(" ")[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-3">
            <Label>Annual Budget Range</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { value: { min: 0, max: 500000, currency: "NGN" as const }, label: "Under ₦500K" },
                { value: { min: 500000, max: 2000000, currency: "NGN" as const }, label: "₦500K - ₦2M" },
                { value: { min: 2000000, max: 5000000, currency: "NGN" as const }, label: "₦2M - ₦5M" },
                { value: { min: 5000, max: 50000, currency: "USD" as const }, label: "$5K - $50K+" },
              ].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => updateProfile({ budgetRange: option.value })}
                  className={`p-3 rounded-xl border-2 text-center transition-all text-sm ${
                    profile.budgetRange?.max === option.value.max
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingStep;
