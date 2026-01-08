import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allCourses } from "@/data/courses";
import { nigerianUniversities, africanUniversities, globalUniversities } from "@/data/universities";
import { getTopUniversities } from "@/data/universityRankings";
import type { School } from "@/types";

export default function CourseUniversities() {
  const { courseId } = useParams<{ courseId: string }>();
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  
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

  // Get top universities for each region
  const nigerianRankings = getTopUniversities(courseId, "nigeria", 5);
  const africanRankings = getTopUniversities(courseId, "africa", 5);
  const globalRankings = getTopUniversities(courseId, "global", 5);

  // Get full university details
  const getNigerianUniversityDetails = (universityId: string): School | undefined => {
    return nigerianUniversities.find(u => u.id === universityId);
  };

  const getAfricanUniversityDetails = (universityId: string): School | undefined => {
    return africanUniversities.find(u => u.id === universityId);
  };

  const getGlobalUniversityDetails = (universityId: string): School | undefined => {
    return globalUniversities.find(u => u.id === universityId);
  };

  const renderUniversityCard = (ranking: any, getUniversityDetails: (id: string) => School | undefined) => {
    const university = getUniversityDetails(ranking.universityId);
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

  const renderRegionSection = (
    title: string,
    description: string,
    rankings: any[],
    getUniversityDetails: (id: string) => School | undefined,
    regionKey: string,
    allUniversitiesLink: string
  ) => {
    if (rankings.length === 0) {
      return null;
    }

    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rankings.map((ranking) => renderUniversityCard(ranking, getUniversityDetails))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setExpandedRegion(expandedRegion === regionKey ? null : regionKey)}
          >
            <ExternalLink className="h-4 w-4" />
            View all {title.toLowerCase()} offering this course →
          </Button>
        </div>

        {/* Expanded view would load all universities here */}
        {expandedRegion === regionKey && (
          <Card className="mt-4 bg-blue-50">
            <CardContent className="p-6">
              <p className="text-center text-gray-700">
                Complete list of all {rankings.length}+ universities would load here.
                <br />
                This would include sorting options, filters, and full details.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link to={`/course/${courseId}`}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to {course.name}
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Universities Offering {course.name}
          </h1>
          <p className="text-lg text-gray-600">
            Explore universities by region, ranked by their {course.name} programs
          </p>
        </div>

        {/* Course Availability Notice */}
        {course.nigerianAvailable === false && (
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <p className="text-yellow-900 font-semibold">
                ⚠️ This course is not currently offered as a standalone degree in Nigerian universities.
              </p>
              <p className="text-yellow-800 text-sm mt-2">
                Consider related courses like Computer Science or explore international universities below.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-12">
          {/* Nigerian Universities Section */}
          {renderRegionSection(
            "Nigerian Universities",
            "Top Nigerian universities offering " + course.name + ", ranked by program quality",
            nigerianRankings,
            getNigerianUniversityDetails,
            "nigeria",
            `/universities/nigeria/${courseId}`
          )}

          {/* African Universities Section (excluding Nigeria) */}
          {renderRegionSection(
            "African Universities (Non-Nigerian)",
            "Leading African universities outside Nigeria with strong " + course.name + " programs",
            africanRankings,
            getAfricanUniversityDetails,
            "africa",
            `/universities/africa/${courseId}`
          )}

          {/* Global Universities Section */}
          {renderRegionSection(
            "Global Universities",
            "World-class universities offering " + course.name + " with global recognition",
            globalRankings,
            getGlobalUniversityDetails,
            "global",
            `/universities/global/${courseId}`
          )}
        </div>

        {/* No universities message */}
        {nigerianRankings.length === 0 && africanRankings.length === 0 && globalRankings.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                University data coming soon
              </h3>
              <p className="text-gray-600">
                We're working on adding comprehensive university information for this course.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
