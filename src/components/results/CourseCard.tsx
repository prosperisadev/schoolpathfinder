import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseRecommendation } from "@/types";
import { ArrowRight, TrendingUp, MapPin, Star, ChevronDown, ChevronUp, Heart, User, Wallet, MapPinned, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { getUniversitiesForCourse, UniversityRecommendation } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  recommendation: CourseRecommendation;
  rank: number;
  onClick: () => void;
  preferredLocation?: "nigeria" | "africa" | "global";
}

const CourseCard = ({ recommendation, rank, onClick, preferredLocation = "nigeria" }: CourseCardProps) => {
  const { course, fitScore, whyFits, interestScore, personalityScore, financialScore, futureScore } = recommendation;
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [universities, setUniversities] = useState<UniversityRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // V2 Enhancement: Check if we have enhanced metadata
  const hasEnhancedData = 'scoringBreakdown' in recommendation;
  const academicScore = hasEnhancedData ? (recommendation as any).scoringBreakdown?.academicStrength : 0;

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const unis = await getUniversitiesForCourse(course.id, preferredLocation);
        setUniversities(unis.slice(0, 3)); // Show top 3
      } catch (error) {
        console.error("Error loading universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [course.id, preferredLocation]);

  return (
    <Card variant="interactive" onClick={onClick} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-20 gradient-primary flex items-center justify-center py-4 md:py-0">
            <span className="text-2xl font-bold text-primary-foreground">#{rank}</span>
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {course.futureOutlook.relevanceIn5Years}/10 future
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{course.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{whyFits}</p>
                
                {/* Fit Score Breakdown */}
                <div className="mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBreakdown(!showBreakdown);
                    }}
                    className="h-7 px-2 text-xs text-primary hover:text-primary/80"
                  >
                    {showBreakdown ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Hide why {fitScore}% fit
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        See why {fitScore}% fit
                      </>
                    )}
                  </Button>
                  
                  {showBreakdown && (
                    <div className="mt-3 space-y-2 p-3 bg-secondary/30 rounded-lg border border-secondary" onClick={(e) => e.stopPropagation()}>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Match Breakdown:</p>
                      
                      <div className="space-y-1.5">
                        {/* Interest Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Heart className="h-3.5 w-3.5 text-red-500" />
                            <span className="text-xs font-medium">Interest Match (35%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-500 transition-all" 
                                style={{ width: `${interestScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold w-8 text-right">{interestScore}%</span>
                          </div>
                        </div>
                        
                        {/* Personality Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-blue-500" />
                            <span className="text-xs font-medium">Personality Fit (20%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all" 
                                style={{ width: `${personalityScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold w-8 text-right">{personalityScore}%</span>
                          </div>
                        </div>
                        
                        {/* Academic Strength - V2 Enhancement */}
                        {hasEnhancedData && academicScore > 0 && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="h-3.5 w-3.5 text-yellow-500" />
                              <span className="text-xs font-medium">Academic Match (15%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-500 transition-all" 
                                  style={{ width: `${academicScore}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold w-8 text-right">{academicScore}%</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Future Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Rocket className="h-3.5 w-3.5 text-orange-500" />
                            <span className="text-xs font-medium">Future Relevance (15%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-orange-500 transition-all" 
                                style={{ width: `${futureScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold w-8 text-right">{futureScore}%</span>
                          </div>
                        </div>
                        
                        {/* Financial Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-xs font-medium">Budget Match (15%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all" 
                                style={{ width: `${financialScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold w-8 text-right">{financialScore}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-secondary">
                        {hasEnhancedData 
                          ? "Powered by V2 Algorithm: Interest (35%), Personality (20%), Academic Fit (15%), Future (15%), Budget (15%)"
                          : "Your overall match is calculated from these factors, weighted by importance."}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* University Recommendations */}
                {!loading && universities.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Offered by:</p>
                    <div className="flex flex-wrap gap-2">
                      {universities.map((uni) => (
                        <div key={uni.id} className="inline-flex items-center gap-1 bg-secondary/50 rounded-full px-2.5 py-1 text-xs">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{uni.name}</span>
                          <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{parseFloat(uni.courseRankingScore).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{fitScore}%</div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
