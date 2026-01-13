import { motion } from "framer-motion";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Compass, RefreshCw, Filter, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAccessStore } from "@/store/accessStore";
import CourseCard from "@/components/results/CourseCard";
import PreviewResults from "@/components/results/PreviewResults";
import AccessCodeModal from "@/components/payment/AccessCodeModal";
import ShareModal from "@/components/results/ShareModal";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { generatePersonalizedSummary } from "@/lib/recommendations";
import { CourseRecommendation, UserProfile } from "@/types";
import { getSessionByShareToken, saveSession } from "@/lib/api";
import { useTrackAssessment } from "@/hooks/useTrackAssessment";
import { useAssessmentStore } from "@/store/assessmentStore";

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { toast } = useToast();
  const { recommendations, resetAssessment, profile, hydrateFromShare } = useAssessmentStore();
  const { isUnlocked, checkAccess, shareToken, loadFromShareToken, fullName, email, setEmail } = useAccessStore();
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("fit");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [accessValid, setAccessValid] = useState(false);
  const [loadingSharedResults, setLoadingSharedResults] = useState(false);
  const [currentShareToken, setCurrentShareToken] = useState<string>('');
  const [hasAutoShown, setHasAutoShown] = useState(false);
  const [shareDefaultTab, setShareDefaultTab] = useState<"invite" | "results" | "email">("invite");
  const [savingShare, setSavingShare] = useState(false);

  // Resolve share token from query or path
  const shareId = searchParams.get('share') || params.shareId;
  
  // Track assessment completion
  const trackAssessment = useTrackAssessment();

  // Track completion when results are loaded (not from shared link)
  useEffect(() => {
    const isSharedLink = searchParams.get('share');
    if (recommendations.length > 0 && !isSharedLink) {
      trackAssessment();
    }
  }, [recommendations.length, searchParams]);

  // Handle shareable link - reload-resilient approach
  useEffect(() => {
    const handleShareToken = async () => {
      const token = shareId;
      if (token) {
        setLoadingSharedResults(true);
        try {
          // Fetch session data from API using the share token
          const session = await getSessionByShareToken(token);

          if (!session) {
            toast({
              title: "Link Not Found",
              description: "This shared link is invalid or has been removed.",
              variant: "destructive",
            });
            setLoadingSharedResults(false);
            return;
          }

          // Check expiration
          if (session.expiresAt) {
            const expiresAt = new Date(session.expiresAt);
            if (expiresAt < new Date()) {
              toast({
                title: "Link Expired",
                description: "This shared link has expired. Please request a new one.",
                variant: "destructive",
              });
              setLoadingSharedResults(false);
              return;
            }
          }

          // Load the shared data into stores so we can render in incognito
          if (session.assessmentData?.profile || session.recommendations) {
            hydrateFromShare({
              profile: session.assessmentData?.profile as Partial<UserProfile>,
              recommendations: (session.recommendations as CourseRecommendation[]) || [],
            });
          }

          // Load the shared data for access unlock state
          await loadFromShareToken(token);
          setLoadingSharedResults(false);
        } catch (error) {
          console.error("Error loading shared results:", error);
          toast({
            title: "Error",
            description: "Failed to load shared results. Please try again.",
            variant: "destructive",
          });
          setLoadingSharedResults(false);
        }
      }
    };

    handleShareToken();
  }, [shareId]);

  // Check access status on mount
  useEffect(() => {
    setAccessValid(checkAccess());
  }, [isUnlocked]);

  // Auto-show share modal when results first load (not from shared link)
  useEffect(() => {
    const isSharedLink = shareId;
    if (!isSharedLink && accessValid && recommendations.length > 0 && !hasAutoShown && !loadingSharedResults) {
      // Small delay to let the results render first
      const timer = setTimeout(() => {
        void handleShare("invite");
        setHasAutoShown(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessValid, recommendations.length, hasAutoShown, loadingSharedResults, shareId]);

  // Redirect if no recommendations and not loading shared results
  if (recommendations.length === 0 && !loadingSharedResults) {
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

  // Loading state for shared results
  if (loadingSharedResults) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-foreground">Loading Results...</h2>
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

  const handleAccessSuccess = () => {
    setShowAccessModal(false);
    setAccessValid(true);
  };

  const handleShare = async (
    defaultTab: "invite" | "results" | "email" = "results",
    emailOverride?: string
  ): Promise<string | null> => {
    // Use existing shareId if present (e.g., when already on a shared link), otherwise generate client UUID
    let token = shareId || shareToken || currentShareToken;
    if (!token && typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      token = crypto.randomUUID();
    }

    if (!token) {
      toast({
        title: "Error",
        description: "Unable to create share link. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSavingShare(true);
      const sessionEmail = emailOverride || email || `share+${token}@pathfinder.link`;
      if (emailOverride) {
        setEmail(emailOverride);
      }
      const payload = {
        email: sessionEmail,
        fullName: profile.fullName || fullName,
        shareToken: token,
        isShared: true,
        shareCreatedAt: new Date().toISOString(),
        assessmentData: { profile },
        recommendations,
        paymentStatus: "shared",
      };

      const saved = await saveSession(payload);

      if (!saved) {
        throw new Error("Failed to save share session");
      }

      setCurrentShareToken(token);
      const nextTab = emailOverride || email ? defaultTab : "email";
      setShareDefaultTab(nextTab);
      setShowShareModal(true);
      return `${window.location.origin}/assessment/${token}`;
    } catch (error) {
      console.error("Error preparing share link:", error);
      toast({
        title: "Share Failed",
        description: "We couldn't prepare your share link. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setSavingShare(false);
    }
  };

  const handleEmailCapture = async (capturedEmail: string) => {
    return handleShare("results", capturedEmail);
  };

  const userName = profile.fullName?.split(' ')[0] || fullName?.split(' ')[0] || 'there';
  const personalizedSummary = profile.fullName ? generatePersonalizedSummary(profile as UserProfile, recommendations) : null;

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
              {accessValid && (
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "Copied!" : "Share"}
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
              {accessValid ? "Your Full Report" : "Your Preview Results"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {accessValid 
                ? `${userName}, here are your top ${recommendations.length} courses`
                : `${userName}, here's what we found`
              }
            </h1>
            <p className="text-lg text-muted-foreground">
              {accessValid 
                ? "Based on your interests, personality, and preferences, we've identified these courses as your best matches."
                : "We've analyzed your responses. Unlock the full report to see your personalized course rankings."
              }
            </p>
            {accessValid && personalizedSummary && (
              <Card className="mt-6 bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-foreground leading-relaxed">{personalizedSummary}</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content based on access status */}
              {accessValid && (
                <Button
                  variant="outline"
                  onClick={() => handleShare("results")}
                  className="gap-2"
                  disabled={savingShare}
                >
          {/* Filters - Only for unlocked users */}
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
                    preferredLocation={filterLocation === "all" ? "nigeria" : (filterLocation as any)}
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
        /* Preview Results for locked users */
        <main className="container py-8 md:py-12 max-w-4xl">
          <PreviewResults 
            recommendations={recommendations}
            profile={profile}
            onUnlock={() => setShowAccessModal(true)}
          />
        </main>
      )}

      {/* Access Code Modal */}
      <AccessCodeModal 
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onSuccess={handleAccessSuccess}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareToken={currentShareToken || shareToken}
        studentName={profile.fullName || fullName}
        defaultTab={shareDefaultTab}
        onEmailCapture={handleEmailCapture}
      />
    </div>
  );
};

export default Results;
