import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useAssessmentStore } from "@/store/assessmentStore";
import { PERSONALITY_TRAITS } from "@/types";

const PersonalityStep = () => {
  const { profile, updateProfile } = useAssessmentStore();
  const personality = profile.personality || { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 0 };

  const handleTraitChange = (traitId: string, value: number[]) => {
    updateProfile({ personality: { ...personality, [traitId]: value[0] } });
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center mb-6">
        Move the slider towards the trait that describes you better
      </p>
      {PERSONALITY_TRAITS.map((trait) => (
        <Card key={trait.id} variant="elevated">
          <CardContent className="py-6">
            <div className="flex justify-between items-start mb-4">
              <div className="text-left">
                <span className="font-semibold text-primary">{trait.leftLabel}</span>
                <p className="text-xs text-muted-foreground max-w-[140px]">{trait.leftDescription}</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-accent">{trait.rightLabel}</span>
                <p className="text-xs text-muted-foreground max-w-[140px]">{trait.rightDescription}</p>
              </div>
            </div>
            <Slider
              value={[(personality as any)[trait.id] || 0]}
              onValueChange={(value) => handleTraitChange(trait.id, value)}
              min={-2}
              max={2}
              step={1}
              className="mt-2"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalityStep;
