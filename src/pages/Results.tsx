import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass, RefreshCw, Filter, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAssessmentStore } from "@/store/assessmentStore";
import { usePaymentStore } from "@/store/paymentStore";
import CourseCard from "@/components/results/CourseCard";
import PreviewResults from "@/components/results/PreviewResults";
import PaywallModal from "@/components/payment/PaywallModal";
import { useState, useEffect } from "react";

const Results = () => {
  const navigate = useNavigate();
  const { recommendations, resetAssessment, profile } = useAssessmentStore();
  const { isPaid, checkPaymentStatus, isLoading } = usePaymentStore();
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("fit");
  const [showPaywall, setShowPaywall] = useState(false);

  // Check payment status on mount
  useEffect(() => {
    checkPaymentStatus();
  }, []);

  // Redirect if no recommendations
  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Results Yet</h2>
          <p className="text-muted-foreground mb-6">Complete the assessment to get personalized recommendations.</p>
          <Button variant="hero" onClick={() => navigate("/assessment")}>
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const filteredRecommendations = recommendations
    .filter(rec => {
      if (filterLocation === "all") return true;
      return rec.course.schools.some(s => s.location === filterLocation);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "future":
          return b.futureScore - a.futureScore;
        case "financial":
          return b.financialScore - a.financialScore;
        default:
          return b.fitScore - a.fitScore;
      }
    });

  const handleRetake = () => {
    resetAssessment();
    navigate("/assessment");
  };

  const handlePaymentSuccess = () => {
    setShowPaywall(false);
    // Payment status will update from store
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Compass className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">PathFinder</span>
            </div>
            
            <div className="flex items-center gap-2">
              {isPaid && (
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
              <Button variant="outline" onClick={handleRetake} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Retake
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16 border-b">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="accent" className="mb-4">
              {isPaid ? "Your Full Report" : "Your Preview Results"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {isPaid 
                ? `Top ${recommendations.length} Courses For You`
                : "Your Career Assessment Results"
              }
            </h1>
            <p className="text-lg text-muted-foreground">
              {isPaid 
                ? "Based on your interests, personality, and preferences, we've identified these courses as your best matches."
                : "We've analyzed your responses. Unlock the full report to see your personalized course rankings."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content based on payment status */}
      {isPaid ? (
        <>
          {/* Filters - Only for paid users */}
          <section className="border-b bg-card">
            <div className="container py-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Filter:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "All Locations" },
                    { value: "nigeria", label: "Nigeria" },
                    { value: "africa", label: "Africa" },
                    { value: "global", label: "Global" },
                  ].map(option => (
                    <Badge
                      key={option.value}
                      variant={filterLocation === option.value ? "default" : "secondary"}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setFilterLocation(option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-secondary text-secondary-foreground rounded-lg px-3 py-1.5 text-sm border-0 focus:ring-2 focus:ring-primary"
                  >
                    <option value="fit">Best Fit</option>
                    <option value="future">Future Relevance</option>
                    <option value="financial">Affordability</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Full Results Grid */}
          <main className="container py-8 md:py-12">
            <div className="grid gap-6">
              {filteredRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard 
                    recommendation={recommendation} 
                    rank={index + 1}
                    onClick={() => navigate(`/course/${recommendation.course.id}`)}
                  />
                </motion.div>
              ))}
            </div>

            {filteredRecommendations.length === 0 && (
              <Card className="p-12 text-center">
                <CardContent>
                  <p className="text-muted-foreground">
                    No courses found with the selected filters. Try adjusting your filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </main>
        </>
      ) : (
        /* Preview Results for unpaid users */
        <main className="container py-8 md:py-12 max-w-4xl">
          <PreviewResults 
            recommendations={recommendations}
            profile={profile}
            onUnlock={() => setShowPaywall(true)}
          />
        </main>
      )}

      {/* Paywall Modal */}
      <PaywallModal 
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Results;
