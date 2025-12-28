import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCoursById } from "@/data/courses";
import UniversityCard from "@/components/results/UniversityCard";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCoursById(courseId || "");

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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent p-0">
            {[
              { value: "overview", label: "Overview", icon: BookOpen },
              { value: "nigeria-vs-global", label: "Nigeria vs Global", icon: Globe },
              { value: "career", label: "Career Path", icon: Briefcase },
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
            </div>
          </TabsContent>

          {/* Nigeria vs Global Tab */}
          <TabsContent value="nigeria-vs-global" className="space-y-6">
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
                      {formatCurrency(course.nigeriaContext.salaryRange.min, "NGN")} - {formatCurrency(course.nigeriaContext.salaryRange.max, "NGN")}/year
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
                      ${(course.globalContext.salaryRange.min / 1000).toFixed(0)}K - ${(course.globalContext.salaryRange.max / 1000).toFixed(0)}K/year
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Career Path Tab */}
          <TabsContent value="career" className="space-y-6">
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
                    <Badge key={employer} variant="secondary" className="text-sm py-2 px-4">
                      {employer}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

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
            {[
              { location: "nigeria", emoji: "🇳🇬", title: "Top 5 Nigerian Universities", subtitle: "With WAEC/JAMB Requirements" },
              { location: "africa", emoji: "🌍", title: "Top 5 African Universities", subtitle: "With International Certifications" },
              { location: "global", emoji: "🌐", title: "Top 5 Global Universities", subtitle: "With International Certifications" },
            ].map(({ location, emoji, title, subtitle }) => {
              const locationSchools = course.schools
                .filter(s => s.location === location)
                .sort((a, b) => (a.ranking || 999) - (b.ranking || 999))
                .slice(0, 5);
              
              if (locationSchools.length === 0) return null;
              
              return (
                <div key={location}>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">{emoji}</span>
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {locationSchools.map((school, index) => (
                      <UniversityCard key={school.id} school={school} rank={index + 1} />
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CourseDetail;
