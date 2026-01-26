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
      <div className="text-center mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
        <p className="text-foreground font-medium mb-1">
          👆 Drag the slider to where you best fit
        </p>
        <p className="text-sm text-muted-foreground">
          There are no right or wrong answers - just be honest about your preferences
        </p>
        <p className="text-sm text-foreground font-medium border-t border-primary/20 pt-2 mt-2">
          You can keep the slider at the center if you feel you are in-between both personality types, or move it closer to the side that describes you better.
        </p>
      </div>
      {PERSONALITY_TRAITS.map((trait) => (
        <Card key={trait.id} variant="elevated">
          <CardContent className="py-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <span className="font-semibold text-primary block mb-1">{trait.leftLabel}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{trait.leftDescription}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-accent block mb-1">{trait.rightLabel}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{trait.rightDescription}</p>
                </div>
              </div>
              <Slider
                value={[(personality as any)[trait.id] || 0]}
                onValueChange={(value) => handleTraitChange(trait.id, value)}
                min={-2}
                max={2}
                step={1}
                className="mt-2"
                aria-label={`${trait.leftLabel} to ${trait.rightLabel}`}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalityStep;
