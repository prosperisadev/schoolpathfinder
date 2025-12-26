import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAssessmentStore } from "@/store/assessmentStore";

const OnboardingStep = () => {
  const { profile, updateProfile } = useAssessmentStore();

  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent className="pt-6 space-y-6">
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

          <div className="space-y-2">
            <Label htmlFor="academic">Academic Background</Label>
            <Input
              id="academic"
              placeholder="e.g., Science student, WAEC completed"
              value={profile.academicBackground || ""}
              onChange={(e) => updateProfile({ academicBackground: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label>Preferred Study Location</Label>
            <div className="grid grid-cols-3 gap-3">
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

          <div className="space-y-3">
            <Label>Annual Budget Range</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
