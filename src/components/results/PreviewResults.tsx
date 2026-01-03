import { motion } from "framer-motion";
import { Lock, Sparkles, TrendingUp, Brain, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseRecommendation } from "@/types";
import { INDUSTRIES } from "@/types";

interface PreviewResultsProps {
  recommendations: CourseRecommendation[];
  profile: any;
  onUnlock: () => void;
}

const PreviewResults = ({ recommendations, profile, onUnlock }: PreviewResultsProps) => {
  // Get top 3 industry alignments based on interests
  const topIndustries = Object.entries(profile.interests || {})
    .filter(([_, score]) => (score as number) >= 3)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 3)
    .map(([id]) => INDUSTRIES.find(i => i.id === id)?.name || id);

  // Get personality summary
  const getPersonalitySummary = () => {
    const { personality } = profile;
    if (!personality) return "Creative problem-solver with balanced approach";
    
    const traits = [];
    if (personality.analyticalVsCreative > 0) traits.push("creative thinker");
    else if (personality.analyticalVsCreative < 0) traits.push("analytical mind");
    
    if (personality.peopleVsTask > 0) traits.push("task-focused");
    else if (personality.peopleVsTask < 0) traits.push("people-oriented");
    
    if (personality.riskVsStability > 0) traits.push("stability-seeking");
    else if (personality.riskVsStability < 0) traits.push("risk-tolerant");
    
    return traits.length > 0 ? `You are a ${traits.join(", ")} individual` : "Balanced across all personality dimensions";
  };

  return (
    <div className="space-y-8">
      {/* Industry Alignments - FREE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Your Top Industry Alignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {topIndustries.map((industry, index) => (
                <Badge 
                  key={industry} 
                  variant="default"
                  className="text-base py-2 px-4"
                >
                  #{index + 1} {industry}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your interests and responses, these industries align best with your profile.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personality Summary - FREE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Personality Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{getPersonalitySummary()}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Count Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                We've identified {recommendations.length} courses
              </h3>
              <p className="text-lg text-muted-foreground">
                that strongly match your profile
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Locked Content Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          What's in Your Full Report
        </h3>

        {/* Blurred preview cards */}
        <div className="grid gap-4 relative">
          {recommendations.slice(0, 3).map((rec, index) => (
            <Card 
              key={rec.course.id} 
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 backdrop-blur-md bg-background/60 z-10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardContent className="pt-6 filter blur-sm">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Course Name Hidden</h4>
                    <p className="text-sm text-muted-foreground">Fit Score: ██%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* More courses indicator */}
          <div className="text-center py-4 border-2 border-dashed border-muted rounded-xl">
            <p className="text-muted-foreground">
              + {recommendations.length - 3} more personalized course recommendations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Unlock CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl gradient-primary p-8 text-center space-y-4"
      >
        <h3 className="text-2xl font-bold text-primary-foreground">
          Unlock Your Personalized Career & University Report
        </h3>
        <p className="text-primary-foreground/80">
          Get detailed rankings, salary insights, university comparisons, and a downloadable PDF report.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={onUnlock}
          className="text-lg px-8"
        >
          <Lock className="h-5 w-5 mr-2" />
          Unlock Full Report – ₦999
        </Button>
        <p className="text-sm text-primary-foreground/60">
          One-time payment • Valid for 24 hours
        </p>
      </motion.div>
    </div>
  );
};

export default PreviewResults;
