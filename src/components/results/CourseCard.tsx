import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseRecommendation } from "@/types";
import { ArrowRight, TrendingUp, MapPin, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getUniversitiesForCourse, UniversityRecommendation } from "@/lib/api";

interface CourseCardProps {
  recommendation: CourseRecommendation;
  rank: number;
  onClick: () => void;
  preferredLocation?: "nigeria" | "africa" | "global";
}

const CourseCard = ({ recommendation, rank, onClick, preferredLocation = "nigeria" }: CourseCardProps) => {
  const { course, fitScore, whyFits } = recommendation;
  const [universities, setUniversities] = useState<UniversityRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

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
