import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseRecommendation } from "@/types";
import { ArrowRight, TrendingUp } from "lucide-react";

interface CourseCardProps {
  recommendation: CourseRecommendation;
  rank: number;
  onClick: () => void;
}

const CourseCard = ({ recommendation, rank, onClick }: CourseCardProps) => {
  const { course, fitScore, whyFits } = recommendation;

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
                <p className="text-sm text-muted-foreground line-clamp-2">{whyFits}</p>
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
