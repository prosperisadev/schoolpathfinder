import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Compass, 
  BookOpen, 
  Globe, 
  Briefcase, 
  GraduationCap,
  TrendingUp,
  Award,
  MapPin,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  Lock,
  MessageCircle,
  Users,
  Target,
  ArrowRight,
  TrendingDown,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCoursById } from "@/data/courses";
import UniversityCard from "@/components/results/UniversityCard";
import AccessCodeModal from "@/components/payment/AccessCodeModal";
import { useAccessStore } from "@/store/accessStore";
import { useAssessmentStore } from "@/store/assessmentStore";
import { getCareerPathway, getCareerTrends } from "@/data/careerPathways";
import { generatePeerComparison, getSimilarStudentChoices } from "@/data/peerInsights";

const WHATSAPP_LINK = "https://wa.me/2347031279128";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCoursById(courseId || "");
  const { isUnlocked, checkAccess } = useAccessStore();
  const { profile } = useAssessmentStore();
  const [accessValid, setAccessValid] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  const careerPathway = getCareerPathway(courseId || "");
  const careerTrends = getCareerTrends(courseId || "");

  useEffect(() => {
    setAccessValid(checkAccess());
  }, [isUnlocked]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h2>
          <Button variant="hero" onClick={() => navigate("/results")}>
            Back to Results
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "NGN") {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  // Locked content overlay component
  const LockedOverlay = ({ children, title }: { children: React.ReactNode, title: string }) => {
    if (accessValid) return <>{children}</>;
    
    return (
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-md bg-background/70 z-10 flex flex-col items-center justify-center rounded-xl p-6 text-center">
          <Lock className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="font-medium text-foreground mb-2">Unlock to view {title}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" onClick={() => setShowAccessModal(true)}>
              Enter Access Code
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              className="gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              Get Code
            </Button>
          </div>
        </div>
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
      </div>
    );
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
            
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16 border-b">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="secondary" className="mb-4">{course.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {course.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {course.overview}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {course.coreSkills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2 bg-transparent p-0">
            {[
              { value: "overview", label: "Overview", icon: BookOpen },
              { value: "peer-insights", label: "Peer Insights", icon: Users },
              { value: "career-pathway", label: "Career Journey", icon: Target },
              { value: "nigeria-vs-global", label: "Nigeria vs Global", icon: Globe },
              { value: "curriculum", label: "Curriculum", icon: GraduationCap },
              { value: "schools", label: "Schools", icon: MapPin },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary text-secondary-foreground rounded-lg py-3 gap-2"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Future Outlook
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Relevance Today</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-primary rounded-full"
                          style={{ width: `${course.futureOutlook.relevanceToday * 10}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground">{course.futureOutlook.relevanceToday}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Relevance in 5 Years</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full gradient-accent rounded-full"
                          style={{ width: `${course.futureOutlook.relevanceIn5Years * 10}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground">{course.futureOutlook.relevanceIn5Years}/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2">
                    {course.futureOutlook.techImpact}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {course.futureOutlook.trends.map((trend) => (
                      <Badge key={trend} variant="muted">{trend}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <LockedOverlay title="Success Pathway">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Success Pathway
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recommended Internships</h4>
                      <ul className="space-y-1">
                        {course.successPathway.internships.slice(0, 3).map((item) => (
                          <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Key Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.successPathway.certifications.slice(0, 4).map((cert) => (
                          <Badge key={cert} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </LockedOverlay>
            </div>
          </TabsContent>

          {/* Peer Insights Tab */}
          <TabsContent value="peer-insights" className="space-y-6">
            {profile?.academicTrack && (
              <Card variant="elevated" className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Students Like You
                  </CardTitle>
                  <CardDescription>
                    Based on aggregated data from {profile.academicTrack} students with similar profiles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    {generatePeerComparison(
                      profile.academicTrack,
                      profile.learningStyle || "moderate_learner",
                      courseId || ""
                    )}
                  </p>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">Similar students also explore:</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSimilarStudentChoices(profile.academicTrack, courseId).map((altCourseId) => {
                        const altCourse = getCoursById(altCourseId);
                        return altCourse ? (
                          <Link key={altCourseId} to={`/course/${altCourseId}`}>
                            <Badge variant="outline" className="hover:bg-blue-100 cursor-pointer">
                              {altCourse.name}
                            </Badge>
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Career Outcome Trends */}
            {careerTrends && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {careerTrends.demandTrend === "↑" && <TrendingUp className="h-5 w-5 text-green-600" />}
                      {careerTrends.demandTrend === "↓" && <TrendingDown className="h-5 w-5 text-red-600" />}
                      {careerTrends.demandTrend === "→" && <Minus className="h-5 w-5 text-yellow-600" />}
                      Demand Trend {careerTrends.demandTrend}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{careerTrends.demandDescription}</p>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {careerTrends.salaryTrendSymbol === "↑" && <TrendingUp className="h-5 w-5 text-green-600" />}
                      {careerTrends.salaryTrendSymbol === "↓" && <TrendingDown className="h-5 w-5 text-red-600" />}
                      {careerTrends.salaryTrendSymbol === "→" && <Minus className="h-5 w-5 text-yellow-600" />}
                      Salary Trend {careerTrends.salaryTrendSymbol}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{careerTrends.salaryDescription}</p>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      Industry Adoption
                    </CardTitle>
                    <CardDescription className="capitalize">{careerTrends.industryAdoption} pace</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{careerTrends.industryAdoptionDescription}</p>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-600" />
                      Automation Risk
                    </CardTitle>
                    <CardDescription>
                      <Badge 
                        variant={
                          careerTrends.automationRisk === "low" ? "default" :
                          careerTrends.automationRisk === "medium" ? "secondary" :
                          "destructive"
                        }
                      >
                        {careerTrends.automationRisk.toUpperCase()}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{careerTrends.automationRiskDescription}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {careerTrends && (
              <Card variant="elevated" className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Future Outlook
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 font-medium">{careerTrends.futureOutlook}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Career Pathway Tab */}
          <TabsContent value="career-pathway" className="space-y-6">
            <LockedOverlay title="Career Pathway Journey">
              <div className="space-y-8">
                {/* Day-to-Day Work and Employers Overview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Day-to-Day Work
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{course.careerPath.dayToDay}</p>
                    </CardContent>
                  </Card>

                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        Typical Employers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {course.careerPath.typicalEmployers.map((employer) => (
                          <Badge key={employer} variant="secondary" className="text-sm py-1 px-3">
                            {employer}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Career Progression Timeline */}
                {careerPathway && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                      <Target className="h-6 w-6 text-primary" />
                      Your Career Journey
                    </h3>
                    
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 hidden md:block" />
                      
                      <div className="space-y-8">
                        {careerPathway.pathway.map((role, index) => (
                          <div key={role.title} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background z-10 hidden md:block" />
                            
                            <Card variant="elevated" className="md:ml-16">
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <Badge 
                                      variant={
                                        role.stage === "entry" ? "default" :
                                        role.stage === "mid" ? "secondary" :
                                        "outline"
                                      }
                                      className="mb-2"
                                    >
                                      {role.stage === "entry" ? "Entry Level" :
                                       role.stage === "mid" ? "Mid Career" :
                                       "Senior Level"}
                                    </Badge>
                                    <CardTitle>{role.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                      <Clock className="h-4 w-4" />
                                      {role.yearsExperience}
                                    </CardDescription>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{role.description}</p>
                                
                                {role.typicalSalaryNGN && (
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-foreground mb-1">Nigeria Monthly Salary:</p>
                                      <p className="text-lg font-semibold text-primary">
                                        ₦{((role.typicalSalaryNGN.min / 12) / 1000).toFixed(0)}K - ₦{((role.typicalSalaryNGN.max / 12) / 1000).toFixed(0)}K/month
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        (₦{(role.typicalSalaryNGN.min / 1000000).toFixed(1)}M - ₦{(role.typicalSalaryNGN.max / 1000000).toFixed(1)}M per year)
                                      </p>
                                    </div>
                                    {role.typicalSalaryUSD && (
                                      <div>
                                        <p className="text-sm font-medium text-foreground mb-1">Global Monthly Salary:</p>
                                        <p className="text-lg font-semibold text-accent">
                                          ${((role.typicalSalaryUSD.min / 12) / 1000).toFixed(1)}K - ${((role.typicalSalaryUSD.max / 12) / 1000).toFixed(1)}K/month
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          (${(role.typicalSalaryUSD.min / 1000).toFixed(0)}K - ${(role.typicalSalaryUSD.max / 1000).toFixed(0)}K per year)
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <div>
                                  <p className="text-sm font-medium text-foreground mb-2">Required Skills:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {role.requiredSkills.map((skill) => (
                                      <Badge key={skill} variant="outline">{skill}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                {role.certifications && role.certifications.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-foreground mb-2">Recommended Certifications:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {role.certifications.map((cert) => (
                                        <Badge key={cert} variant="secondary">{cert}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                            
                            {index < careerPathway.pathway.length - 1 && (
                              <div className="flex items-center justify-center my-4 md:ml-16">
                                <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90 md:rotate-0" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects and Volunteering */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Recommended Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.successPathway.projects.map((project) => (
                          <li key={project} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Volunteering Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.successPathway.volunteering.map((vol) => (
                          <li key={vol} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                            {vol}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Alternative Pathways */}
                {careerPathway && careerPathway.alternativePathways && careerPathway.alternativePathways.length > 0 && (
                  <div className="pt-8 border-t">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Alternative Career Tracks</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {careerPathway.alternativePathways.map((altPath) => (
                        <Card key={altPath.name} variant="elevated" className="border-l-4 border-l-accent">
                          <CardHeader>
                            <CardTitle className="text-lg">{altPath.name}</CardTitle>
                            <CardDescription>{altPath.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {altPath.roles.map((role) => (
                                <div key={role.title} className="border-l-2 border-muted pl-3 py-2">
                                  <p className="font-medium text-foreground">{role.title}</p>
                                  <p className="text-sm text-muted-foreground">{role.yearsExperience}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </LockedOverlay>
          </TabsContent>

          {/* Nigeria vs Global Tab */}
          <TabsContent value="nigeria-vs-global" className="space-y-6">
            <LockedOverlay title="Nigeria vs Global Comparison">
              <div className="grid md:grid-cols-2 gap-6">
                <Card variant="elevated" className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🇳🇬</span>
                      In Nigeria
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{course.nigeriaContext.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Teaching Style</h4>
                      <p className="text-sm text-muted-foreground">{course.nigeriaContext.teachingStyle}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Career Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.nigeriaContext.careerOpportunities.map((opp) => (
                          <Badge key={opp} variant="secondary">{opp}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Salary Range
                      </h4>
                      <p className="text-lg font-semibold text-primary">
                        ₦{((course.nigeriaContext.salaryRange.min / 12) / 1000).toFixed(0)}K - ₦{((course.nigeriaContext.salaryRange.max / 12) / 1000).toFixed(0)}K/month
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (₦{(course.nigeriaContext.salaryRange.min / 1000000).toFixed(1)}M - ₦{(course.nigeriaContext.salaryRange.max / 1000000).toFixed(1)}M per year)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="border-l-4 border-l-accent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🌍</span>
                      Globally
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{course.globalContext.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Teaching Style</h4>
                      <p className="text-sm text-muted-foreground">{course.globalContext.teachingStyle}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Career Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.globalContext.careerOpportunities.map((opp) => (
                          <Badge key={opp} variant="secondary">{opp}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Salary Range
                      </h4>
                      <p className="text-lg font-semibold text-accent">
                        ${((course.globalContext.salaryRange.min / 12) / 1000).toFixed(1)}K - ${((course.globalContext.salaryRange.max / 12) / 1000).toFixed(1)}K/month
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (${(course.globalContext.salaryRange.min / 1000).toFixed(0)}K - ${(course.globalContext.salaryRange.max / 1000).toFixed(0)}K per year)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </LockedOverlay>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(course.curriculum).map(([year, subjects]) => (
                <Card key={year} variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      {year.replace("year", "Year ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {subjects.map((subject) => (
                        <li key={subject} className="flex items-center gap-2 text-muted-foreground">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schools Tab */}
          <TabsContent value="schools" className="space-y-8">
            {course.nigerianAvailable === false && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <p className="text-yellow-900 font-semibold">
                    ⚠️ This course is not currently offered as a standalone degree in Nigerian universities.
                  </p>
                  <p className="text-yellow-800 text-sm mt-2">
                    Consider related courses or explore international universities.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center">
              <Link to={`/course/${courseId}/universities`}>
                <Button size="lg" className="gap-2">
                  <MapPin className="h-5 w-5" />
                  View All Universities Offering This Course
                </Button>
              </Link>
            </div>

            <LockedOverlay title="University Preview">
              <div className="space-y-8">
                {[
                  { location: "nigeria", emoji: "🇳🇬", title: "Top 5 Nigerian Universities", subtitle: "Ranked by program quality" },
                  { location: "africa", emoji: "🌍", title: "Top 5 African Universities", subtitle: "Outside Nigeria" },
                  { location: "global", emoji: "🌐", title: "Top 5 Global Universities", subtitle: "World-class institutions" },
                ].map(({ location, emoji, title, subtitle }) => {
                  const locationSchools = course.schools
                    .filter(s => s.location === location)
                    .sort((a, b) => (a.ranking || 999) - (b.ranking || 999))
                    .slice(0, 5);
                  
                  if (locationSchools.length === 0) return null;
                  
                  return (
                    <div key={location}>
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            <span className="text-2xl">{emoji}</span>
                            {title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {locationSchools.map((school, index) => (
                          <UniversityCard key={school.id} school={school} rank={index + 1} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </LockedOverlay>
          </TabsContent>
        </Tabs>
      </main>

      {/* Access Code Modal */}
      <AccessCodeModal 
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onSuccess={() => {
          setShowAccessModal(false);
          setAccessValid(true);
        }}
      />
    </div>
  );
};

export default CourseDetail;
