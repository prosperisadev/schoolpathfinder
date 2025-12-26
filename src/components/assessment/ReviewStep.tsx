import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAssessmentStore } from "@/store/assessmentStore";
import { INDUSTRIES, PERSONALITY_TRAITS } from "@/types";
import { CheckCircle } from "lucide-react";

const ReviewStep = () => {
  const { profile } = useAssessmentStore();

  const topInterests = Object.entries(profile.interests || {})
    .filter(([_, score]) => score >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => INDUSTRIES.find(i => i.id === id)?.name || id);

  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Your Profile Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Age:</span> <strong>{profile.age}</strong></div>
            <div><span className="text-muted-foreground">Country:</span> <strong>{profile.country}</strong></div>
            <div><span className="text-muted-foreground">Study Location:</span> <strong className="capitalize">{profile.preferredLocation}</strong></div>
            <div><span className="text-muted-foreground">Budget:</span> <strong>{profile.budgetRange?.currency === "NGN" ? `₦${(profile.budgetRange.max / 1000000).toFixed(1)}M` : `$${profile.budgetRange?.max}K`}</strong></div>
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-foreground">Top Interests</h3>
          <div className="flex flex-wrap gap-2">
            {topInterests.map(interest => (
              <Badge key={interest} variant="default">{interest}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center p-6 bg-primary/5 rounded-2xl">
        <p className="text-foreground font-medium">Ready to see your personalized course recommendations!</p>
        <p className="text-sm text-muted-foreground mt-2">Click "View My Results" to continue</p>
      </div>
    </div>
  );
};

export default ReviewStep;
