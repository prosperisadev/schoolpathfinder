import { motion } from "framer-motion";
import { Lock, Sparkles, Brain, Target, Eye, MessageCircle } from "lucide-react";
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

const WHATSAPP_LINK = "https://wa.me/2347031279128";

const PreviewResults = ({ recommendations, profile, onUnlock }: PreviewResultsProps) => {
  const userName = profile.fullName?.split(' ')[0] || 'there';
  
  // Get top 3 industry alignments based on interests
  const topIndustries = Object.entries(profile.interests || {})
    .filter(([_, score]) => (score as number) >= 3)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 3)
    .map(([id]) => INDUSTRIES.find(i => i.id === id)?.name || id);

  // Generate personality summary in plain English
  const getPersonalitySummary = () => {
    const { personality } = profile;
    if (!personality) return null;
    
    const summaryParts = [];
    
    // Analytical vs Creative
    if (personality.analyticalVsCreative < -1) {
      summaryParts.push("You have a strong analytical mind - you love breaking down problems and finding logical solutions");
    } else if (personality.analyticalVsCreative > 1) {
      summaryParts.push("You're a creative thinker who thrives on innovation and new ideas");
    } else if (personality.analyticalVsCreative < 0) {
      summaryParts.push("You lean towards analytical thinking while appreciating creative expression");
    } else if (personality.analyticalVsCreative > 0) {
      summaryParts.push("You blend creativity with practical thinking");
    }
    
    // Structured vs Flexible
    if (personality.structuredVsFlexible < -1) {
      summaryParts.push("You prefer clear plans and organized routines to stay productive");
    } else if (personality.structuredVsFlexible > 1) {
      summaryParts.push("You're adaptable and thrive in dynamic environments");
    }
    
    // People vs Task
    if (personality.peopleVsTask < -1) {
      summaryParts.push("Working with and helping others energizes you");
    } else if (personality.peopleVsTask > 1) {
      summaryParts.push("You do your best work when you can focus independently");
    }
    
    // Risk vs Stability  
    if (personality.riskVsStability < -1) {
      summaryParts.push("You're comfortable taking risks and exploring new opportunities");
    } else if (personality.riskVsStability > 1) {
      summaryParts.push("You value security and prefer stable, predictable paths");
    }

    return summaryParts;
  };

  const personalitySummary = getPersonalitySummary();

  // Get top course preview (show 1 course name and overview only)
  const topCourse = recommendations[0]?.course;

  return (
    <div className="space-y-8">
      {/* Personalized Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {userName}, here's what we found 👋
        </h2>
        <p className="text-muted-foreground">
          Based on your responses, here's a preview of your career profile
        </p>
      </motion.div>

      {/* Industry Alignments - FREE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
              {topIndustries.length > 0 ? topIndustries.map((industry, index) => (
                <Badge 
                  key={industry} 
                  variant="default"
                  className="text-base py-2 px-4"
                >
                  #{index + 1} {industry}
                </Badge>
              )) : (
                <p className="text-muted-foreground">Complete the interest section to see your alignments</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              These industries align best with your interests and preferences.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personality Summary - FREE (Enhanced) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Your Personality Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalitySummary && personalitySummary.length > 0 ? (
              <ul className="space-y-3">
                {personalitySummary.map((trait, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground">{trait}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Complete the personality section to see your profile</p>
            )}
            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Why this matters:</strong> Your personality type influences which careers you'll naturally excel in and find fulfilling.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Course Preview - Show 1 full course */}
      {topCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="elevated" className="border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Your #1 Match
                </CardTitle>
                <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                  ⭐ Best Fit
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{topCourse.name}</h3>
                <Badge variant="secondary" className="mb-3">{topCourse.category}</Badge>
                <p className="text-muted-foreground">{topCourse.overview}</p>
              </div>
              
              {/* Locked details indicator */}
              <div className="pt-4 border-t border-dashed flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Why this fits you • Salary • Career paths • Universities</span>
                </div>
                <Badge variant="outline">Locked</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* More Courses Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-dashed border-muted">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                +{recommendations.length - 1} more courses match you
              </h3>
              <p className="text-muted-foreground">
                Unlock to see your complete ranked list with detailed insights
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Blurred Preview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          More Matches (Locked)
        </h3>

        <div className="grid gap-4 relative">
          {recommendations.slice(1, 4).map((rec, index) => (
            <Card 
              key={rec.course.id} 
              className="relative overflow-hidden cursor-pointer"
              onClick={onUnlock}
            >
              <div className="absolute inset-0 backdrop-blur-md bg-background/60 z-10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardContent className="pt-6 filter blur-sm">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">#{index + 2}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Course Name Hidden</h4>
                    <p className="text-sm text-muted-foreground">Fit Score: ██%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Unlock CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl gradient-primary p-8 text-center space-y-6"
      >
        <h3 className="text-2xl font-bold text-primary-foreground">
          Unlock Your Personalized Career & University Results
        </h3>
        
        <div className="text-left max-w-md mx-auto space-y-2 text-primary-foreground/90">
          <p className="font-medium">What you'll get:</p>
          <ul className="space-y-1 text-sm">
            <li>✓ 20 best-fit courses ranked for you</li>
            <li>✓ Why each course fits your strengths</li>
            <li>✓ Nigeria vs Global career comparison</li>
            <li>✓ Salary & future relevance insights</li>
            <li>✓ Universities & scholarship options</li>
            <li>✓ A shareable results link</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={onUnlock}
            className="text-lg px-8"
          >
            <Lock className="h-5 w-5 mr-2" />
            Enter Access Code
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-primary px-2 text-primary-foreground/60">
                or
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            className="text-lg px-8 bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Request Code on WhatsApp
          </Button>
        </div>

        <p className="text-sm text-primary-foreground/60">
          Access valid for 24 hours after activation 🔒
        </p>
      </motion.div>
    </div>
  );
};

export default PreviewResults;
