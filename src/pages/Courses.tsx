import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass, Search, Filter, GraduationCap, Briefcase, TrendingUp, GitCompare, Check, X, Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allCourses } from "@/data/courses";
import { Course } from "@/types";
import CourseComparisonModal from "@/components/courses/CourseComparisonModal";
import AccessCodeModal from "@/components/payment/AccessCodeModal";
import { useAccessStore } from "@/store/accessStore";
import { useAssessmentStore } from "@/store/assessmentStore";

const categoryIcons: Record<string, string> = {
  "Technology": "💻",
  "Health": "🏥",
  "Engineering": "⚙️",
  "Finance & Business": "💼",
  "Governance & Policy": "🏛️",
  "Media & Creative": "🎨",
  "Social Impact": "🌍",
};

const categoryColors: Record<string, string> = {
  "Technology": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Health": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Engineering": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Finance & Business": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Governance & Policy": "bg-slate-500/10 text-slate-600 border-slate-500/20",
  "Media & Creative": "bg-pink-500/10 text-pink-600 border-pink-500/20",
  "Social Impact": "bg-teal-500/10 text-teal-600 border-teal-500/20",
};

// Number of free courses to show per category
const FREE_COURSES_PER_CATEGORY = 4;
const WHATSAPP_LINK = "https://wa.me/2347031279128";

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  const { isUnlocked, checkAccess } = useAccessStore();
  const { recommendations } = useAssessmentStore();
  const [accessValid, setAccessValid] = useState(false);

  // Check access status on mount
  useEffect(() => {
    setAccessValid(checkAccess());
  }, [isUnlocked]);

  // Get recommended course IDs
  const recommendedCourseIds = useMemo(() => {
    return new Set(recommendations.map(r => r.course.id));
  }, [recommendations]);

  const toggleCourseSelection = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!accessValid) {
      setShowAccessModal(true);
      return;
    }
    setSelectedCourses((prev) => {
      const isSelected = prev.some((c) => c.id === course.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== course.id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const removeCourseFromComparison = (courseId: string) => {
    setSelectedCourses((prev) => prev.filter((c) => c.id !== courseId));
    if (selectedCourses.length <= 1) {
      setShowComparison(false);
    }
  };

  const isCourseSelected = (courseId: string) => {
    return selectedCourses.some((c) => c.id === courseId);
  };

  const categories = useMemo(() => {
    const cats = [...new Set(allCourses.map((course) => course.category))];
    return cats.sort();
  }, []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.overview.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const coursesByCategory = useMemo(() => {
    const grouped: Record<string, typeof allCourses> = {};
    filteredCourses.forEach((course) => {
      if (!grouped[course.category]) {
        grouped[course.category] = [];
      }
      grouped[course.category].push(course);
    });
    return grouped;
  }, [filteredCourses]);

  const handleCourseClick = (course: Course, isLocked: boolean) => {
    if (isLocked && !accessValid) {
      setShowAccessModal(true);
    } else {
      navigate(`/course/${course.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <nav className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PathFinder</span>
            </button>
            <Button onClick={() => navigate("/assessment")}>
              Take Assessment
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore <span className="text-gradient-primary">Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through {allCourses.length}+ courses across {categories.length} categories. 
            {!accessValid && " Unlock full access to detailed insights and comparisons."}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              <Filter className="h-4 w-4 mr-1" />
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                <span className="mr-1">{categoryIcons[category]}</span>
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid by Category */}
        {Object.entries(coursesByCategory).map(([category, courses], categoryIndex) => {
          const lockedCount = accessValid ? 0 : Math.max(0, courses.length - FREE_COURSES_PER_CATEGORY);
          
          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + categoryIndex * 0.05 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{categoryIcons[category]}</span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category}</h2>
                  <p className="text-sm text-muted-foreground">
                    {accessValid ? `${courses.length} courses` : `${FREE_COURSES_PER_CATEGORY} of ${courses.length} courses`}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course, index) => {
                  const isLocked = !accessValid && index >= FREE_COURSES_PER_CATEGORY;
                  const isSelected = isCourseSelected(course.id);
                  const isRecommended = recommendedCourseIds.has(course.id);

                  if (isLocked) return null; // Don't show locked courses in grid

                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                      className="relative"
                    >
                      {/* Selection Checkbox - Only for unlocked users */}
                      {accessValid && (
                        <button
                          onClick={(e) => toggleCourseSelection(course, e)}
                          className={`absolute top-3 right-3 z-10 h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background/80 border-muted-foreground/30 hover:border-primary"
                          }`}
                          title={isSelected ? "Remove from comparison" : "Add to comparison"}
                        >
                          {isSelected && <Check className="h-4 w-4" />}
                        </button>
                      )}

                      {/* Recommended Badge */}
                      {isRecommended && accessValid && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                            ⭐ Recommended
                          </Badge>
                        </div>
                      )}

                      <Card
                        variant="interactive"
                        className={`cursor-pointer h-full transition-all ${
                          isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                        }`}
                        onClick={() => handleCourseClick(course, false)}
                      >
                        <CardHeader className={`pb-2 ${accessValid ? 'pr-12' : ''}`}>
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
                            <Badge variant="outline" className={categoryColors[course.category]}>
                              {categoryIcons[course.category]}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {course.overview}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              <span>{course.nigeriaContext.careerOpportunities.length}+ careers</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              <span>{course.schools.length} schools</span>
                            </div>
                          </div>

                          {/* Only show detailed info for unlocked users */}
                          {accessValid ? (
                            <>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full gradient-primary rounded-full"
                                    style={{ width: `${course.futureOutlook.relevanceIn5Years * 10}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">
                                  {course.futureOutlook.relevanceIn5Years}/10
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {course.coreSkills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {course.coreSkills.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{course.coreSkills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="pt-2 border-t border-dashed">
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Lock className="h-3 w-3" />
                                Unlock for full insights
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Locked courses indicator */}
              {!accessValid && lockedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <button
                    onClick={() => setShowAccessModal(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 transition-colors flex items-center justify-center gap-3 group"
                  >
                    <Lock className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      +{lockedCount} more courses available in {category}
                    </span>
                    <Badge variant="outline" className="group-hover:border-primary transition-colors">
                      Unlock
                    </Badge>
                  </button>
                </motion.div>
              )}
            </motion.section>
          );
        })}

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl gradient-primary p-8 md:p-12 text-center"
        >
          {accessValid ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Want personalized course rankings?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Take our assessment to discover which courses match your interests, 
                personality, and career goals best.
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/assessment")}
              >
                Take the Assessment
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Unlock Full Course Access & Personalized Report
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Get access to all courses, detailed insights, salary data, university comparisons, 
                and a downloadable PDF report.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowAccessModal(true)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Enter Access Code
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                  className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Request Code on WhatsApp
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Compass className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">PathFinder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PathFinder. Helping students find their path.
            </p>
          </div>
        </div>
      </footer>

      {/* Comparison Floating Bar - Fixed at bottom, only for unlocked users */}
      <AnimatePresence>
        {accessValid && selectedCourses.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-2xl"
          >
            <div className="container py-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">
                    {selectedCourses.length} course{selectedCourses.length > 1 ? "s" : ""} selected
                  </span>
                  <span className="text-xs text-muted-foreground">(max 4)</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center flex-1">
                  {selectedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg text-sm"
                    >
                      <span className="max-w-24 truncate">{course.name}</span>
                      <button
                        onClick={() => removeCourseFromComparison(course.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCourses([])}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowComparison(true)}
                    disabled={selectedCourses.length < 2}
                  >
                    Compare Courses
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      {showComparison && (
        <CourseComparisonModal
          courses={selectedCourses}
          onClose={() => setShowComparison(false)}
          onRemoveCourse={removeCourseFromComparison}
        />
      )}

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

export default Courses;
