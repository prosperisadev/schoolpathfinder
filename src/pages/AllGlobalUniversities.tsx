import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allCourses } from "@/data/courses";
import { globalUniversities } from "@/data/universities";
import { getCourseUniversityRankings } from "@/data/universityRankings";
import { getUniversitiesForCourse } from "@/data/courseUniversityMapping";
import { useAccessStore } from "@/store/accessStore";
import { PaywallBlocker } from "@/components/payment/PaywallBlocker";
import PaywallModal from "@/components/payment/PaywallModal";
import type { School } from "@/types";

export default function AllGlobalUniversities() {
  const { courseId } = useParams<{ courseId: string }>();
  const [showPaywall, setShowPaywall] = useState(false);
  const isUnlocked = useAccessStore((state) => state.isUnlocked);
  
  const course = allCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get ALL Global universities offering this course (EXCLUDING AFRICA)
  const courseMapping = getUniversitiesForCourse(courseId || "");
  const globalUniversityIds = courseMapping?.globalUniversityIds || [];
  
  // Get ALL rankings (not just top 5)
  const allRankings = getCourseUniversityRankings(courseId || "", "global");
  
  // Filter to only include universities that actually offer the course
  const validRankings = allRankings.filter(ranking => 
    globalUniversityIds.includes(ranking.universityId)
  );

  // Apply Paywall Logic
  const displayedRankings = isUnlocked ? validRankings : validRankings.slice(0, 3);
  const isPaywalled = !isUnlocked && validRankings.length > 3;

  const getGlobalUniversityDetails = (universityId: string): School | undefined => {
    return globalUniversities.find(u => u.id === universityId);
  };

  const renderUniversityCard = (ranking: any) => {
    const university = getGlobalUniversityDetails(ranking.universityId);
    if (!university) return null;

    return (
      <Card key={ranking.universityId} className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {university.name}
                <Badge variant="secondary" className="ml-2">
                  #{ranking.ranking}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {university.country}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Tuition */}
            <div>
              <p className="text-sm font-semibold text-gray-700">Tuition Range:</p>
              <p className="text-sm text-gray-600">
                {university.tuitionRange.currency} {university.tuitionRange.min.toLocaleString()} - {university.tuitionRange.max.toLocaleString()}/year
              </p>
              {university.scholarshipAvailable && (
                <Badge variant="outline" className="mt-1">
                  Scholarships Available
                </Badge>
              )}
            </div>

            {/* Pros */}
            <div>
              <p className="text-sm font-semibold text-green-700 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Pros:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mt-1">
                {ranking.pros.slice(0, 3).map((pro: string, idx: number) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <p className="text-sm font-semibold text-red-700 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                Cons:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mt-1">
                {ranking.cons.slice(0, 3).map((con: string, idx: number) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link to={`/course/${courseId}/universities`}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Global Universities Offering {course.name}
          </h1>
          <p className="text-lg text-gray-600">
            Complete list of {validRankings.length} global {validRankings.length === 1 ? 'university' : 'universities'} (outside Africa) where you can study {course.name}
          </p>
        </div>

        {/* University Grid */}
        {validRankings.length > 0 ? (
          <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {displayedRankings.map((ranking) => renderUniversityCard(ranking))}
            </div>
            {isPaywalled && (
              <PaywallBlocker onUnlock={() => setShowPaywall(true)} />
            )}
          </div>
        ) : (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                University Data Coming Soon
              </h3>
              <p className="text-gray-600">
                We're working on adding comprehensive global university information for {course.name}.

      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
        onSuccess={() => setShowPaywall(false)} 
      />
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
