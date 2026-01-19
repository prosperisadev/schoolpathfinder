import { motion } from "framer-motion";
import { ArrowRight, Compass, Target, Sparkles, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LiveImpactMetrics from "@/components/metrics/LiveImpactMetrics";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="container py-6">
        <nav className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Compass className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PathFinder</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="ghost" onClick={() => navigate("/assessment")}>
              Get Started
            </Button>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Course Discovery</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Find Your Perfect{" "}
                <span className="text-gradient-primary">University Course</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Discover courses that match your interests, personality, and career goals. 
                Get personalized recommendations for universities in Nigeria, Africa, and worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => navigate("/assessment")}
                  className="group"
                >
                  Start Your Assessment
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="hero-outline" 
                  size="xl"
                  onClick={() => navigate("/courses")}
                >
                  Browse Courses
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">100+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">200+</div>
                  <div className="text-sm text-muted-foreground">Universities</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Continents</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 bg-card rounded-2xl shadow-xl p-4 border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Perfect Match</div>
                      <div className="text-xs text-muted-foreground">Based on your profile</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 bg-card rounded-2xl shadow-xl p-4 border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl gradient-accent flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Global Options</div>
                      <div className="text-xs text-muted-foreground">Nigeria to worldwide</div>
                    </div>
                  </div>
                </motion.div>

                {/* Main illustration area */}
                <div className="aspect-square max-w-md mx-auto rounded-3xl gradient-primary p-1">
                  <div className="h-full w-full rounded-3xl bg-card flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="h-24 w-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-6">
                        <Compass className="h-12 w-12 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Your Future Starts Here
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Take a 10-minute assessment to discover your ideal career path
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How PathFinder Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent matching system considers your unique profile to recommend the best courses for your future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Profile",
                description: "Tell us about your background, preferences, and budget. It takes just a few minutes.",
                icon: "📋",
              },
              {
                step: "02",
                title: "Complete Assessment",
                description: "Discover your interests and personality traits through our engaging questionnaire.",
                icon: "🎯",
              },
              {
                step: "03",
                title: "Get Recommendations",
                description: "Receive personalized course and university recommendations with detailed insights.",
                icon: "🎓",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <div className="text-sm font-bold text-primary mb-2">{feature.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live Impact Metrics */}
        <LiveImpactMetrics />

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl gradient-primary p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Find Your Path?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have discovered their ideal university course through PathFinder.
            </p>
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => navigate("/assessment")}
              className="group"
            >
              Start Free Assessment
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
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
    </div>
  );
};

export default Landing;
