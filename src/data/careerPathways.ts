// Career pathways and outcomes data for each course

export interface CareerRole {
  title: string;
  stage: "entry" | "mid" | "senior";
  description: string;
  yearsExperience: string;
  typicalSalaryNGN?: { min: number; max: number };
  typicalSalaryUSD?: { min: number; max: number };
  requiredSkills: string[];
  certifications?: string[];
}

export interface CareerPathway {
  courseId: string;
  pathway: CareerRole[];
  alternativePathways?: {
    name: string;
    description: string;
    roles: CareerRole[];
  }[];
}

export interface CareerOutcomeTrends {
  courseId: string;
  demandGrowth: "rising" | "stable" | "declining";
  demandTrend: "↑" | "→" | "↓";
  demandDescription: string;
  salaryTrend: "rising" | "stable" | "declining";
  salaryTrendSymbol: "↑" | "→" | "↓";
  salaryDescription: string;
  industryAdoption: "rapid" | "moderate" | "slow";
  industryAdoptionDescription: string;
  automationRisk: "low" | "medium" | "high";
  automationRiskDescription: string;
  futureOutlook: string; // Overall summary
}

// ===== CAREER PATHWAYS =====
export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    courseId: "computer-science",
    pathway: [
      {
        title: "Junior Software Developer",
        stage: "entry",
        description: "Write code, fix bugs, learn from senior developers, contribute to small features.",
        yearsExperience: "0-2 years",
        typicalSalaryNGN: { min: 2400000, max: 6000000 },
        typicalSalaryUSD: { min: 50000, max: 80000 },
        requiredSkills: ["JavaScript/Python/Java", "Git", "Problem-solving", "Debugging", "Team collaboration"],
      },
      {
        title: "Software Engineer",
        stage: "mid",
        description: "Design and implement features, mentor juniors, participate in architecture decisions, lead small projects.",
        yearsExperience: "3-5 years",
        typicalSalaryNGN: { min: 6000000, max: 12000000 },
        typicalSalaryUSD: { min: 80000, max: 130000 },
        requiredSkills: ["Multiple programming languages", "System design", "API development", "Testing", "Agile methodologies"],
        certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
      },
      {
        title: "Senior Software Engineer / Tech Lead",
        stage: "senior",
        description: "Lead engineering teams, make architectural decisions, drive technical strategy, mentor teams, deliver complex systems.",
        yearsExperience: "6-10 years",
        typicalSalaryNGN: { min: 12000000, max: 25000000 },
        typicalSalaryUSD: { min: 130000, max: 250000 },
        requiredSkills: ["Advanced system design", "Leadership", "Cross-team collaboration", "Performance optimization", "Strategic thinking"],
        certifications: ["Kubernetes Certified", "Professional Scrum Master"],
      },
    ],
    alternativePathways: [
      {
        name: "Data Science Track",
        description: "Pivot to data analysis, machine learning, and AI engineering",
        roles: [
          {
            title: "Data Analyst",
            stage: "entry",
            description: "Analyze data, create reports, build dashboards, support business decisions.",
            yearsExperience: "0-2 years",
            typicalSalaryNGN: { min: 3000000, max: 6000000 },
            typicalSalaryUSD: { min: 60000, max: 90000 },
            requiredSkills: ["SQL", "Excel", "Python/R", "Data visualization", "Statistics"],
          },
          {
            title: "Data Scientist",
            stage: "mid",
            description: "Build predictive models, analyze complex datasets, drive insights from data.",
            yearsExperience: "3-5 years",
            typicalSalaryNGN: { min: 7000000, max: 15000000 },
            typicalSalaryUSD: { min: 100000, max: 150000 },
            requiredSkills: ["Machine learning", "Statistics", "Python/R", "Big data tools", "Communication"],
            certifications: ["Google Data Analytics", "AWS Machine Learning"],
          },
          {
            title: "ML/AI Engineer",
            stage: "senior",
            description: "Design and deploy AI systems, lead ML projects, research new algorithms.",
            yearsExperience: "6+ years",
            typicalSalaryNGN: { min: 15000000, max: 35000000 },
            typicalSalaryUSD: { min: 150000, max: 300000 },
            requiredSkills: ["Deep learning", "TensorFlow/PyTorch", "MLOps", "Research", "Scalable systems"],
            certifications: ["TensorFlow Developer", "Deep Learning Specialization"],
          },
        ],
      },
      {
        name: "Product Management Track",
        description: "Transition from engineering to product strategy and management",
        roles: [
          {
            title: "Associate Product Manager",
            stage: "entry",
            description: "Support product development, gather requirements, coordinate with engineering.",
            yearsExperience: "2-4 years",
            typicalSalaryNGN: { min: 5000000, max: 9000000 },
            typicalSalaryUSD: { min: 70000, max: 110000 },
            requiredSkills: ["Product thinking", "User research", "Agile", "Communication", "Data analysis"],
          },
          {
            title: "Product Manager",
            stage: "mid",
            description: "Own product roadmap, define features, lead cross-functional teams, drive product success.",
            yearsExperience: "5-8 years",
            typicalSalaryNGN: { min: 10000000, max: 20000000 },
            typicalSalaryUSD: { min: 120000, max: 180000 },
            requiredSkills: ["Product strategy", "Stakeholder management", "Prioritization", "Metrics", "Leadership"],
            certifications: ["Certified Scrum Product Owner", "Product Management Certificate"],
          },
          {
            title: "Senior PM / Director of Product",
            stage: "senior",
            description: "Set product vision, manage multiple products/teams, influence company strategy.",
            yearsExperience: "10+ years",
            typicalSalaryNGN: { min: 20000000, max: 45000000 },
            typicalSalaryUSD: { min: 180000, max: 350000 },
            requiredSkills: ["Strategic vision", "Executive communication", "Team building", "Business acumen", "Innovation"],
          },
        ],
      },
    ],
  },
  {
    courseId: "medicine",
    pathway: [
      {
        title: "House Officer (Intern)",
        stage: "entry",
        description: "Complete mandatory 1-year internship rotating through departments, supervised patient care.",
        yearsExperience: "0-1 year (post-MBBS)",
        typicalSalaryNGN: { min: 1200000, max: 2400000 },
        typicalSalaryUSD: { min: 50000, max: 65000 },
        requiredSkills: ["Clinical examination", "Patient communication", "Medical procedures", "Time management", "Teamwork"],
      },
      {
        title: "Medical Officer / Resident Doctor",
        stage: "mid",
        description: "Practice general medicine or begin specialty training, independent patient management.",
        yearsExperience: "2-6 years",
        typicalSalaryNGN: { min: 3600000, max: 8000000 },
        typicalSalaryUSD: { min: 80000, max: 150000 },
        requiredSkills: ["Diagnostic skills", "Treatment planning", "Emergency management", "Specialization knowledge", "Research"],
        certifications: ["MDCN Full Registration", "Primary Fellowship (Part 1)"],
      },
      {
        title: "Consultant/Specialist",
        stage: "senior",
        description: "Fully qualified specialist, lead departments, train residents, conduct research, private practice.",
        yearsExperience: "8-15 years",
        typicalSalaryNGN: { min: 10000000, max: 50000000 },
        typicalSalaryUSD: { min: 200000, max: 600000 },
        requiredSkills: ["Advanced specialty knowledge", "Leadership", "Teaching", "Research", "Complex case management"],
        certifications: ["Fellowship (FMCP, FWACS, etc.)", "Subspecialty certifications"],
      },
    ],
    alternativePathways: [
      {
        name: "Public Health Track",
        description: "Shift from clinical medicine to population health and policy",
        roles: [
          {
            title: "Public Health Officer",
            stage: "entry",
            description: "Work on community health programs, disease prevention, health education.",
            yearsExperience: "1-3 years",
            typicalSalaryNGN: { min: 2400000, max: 5000000 },
            typicalSalaryUSD: { min: 55000, max: 80000 },
            requiredSkills: ["Epidemiology", "Community engagement", "Health promotion", "Data collection", "Program management"],
            certifications: ["MPH (Master of Public Health)"],
          },
          {
            title: "Program Manager - Global Health",
            stage: "mid",
            description: "Manage health programs for WHO, NGOs, government agencies.",
            yearsExperience: "5-8 years",
            typicalSalaryNGN: { min: 6000000, max: 15000000 },
            typicalSalaryUSD: { min: 90000, max: 140000 },
            requiredSkills: ["Project management", "Grant writing", "Stakeholder engagement", "M&E", "Policy knowledge"],
          },
          {
            title: "Director of Public Health / Health Policy Advisor",
            stage: "senior",
            description: "Shape health policy, lead large-scale programs, advise governments.",
            yearsExperience: "10+ years",
            typicalSalaryNGN: { min: 15000000, max: 40000000 },
            typicalSalaryUSD: { min: 150000, max: 300000 },
            requiredSkills: ["Strategic planning", "Policy development", "Leadership", "International relations", "Systems thinking"],
          },
        ],
      },
    ],
  },
  {
    courseId: "law",
    pathway: [
      {
        title: "Associate Lawyer",
        stage: "entry",
        description: "Draft legal documents, research cases, support senior lawyers, learn litigation/corporate practice.",
        yearsExperience: "0-3 years (post-Law School)",
        typicalSalaryNGN: { min: 1800000, max: 4800000 },
        typicalSalaryUSD: { min: 60000, max: 95000 },
        requiredSkills: ["Legal research", "Writing", "Client communication", "Case analysis", "Professional conduct"],
        certifications: ["BL (Barrister at Law)", "NBA Membership"],
      },
      {
        title: "Senior Associate / Legal Counsel",
        stage: "mid",
        description: "Manage cases independently, advise clients directly, supervise junior lawyers, specialize.",
        yearsExperience: "4-7 years",
        typicalSalaryNGN: { min: 6000000, max: 15000000 },
        typicalSalaryUSD: { min: 100000, max: 160000 },
        requiredSkills: ["Litigation/Transactional expertise", "Client management", "Negotiation", "Business acumen", "Mentorship"],
      },
      {
        title: "Partner / General Counsel",
        stage: "senior",
        description: "Law firm partner or corporate general counsel, strategic legal advisor, business development.",
        yearsExperience: "10+ years",
        typicalSalaryNGN: { min: 15000000, max: 60000000 },
        typicalSalaryUSD: { min: 200000, max: 800000 },
        requiredSkills: ["Strategic thinking", "Business development", "Leadership", "Complex negotiations", "Corporate governance"],
        certifications: ["SAN (Senior Advocate of Nigeria)", "LLM", "Specialized certifications"],
      },
    ],
  },
];

// ===== CAREER OUTCOME TRENDS =====
export const CAREER_OUTCOME_TRENDS: CareerOutcomeTrends[] = [
  {
    courseId: "computer-science",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Software engineering jobs growing 25% faster than average. Tech companies expanding in Africa. Remote work opens global opportunities.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Developer salaries increased 15-20% annually in Nigeria. Global tech salaries remain very competitive. High-demand skills command premium.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "Every industry needs software. Banks, healthcare, agriculture, education all digitizing. Tech startups proliferating across Africa.",
    automationRisk: "low",
    automationRiskDescription: "Developers create automation tools. AI assists but doesn't replace developers. Growing complexity ensures job security.",
    futureOutlook: "Excellent long-term prospects. Technology is the future. Strong skills guarantee opportunities globally and locally.",
  },
  {
    courseId: "ai-machine-learning",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "AI/ML roles growing 40%+ annually. ChatGPT boom created massive demand. Every company wants AI capabilities.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "ML engineers earn 30-50% more than regular developers. Shortage of qualified talent. Global companies hire remotely.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "AI transforming healthcare, finance, agriculture, education. Generative AI revolution accelerating adoption across all sectors.",
    automationRisk: "low",
    automationRiskDescription: "Ironically, AI experts are least likely to be replaced by AI. You're building the future, not being replaced by it.",
    futureOutlook: "One of the fastest-growing fields globally. Critical skills for the next decade. High earning potential worldwide.",
  },
  {
    courseId: "data-science",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Data-driven decision making now essential. Every company needs data analysts. Nigerian banks and fintechs hiring aggressively.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Data scientists earn premium salaries. Skills shortage drives competition. Remote opportunities abundant.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "Finance, healthcare, e-commerce, government all investing in data analytics. Big data infrastructure expanding in Africa.",
    automationRisk: "medium",
    automationRiskDescription: "Some basic analysis being automated, but complex insights require human expertise. Continuous upskilling needed.",
    futureOutlook: "Strong growth expected. Businesses increasingly data-driven. Opportunity to shape decisions across industries.",
  },
  {
    courseId: "medicine",
    demandGrowth: "stable",
    demandTrend: "→",
    demandDescription: "Healthcare needs remain constant. Population growth sustains demand. Brain drain creates local shortages but global opportunities.",
    salaryTrend: "stable",
    salaryTrendSymbol: "→",
    salaryDescription: "Doctor salaries stable in Nigeria, excellent abroad. Private practice can be very lucrative. Specialists earn significantly more.",
    industryAdoption: "moderate",
    industryAdoptionDescription: "Telemedicine growing. Digital health emerging. Traditional practice still dominant. Slow but steady modernization.",
    automationRisk: "low",
    automationRiskDescription: "Diagnosis assistance from AI, but human doctors essential. Patient care requires empathy and judgment. Secure profession.",
    futureOutlook: "Medicine remains prestigious and stable. Always in demand. Challenging training but rewarding career.",
  },
  {
    courseId: "law",
    demandGrowth: "stable",
    demandTrend: "→",
    demandDescription: "Legal services always needed. Corporate law growing with economy. Oversupply of lawyers but demand for quality specialists.",
    salaryTrend: "stable",
    salaryTrendSymbol: "→",
    salaryDescription: "Top lawyers earn very well. Large law firms pay competitively. Many struggle initially. Success depends on specialization and networking.",
    industryAdoption: "slow",
    industryAdoptionDescription: "Legal tech emerging slowly. LegalTech startups growing. Traditional practice still norm. Gradual digitalization.",
    automationRisk: "medium",
    automationRiskDescription: "Legal research and document drafting being automated. Advisory and advocacy still need humans. Specialize to stay relevant.",
    futureOutlook: "Competitive but stable. Specialize early. Build strong network. Corporate and tech law offer best growth.",
  },
  {
    courseId: "cybersecurity",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Cyberattacks increasing globally. Every organization needs security. Major skills shortage. Remote work security critical.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Cybersecurity specialists earn premium salaries. Global demand exceeds supply. Certifications command high pay.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "Regulations forcing companies to invest in security. Banks, government, healthcare prioritizing cybersecurity. Cloud security exploding.",
    automationRisk: "low",
    automationRiskDescription: "Security tools automate detection, but experts needed to respond. Threats evolving constantly. Human expertise critical.",
    futureOutlook: "Exceptional growth prospects. Critical infrastructure needs. Global opportunities. High job security.",
  },
  {
    courseId: "fintech",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Africa's fintech boom accelerating. Mobile money, payments, lending platforms growing. Nigeria leads African fintech scene.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Fintech startups offer competitive salaries and equity. Banks paying premium for fintech talent. High growth potential.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "Financial inclusion driving fintech adoption. Traditional banks digitizing. Crypto and blockchain emerging. Payment revolution underway.",
    automationRisk: "low",
    automationRiskDescription: "Building financial automation, not being replaced. Regulatory knowledge and strategy still need humans.",
    futureOutlook: "Exciting field with huge African potential. Flutterwave, Paystack success shows opportunities. Combine finance and tech skills.",
  },
  {
    courseId: "ux-ui-design",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Every app and website needs designers. Startups hiring. Remote design work abundant. Nigerian design talent recognized globally.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Senior designers well-paid. Freelance opportunities plentiful. International clients pay in dollars. Portfolio quality matters most.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "User experience now competitive advantage. Design-thinking spreading. Design systems standardizing. No-code tools empowering designers.",
    automationRisk: "medium",
    automationRiskDescription: "AI tools like Midjourney assist but don't replace. Strategic thinking and user empathy still need humans. Adapt and embrace AI tools.",
    futureOutlook: "Strong creative field. Build portfolio early. Specialize (mobile, web, product). Remote work offers global opportunities.",
  },
  {
    courseId: "renewable-energy-engineering",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Climate change driving renewable energy. Nigeria's power crisis creates opportunities. Solar and wind projects expanding.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Growing demand for renewable energy engineers. International projects pay well. Clean energy investments increasing.",
    industryAdoption: "moderate",
    industryAdoptionDescription: "Solar adoption accelerating in Nigeria. Government setting renewable targets. Private sector investing. Slow but growing sector.",
    automationRisk: "low",
    automationRiskDescription: "Engineering requires human expertise. Installation and maintenance need people. Design and planning complex.",
    futureOutlook: "Future-focused field. Climate crisis ensures long-term demand. Combine with business skills for entrepreneurship.",
  },
  {
    courseId: "digital-marketing",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Every business needs online presence. Social media marketing booming. E-commerce growth driving demand.",
    salaryTrend: "stable",
    salaryTrendSymbol: "→",
    salaryDescription: "Competitive field. Top marketers earn well. Freelancing popular. Results-driven compensation. ROI determines value.",
    industryAdoption: "rapid",
    industryAdoptionDescription: "Businesses shifting marketing budgets online. Influencer marketing mainstream. Data-driven marketing standard. AI tools transforming field.",
    automationRisk: "medium",
    automationRiskDescription: "AI automating content and ads. Strategic thinking and creativity still needed. Constant learning essential.",
    futureOutlook: "Good opportunities but competitive. Specialize (SEO, PPC, social). Build personal brand. Data skills differentiate.",
  },
  {
    courseId: "blockchain-web3",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Blockchain technology emerging. Crypto adoption growing in Nigeria. Web3 startups hiring. Early-stage but promising.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Blockchain developers highly paid. Global remote opportunities. Crypto industry offers equity compensation.",
    industryAdoption: "moderate",
    industryAdoptionDescription: "Cryptocurrency adoption growing. DeFi emerging. NFTs controversial. Banks exploring blockchain. Regulatory uncertainty.",
    automationRisk: "low",
    automationRiskDescription: "Building decentralized systems. Expertise rare. Smart contract development complex. Security critical.",
    futureOutlook: "High-risk, high-reward field. Volatile but growing. Combine with traditional programming. Stay updated on regulations.",
  },
  {
    courseId: "nursing",
    demandGrowth: "rising",
    demandTrend: "↑",
    demandDescription: "Global nursing shortage. Aging populations worldwide. UK, US, Canada recruiting Nigerian nurses. Local demand high.",
    salaryTrend: "rising",
    salaryTrendSymbol: "↑",
    salaryDescription: "Nurses well-paid abroad (UK, US, Canada). Nigerian salaries improving. Specialized nursing earns more. Migration opportunities.",
    industryAdoption: "moderate",
    industryAdoptionDescription: "Digital health tools growing. Telemedicine emerging. Traditional bedside care still essential. Gradual modernization.",
    automationRisk: "low",
    automationRiskDescription: "Patient care requires human touch. Empathy and complex care can't be automated. Secure profession.",
    futureOutlook: "Excellent career. International opportunities abundant. Respected profession. Continuous demand guaranteed.",
  },
  {
    courseId: "accounting",
    demandGrowth: "stable",
    demandTrend: "→",
    demandDescription: "Every business needs accountants. Regulatory requirements ensure demand. Oversupply but quality professionals always needed.",
    salaryTrend: "stable",
    salaryTrendSymbol: "→",
    salaryDescription: "Professional certifications (ICAN, ACCA) increase earning. Big 4 firms pay competitively. Senior accountants well-compensated.",
    industryAdoption: "moderate",
    industryAdoptionDescription: "Accounting software widespread. Cloud accounting growing. AI-assisted bookkeeping emerging. Advisory role expanding.",
    automationRisk: "medium",
    automationRiskDescription: "Bookkeeping being automated. Advisory, audit, strategy still need humans. Specialize beyond basic accounting.",
    futureOutlook: "Stable profession. Get professional certifications. Specialize (forensic, tax, advisory). Combine with tech skills.",
  },
];

// Helper function to get career pathway for a course
export function getCareerPathway(courseId: string): CareerPathway | undefined {
  return CAREER_PATHWAYS.find(p => p.courseId === courseId);
}

// Helper function to get career trends for a course
export function getCareerTrends(courseId: string): CareerOutcomeTrends | undefined {
  return CAREER_OUTCOME_TRENDS.find(t => t.courseId === courseId);
}
