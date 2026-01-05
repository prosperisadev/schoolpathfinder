import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School } from "@/types";
import { 
  GraduationCap, 
  FileText, 
  Globe2, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface UniversityCardProps {
  school: School;
  rank: number;
}

const UniversityCard = ({ school, rank }: UniversityCardProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "NGN") {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const req = school.admissionRequirements;
  const isNigerian = school.location === "nigeria";

  return (
    <Card variant="elevated" className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              #{rank}
            </div>
            <div>
              <CardTitle className="text-base leading-tight">{school.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{school.country}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tuition/year</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(school.tuitionRange.min, school.tuitionRange.currency)} - {formatCurrency(school.tuitionRange.max, school.tuitionRange.currency)}
          </span>
        </div>

        {school.scholarshipAvailable && (
          <a 
            href="https://www.scholarshipair.com/scholarships-by-type/undergraduate"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Badge variant="success" className="w-full justify-center text-xs cursor-pointer hover:opacity-80 transition-opacity">
              Scholarships Available →
            </Badge>
          </a>
        )}

        {/* Admission Requirements Accordion */}
        {req && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="requirements" className="border-none">
              <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Admission Requirements
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-3 text-sm">
                  {isNigerian ? (
                    <>
                      {/* Nigerian Requirements */}
                      {req.waecSubjects && (
                        <div>
                          <span className="font-medium text-foreground flex items-center gap-1 mb-1">
                            <GraduationCap className="h-3 w-3" />
                            WAEC Subjects
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {req.waecSubjects.map((subj) => (
                              <Badge key={subj} variant="outline" className="text-xs">
                                {subj}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {req.minimumWaecGrade && (
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-xs">{req.minimumWaecGrade}</span>
                        </div>
                      )}
                      
                      {req.jambScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">JAMB Cut-off</span>
                          <Badge variant="secondary" className="font-bold">{req.jambScore}+</Badge>
                        </div>
                      )}
                      
                      {req.jambSubjects && (
                        <div>
                          <span className="font-medium text-foreground text-xs">JAMB Subjects:</span>
                          <p className="text-muted-foreground text-xs">{req.jambSubjects.join(", ")}</p>
                        </div>
                      )}
                      
                      {req.postUtme && (
                        <div className="flex items-center gap-2 text-xs">
                          <AlertCircle className="h-3 w-3 text-accent" />
                          <span className="text-muted-foreground">Post-UTME screening required</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* International Requirements */}
                      {req.aLevels && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">A-Levels</span>
                          <Badge variant="secondary">{req.aLevels}</Badge>
                        </div>
                      )}
                      
                      {req.ibScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">IB Score</span>
                          <Badge variant="secondary">{req.ibScore}+</Badge>
                        </div>
                      )}
                      
                      {req.satScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">SAT Score</span>
                          <Badge variant="secondary">{req.satScore.min} - {req.satScore.max}</Badge>
                        </div>
                      )}
                      
                      {req.actScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">ACT Score</span>
                          <Badge variant="secondary">{req.actScore.min} - {req.actScore.max}</Badge>
                        </div>
                      )}
                      
                      {req.ieltsScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">IELTS</span>
                          <Badge variant="outline">{req.ieltsScore}+</Badge>
                        </div>
                      )}
                      
                      {req.toeflScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">TOEFL</span>
                          <Badge variant="outline">{req.toeflScore}+</Badge>
                        </div>
                      )}
                      
                      {req.gpa && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Min GPA</span>
                          <Badge variant="secondary">{req.gpa}</Badge>
                        </div>
                      )}
                      
                      {req.otherRequirements && req.otherRequirements.length > 0 && (
                        <div className="pt-1">
                          <span className="font-medium text-foreground text-xs flex items-center gap-1 mb-1">
                            <Globe2 className="h-3 w-3" />
                            Other Requirements
                          </span>
                          <ul className="space-y-1">
                            {req.otherRequirements.map((other, idx) => (
                              <li key={idx} className="flex items-start gap-1 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                {other}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t">
          <div>
            <span className="text-xs font-medium text-primary">Pros</span>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              {school.pros.slice(0, 2).map((pro) => (
                <li key={pro} className="truncate">+ {pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs font-medium text-destructive">Cons</span>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              {school.cons.slice(0, 2).map((con) => (
                <li key={con} className="truncate">- {con}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversityCard;
