import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Briefcase, TrendingUp, BookOpen, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Course } from "@/types";

interface CourseComparisonModalProps {
  courses: Course[];
  onClose: () => void;
  onRemoveCourse: (courseId: string) => void;
}

const formatCurrency = (amount: number, currency: string) => {
  if (currency === "NGN") {
    return `₦${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
};

const CourseComparisonModal = ({ courses, onClose, onRemoveCourse }: CourseComparisonModalProps) => {
  if (courses.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-4 md:inset-8 bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b bg-card shrink-0">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Compare Courses</h2>
              <p className="text-sm text-muted-foreground">Comparing {courses.length} courses</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Comparison Cards - Vertical Scroll Only */}
          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className={`grid gap-4 ${courses.length === 2 ? 'md:grid-cols-2' : courses.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
              {courses.map((course) => (
                <div key={course.id} className="bg-muted/30 rounded-xl p-4 border relative">
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => onRemoveCourse(course.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Course Header */}
                  <div className="mb-4 pr-6">
                    <h3 className="font-bold text-foreground text-lg leading-tight">{course.name}</h3>
                    <Badge variant="outline" className="mt-2">{course.category}</Badge>
                  </div>

                  {/* Overview */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Overview</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3">{course.overview}</p>
                  </div>

                  {/* Core Skills */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Core Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.coreSkills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.coreSkills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">+{course.coreSkills.length - 4}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Career Paths</span>
                    </div>
                    <ul className="space-y-1">
                      {course.nigeriaContext.careerOpportunities.slice(0, 3).map((career) => (
                        <li key={career} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                          {career}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Salary */}
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <div className="bg-background/50 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">🇳🇬 Nigeria</p>
                      <p className="text-xs font-medium text-primary">
                        {formatCurrency(course.nigeriaContext.salaryRange.max, "NGN")}
                      </p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">🌍 Global</p>
                      <p className="text-xs font-medium text-primary">
                        {formatCurrency(course.globalContext.salaryRange.max, "USD")}
                      </p>
                    </div>
                  </div>

                  {/* Future Relevance */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Future Relevance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-primary rounded-full"
                          style={{ width: `${course.futureOutlook.relevanceIn5Years * 10}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{course.futureOutlook.relevanceIn5Years}/10</span>
                    </div>
                  </div>

                  {/* Universities */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <School className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Universities</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span>🇳🇬 {course.schools.filter((s) => s.location === "nigeria").length}</span>
                      <span>🌍 {course.schools.filter((s) => s.location === "africa").length}</span>
                      <span>🌐 {course.schools.filter((s) => s.location === "global").length}</span>
                    </div>
                  </div>

                  {/* Trends */}
                  <div>
                    <p className="text-xs font-medium mb-2">🚀 Trends</p>
                    <div className="flex flex-wrap gap-1">
                      {course.futureOutlook.trends.slice(0, 3).map((trend) => (
                        <Badge key={trend} variant="outline" className="text-xs bg-primary/5">
                          {trend}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseComparisonModal;
