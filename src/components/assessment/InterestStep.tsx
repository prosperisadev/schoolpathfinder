import { Card, CardContent } from "@/components/ui/card";
import { useAssessmentStore } from "@/store/assessmentStore";
import { INDUSTRIES } from "@/types";

const InterestStep = () => {
  const { profile, updateProfile } = useAssessmentStore();
  const interests = profile.interests || {};

  const handleInterestChange = (industryId: string, value: number) => {
    updateProfile({ interests: { ...interests, [industryId]: value } });
  };
  
  // Count how many industries have interest > 2
  const selectedCount = Object.values(interests).filter(score => (score as number) > 2).length;

  return (
    <div className="space-y-4">
      <div className="text-center mb-6 space-y-2">
        <p className="text-muted-foreground">
          Rate your interest in each area (select at least 3 with score 3+)
        </p>
        <p className="text-sm font-medium text-foreground bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 inline-block">
          5 means you are highly interested in this industry.<br />
          1 means you have little or no interest.
        </p>
      </div>
      <div className="grid gap-4">
        {INDUSTRIES.map((industry) => (
          <Card 
            key={industry.id} 
            variant={interests[industry.id] >= 3 ? "interactive" : "default"}
            className={interests[industry.id] >= 3 ? "border-primary" : ""}
          >
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{industry.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleInterestChange(industry.id, star)}
                      className={`h-8 w-8 rounded-full transition-all ${
                        (interests[industry.id] || 0) >= star
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-primary/20"
                      }`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InterestStep;
