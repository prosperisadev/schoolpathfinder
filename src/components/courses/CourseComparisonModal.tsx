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

const getCurriculumItems = (curriculum: Course["curriculum"]) => {
  const allItems = [
    ...curriculum.year1.slice(0, 1),
    ...curriculum.year2.slice(0, 1),
    ...curriculum.year3.slice(0, 1),
    ...curriculum.year4.slice(0, 1),
  ];
  return allItems;
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
          <div className="flex items-center justify-between p-4 md:p-6 border-b bg-card">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Compare Courses</h2>
              <p className="text-sm text-muted-foreground">Comparing {courses.length} courses side by side</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Comparison Table */}
          <ScrollArea className="flex-1">
            <div className="min-w-max">
              <table className="w-full">
                <thead className="sticky top-0 bg-card z-10">
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-muted-foreground w-48 min-w-48">Attribute</th>
                    {courses.map((course) => (
                      <th key={course.id} className="text-left p-4 min-w-72 max-w-80">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-foreground text-lg">{course.name}</h3>
                            <Badge variant="outline" className="mt-1">{course.category}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => onRemoveCourse(course.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Overview */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Overview
                      </div>
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 text-sm text-muted-foreground">
                        {course.overview}
                      </td>
                    ))}
                  </tr>

                  {/* Core Skills */}
                  <tr className="border-b">
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        Core Skills
                      </div>
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {course.coreSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Career Opportunities */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        Career Paths
                      </div>
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <ul className="space-y-1">
                          {course.nigeriaContext.careerOpportunities.slice(0, 5).map((career) => (
                            <li key={career} className="text-sm text-muted-foreground flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              {career}
                            </li>
                          ))}
                          {course.nigeriaContext.careerOpportunities.length > 5 && (
                            <li className="text-xs text-muted-foreground">
                              +{course.nigeriaContext.careerOpportunities.length - 5} more
                            </li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Salary Range (Nigeria) */}
                  <tr className="border-b">
                    <td className="p-4 font-medium text-foreground">
                      💰 Salary Range (Nigeria)
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="text-sm">
                          <div className="text-muted-foreground">
                            Min: {formatCurrency(course.nigeriaContext.salaryRange.min, course.nigeriaContext.salaryRange.currency)}
                          </div>
                          <div className="text-primary font-medium">
                            Max: {formatCurrency(course.nigeriaContext.salaryRange.max, course.nigeriaContext.salaryRange.currency)}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Global Salary */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium text-foreground">
                      🌍 Salary Range (Global)
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="text-sm">
                          <div className="text-muted-foreground">
                            Min: {formatCurrency(course.globalContext.salaryRange.min, course.globalContext.salaryRange.currency)}
                          </div>
                          <div className="text-primary font-medium">
                            Max: {formatCurrency(course.globalContext.salaryRange.max, course.globalContext.salaryRange.currency)}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Future Relevance */}
                  <tr className="border-b">
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Future Relevance
                      </div>
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full gradient-primary rounded-full"
                                style={{ width: `${course.futureOutlook.relevanceIn5Years * 10}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{course.futureOutlook.relevanceIn5Years}/10</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{course.futureOutlook.techImpact}</p>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Number of Schools */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-primary" />
                        Universities
                      </div>
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="text-sm">
                          <div>🇳🇬 {course.schools.filter(s => s.location === "nigeria").length} Nigerian</div>
                          <div>🌍 {course.schools.filter(s => s.location === "africa").length} African</div>
                          <div>🌐 {course.schools.filter(s => s.location === "global").length} Global</div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Typical Curriculum */}
                  <tr className="border-b">
                    <td className="p-4 font-medium text-foreground">
                      📚 Curriculum Highlights
                    </td>
                    {courses.map((course) => {
                      const items = getCurriculumItems(course.curriculum);
                      return (
                        <td key={course.id} className="p-4">
                          <ul className="space-y-1">
                            {items.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Trends */}
                  <tr className="border-b bg-muted/30">
                    <td className="p-4 font-medium text-foreground">
                      🚀 Industry Trends
                    </td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {course.futureOutlook.trends.map((trend) => (
                            <Badge key={trend} variant="outline" className="text-xs bg-primary/5">
                              {trend}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseComparisonModal;
