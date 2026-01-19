import { Course, School } from "@/types";

const nigerianSchools: School[] = [
  { id: "unilag", name: "University of Lagos", location: "nigeria", country: "Nigeria", tuitionRange: { min: 150000, max: 500000, currency: "NGN" }, scholarshipAvailable: true, pros: ["Strong alumni network", "Located in Lagos", "Industry connections"], cons: ["Competitive admission", "Infrastructure challenges"], ranking: 1 },
  { id: "ui", name: "University of Ibadan", location: "nigeria", country: "Nigeria", tuitionRange: { min: 100000, max: 400000, currency: "NGN" }, scholarshipAvailable: true, pros: ["Premier research institution", "Beautiful campus", "Strong academics"], cons: ["Located outside major city", "Limited industry exposure"], ranking: 2 },
  { id: "covenant", name: "Covenant University", location: "nigeria", country: "Nigeria", tuitionRange: { min: 1500000, max: 2500000, currency: "NGN" }, scholarshipAvailable: true, pros: ["Modern facilities", "Strong discipline", "Industry partnerships"], cons: ["High tuition", "Strict rules"], ranking: 3 },
  { id: "abu", name: "Ahmadu Bello University", location: "nigeria", country: "Nigeria", tuitionRange: { min: 80000, max: 300000, currency: "NGN" }, scholarshipAvailable: true, pros: ["Large campus", "Diverse programs", "Research facilities"], cons: ["Location in North", "Security concerns"], ranking: 4 },
  { id: "unn", name: "University of Nigeria, Nsukka", location: "nigeria", country: "Nigeria", tuitionRange: { min: 100000, max: 350000, currency: "NGN" }, scholarshipAvailable: true, pros: ["Strong academics", "Beautiful environment", "Good reputation"], cons: ["Remote location", "Limited urban exposure"], ranking: 5 },
];

const africanSchools: School[] = [
  { id: "uct", name: "University of Cape Town", location: "africa", country: "South Africa", tuitionRange: { min: 3000, max: 8000, currency: "USD" }, scholarshipAvailable: true, pros: ["Top-ranked in Africa", "International exposure", "Research opportunities"], cons: ["Cost of living", "Visa requirements"], ranking: 1 },
  { id: "wits", name: "University of the Witwatersrand", location: "africa", country: "South Africa", tuitionRange: { min: 2500, max: 7000, currency: "USD" }, scholarshipAvailable: true, pros: ["Strong engineering", "Urban location", "Industry ties"], cons: ["High living costs", "Safety concerns"], ranking: 2 },
  { id: "ug", name: "University of Ghana", location: "africa", country: "Ghana", tuitionRange: { min: 2000, max: 5000, currency: "USD" }, scholarshipAvailable: true, pros: ["Cultural proximity", "English-speaking", "Growing economy"], cons: ["Limited programs", "Infrastructure"], ranking: 4 },
];

const globalSchools: School[] = [
  { id: "mit", name: "Massachusetts Institute of Technology", location: "global", country: "USA", tuitionRange: { min: 55000, max: 60000, currency: "USD" }, scholarshipAvailable: true, pros: ["World-class education", "Innovation hub", "Career opportunities"], cons: ["Very competitive", "High cost", "Far from home"], ranking: 1 },
  { id: "stanford", name: "Stanford University", location: "global", country: "USA", tuitionRange: { min: 55000, max: 60000, currency: "USD" }, scholarshipAvailable: true, pros: ["Silicon Valley location", "Entrepreneurship culture", "Top research"], cons: ["Extremely competitive", "Very expensive"], ranking: 2 },
  { id: "oxford", name: "University of Oxford", location: "global", country: "UK", tuitionRange: { min: 30000, max: 45000, currency: "USD" }, scholarshipAvailable: true, pros: ["Historic excellence", "Global network", "Research focus"], cons: ["Competitive", "Cultural adjustment"], ranking: 3 },
  { id: "toronto", name: "University of Toronto", location: "global", country: "Canada", tuitionRange: { min: 40000, max: 55000, currency: "USD" }, scholarshipAvailable: true, pros: ["Diverse environment", "Post-study work options", "Quality education"], cons: ["Cold weather", "Cost of living"], ranking: 15 },
  { id: "melbourne", name: "University of Melbourne", location: "global", country: "Australia", tuitionRange: { min: 35000, max: 50000, currency: "USD" }, scholarshipAvailable: true, pros: ["High quality of life", "Work opportunities", "Strong programs"], cons: ["Far from Nigeria", "Expensive"], ranking: 20 },
];

const allSchools = [...nigerianSchools, ...africanSchools, ...globalSchools];

export const additionalCourses: Course[] = [
  // TECHNOLOGY
  {
    id: "data-science",
    name: "Data Science",
    category: "Technology",
    overview: "Data Science combines statistics, programming, and domain expertise to extract insights from data. Students learn machine learning, data visualization, and predictive analytics.",
    coreSkills: ["Python/R Programming", "Statistics", "Machine Learning", "Data Visualization", "SQL", "Critical Thinking"],
    nigeriaContext: {
      description: "Data Science is booming in Nigeria's fintech and banking sectors. Companies like Flutterwave, Paystack, and major banks actively hire data scientists.",
      teachingStyle: "Emerging programs with focus on practical applications. Many students supplement with online courses.",
      careerOpportunities: ["Data Scientist", "Data Analyst", "ML Engineer", "Business Intelligence Analyst", "FinTech Analyst"],
      salaryRange: { min: 3000000, max: 18000000, currency: "NGN" },
    },
    globalContext: {
      description: "One of the highest-paying tech careers globally. Data scientists work at tech giants, startups, and research institutions solving complex problems.",
      teachingStyle: "Interdisciplinary approach combining CS, statistics, and domain knowledge. Heavy emphasis on projects.",
      careerOpportunities: ["Senior Data Scientist", "ML Research Scientist", "AI Engineer", "Quantitative Analyst", "Chief Data Officer"],
      salaryRange: { min: 90000, max: 250000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Collect and clean data, build predictive models, create visualizations, present findings to stakeholders, and collaborate with engineering teams.",
      typicalEmployers: ["Google", "Meta", "Netflix", "Banks", "Consulting Firms", "Healthcare Companies", "Fintech Startups"],
    },
    curriculum: {
      year1: ["Statistics", "Python Programming", "Linear Algebra", "Calculus"],
      year2: ["Machine Learning", "Database Systems", "Data Visualization", "Probability Theory"],
      year3: ["Deep Learning", "Big Data Technologies", "Natural Language Processing", "Time Series Analysis"],
      year4: ["Capstone Project", "Ethics in AI", "Cloud Computing", "Industry Internship"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI/ML advancement is accelerating demand. Every industry needs data expertise.",
      trends: ["Generative AI", "AutoML", "Edge Computing", "Responsible AI", "Real-time Analytics"],
    },
    successPathway: {
      internships: ["Tech companies", "Banks", "Research labs", "Startups"],
      certifications: ["Google Data Analytics", "IBM Data Science", "AWS ML Specialty", "TensorFlow Developer"],
      projects: ["Kaggle competitions", "Personal data projects", "Open source contributions"],
      volunteering: ["Data for Good initiatives", "Teaching data literacy", "Non-profit analytics"],
    },
    schools: allSchools,
    interestMatch: ["technology", "finance-business"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: 0, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "Technology",
    overview: "Cybersecurity protects computer systems, networks, and data from digital attacks. Students learn ethical hacking, network security, cryptography, and incident response.",
    coreSkills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Cryptography", "Incident Response", "Security Tools"],
    nigeriaContext: {
      description: "With increasing digitization, Nigerian banks and telecoms urgently need cybersecurity professionals. The CBN mandates security compliance for financial institutions.",
      teachingStyle: "Practical labs and certifications are crucial. Many programs partner with industry for hands-on training.",
      careerOpportunities: ["Security Analyst", "Penetration Tester", "Security Consultant", "Compliance Officer", "SOC Analyst"],
      salaryRange: { min: 3500000, max: 20000000, currency: "NGN" },
    },
    globalContext: {
      description: "Critical shortage of cybersecurity professionals worldwide. High demand in finance, government, and tech sectors with excellent compensation.",
      teachingStyle: "Hands-on labs, capture-the-flag competitions, and industry certifications are emphasized.",
      careerOpportunities: ["Security Architect", "CISO", "Threat Hunter", "Security Researcher", "Forensics Analyst"],
      salaryRange: { min: 80000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Monitor security systems, investigate threats, conduct penetration tests, write security policies, train employees, and respond to incidents.",
      typicalEmployers: ["Banks", "Government Agencies", "Tech Companies", "Consulting Firms", "Defense Contractors"],
    },
    curriculum: {
      year1: ["Computer Networks", "Operating Systems", "Programming Fundamentals", "IT Security Basics"],
      year2: ["Cryptography", "Network Security", "Ethical Hacking", "Security Policies"],
      year3: ["Malware Analysis", "Digital Forensics", "Cloud Security", "Penetration Testing"],
      year4: ["Advanced Threats", "Security Management", "Capstone Project", "Industry Certification Prep"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Cyber threats are evolving rapidly. AI-powered security and zero-trust architectures are the future.",
      trends: ["AI in Security", "Zero Trust", "Cloud Security", "IoT Security", "Ransomware Defense"],
    },
    successPathway: {
      internships: ["Bank security teams", "Consulting firms", "Government agencies"],
      certifications: ["CompTIA Security+", "CEH", "CISSP", "OSCP"],
      projects: ["CTF competitions", "Home lab setups", "Security research"],
      volunteering: ["Cybersecurity awareness", "School IT security", "Community education"],
    },
    schools: allSchools,
    interestMatch: ["technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: -1 },
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    category: "Technology",
    overview: "Software Engineering applies engineering principles to software development. Students learn systematic approaches to designing, developing, testing, and maintaining software systems.",
    coreSkills: ["Programming", "System Design", "Testing", "Agile Methodologies", "Version Control", "Problem Solving"],
    nigeriaContext: {
      description: "Strong demand from Nigeria's tech ecosystem. Software engineers work at startups, banks, and telecoms building digital products.",
      teachingStyle: "Project-based learning with emphasis on teamwork and industry practices.",
      careerOpportunities: ["Software Engineer", "Full-Stack Developer", "DevOps Engineer", "QA Engineer", "Technical Lead"],
      salaryRange: { min: 2500000, max: 16000000, currency: "NGN" },
    },
    globalContext: {
      description: "One of the most in-demand careers globally. Remote work opportunities allow Nigerian engineers to work for international companies.",
      teachingStyle: "Industry-aligned curriculum with internships, hackathons, and real-world projects.",
      careerOpportunities: ["Senior Software Engineer", "Engineering Manager", "Solutions Architect", "CTO", "Tech Founder"],
      salaryRange: { min: 80000, max: 220000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Write code, review pull requests, design systems, participate in sprints, debug issues, and collaborate with product teams.",
      typicalEmployers: ["FAANG Companies", "Startups", "Banks", "Consulting Firms", "Tech Agencies"],
    },
    curriculum: {
      year1: ["Programming Fundamentals", "Data Structures", "Mathematics", "Computer Architecture"],
      year2: ["Algorithms", "Software Design", "Database Systems", "Web Development"],
      year3: ["Software Engineering Principles", "Testing & QA", "Cloud Computing", "Mobile Development"],
      year4: ["Distributed Systems", "DevOps", "Capstone Project", "Industry Internship"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI coding assistants are changing how software is built, but human engineers remain essential for complex systems.",
      trends: ["AI-Assisted Development", "Cloud-Native", "Microservices", "Platform Engineering", "Green Computing"],
    },
    successPathway: {
      internships: ["Tech companies", "Startups", "Open source programs"],
      certifications: ["AWS Developer", "Azure Developer", "Kubernetes", "Scrum Master"],
      projects: ["Open source contributions", "Personal apps", "Freelance work"],
      volunteering: ["Code mentorship", "Tech education", "Hackathon organizing"],
    },
    schools: allSchools,
    interestMatch: ["technology"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: 0 },
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    category: "Technology",
    overview: "AI focuses on creating intelligent systems that can learn, reason, and act. Students study machine learning, neural networks, robotics, and natural language processing.",
    coreSkills: ["Machine Learning", "Deep Learning", "Python", "Mathematics", "Research", "Problem Solving"],
    nigeriaContext: {
      description: "AI is emerging in Nigerian fintech, healthcare, and agriculture. Opportunities exist at innovative startups and research institutions.",
      teachingStyle: "Research-focused with theoretical foundations. Practical projects and competitions are important.",
      careerOpportunities: ["AI Engineer", "ML Engineer", "Research Scientist", "AI Product Manager", "Data Scientist"],
      salaryRange: { min: 4000000, max: 25000000, currency: "NGN" },
    },
    globalContext: {
      description: "Hottest field in tech with explosive growth. AI engineers are among the highest-paid professionals globally.",
      teachingStyle: "Cutting-edge research, publications, and industry collaborations. PhD often preferred for research roles.",
      careerOpportunities: ["AI Research Scientist", "Principal ML Engineer", "AI Startup Founder", "Tech Fellow", "Professor"],
      salaryRange: { min: 120000, max: 400000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design and train ML models, conduct experiments, read research papers, collaborate with teams, and deploy AI systems.",
      typicalEmployers: ["Google DeepMind", "OpenAI", "Meta AI", "Research Labs", "AI Startups", "Tech Giants"],
    },
    curriculum: {
      year1: ["Linear Algebra", "Calculus", "Python", "Introduction to AI"],
      year2: ["Machine Learning", "Probability & Statistics", "Neural Networks", "Data Mining"],
      year3: ["Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning"],
      year4: ["Research Project", "Ethics in AI", "Advanced Topics", "Thesis"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI is transforming every industry. This is the defining technology of our generation.",
      trends: ["Generative AI", "AGI Research", "Multimodal Models", "AI Safety", "Edge AI"],
    },
    successPathway: {
      internships: ["AI labs", "Tech giants", "Research institutions"],
      certifications: ["Deep Learning Specialization", "TensorFlow", "PyTorch"],
      projects: ["Research papers", "Kaggle competitions", "Open source ML"],
      volunteering: ["AI for social good", "Education", "Ethics advocacy"],
    },
    schools: allSchools,
    interestMatch: ["technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 1, peopleVsTask: 2, riskVsStability: -1 },
  },
  {
    id: "information-technology",
    name: "Information Technology",
    category: "Technology",
    overview: "IT focuses on using technology to solve business problems. Students learn system administration, networking, database management, and IT service management.",
    coreSkills: ["System Administration", "Networking", "Troubleshooting", "Project Management", "Communication", "Technical Support"],
    nigeriaContext: {
      description: "Essential for every organization. IT professionals maintain infrastructure for banks, telecoms, government, and enterprises.",
      teachingStyle: "Practical focus with certifications. Strong emphasis on enterprise systems and support.",
      careerOpportunities: ["IT Manager", "System Administrator", "Network Engineer", "IT Consultant", "Technical Support Lead"],
      salaryRange: { min: 1800000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Foundation of digital infrastructure. Opportunities in cloud migration, digital transformation, and IT leadership.",
      teachingStyle: "Industry certifications are crucial. Focus on enterprise solutions and emerging technologies.",
      careerOpportunities: ["IT Director", "Cloud Architect", "Enterprise Architect", "CIO", "IT Consultant"],
      salaryRange: { min: 60000, max: 160000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Manage servers and networks, resolve technical issues, implement new systems, ensure security, and support users.",
      typicalEmployers: ["Corporations", "Banks", "Government", "Consulting Firms", "IT Service Companies"],
    },
    curriculum: {
      year1: ["Computer Fundamentals", "Networking Basics", "Operating Systems", "Programming"],
      year2: ["Database Management", "System Administration", "Web Technologies", "IT Security"],
      year3: ["Cloud Computing", "Project Management", "Enterprise Systems", "IT Service Management"],
      year4: ["IT Strategy", "Emerging Technologies", "Capstone Project", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 8,
      techImpact: "Cloud computing and automation are changing IT roles. Focus is shifting to cloud architecture and DevOps.",
      trends: ["Cloud Migration", "DevOps", "Automation", "IT-as-a-Service", "Hybrid Work Support"],
    },
    successPathway: {
      internships: ["Corporate IT", "IT service companies", "Government IT"],
      certifications: ["CompTIA A+", "CCNA", "AWS Solutions Architect", "ITIL"],
      projects: ["Home lab", "Network setups", "Cloud deployments"],
      volunteering: ["School IT support", "Non-profit tech help", "Digital literacy"],
    },
    schools: allSchools,
    interestMatch: ["technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: 1 },
  },
  // HEALTH
  {
    id: "pharmacy",
    name: "Pharmacy",
    category: "Health",
    overview: "Pharmacy is the science of preparing, dispensing, and ensuring the safe use of medications. Students learn pharmacology, chemistry, patient counseling, and drug interactions.",
    coreSkills: ["Pharmaceutical Knowledge", "Patient Counseling", "Attention to Detail", "Chemistry", "Communication", "Ethics"],
    nigeriaContext: {
      description: "Pharmacists are essential in Nigeria's healthcare system. Opportunities exist in hospitals, community pharmacies, and pharmaceutical companies.",
      teachingStyle: "Rigorous 5-year program with clinical rotations. Strong emphasis on pharmaceutical sciences.",
      careerOpportunities: ["Community Pharmacist", "Hospital Pharmacist", "Pharmaceutical Sales", "Drug Regulatory Officer", "Research Pharmacist"],
      salaryRange: { min: 2000000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Expanding role in patient care globally. Clinical pharmacists are increasingly involved in treatment decisions.",
      teachingStyle: "PharmD programs with extensive clinical training. Specialization opportunities in various areas.",
      careerOpportunities: ["Clinical Pharmacist", "Pharmaceutical Scientist", "Pharmacy Director", "Drug Safety Specialist", "Academia"],
      salaryRange: { min: 100000, max: 180000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Dispense medications, counsel patients, check prescriptions, manage inventory, and collaborate with healthcare teams.",
      typicalEmployers: ["Hospitals", "Community Pharmacies", "Pharmaceutical Companies", "Regulatory Agencies", "Research Institutions"],
    },
    curriculum: {
      year1: ["Organic Chemistry", "Biochemistry", "Anatomy", "Physiology"],
      year2: ["Pharmacology I", "Pharmaceutics", "Microbiology", "Pharmaceutical Chemistry"],
      year3: ["Pharmacology II", "Pharmacokinetics", "Clinical Pharmacy", "Toxicology"],
      year4: ["Pharmacy Practice", "Drug Formulation", "Pharmacotherapy", "Clinical Rotations"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Telepharmacy and AI drug discovery are emerging. Pharmacists' clinical roles are expanding.",
      trends: ["Telepharmacy", "Personalized Medicine", "Specialty Pharmacy", "AI in Drug Discovery", "Expanded Clinical Roles"],
    },
    successPathway: {
      internships: ["Hospital pharmacy", "Community pharmacy", "Pharmaceutical companies"],
      certifications: ["PCN Registration", "Clinical Certifications", "Specialty Training"],
      projects: ["Medication safety projects", "Patient education programs", "Research"],
      volunteering: ["Health outreach", "Drug awareness campaigns", "Community health"],
    },
    schools: allSchools,
    interestMatch: ["health"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -2, peopleVsTask: -1, riskVsStability: 2 },
  },
  {
    id: "dentistry",
    name: "Dentistry",
    category: "Health",
    overview: "Dentistry focuses on oral health, diagnosing and treating conditions of the teeth, gums, and mouth. Students learn dental procedures, oral surgery, and preventive care.",
    coreSkills: ["Manual Dexterity", "Patient Care", "Attention to Detail", "Communication", "Problem Solving", "Anatomy Knowledge"],
    nigeriaContext: {
      description: "Growing demand for dental services in Nigeria. Opportunities in private practice, hospitals, and dental clinics.",
      teachingStyle: "6-year program with clinical training. Practical skills are developed through supervised practice.",
      careerOpportunities: ["General Dentist", "Oral Surgeon", "Orthodontist", "Dental Public Health", "Private Practice Owner"],
      salaryRange: { min: 3000000, max: 20000000, currency: "NGN" },
    },
    globalContext: {
      description: "Stable and well-compensated profession globally. Specialists like orthodontists earn premium salaries.",
      teachingStyle: "DDS/DMD programs with extensive clinical practice. Specialization requires additional training.",
      careerOpportunities: ["Specialist Dentist", "Dental Surgeon", "Cosmetic Dentist", "Academic Dentist", "Hospital Chief of Dentistry"],
      salaryRange: { min: 120000, max: 300000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Examine patients, perform procedures, manage dental conditions, educate patients on oral health, and run a practice.",
      typicalEmployers: ["Private Practices", "Hospitals", "Dental Clinics", "Public Health", "Academic Institutions"],
    },
    curriculum: {
      year1: ["Anatomy", "Biochemistry", "Physiology", "Dental Materials"],
      year2: ["Oral Anatomy", "Dental Histology", "Oral Pathology", "Pharmacology"],
      year3: ["Restorative Dentistry", "Periodontics", "Endodontics", "Clinical Practice"],
      year4: ["Oral Surgery", "Orthodontics", "Prosthodontics", "Community Dentistry"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Digital dentistry with 3D printing and CAD/CAM is transforming practice. Cosmetic dentistry is growing.",
      trends: ["Digital Dentistry", "3D Printing", "Cosmetic Procedures", "Teledentistry", "Minimally Invasive Techniques"],
    },
    successPathway: {
      internships: ["Dental clinics", "Hospital rotations", "Community health"],
      certifications: ["MDCN Registration", "Specialty Training", "Implant Certifications"],
      projects: ["Oral health campaigns", "Research", "Community outreach"],
      volunteering: ["Dental missions", "School dental programs", "Health education"],
    },
    schools: allSchools,
    interestMatch: ["health"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: 1 },
  },
  {
    id: "public-health",
    name: "Public Health",
    category: "Health",
    overview: "Public Health focuses on preventing disease and promoting health at the population level. Students learn epidemiology, health policy, biostatistics, and health promotion.",
    coreSkills: ["Epidemiology", "Data Analysis", "Policy Development", "Communication", "Research", "Program Management"],
    nigeriaContext: {
      description: "Critical field for addressing Nigeria's health challenges. Opportunities in government, NGOs, and international organizations.",
      teachingStyle: "Multidisciplinary approach covering social, biological, and policy aspects of health.",
      careerOpportunities: ["Public Health Officer", "Epidemiologist", "Health Program Manager", "Policy Analyst", "NGO Director"],
      salaryRange: { min: 1500000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Increased focus after COVID-19. International organizations and governments are investing heavily in public health.",
      teachingStyle: "MPH programs emphasize research, policy, and global health perspectives.",
      careerOpportunities: ["Global Health Director", "CDC Epidemiologist", "WHO Officer", "Health Economist", "Policy Director"],
      salaryRange: { min: 60000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Analyze health data, develop health programs, write policies, conduct research, and coordinate with stakeholders.",
      typicalEmployers: ["WHO", "NCDC", "Ministry of Health", "NGOs", "Universities", "Hospitals"],
    },
    curriculum: {
      year1: ["Introduction to Public Health", "Biostatistics", "Health Behavior", "Biology"],
      year2: ["Epidemiology", "Health Policy", "Environmental Health", "Research Methods"],
      year3: ["Global Health", "Health Economics", "Program Evaluation", "Infectious Disease"],
      year4: ["Capstone Project", "Internship", "Leadership", "Specialization"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Health informatics and digital surveillance are transforming disease tracking and response.",
      trends: ["Digital Health", "Climate & Health", "Health Equity", "Pandemic Preparedness", "One Health"],
    },
    successPathway: {
      internships: ["Health ministries", "WHO/UNICEF", "NGOs", "Research institutions"],
      certifications: ["CHES", "CPH", "Project Management", "Data Analytics"],
      projects: ["Community health assessments", "Disease surveillance", "Health campaigns"],
      volunteering: ["Health outreach", "Disease prevention", "Community education"],
    },
    schools: allSchools,
    interestMatch: ["health", "social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    category: "Health",
    overview: "Physiotherapy helps people affected by injury, illness, or disability through movement and exercise. Students learn anatomy, rehabilitation techniques, and therapeutic exercises.",
    coreSkills: ["Manual Therapy", "Patient Assessment", "Exercise Prescription", "Communication", "Anatomy Knowledge", "Empathy"],
    nigeriaContext: {
      description: "Growing field as sports medicine and rehabilitation awareness increases. Opportunities in hospitals, sports teams, and private practice.",
      teachingStyle: "Practical training with clinical rotations. Focus on hands-on skills development.",
      careerOpportunities: ["Clinical Physiotherapist", "Sports Physio", "Rehabilitation Specialist", "Private Practice Owner", "Hospital Department Head"],
      salaryRange: { min: 1500000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "High demand in aging populations. Sports physiotherapy and specialized rehabilitation are lucrative areas.",
      teachingStyle: "DPT programs with extensive clinical experience. Specialization in sports, neuro, or orthopedic areas.",
      careerOpportunities: ["Sports Team Physiotherapist", "Neuro Rehabilitation", "Private Practice", "Academia", "Consultant"],
      salaryRange: { min: 70000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Assess patients, develop treatment plans, perform manual therapy, guide exercises, and track progress.",
      typicalEmployers: ["Hospitals", "Sports Teams", "Rehabilitation Centers", "Private Clinics", "Nursing Homes"],
    },
    curriculum: {
      year1: ["Anatomy", "Physiology", "Physics", "Introduction to Physiotherapy"],
      year2: ["Biomechanics", "Exercise Physiology", "Therapeutic Modalities", "Manual Therapy"],
      year3: ["Orthopedic Physiotherapy", "Neurological Rehabilitation", "Cardiopulmonary Physio", "Clinical Practice"],
      year4: ["Sports Physiotherapy", "Pediatric Physio", "Research", "Advanced Clinical Rotations"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Telerehabilitation and wearable tech are expanding care delivery options.",
      trends: ["Telerehabilitation", "Sports Science Integration", "Wearable Tech", "Preventive Care", "Workplace Wellness"],
    },
    successPathway: {
      internships: ["Hospital departments", "Sports teams", "Rehabilitation centers"],
      certifications: ["MRCP Registration", "Sports Physio Certification", "Manual Therapy Courses"],
      projects: ["Research projects", "Community rehabilitation", "Sports injury programs"],
      volunteering: ["Sports events", "Disability support", "Community health"],
    },
    schools: allSchools,
    interestMatch: ["health"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -2, riskVsStability: 1 },
  },
  {
    id: "medical-laboratory",
    name: "Medical Laboratory Science",
    category: "Health",
    overview: "Medical Lab Science involves analyzing blood, tissue, and other samples to diagnose diseases. Students learn biochemistry, hematology, microbiology, and laboratory techniques.",
    coreSkills: ["Laboratory Techniques", "Attention to Detail", "Analytical Skills", "Quality Control", "Equipment Operation", "Data Interpretation"],
    nigeriaContext: {
      description: "Essential for healthcare diagnostics. Medical lab scientists work in hospitals, diagnostic centers, and research labs.",
      teachingStyle: "Practical focus with laboratory training. Strong emphasis on accuracy and quality control.",
      careerOpportunities: ["Medical Lab Scientist", "Lab Manager", "Quality Assurance Officer", "Research Scientist", "Diagnostic Sales"],
      salaryRange: { min: 1200000, max: 6000000, currency: "NGN" },
    },
    globalContext: {
      description: "Critical role in healthcare. Advanced automation and molecular diagnostics are expanding the field.",
      teachingStyle: "Clinical laboratory training with specialization options in various areas.",
      careerOpportunities: ["Clinical Lab Director", "Molecular Biologist", "Pathology Scientist", "Research Scientist", "Lab Consultant"],
      salaryRange: { min: 55000, max: 100000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Collect and analyze samples, operate laboratory equipment, ensure quality control, report results, and maintain records.",
      typicalEmployers: ["Hospitals", "Diagnostic Labs", "Research Institutions", "Pharmaceutical Companies", "Blood Banks"],
    },
    curriculum: {
      year1: ["Chemistry", "Biology", "Physics", "Introduction to Lab Science"],
      year2: ["Biochemistry", "Microbiology", "Hematology", "Parasitology"],
      year3: ["Clinical Chemistry", "Blood Banking", "Histopathology", "Immunology"],
      year4: ["Quality Management", "Molecular Diagnostics", "Clinical Rotations", "Research Project"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Automation and AI are changing lab workflows. Molecular diagnostics and genomics are growing areas.",
      trends: ["Lab Automation", "Molecular Diagnostics", "Point-of-Care Testing", "AI in Diagnostics", "Genomics"],
    },
    successPathway: {
      internships: ["Hospital labs", "Diagnostic centers", "Research labs"],
      certifications: ["MLSCN Registration", "Specialty Certifications", "Quality Management"],
      projects: ["Research participation", "Quality improvement", "Method validation"],
      volunteering: ["Blood drives", "Health screening", "Community diagnostics"],
    },
    schools: allSchools,
    interestMatch: ["health", "technology"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: -2, peopleVsTask: 2, riskVsStability: 2 },
  },
  // ENGINEERING
  {
    id: "electrical-engineering",
    name: "Electrical Engineering",
    category: "Engineering",
    overview: "Electrical Engineering deals with the study and application of electricity, electronics, and electromagnetism. Students learn circuit design, power systems, and control systems.",
    coreSkills: ["Circuit Design", "Problem Solving", "Mathematics", "Technical Drawing", "Programming", "Systems Thinking"],
    nigeriaContext: {
      description: "Critical for Nigeria's power sector development. Opportunities in power generation, telecoms, and manufacturing.",
      teachingStyle: "Strong theoretical foundation with lab work. Emphasis on power systems given Nigeria's energy challenges.",
      careerOpportunities: ["Power Engineer", "Telecom Engineer", "Control Systems Engineer", "Electrical Contractor", "Utility Engineer"],
      salaryRange: { min: 2000000, max: 12000000, currency: "NGN" },
    },
    globalContext: {
      description: "Essential for renewable energy transition. High demand in power, automotive, and tech industries.",
      teachingStyle: "Research-focused with specialization in power, electronics, or control systems.",
      careerOpportunities: ["Power Systems Engineer", "Electronics Engineer", "Renewable Energy Specialist", "R&D Engineer", "Consultant"],
      salaryRange: { min: 75000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design electrical systems, analyze circuits, manage projects, troubleshoot problems, and work with multidisciplinary teams.",
      typicalEmployers: ["Power Companies", "Telecoms", "Manufacturing", "Consulting Firms", "Oil & Gas", "Renewable Energy"],
    },
    curriculum: {
      year1: ["Mathematics", "Physics", "Chemistry", "Engineering Drawing"],
      year2: ["Circuit Analysis", "Electronics", "Electromagnetic Fields", "Digital Systems"],
      year3: ["Power Systems", "Control Systems", "Machines", "Microprocessors"],
      year4: ["Power Electronics", "Renewable Energy", "Design Project", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "Electric vehicles and renewable energy are driving massive demand for electrical engineers.",
      trends: ["Electric Vehicles", "Solar Power", "Smart Grids", "Energy Storage", "Power Electronics"],
    },
    successPathway: {
      internships: ["Power companies", "Telecoms", "Manufacturing plants"],
      certifications: ["COREN Registration", "PMP", "Renewable Energy Certs"],
      projects: ["Solar installations", "Electronics projects", "Automation systems"],
      volunteering: ["Rural electrification", "STEM education", "Engineering outreach"],
    },
    schools: allSchools,
    interestMatch: ["engineering", "technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "civil-engineering",
    name: "Civil Engineering",
    category: "Engineering",
    overview: "Civil Engineering designs and constructs infrastructure like roads, bridges, buildings, and water systems. Students learn structural analysis, construction management, and materials science.",
    coreSkills: ["Structural Design", "Project Management", "AutoCAD", "Problem Solving", "Materials Knowledge", "Construction Management"],
    nigeriaContext: {
      description: "Essential for Nigeria's infrastructure development. Opportunities in construction, government, and consulting.",
      teachingStyle: "Strong emphasis on practical construction and local building codes.",
      careerOpportunities: ["Structural Engineer", "Construction Manager", "Highway Engineer", "Water Resources Engineer", "Consultant"],
      salaryRange: { min: 2000000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Infrastructure investment is growing globally. Sustainable construction and smart cities are key trends.",
      teachingStyle: "Advanced structural analysis and sustainable design. BIM and digital construction are emphasized.",
      careerOpportunities: ["Senior Structural Engineer", "Project Director", "Sustainability Consultant", "Urban Planner", "Research Engineer"],
      salaryRange: { min: 70000, max: 140000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design structures, manage construction projects, supervise sites, ensure safety compliance, and coordinate with architects.",
      typicalEmployers: ["Construction Companies", "Consulting Firms", "Government", "Real Estate Developers", "Oil & Gas"],
    },
    curriculum: {
      year1: ["Mathematics", "Physics", "Engineering Drawing", "Materials Science"],
      year2: ["Structural Analysis", "Surveying", "Fluid Mechanics", "Soil Mechanics"],
      year3: ["Reinforced Concrete Design", "Steel Structures", "Highway Engineering", "Hydrology"],
      year4: ["Construction Management", "Foundation Engineering", "Design Project", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "BIM, drones, and sustainable materials are transforming construction. Climate resilience is a growing focus.",
      trends: ["BIM Technology", "Sustainable Construction", "Smart Cities", "Climate Resilience", "3D Printing"],
    },
    successPathway: {
      internships: ["Construction companies", "Consulting firms", "Government agencies"],
      certifications: ["COREN Registration", "PMP", "BIM Certification"],
      projects: ["Design competitions", "Construction site experience", "Research"],
      volunteering: ["Habitat for Humanity", "Community infrastructure", "STEM education"],
    },
    schools: allSchools,
    interestMatch: ["engineering"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -2, peopleVsTask: 0, riskVsStability: 1 },
  },
  {
    id: "chemical-engineering",
    name: "Chemical Engineering",
    category: "Engineering",
    overview: "Chemical Engineering applies chemistry and physics to design processes for converting raw materials into useful products. Students learn process design, thermodynamics, and reactor engineering.",
    coreSkills: ["Process Design", "Chemistry", "Problem Solving", "Technical Analysis", "Safety Management", "Research"],
    nigeriaContext: {
      description: "Key for Nigeria's oil & gas, petrochemical, and manufacturing sectors. High demand in refineries and chemical plants.",
      teachingStyle: "Strong chemistry foundation with process engineering. Focus on oil & gas applications.",
      careerOpportunities: ["Process Engineer", "Refinery Engineer", "Production Manager", "Quality Control", "Oil & Gas Specialist"],
      salaryRange: { min: 3000000, max: 18000000, currency: "NGN" },
    },
    globalContext: {
      description: "Versatile field spanning pharmaceuticals, energy, food, and materials. Green chemistry is a growing focus.",
      teachingStyle: "Research-oriented with lab work and process simulation. Biotech and sustainable processes are emphasized.",
      careerOpportunities: ["Senior Process Engineer", "R&D Scientist", "Plant Manager", "Consultant", "Sustainability Engineer"],
      salaryRange: { min: 80000, max: 160000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design processes, optimize operations, ensure safety, manage production, and develop new products.",
      typicalEmployers: ["Oil & Gas Companies", "Refineries", "Chemical Companies", "Pharmaceuticals", "Food Companies", "Consulting"],
    },
    curriculum: {
      year1: ["Chemistry", "Mathematics", "Physics", "Introduction to Engineering"],
      year2: ["Thermodynamics", "Fluid Mechanics", "Mass Transfer", "Organic Chemistry"],
      year3: ["Reactor Design", "Process Control", "Separation Processes", "Heat Transfer"],
      year4: ["Process Design", "Safety Engineering", "Plant Design Project", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Green chemistry, biotechnology, and sustainable processes are defining the future.",
      trends: ["Green Chemistry", "Biotechnology", "Carbon Capture", "Sustainable Manufacturing", "Process Digitization"],
    },
    successPathway: {
      internships: ["Refineries", "Chemical plants", "Pharmaceutical companies"],
      certifications: ["COREN Registration", "Six Sigma", "Process Safety"],
      projects: ["Process optimization", "Research", "Design competitions"],
      volunteering: ["STEM education", "Environmental initiatives", "Safety awareness"],
    },
    schools: allSchools,
    interestMatch: ["engineering"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "petroleum-engineering",
    name: "Petroleum Engineering",
    category: "Engineering",
    overview: "Petroleum Engineering focuses on extracting oil and gas from underground reservoirs. Students learn drilling, reservoir management, and production optimization.",
    coreSkills: ["Reservoir Analysis", "Drilling Operations", "Problem Solving", "Geology Knowledge", "Technical Analysis", "Project Management"],
    nigeriaContext: {
      description: "Core to Nigeria's oil economy. High-paying opportunities with international and national oil companies.",
      teachingStyle: "Strong emphasis on Nigerian oil industry. Field trips and industry partnerships are common.",
      careerOpportunities: ["Drilling Engineer", "Reservoir Engineer", "Production Engineer", "Offshore Engineer", "Oil Company Executive"],
      salaryRange: { min: 5000000, max: 30000000, currency: "NGN" },
    },
    globalContext: {
      description: "Still lucrative but transitioning. Engineers are pivoting to geothermal and carbon storage as energy transitions.",
      teachingStyle: "Advanced reservoir simulation and modern extraction techniques. Sustainability is increasingly emphasized.",
      careerOpportunities: ["Senior Reservoir Engineer", "Drilling Manager", "Energy Consultant", "Geothermal Engineer", "Executive"],
      salaryRange: { min: 100000, max: 250000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Analyze reservoirs, design drilling programs, optimize production, manage projects, and work offshore or in field locations.",
      typicalEmployers: ["Shell", "Chevron", "ExxonMobil", "NNPC", "Oilfield Services", "Consulting Firms"],
    },
    curriculum: {
      year1: ["Mathematics", "Physics", "Chemistry", "Geology Basics"],
      year2: ["Petroleum Geology", "Drilling Engineering", "Fluid Mechanics", "Thermodynamics"],
      year3: ["Reservoir Engineering", "Production Engineering", "Well Testing", "Petrophysics"],
      year4: ["Enhanced Oil Recovery", "Offshore Engineering", "Design Project", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 7,
      techImpact: "Energy transition is reshaping the industry. Skills transfer to geothermal and carbon capture.",
      trends: ["Energy Transition", "Carbon Capture", "Geothermal", "Digital Oilfield", "Sustainability"],
    },
    successPathway: {
      internships: ["Oil companies", "Service companies", "NNPC"],
      certifications: ["COREN Registration", "SPE Certifications", "Safety Certs"],
      projects: ["Field studies", "Simulation projects", "Research"],
      volunteering: ["Environmental initiatives", "STEM education", "Community development"],
    },
    schools: allSchools,
    interestMatch: ["engineering"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: -1 },
  },
  {
    id: "computer-engineering",
    name: "Computer Engineering",
    category: "Engineering",
    overview: "Computer Engineering combines electrical engineering and computer science to design hardware and embedded systems. Students learn digital design, microprocessors, and computer architecture.",
    coreSkills: ["Hardware Design", "Embedded Systems", "Programming", "Digital Logic", "Problem Solving", "Systems Integration"],
    nigeriaContext: {
      description: "Growing field with opportunities in telecoms, fintech, and IoT. Combines hardware and software skills.",
      teachingStyle: "Balance of electrical engineering and computer science. Hands-on lab work with hardware.",
      careerOpportunities: ["Embedded Systems Engineer", "Hardware Engineer", "IoT Developer", "Telecom Engineer", "Systems Engineer"],
      salaryRange: { min: 2500000, max: 14000000, currency: "NGN" },
    },
    globalContext: {
      description: "Critical for semiconductor and hardware industry. IoT and AI hardware are driving demand.",
      teachingStyle: "Advanced VLSI design and embedded systems. Research in AI accelerators and quantum computing.",
      careerOpportunities: ["Chip Designer", "Firmware Engineer", "Hardware Architect", "R&D Engineer", "Technical Director"],
      salaryRange: { min: 90000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design circuits, write firmware, test hardware, debug systems, and collaborate with software teams.",
      typicalEmployers: ["Intel", "Apple", "Qualcomm", "Telecoms", "IoT Startups", "Tech Companies"],
    },
    curriculum: {
      year1: ["Mathematics", "Physics", "Programming", "Digital Logic"],
      year2: ["Circuit Analysis", "Microprocessors", "Data Structures", "Electronics"],
      year3: ["Computer Architecture", "Embedded Systems", "Operating Systems", "VLSI Design"],
      year4: ["Advanced Digital Design", "Real-Time Systems", "Design Project", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "AI chips, IoT, and edge computing are driving explosive growth in hardware engineering.",
      trends: ["AI Hardware", "IoT", "Edge Computing", "Quantum Computing", "Wearables"],
    },
    successPathway: {
      internships: ["Tech companies", "Telecoms", "Hardware startups"],
      certifications: ["Embedded Systems Certs", "FPGA Training", "ARM Certification"],
      projects: ["Arduino/Raspberry Pi projects", "PCB design", "IoT devices"],
      volunteering: ["Robotics clubs", "STEM education", "Maker spaces"],
    },
    schools: allSchools,
    interestMatch: ["engineering", "technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "biomedical-engineering",
    name: "Biomedical Engineering",
    category: "Engineering",
    overview: "Biomedical Engineering applies engineering principles to healthcare and medicine. Students learn medical devices, biomechanics, and biotechnology.",
    coreSkills: ["Medical Device Design", "Biology Knowledge", "Problem Solving", "Research", "Regulatory Knowledge", "Systems Thinking"],
    nigeriaContext: {
      description: "Emerging field in Nigeria with opportunities in medical equipment, hospitals, and health tech startups.",
      teachingStyle: "Interdisciplinary approach combining engineering and medical sciences.",
      careerOpportunities: ["Biomedical Engineer", "Medical Equipment Manager", "Health Tech Developer", "Research Engineer", "Clinical Engineer"],
      salaryRange: { min: 2000000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Rapidly growing field with aging populations. Medical devices and biotechnology are major industries.",
      teachingStyle: "Research-intensive with specializations in devices, biomechanics, or tissue engineering.",
      careerOpportunities: ["R&D Engineer", "Regulatory Affairs", "Product Manager", "Clinical Engineer", "Startup Founder"],
      salaryRange: { min: 80000, max: 170000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design medical devices, conduct research, test prototypes, work with clinicians, and ensure regulatory compliance.",
      typicalEmployers: ["Medical Device Companies", "Hospitals", "Research Institutions", "Pharma Companies", "Health Tech Startups"],
    },
    curriculum: {
      year1: ["Biology", "Chemistry", "Physics", "Engineering Fundamentals"],
      year2: ["Anatomy", "Biomaterials", "Circuits", "Programming"],
      year3: ["Biomechanics", "Medical Imaging", "Bioinstrumentation", "Physiology"],
      year4: ["Medical Device Design", "Tissue Engineering", "Research Project", "Clinical Experience"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "AI in healthcare, wearable devices, and personalized medicine are driving growth.",
      trends: ["Wearable Health Tech", "AI Diagnostics", "3D Bioprinting", "Neural Engineering", "Personalized Medicine"],
    },
    successPathway: {
      internships: ["Medical device companies", "Hospitals", "Research labs"],
      certifications: ["Biomedical Engineering Certs", "Quality Systems", "Regulatory Training"],
      projects: ["Device prototypes", "Research publications", "Hackathons"],
      volunteering: ["Health tech for underserved", "Medical equipment repair", "STEM education"],
    },
    schools: allSchools,
    interestMatch: ["engineering", "health"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 0 },
  },
  {
    id: "agricultural-engineering",
    name: "Agricultural Engineering",
    category: "Engineering",
    overview: "Agricultural Engineering applies engineering to farming and food production. Students learn irrigation, farm machinery, food processing, and sustainable agriculture.",
    coreSkills: ["Farm Mechanization", "Irrigation Design", "Food Processing", "Problem Solving", "Project Management", "Environmental Awareness"],
    nigeriaContext: {
      description: "Critical for Nigeria's agricultural transformation. Opportunities in agribusiness, food processing, and irrigation projects.",
      teachingStyle: "Practical focus with farm experience. Strong emphasis on local agricultural challenges.",
      careerOpportunities: ["Agricultural Engineer", "Irrigation Specialist", "Food Processing Engineer", "Agribusiness Manager", "Farm Consultant"],
      salaryRange: { min: 1500000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Precision agriculture and sustainable farming are driving demand. Food security is a global priority.",
      teachingStyle: "Integration of IoT, drones, and data analytics with traditional agricultural engineering.",
      careerOpportunities: ["Precision Agriculture Specialist", "Sustainability Engineer", "Food Tech Engineer", "Research Scientist", "Agtech Founder"],
      salaryRange: { min: 60000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design agricultural systems, manage irrigation projects, develop processing facilities, and advise farmers.",
      typicalEmployers: ["Agribusiness Companies", "Food Processors", "Government Agencies", "NGOs", "Consulting Firms"],
    },
    curriculum: {
      year1: ["Mathematics", "Physics", "Chemistry", "Biology"],
      year2: ["Soil Science", "Fluid Mechanics", "Farm Machinery", "Surveying"],
      year3: ["Irrigation Engineering", "Food Processing", "Post-Harvest Technology", "Farm Structures"],
      year4: ["Agricultural Systems", "Renewable Energy in Agric", "Design Project", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "Smart farming, drones, and IoT are transforming agriculture. Climate adaptation is crucial.",
      trends: ["Precision Agriculture", "Drones", "IoT Farming", "Vertical Farming", "Climate-Smart Agric"],
    },
    successPathway: {
      internships: ["Agribusiness companies", "Food processors", "Government agencies"],
      certifications: ["COREN Registration", "Project Management", "Irrigation Certifications"],
      projects: ["Farm automation", "Irrigation design", "Processing improvements"],
      volunteering: ["Farmer training", "Rural development", "Food security initiatives"],
    },
    schools: allSchools,
    interestMatch: ["engineering", "social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 0 },
  },
  {
    id: "architecture",
    name: "Architecture",
    category: "Engineering",
    overview: "Architecture combines art and engineering to design buildings and spaces. Students learn design principles, structural systems, and sustainable building practices.",
    coreSkills: ["Design Thinking", "Technical Drawing", "AutoCAD/Revit", "Creativity", "Project Management", "Communication"],
    nigeriaContext: {
      description: "Growing urbanization creates demand for architects. Opportunities in residential, commercial, and urban design.",
      teachingStyle: "Studio-based learning with design critiques. 5-year program with practical training.",
      careerOpportunities: ["Architect", "Urban Planner", "Interior Designer", "Project Manager", "Real Estate Developer"],
      salaryRange: { min: 2000000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Sustainable design and smart buildings are key trends. Top architects achieve global recognition.",
      teachingStyle: "Design studios with international exposure. Sustainability and technology are emphasized.",
      careerOpportunities: ["Principal Architect", "Sustainability Consultant", "Urban Designer", "BIM Manager", "Academia"],
      salaryRange: { min: 60000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design buildings, create drawings, meet clients, coordinate with engineers, oversee construction, and manage projects.",
      typicalEmployers: ["Architecture Firms", "Construction Companies", "Government", "Real Estate Developers", "Self-Employed"],
    },
    curriculum: {
      year1: ["Design Fundamentals", "Drawing", "Art History", "Mathematics"],
      year2: ["Architectural Design", "Building Construction", "Structures", "Environmental Systems"],
      year3: ["Advanced Design", "Urban Design", "Building Services", "Materials"],
      year4: ["Thesis Design", "Professional Practice", "Sustainability", "Digital Fabrication"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "BIM, parametric design, and sustainable architecture are transforming practice.",
      trends: ["Sustainable Design", "BIM", "Parametric Architecture", "Smart Buildings", "3D Printing"],
    },
    successPathway: {
      internships: ["Architecture firms", "Construction companies", "Urban planning agencies"],
      certifications: ["NIA Registration", "LEED", "BIM Certifications"],
      projects: ["Design competitions", "Portfolio building", "Community projects"],
      volunteering: ["Habitat for Humanity", "Community design", "Architecture education"],
    },
    schools: allSchools,
    interestMatch: ["engineering", "media-creative"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: 0 },
  },
  // FINANCE & BUSINESS
  {
    id: "finance",
    name: "Finance",
    category: "Finance & Business",
    overview: "Finance studies how individuals and organizations manage money. Students learn investment analysis, corporate finance, financial markets, and risk management.",
    coreSkills: ["Financial Analysis", "Excel Modeling", "Valuation", "Risk Assessment", "Communication", "Quantitative Skills"],
    nigeriaContext: {
      description: "Core to Nigeria's financial sector. Opportunities in investment banking, asset management, and corporate finance.",
      teachingStyle: "Quantitative focus with case studies. CFA preparation is often integrated.",
      careerOpportunities: ["Investment Analyst", "Financial Analyst", "Portfolio Manager", "Treasury Officer", "Corporate Finance"],
      salaryRange: { min: 2500000, max: 18000000, currency: "NGN" },
    },
    globalContext: {
      description: "High-paying career in investment banking and asset management. Quantitative skills are increasingly important.",
      teachingStyle: "Advanced financial modeling and valuation. Strong ties to Wall Street and financial centers.",
      careerOpportunities: ["Investment Banker", "Private Equity", "Hedge Fund Analyst", "CFO", "Wealth Manager"],
      salaryRange: { min: 80000, max: 300000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Build financial models, analyze investments, prepare reports, meet clients, and advise on transactions.",
      typicalEmployers: ["Investment Banks", "Asset Managers", "Private Equity", "Corporations", "Consulting Firms"],
    },
    curriculum: {
      year1: ["Accounting", "Economics", "Mathematics", "Business Law"],
      year2: ["Corporate Finance", "Investments", "Financial Markets", "Statistics"],
      year3: ["Portfolio Management", "Derivatives", "Financial Modeling", "Risk Management"],
      year4: ["Mergers & Acquisitions", "Valuation", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Fintech and algorithmic trading are transforming finance. Quantitative skills are essential.",
      trends: ["Fintech", "ESG Investing", "Algorithmic Trading", "Digital Assets", "Sustainable Finance"],
    },
    successPathway: {
      internships: ["Investment banks", "Asset managers", "Corporate finance"],
      certifications: ["CFA", "FRM", "Bloomberg Terminal"],
      projects: ["Stock analysis", "Investment competitions", "Financial modeling"],
      volunteering: ["Financial literacy", "Investment clubs", "Microfinance"],
    },
    schools: allSchools,
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: -1 },
  },
  {
    id: "marketing",
    name: "Marketing",
    category: "Finance & Business",
    overview: "Marketing focuses on understanding customer needs and creating value. Students learn branding, digital marketing, consumer behavior, and marketing strategy.",
    coreSkills: ["Digital Marketing", "Analytics", "Communication", "Creativity", "Strategy", "Consumer Psychology"],
    nigeriaContext: {
      description: "Essential for businesses in competitive markets. Digital marketing skills are highly valued.",
      teachingStyle: "Blend of theory and practical campaigns. Emphasis on digital and social media marketing.",
      careerOpportunities: ["Brand Manager", "Digital Marketer", "Social Media Manager", "Marketing Manager", "Advertising Executive"],
      salaryRange: { min: 1500000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Digital transformation has revolutionized marketing. Data-driven marketing is the norm.",
      teachingStyle: "Analytics-focused with digital tools. Strong emphasis on marketing technology.",
      careerOpportunities: ["CMO", "Growth Manager", "Product Marketer", "Marketing Analyst", "Brand Director"],
      salaryRange: { min: 60000, max: 180000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Develop campaigns, analyze data, manage brands, create content, and coordinate with sales and product teams.",
      typicalEmployers: ["FMCG Companies", "Tech Companies", "Advertising Agencies", "Banks", "Startups"],
    },
    curriculum: {
      year1: ["Principles of Marketing", "Business Communication", "Economics", "Statistics"],
      year2: ["Consumer Behavior", "Marketing Research", "Digital Marketing", "Branding"],
      year3: ["Marketing Strategy", "Advertising", "Sales Management", "Analytics"],
      year4: ["Integrated Marketing", "Capstone Project", "Internship", "Electives"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "AI and automation are changing marketing. Data analytics and personalization are key.",
      trends: ["AI Marketing", "Influencer Marketing", "Marketing Automation", "Personalization", "Content Marketing"],
    },
    successPathway: {
      internships: ["Marketing agencies", "FMCG companies", "Tech startups"],
      certifications: ["Google Ads", "HubSpot", "Meta Blueprint", "Google Analytics"],
      projects: ["Campaign management", "Personal brand", "Marketing competitions"],
      volunteering: ["Non-profit marketing", "Small business support", "Digital literacy"],
    },
    schools: allSchools,
    interestMatch: ["finance-business", "media-creative"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 1, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "business-administration",
    name: "Business Administration",
    category: "Finance & Business",
    overview: "Business Administration provides a broad foundation in managing organizations. Students learn management, strategy, operations, and leadership.",
    coreSkills: ["Leadership", "Problem Solving", "Communication", "Strategic Thinking", "Financial Literacy", "Teamwork"],
    nigeriaContext: {
      description: "Versatile degree for management roles across industries. Foundation for entrepreneurship and corporate careers.",
      teachingStyle: "Case study method with group projects. Emphasis on practical business skills.",
      careerOpportunities: ["Management Trainee", "Operations Manager", "Project Manager", "Entrepreneur", "Consultant"],
      salaryRange: { min: 1500000, max: 12000000, currency: "NGN" },
    },
    globalContext: {
      description: "MBA remains the gold standard for business leadership. Entrepreneurship programs are growing.",
      teachingStyle: "Case-based learning with networking emphasis. International exposure is valued.",
      careerOpportunities: ["CEO", "Strategy Consultant", "Operations Director", "Entrepreneur", "General Manager"],
      salaryRange: { min: 70000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Lead teams, make strategic decisions, manage operations, analyze performance, and drive business growth.",
      typicalEmployers: ["Corporations", "Consulting Firms", "Banks", "Startups", "Family Businesses"],
    },
    curriculum: {
      year1: ["Introduction to Business", "Economics", "Accounting", "Communication"],
      year2: ["Marketing", "Finance", "Operations Management", "Organizational Behavior"],
      year3: ["Strategy", "Human Resources", "Entrepreneurship", "Business Law"],
      year4: ["Capstone Project", "Internship", "Leadership", "Electives"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 8,
      techImpact: "Digital transformation requires tech-savvy business leaders. Data literacy is essential.",
      trends: ["Digital Business", "Remote Leadership", "Sustainability", "Agile Management", "Data-Driven Decisions"],
    },
    successPathway: {
      internships: ["Corporations", "Consulting firms", "Startups"],
      certifications: ["PMP", "MBA", "Six Sigma", "Leadership Programs"],
      projects: ["Business plan competitions", "Case competitions", "Startup projects"],
      volunteering: ["Non-profit boards", "Mentorship", "Social enterprises"],
    },
    schools: allSchools,
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "banking-finance",
    name: "Banking & Finance",
    category: "Finance & Business",
    overview: "Banking & Finance focuses specifically on financial institutions and markets. Students learn banking operations, credit analysis, and financial regulation.",
    coreSkills: ["Credit Analysis", "Financial Regulation", "Risk Management", "Customer Service", "Analytical Skills", "Communication"],
    nigeriaContext: {
      description: "Direct pathway to Nigeria's banking sector. Strong opportunities with commercial and central banks.",
      teachingStyle: "Practical banking operations with regulatory focus. Industry partnerships are common.",
      careerOpportunities: ["Bank Officer", "Credit Analyst", "Relationship Manager", "Treasury Officer", "Branch Manager"],
      salaryRange: { min: 2000000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Core to global financial system. Fintech is transforming traditional banking roles.",
      teachingStyle: "Quantitative approach with emphasis on technology and regulation.",
      careerOpportunities: ["Investment Banker", "Commercial Banker", "Risk Manager", "Fintech Product Manager", "Banking Executive"],
      salaryRange: { min: 70000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Analyze credit applications, manage customer relationships, process transactions, assess risks, and ensure compliance.",
      typicalEmployers: ["Commercial Banks", "Central Bank", "Investment Banks", "Microfinance Banks", "Fintech Companies"],
    },
    curriculum: {
      year1: ["Accounting", "Economics", "Mathematics", "Introduction to Banking"],
      year2: ["Money & Banking", "Financial Institutions", "Credit Management", "Business Law"],
      year3: ["Bank Management", "International Finance", "Risk Management", "Financial Regulation"],
      year4: ["Treasury Management", "Bank Audit", "Thesis", "Industrial Attachment"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 8,
      techImpact: "Digital banking and fintech are reshaping the industry. Traditional roles are evolving.",
      trends: ["Digital Banking", "Open Banking", "Fintech Integration", "Cryptocurrency", "Financial Inclusion"],
    },
    successPathway: {
      internships: ["Commercial banks", "Central bank", "Fintech companies"],
      certifications: ["CIBN", "CFA", "Risk Management Certs"],
      projects: ["Banking simulations", "Credit analysis", "Fintech projects"],
      volunteering: ["Financial inclusion", "Literacy programs", "Microfinance support"],
    },
    schools: allSchools,
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: 1 },
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    category: "Finance & Business",
    overview: "Entrepreneurship teaches how to identify opportunities and build new ventures. Students learn business planning, innovation, funding, and startup management.",
    coreSkills: ["Innovation", "Risk Taking", "Leadership", "Problem Solving", "Networking", "Resilience"],
    nigeriaContext: {
      description: "Essential given Nigeria's startup ecosystem growth. Programs connect students with incubators and investors.",
      teachingStyle: "Hands-on venture creation with mentorship. Business plan competitions are common.",
      careerOpportunities: ["Startup Founder", "Business Developer", "Innovation Manager", "Venture Analyst", "Franchise Owner"],
      salaryRange: { min: 500000, max: 50000000, currency: "NGN" },
    },
    globalContext: {
      description: "Startup culture is global. Access to venture capital and global markets creates massive opportunities.",
      teachingStyle: "Lean startup methodology with accelerator connections. Failure is seen as learning.",
      careerOpportunities: ["Tech Founder", "VC Partner", "Serial Entrepreneur", "Innovation Consultant", "Venture Builder"],
      salaryRange: { min: 0, max: 1000000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Develop ideas, build products, raise funding, manage teams, acquire customers, and scale businesses.",
      typicalEmployers: ["Self-Employed", "Startups", "Venture Studios", "Corporate Innovation", "Incubators"],
    },
    curriculum: {
      year1: ["Business Fundamentals", "Creativity & Innovation", "Economics", "Communication"],
      year2: ["Opportunity Recognition", "Business Planning", "Marketing", "Financial Management"],
      year3: ["Venture Creation", "Funding & Investment", "Operations", "Legal Aspects"],
      year4: ["Growth Strategy", "Scaling", "Capstone Venture", "Mentorship"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Technology enables new business models and global reach. AI tools are democratizing entrepreneurship.",
      trends: ["Tech Startups", "Social Enterprise", "AI Tools", "Remote Businesses", "Creator Economy"],
    },
    successPathway: {
      internships: ["Startups", "Incubators", "Venture studios"],
      certifications: ["Y Combinator Startup School", "Google for Startups", "Lean Six Sigma"],
      projects: ["Launch a business", "Business competitions", "Side projects"],
      volunteering: ["Mentor other founders", "Startup ecosystem building", "Youth entrepreneurship"],
    },
    schools: allSchools,
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 2, peopleVsTask: -1, riskVsStability: -2 },
  },
  {
    id: "estate-management",
    name: "Estate Management",
    category: "Finance & Business",
    overview: "Estate Management focuses on property valuation, management, and real estate investment. Students learn property law, valuation, and real estate finance.",
    coreSkills: ["Property Valuation", "Negotiation", "Market Analysis", "Legal Knowledge", "Communication", "Financial Analysis"],
    nigeriaContext: {
      description: "Essential for Nigeria's growing real estate market. Opportunities in valuation, property management, and development.",
      teachingStyle: "Professional focus with practical valuation exercises. Regulatory knowledge is emphasized.",
      careerOpportunities: ["Estate Surveyor", "Property Manager", "Valuer", "Real Estate Developer", "Facilities Manager"],
      salaryRange: { min: 1500000, max: 12000000, currency: "NGN" },
    },
    globalContext: {
      description: "Real estate is a major asset class globally. Commercial real estate and REITs offer significant opportunities.",
      teachingStyle: "Finance-oriented with investment analysis. Global real estate markets are covered.",
      careerOpportunities: ["Real Estate Investor", "Fund Manager", "Development Director", "REIT Analyst", "Consultant"],
      salaryRange: { min: 60000, max: 180000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Value properties, manage portfolios, advise clients, analyze markets, and oversee developments.",
      typicalEmployers: ["Estate Firms", "Banks", "Government", "Developers", "Corporations"],
    },
    curriculum: {
      year1: ["Introduction to Estate Management", "Economics", "Building Construction", "Land Law"],
      year2: ["Valuation I", "Property Law", "Urban Planning", "Building Services"],
      year3: ["Valuation II", "Investment Analysis", "Facilities Management", "Property Development"],
      year4: ["Advanced Valuation", "Professional Practice", "Thesis", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "PropTech is transforming real estate. Digital tools for valuation and management are growing.",
      trends: ["PropTech", "Smart Buildings", "Sustainable Real Estate", "Co-Working Spaces", "Digital Transactions"],
    },
    successPathway: {
      internships: ["Estate firms", "Banks (real estate)", "Government agencies"],
      certifications: ["NIESV", "RICS", "Property Management Certs"],
      projects: ["Property valuations", "Market analysis", "Development feasibility"],
      volunteering: ["Housing advocacy", "Community development", "Urban planning initiatives"],
    },
    schools: allSchools,
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "insurance",
    name: "Insurance",
    category: "Finance & Business",
    overview: "Insurance studies risk assessment and financial protection. Students learn actuarial science, underwriting, claims management, and insurance law.",
    coreSkills: ["Risk Assessment", "Analytical Skills", "Communication", "Attention to Detail", "Negotiation", "Mathematics"],
    nigeriaContext: {
      description: "Growing sector as insurance penetration increases. Opportunities in underwriting, claims, and broking.",
      teachingStyle: "Professional focus with actuarial foundations. Industry certifications are emphasized.",
      careerOpportunities: ["Underwriter", "Claims Manager", "Insurance Broker", "Risk Manager", "Actuary"],
      salaryRange: { min: 1500000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Essential industry in developed markets. Actuaries are among highest-paid professionals.",
      teachingStyle: "Quantitative rigor with professional exam preparation. Specializations in life, health, or property.",
      careerOpportunities: ["Senior Actuary", "Chief Risk Officer", "Reinsurance Specialist", "InsurTech Founder", "Consulting Actuary"],
      salaryRange: { min: 70000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Assess risks, price policies, manage claims, advise clients, and develop insurance products.",
      typicalEmployers: ["Insurance Companies", "Brokerages", "Reinsurers", "Banks", "Consulting Firms"],
    },
    curriculum: {
      year1: ["Mathematics", "Statistics", "Economics", "Introduction to Insurance"],
      year2: ["Insurance Principles", "Risk Management", "Actuarial Science I", "Business Law"],
      year3: ["Life Insurance", "General Insurance", "Actuarial Science II", "Insurance Law"],
      year4: ["Reinsurance", "Claims Management", "Thesis", "Industrial Training"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "InsurTech and AI are transforming underwriting and claims. Digital distribution is growing.",
      trends: ["InsurTech", "AI Underwriting", "Microinsurance", "Climate Risk", "Digital Distribution"],
    },
    successPathway: {
      internships: ["Insurance companies", "Brokerages", "Risk consulting"],
      certifications: ["CIIN", "Actuarial Exams", "Risk Management Certs"],
      projects: ["Risk analysis", "Product development", "Claims analysis"],
      volunteering: ["Insurance education", "Financial literacy", "Community risk awareness"],
    },
    schools: allSchools,
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: 2 },
  },
  {
    id: "tourism-hospitality",
    name: "Tourism & Hospitality Management",
    category: "Finance & Business",
    overview: "Tourism & Hospitality prepares students for the travel and service industry. Students learn hotel management, event planning, and tourism marketing.",
    coreSkills: ["Customer Service", "Communication", "Event Planning", "Marketing", "Cultural Awareness", "Management"],
    nigeriaContext: {
      description: "Growing sector with potential. Opportunities in hotels, airlines, events, and destination management.",
      teachingStyle: "Practical focus with industry placements. Service excellence is emphasized.",
      careerOpportunities: ["Hotel Manager", "Event Planner", "Travel Agent", "Tour Operator", "Airline Executive"],
      salaryRange: { min: 1000000, max: 6000000, currency: "NGN" },
    },
    globalContext: {
      description: "Major global industry. Luxury hospitality and sustainable tourism offer premium opportunities.",
      teachingStyle: "International exposure with hotel school training. Language skills are valued.",
      careerOpportunities: ["General Manager", "Cruise Director", "Luxury Brand Manager", "Resort Developer", "Tourism Consultant"],
      salaryRange: { min: 50000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Manage operations, ensure guest satisfaction, plan events, market destinations, and lead teams.",
      typicalEmployers: ["Hotels", "Airlines", "Event Companies", "Tourism Boards", "Cruise Lines"],
    },
    curriculum: {
      year1: ["Introduction to Hospitality", "Tourism Geography", "Communication", "Economics"],
      year2: ["Hotel Operations", "Food & Beverage", "Event Management", "Marketing"],
      year3: ["Revenue Management", "Sustainable Tourism", "Human Resources", "Tourism Planning"],
      year4: ["Strategic Management", "Internship", "Thesis", "Electives"],
    },
    futureOutlook: {
      relevanceToday: 7,
      relevanceIn5Years: 8,
      techImpact: "Digital booking and experiences are transforming travel. Sustainable tourism is key.",
      trends: ["Sustainable Tourism", "Experience Economy", "Digital Nomads", "Wellness Travel", "Local Experiences"],
    },
    successPathway: {
      internships: ["Hotels", "Airlines", "Event companies", "Tourism boards"],
      certifications: ["Hotel Management Certs", "Event Planning", "Language Certifications"],
      projects: ["Event organization", "Tourism marketing", "Hospitality startups"],
      volunteering: ["Tourism promotion", "Cultural events", "Heritage preservation"],
    },
    schools: allSchools,
    interestMatch: ["finance-business", "social-impact"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 1, peopleVsTask: -2, riskVsStability: 0 },
  },
  // GOVERNANCE & POLICY
  {
    id: "political-science",
    name: "Political Science",
    category: "Governance & Policy",
    overview: "Political Science studies government, politics, and power. Students learn political theory, comparative politics, and public policy analysis.",
    coreSkills: ["Critical Analysis", "Research", "Writing", "Public Speaking", "Policy Analysis", "Debate"],
    nigeriaContext: {
      description: "Foundation for careers in government, politics, and public service. Opportunities in policy analysis and advocacy.",
      teachingStyle: "Theoretical foundation with case studies of Nigerian and African politics.",
      careerOpportunities: ["Policy Analyst", "Political Consultant", "Government Official", "NGO Director", "Journalist"],
      salaryRange: { min: 1200000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Pathway to government, international organizations, and policy think tanks. Academic careers are also common.",
      teachingStyle: "Research-focused with quantitative and qualitative methods. Comparative and international perspectives.",
      careerOpportunities: ["Policy Director", "Campaign Manager", "International Affairs Specialist", "Think Tank Researcher", "Professor"],
      salaryRange: { min: 50000, max: 130000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Research policy issues, analyze political trends, write reports, advise on strategy, and engage stakeholders.",
      typicalEmployers: ["Government", "Political Parties", "Think Tanks", "NGOs", "Media", "International Organizations"],
    },
    curriculum: {
      year1: ["Introduction to Political Science", "History", "Sociology", "Research Methods"],
      year2: ["Political Theory", "Comparative Politics", "Nigerian Government", "International Relations"],
      year3: ["Public Policy", "Political Economy", "African Politics", "Research Project"],
      year4: ["Contemporary Issues", "Electives", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "Social media and data are changing political campaigns and policy analysis.",
      trends: ["Data-Driven Politics", "Social Media Campaigns", "Policy Innovation", "Democratic Governance", "Youth Politics"],
    },
    successPathway: {
      internships: ["Government agencies", "Political parties", "Think tanks", "NGOs"],
      certifications: ["Policy Analysis", "Project Management", "Data Analysis"],
      projects: ["Policy research", "Campaign work", "Political commentary"],
      volunteering: ["Civic education", "Voter registration", "Policy advocacy"],
    },
    schools: allSchools,
    interestMatch: ["governance-policy"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "public-administration",
    name: "Public Administration",
    category: "Governance & Policy",
    overview: "Public Administration focuses on managing government agencies and public programs. Students learn policy implementation, public finance, and organizational management.",
    coreSkills: ["Policy Implementation", "Management", "Budgeting", "Communication", "Leadership", "Problem Solving"],
    nigeriaContext: {
      description: "Direct pathway to civil service and public sector management. Opportunities in federal, state, and local government.",
      teachingStyle: "Practical focus on Nigerian public service. Administrative law and ethics are emphasized.",
      careerOpportunities: ["Civil Servant", "Public Manager", "Policy Officer", "Local Government Official", "NGO Administrator"],
      salaryRange: { min: 1500000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "MPA is valued for government and non-profit leadership. Focus on evidence-based policy and public value.",
      teachingStyle: "Case-based learning with public sector partnerships. Quantitative methods are emphasized.",
      careerOpportunities: ["Senior Government Official", "Public Sector Consultant", "Non-Profit Director", "International Development", "City Manager"],
      salaryRange: { min: 55000, max: 140000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Manage programs, develop policies, prepare budgets, lead teams, and serve the public interest.",
      typicalEmployers: ["Federal Government", "State Government", "Local Government", "NGOs", "International Organizations"],
    },
    curriculum: {
      year1: ["Introduction to Public Administration", "Political Science", "Economics", "Sociology"],
      year2: ["Public Policy", "Organizational Behavior", "Public Finance", "Administrative Law"],
      year3: ["Human Resource Management", "Local Government", "Development Administration", "Research Methods"],
      year4: ["Strategic Management", "Ethics in Public Service", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "E-government and digital transformation are modernizing public services.",
      trends: ["E-Government", "Data-Driven Policy", "Citizen Engagement", "Public Innovation", "Sustainable Development"],
    },
    successPathway: {
      internships: ["Government agencies", "NGOs", "International organizations"],
      certifications: ["Project Management", "Public Policy Certs", "Leadership Programs"],
      projects: ["Policy analysis", "Government projects", "Community initiatives"],
      volunteering: ["Community service", "Civic engagement", "Public sector improvement"],
    },
    schools: allSchools,
    interestMatch: ["governance-policy", "social-impact"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: 1 },
  },
  // MEDIA & CREATIVE
  {
    id: "graphic-design",
    name: "Graphic Design",
    category: "Media & Creative",
    overview: "Graphic Design creates visual content for communication. Students learn typography, branding, digital design, and visual storytelling.",
    coreSkills: ["Visual Design", "Adobe Creative Suite", "Typography", "Branding", "Creativity", "Communication"],
    nigeriaContext: {
      description: "Growing demand from brands and digital companies. Freelance and agency opportunities are abundant.",
      teachingStyle: "Studio-based learning with portfolio development. Digital skills are emphasized.",
      careerOpportunities: ["Graphic Designer", "Brand Designer", "UI Designer", "Art Director", "Freelance Designer"],
      salaryRange: { min: 1000000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Digital design and UX are high-demand skills. Remote work opportunities are excellent.",
      teachingStyle: "Industry-aligned with digital focus. UX/UI design is often integrated.",
      careerOpportunities: ["Senior Designer", "Creative Director", "UX Designer", "Product Designer", "Design Lead"],
      salaryRange: { min: 55000, max: 140000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Create designs, work with clients, develop brand identities, design digital assets, and collaborate with teams.",
      typicalEmployers: ["Design Agencies", "Tech Companies", "Corporations", "Media Houses", "Freelance"],
    },
    curriculum: {
      year1: ["Design Fundamentals", "Drawing", "Typography", "Color Theory"],
      year2: ["Digital Design", "Branding", "Layout Design", "Photography"],
      year3: ["UI/UX Design", "Motion Graphics", "Packaging Design", "Portfolio Development"],
      year4: ["Advanced Projects", "Professional Practice", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "AI design tools are changing workflows but not replacing creativity. Digital-first design is the norm.",
      trends: ["AI Design Tools", "Motion Design", "3D Design", "AR/VR Design", "Design Systems"],
    },
    successPathway: {
      internships: ["Design agencies", "Tech companies", "Media houses"],
      certifications: ["Adobe Certifications", "Google UX", "Figma Skills"],
      projects: ["Portfolio building", "Freelance work", "Design competitions"],
      volunteering: ["Non-profit design", "Community branding", "Design education"],
    },
    schools: allSchools,
    interestMatch: ["media-creative", "technology"],
    personalityMatch: { analyticalVsCreative: 2, structuredVsFlexible: 1, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "film-television",
    name: "Film & Television Production",
    category: "Media & Creative",
    overview: "Film & TV Production covers all aspects of creating visual content. Students learn directing, cinematography, editing, and production management.",
    coreSkills: ["Storytelling", "Camera Work", "Editing", "Direction", "Production Management", "Creativity"],
    nigeriaContext: {
      description: "Nollywood is the world's second-largest film industry. Opportunities in film, TV, and streaming content.",
      teachingStyle: "Practical production experience with equipment training. Industry connections are crucial.",
      careerOpportunities: ["Director", "Cinematographer", "Editor", "Producer", "Content Creator"],
      salaryRange: { min: 800000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Streaming has exploded content demand. Nigerian stories are reaching global audiences.",
      teachingStyle: "Industry-standard equipment and workflows. International co-productions are common.",
      careerOpportunities: ["Film Director", "Showrunner", "Documentary Filmmaker", "VFX Supervisor", "Studio Executive"],
      salaryRange: { min: 50000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Plan productions, direct shoots, edit footage, manage crews, and deliver content to clients or audiences.",
      typicalEmployers: ["Film Studios", "TV Stations", "Production Companies", "Streaming Platforms", "Freelance"],
    },
    curriculum: {
      year1: ["Introduction to Film", "Visual Storytelling", "Film History", "Basic Production"],
      year2: ["Cinematography", "Editing", "Sound Design", "Screenwriting"],
      year3: ["Directing", "Production Management", "Documentary", "Advanced Editing"],
      year4: ["Thesis Film", "Professional Practice", "Distribution", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Streaming and social media have democratized content. Virtual production is the future.",
      trends: ["Streaming Content", "Virtual Production", "Short-Form Content", "African Stories", "AI in Post-Production"],
    },
    successPathway: {
      internships: ["Production companies", "TV stations", "Film sets"],
      certifications: ["Editing Software Certs", "Production Training", "Film Festivals"],
      projects: ["Short films", "YouTube content", "Client work"],
      volunteering: ["Community filmmaking", "Film education", "Documentary projects"],
    },
    schools: allSchools,
    interestMatch: ["media-creative"],
    personalityMatch: { analyticalVsCreative: 2, structuredVsFlexible: 1, peopleVsTask: -1, riskVsStability: -1 },
  },
  {
    id: "music",
    name: "Music",
    category: "Media & Creative",
    overview: "Music studies the theory, performance, and production of music. Students learn music theory, performance, composition, and music technology.",
    coreSkills: ["Musical Performance", "Music Theory", "Production", "Creativity", "Collaboration", "Technical Skills"],
    nigeriaContext: {
      description: "Afrobeats has gone global! Nigeria's music industry offers opportunities in performance, production, and management.",
      teachingStyle: "Performance-focused with theory foundation. Traditional and contemporary music are covered.",
      careerOpportunities: ["Performer", "Music Producer", "Sound Engineer", "Music Teacher", "Artist Manager"],
      salaryRange: { min: 500000, max: 50000000, currency: "NGN" },
    },
    globalContext: {
      description: "Music industry is evolving with streaming. Nigerian artists are achieving global success.",
      teachingStyle: "Industry connections and production skills. Business of music is emphasized.",
      careerOpportunities: ["International Artist", "Grammy-Winning Producer", "Film Composer", "Music Executive", "Session Musician"],
      salaryRange: { min: 30000, max: 500000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Create music, perform, produce tracks, collaborate with artists, and build a brand or career.",
      typicalEmployers: ["Record Labels", "Studios", "Self-Employed", "Media Companies", "Entertainment Venues"],
    },
    curriculum: {
      year1: ["Music Theory", "Ear Training", "Performance", "Music History"],
      year2: ["Advanced Theory", "Composition", "Music Technology", "African Music"],
      year3: ["Music Production", "Arranging", "Performance Studies", "Music Business"],
      year4: ["Recital/Project", "Professional Practice", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "AI and digital tools are changing music creation. Streaming defines distribution.",
      trends: ["Afrobeats Global", "AI Music Tools", "Streaming Economy", "Sync Licensing", "Live Experiences"],
    },
    successPathway: {
      internships: ["Recording studios", "Record labels", "Event companies"],
      certifications: ["Music Production Certs", "Audio Engineering", "Business of Music"],
      projects: ["Original music", "Collaborations", "Performances"],
      volunteering: ["Music education", "Community concerts", "Youth music programs"],
    },
    schools: allSchools,
    interestMatch: ["media-creative"],
    personalityMatch: { analyticalVsCreative: 2, structuredVsFlexible: 2, peopleVsTask: -1, riskVsStability: -2 },
  },
  {
    id: "fine-arts",
    name: "Fine Arts",
    category: "Media & Creative",
    overview: "Fine Arts develops artistic skills in painting, sculpture, and other visual media. Students learn technique, art history, and conceptual thinking.",
    coreSkills: ["Artistic Technique", "Creativity", "Conceptual Thinking", "Art History", "Portfolio Development", "Exhibition"],
    nigeriaContext: {
      description: "Growing art market in Nigeria. Contemporary African art is gaining global recognition and value.",
      teachingStyle: "Studio-based learning with traditional techniques. Contemporary art practice is emphasized.",
      careerOpportunities: ["Visual Artist", "Art Teacher", "Gallery Curator", "Art Director", "Illustrator"],
      salaryRange: { min: 500000, max: 20000000, currency: "NGN" },
    },
    globalContext: {
      description: "Art market is global with Nigerian artists achieving international recognition. NFTs created new opportunities.",
      teachingStyle: "Conceptual and technical development. Art business and markets are covered.",
      careerOpportunities: ["International Artist", "Museum Curator", "Art Consultant", "Auction Specialist", "Art Educator"],
      salaryRange: { min: 30000, max: 500000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Create artwork, exhibit, sell work, teach, and build an artistic practice and reputation.",
      typicalEmployers: ["Self-Employed", "Galleries", "Museums", "Schools", "Design Firms"],
    },
    curriculum: {
      year1: ["Drawing", "Painting Fundamentals", "Art History", "Design Basics"],
      year2: ["Advanced Painting", "Sculpture", "Printmaking", "Contemporary Art"],
      year3: ["Mixed Media", "Installation", "Nigerian Art History", "Portfolio Development"],
      year4: ["Thesis Exhibition", "Professional Practice", "Art Business", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 7,
      relevanceIn5Years: 8,
      techImpact: "Digital art and NFTs created new markets. Traditional skills remain valued.",
      trends: ["Digital Art", "African Art Market", "Art & Technology", "Social Practice Art", "Art Investment"],
    },
    successPathway: {
      internships: ["Galleries", "Museums", "Art studios"],
      certifications: ["Art Education", "Digital Art Tools", "Curation Training"],
      projects: ["Exhibitions", "Commissions", "Residencies"],
      volunteering: ["Art education", "Community murals", "Art therapy"],
    },
    schools: allSchools,
    interestMatch: ["media-creative"],
    personalityMatch: { analyticalVsCreative: 2, structuredVsFlexible: 2, peopleVsTask: 2, riskVsStability: -2 },
  },
  {
    id: "fashion-design",
    name: "Fashion Design",
    category: "Media & Creative",
    overview: "Fashion Design creates clothing and accessories. Students learn design, pattern making, textiles, and fashion business.",
    coreSkills: ["Design", "Sewing", "Pattern Making", "Trend Analysis", "Creativity", "Business Acumen"],
    nigeriaContext: {
      description: "Vibrant fashion industry with global influence. Nigerian designers are gaining international recognition.",
      teachingStyle: "Practical skills with local textile focus. Entrepreneurship is emphasized.",
      careerOpportunities: ["Fashion Designer", "Costume Designer", "Fashion Entrepreneur", "Stylist", "Textile Designer"],
      salaryRange: { min: 500000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Fashion is a major industry. Sustainable fashion and African aesthetics are trending globally.",
      teachingStyle: "Industry-standard training with fashion weeks and internships.",
      careerOpportunities: ["Creative Director", "Brand Founder", "Fashion Editor", "Luxury Brand Designer", "Fashion Consultant"],
      salaryRange: { min: 40000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design collections, source materials, oversee production, style shoots, and build a fashion brand.",
      typicalEmployers: ["Fashion Houses", "Retail Brands", "Self-Employed", "Entertainment", "Media"],
    },
    curriculum: {
      year1: ["Design Fundamentals", "Drawing", "Textiles", "Fashion History"],
      year2: ["Pattern Making", "Garment Construction", "Fashion Illustration", "Digital Design"],
      year3: ["Collection Development", "Fashion Marketing", "Sustainable Fashion", "Nigerian Textiles"],
      year4: ["Thesis Collection", "Fashion Show", "Business Plan", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "Digital fashion and sustainable practices are transforming the industry.",
      trends: ["Sustainable Fashion", "African Fashion", "Digital Fashion", "Direct-to-Consumer", "Size Inclusivity"],
    },
    successPathway: {
      internships: ["Fashion houses", "Retail brands", "Fashion magazines"],
      certifications: ["Pattern Making", "Fashion Business", "Sustainability"],
      projects: ["Collections", "Fashion shows", "Brand building"],
      volunteering: ["Fashion education", "Sustainable initiatives", "Community fashion"],
    },
    schools: allSchools,
    interestMatch: ["media-creative"],
    personalityMatch: { analyticalVsCreative: 2, structuredVsFlexible: 1, peopleVsTask: -1, riskVsStability: -1 },
  },
  {
    id: "theatre-arts",
    name: "Theatre & Performing Arts",
    category: "Media & Creative",
    overview: "Theatre Arts trains performers and production professionals. Students learn acting, directing, stagecraft, and dramatic literature.",
    coreSkills: ["Acting", "Voice", "Movement", "Stagecraft", "Creativity", "Collaboration"],
    nigeriaContext: {
      description: "Rich theatrical tradition feeding Nollywood and live performance. Opportunities in film, TV, and stage.",
      teachingStyle: "Performance-focused with production experience. Nigerian drama is emphasized.",
      careerOpportunities: ["Actor", "Director", "Theatre Manager", "Voice Artist", "Drama Teacher"],
      salaryRange: { min: 500000, max: 20000000, currency: "NGN" },
    },
    globalContext: {
      description: "Theatre skills transfer to film, TV, and voice work. Nigerian performers are gaining global recognition.",
      teachingStyle: "Comprehensive training in performance and production. Industry connections are key.",
      careerOpportunities: ["Film/TV Actor", "Broadway Performer", "Voice Actor", "Creative Director", "Producer"],
      salaryRange: { min: 30000, max: 300000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Rehearse, perform, audition, create productions, and build a performance career.",
      typicalEmployers: ["Theatre Companies", "Film Studios", "TV Stations", "Self-Employed", "Schools"],
    },
    curriculum: {
      year1: ["Acting Fundamentals", "Voice & Speech", "Movement", "Theatre History"],
      year2: ["Scene Study", "Improvisation", "Stagecraft", "Nigerian Drama"],
      year3: ["Advanced Acting", "Directing", "Playwriting", "Production"],
      year4: ["Thesis Production", "Professional Practice", "Audition Technique", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "Streaming content needs performers. Voice acting and motion capture are growing.",
      trends: ["Streaming Content", "Voice Acting", "Immersive Theatre", "Nigerian Content", "Global Casting"],
    },
    successPathway: {
      internships: ["Theatre companies", "Film sets", "TV productions"],
      certifications: ["Acting Training", "Voice Coaching", "Screen Acting"],
      projects: ["Performances", "Short films", "Demo reels"],
      volunteering: ["Community theatre", "Drama education", "Arts advocacy"],
    },
    schools: allSchools,
    interestMatch: ["media-creative"],
    personalityMatch: { analyticalVsCreative: 2, structuredVsFlexible: 2, peopleVsTask: -2, riskVsStability: -2 },
  },
  // SOCIAL IMPACT
  {
    id: "social-work",
    name: "Social Work",
    category: "Social Impact",
    overview: "Social Work helps individuals and communities overcome challenges. Students learn counseling, case management, and community development.",
    coreSkills: ["Counseling", "Case Management", "Advocacy", "Empathy", "Problem Solving", "Community Development"],
    nigeriaContext: {
      description: "Essential for addressing social challenges in Nigeria. Opportunities in NGOs, government, and healthcare.",
      teachingStyle: "Practical fieldwork with community placements. Nigerian social issues are emphasized.",
      careerOpportunities: ["Social Worker", "NGO Program Manager", "Child Welfare Officer", "Community Development", "Counselor"],
      salaryRange: { min: 800000, max: 5000000, currency: "NGN" },
    },
    globalContext: {
      description: "Critical profession in all societies. Clinical social work and policy roles are well-compensated.",
      teachingStyle: "Clinical training with supervised fieldwork. Specializations in clinical, policy, or community work.",
      careerOpportunities: ["Clinical Social Worker", "Policy Analyst", "Program Director", "Hospital Social Worker", "School Social Worker"],
      salaryRange: { min: 45000, max: 80000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Meet with clients, assess needs, connect to resources, advocate for change, and manage cases.",
      typicalEmployers: ["NGOs", "Government Agencies", "Hospitals", "Schools", "Community Organizations"],
    },
    curriculum: {
      year1: ["Introduction to Social Work", "Psychology", "Sociology", "Communication"],
      year2: ["Human Development", "Social Policy", "Counseling Skills", "Community Work"],
      year3: ["Case Management", "Group Work", "Fieldwork I", "Research Methods"],
      year4: ["Advanced Practice", "Fieldwork II", "Social Administration", "Thesis"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Digital tools are expanding reach but human connection remains essential.",
      trends: ["Mental Health Focus", "Digital Social Services", "Trauma-Informed Care", "Policy Advocacy", "Community Resilience"],
    },
    successPathway: {
      internships: ["NGOs", "Government welfare", "Healthcare social work"],
      certifications: ["Counseling Certifications", "Child Protection Training", "Clinical Licensure"],
      projects: ["Community assessments", "Program development", "Advocacy campaigns"],
      volunteering: ["Direct service", "Community organizing", "Crisis support"],
    },
    schools: allSchools,
    interestMatch: ["social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -2, riskVsStability: 1 },
  },
  {
    id: "education",
    name: "Education",
    category: "Social Impact",
    overview: "Education prepares teachers and education professionals. Students learn pedagogy, curriculum development, and classroom management.",
    coreSkills: ["Teaching", "Communication", "Patience", "Creativity", "Leadership", "Subject Expertise"],
    nigeriaContext: {
      description: "Essential profession for national development. Opportunities in schools, education tech, and training.",
      teachingStyle: "Practical teaching experience with classroom placements. Nigerian curriculum is covered.",
      careerOpportunities: ["Teacher", "School Administrator", "Curriculum Developer", "EdTech Specialist", "Education Consultant"],
      salaryRange: { min: 600000, max: 6000000, currency: "NGN" },
    },
    globalContext: {
      description: "Teaching is respected and well-compensated in many countries. EdTech is creating new opportunities.",
      teachingStyle: "Research-based pedagogy with technology integration. Specializations in different levels and subjects.",
      careerOpportunities: ["Principal", "Professor", "EdTech Founder", "Education Policy Maker", "Corporate Trainer"],
      salaryRange: { min: 45000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Plan lessons, teach classes, assess students, communicate with parents, and contribute to school development.",
      typicalEmployers: ["Schools", "Universities", "EdTech Companies", "Corporate Training", "Government"],
    },
    curriculum: {
      year1: ["Educational Psychology", "Introduction to Teaching", "Communication", "Subject Specialization"],
      year2: ["Curriculum Studies", "Teaching Methods", "Assessment", "Child Development"],
      year3: ["Classroom Management", "Educational Technology", "Special Needs Education", "Teaching Practice I"],
      year4: ["Education Policy", "Teaching Practice II", "Research Project", "Professional Development"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "EdTech is transforming education delivery. AI tutoring and personalized learning are growing.",
      trends: ["EdTech", "Personalized Learning", "Online Education", "STEM Education", "Social-Emotional Learning"],
    },
    successPathway: {
      internships: ["School placements", "EdTech companies", "Education NGOs"],
      certifications: ["Teaching License", "EdTech Certifications", "Subject Specializations"],
      projects: ["Curriculum development", "Teaching resources", "Education research"],
      volunteering: ["Tutoring", "Adult literacy", "Community education"],
    },
    schools: allSchools,
    interestMatch: ["social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -2, riskVsStability: 1 },
  },
  {
    id: "sociology",
    name: "Sociology",
    category: "Social Impact",
    overview: "Sociology studies human society, social relationships, and institutions. Students learn research methods, social theory, and understanding of social issues.",
    coreSkills: ["Research", "Critical Thinking", "Data Analysis", "Writing", "Cultural Awareness", "Communication"],
    nigeriaContext: {
      description: "Foundation for understanding Nigerian society. Opportunities in research, NGOs, and development.",
      teachingStyle: "Research-focused with emphasis on Nigerian social issues.",
      careerOpportunities: ["Researcher", "Policy Analyst", "NGO Officer", "Human Resources", "Community Development"],
      salaryRange: { min: 1000000, max: 6000000, currency: "NGN" },
    },
    globalContext: {
      description: "Valuable for understanding complex social issues. UX research and market research value sociological skills.",
      teachingStyle: "Quantitative and qualitative research methods. Interdisciplinary applications are emphasized.",
      careerOpportunities: ["UX Researcher", "Policy Researcher", "DEI Specialist", "Market Researcher", "Academic"],
      salaryRange: { min: 50000, max: 110000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Conduct research, analyze data, write reports, advise organizations, and contribute to social understanding.",
      typicalEmployers: ["Research Institutions", "NGOs", "Government", "Tech Companies", "Universities"],
    },
    curriculum: {
      year1: ["Introduction to Sociology", "Social Psychology", "Research Methods", "Statistics"],
      year2: ["Social Theory", "Nigerian Society", "Demography", "Urban Sociology"],
      year3: ["Gender Studies", "Political Sociology", "Qualitative Methods", "Development Studies"],
      year4: ["Advanced Research", "Thesis", "Contemporary Issues", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "Data science skills enhance sociology. Digital sociology is emerging.",
      trends: ["Digital Sociology", "Inequality Studies", "DEI Focus", "Computational Social Science", "Climate & Society"],
    },
    successPathway: {
      internships: ["Research institutions", "NGOs", "Tech companies (UX)"],
      certifications: ["Data Analysis", "Research Methods", "UX Research"],
      projects: ["Research publications", "Community studies", "Policy briefs"],
      volunteering: ["Community research", "Social advocacy", "Youth programs"],
    },
    schools: allSchools,
    interestMatch: ["social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 1, peopleVsTask: 0, riskVsStability: 0 },
  },
  {
    id: "development-studies",
    name: "Development Studies",
    category: "Social Impact",
    overview: "Development Studies examines social, economic, and political development in developing countries. Students learn development theory, policy, and practice.",
    coreSkills: ["Policy Analysis", "Research", "Project Management", "Cross-Cultural Communication", "Critical Thinking", "Advocacy"],
    nigeriaContext: {
      description: "Critical for understanding Nigeria's development challenges. Opportunities in international development and policy.",
      teachingStyle: "Interdisciplinary approach with fieldwork. Nigerian development issues are central.",
      careerOpportunities: ["Development Officer", "Policy Analyst", "NGO Program Manager", "Researcher", "Consultant"],
      salaryRange: { min: 1500000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Central to international development sector. UN, World Bank, and major NGOs value this expertise.",
      teachingStyle: "Global perspective with regional specializations. Field placements are common.",
      careerOpportunities: ["Development Director", "UN Official", "World Bank Specialist", "Policy Advisor", "Professor"],
      salaryRange: { min: 55000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design programs, analyze policies, manage projects, conduct research, and advocate for development.",
      typicalEmployers: ["UN Agencies", "World Bank", "NGOs", "Government", "Think Tanks"],
    },
    curriculum: {
      year1: ["Introduction to Development", "Economics", "Political Science", "Research Methods"],
      year2: ["Development Theory", "African Development", "Project Management", "Statistics"],
      year3: ["Poverty & Inequality", "Gender & Development", "Environmental Issues", "Field Research"],
      year4: ["Policy Analysis", "Thesis", "Internship", "Contemporary Issues"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Technology for development (ICT4D) is a growing focus. Data-driven development is key.",
      trends: ["Sustainable Development Goals", "Climate Adaptation", "Tech for Development", "Localization", "Humanitarian Action"],
    },
    successPathway: {
      internships: ["UN agencies", "International NGOs", "Development banks"],
      certifications: ["Project Management", "M&E Training", "Language Skills"],
      projects: ["Field research", "Policy papers", "Community projects"],
      volunteering: ["Development organizations", "Community service", "Advocacy campaigns"],
    },
    schools: allSchools,
    interestMatch: ["social-impact", "governance-policy"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "environmental-science",
    name: "Environmental Science",
    category: "Social Impact",
    overview: "Environmental Science studies the environment and solutions to environmental problems. Students learn ecology, climate science, and environmental management.",
    coreSkills: ["Scientific Research", "Data Analysis", "Environmental Assessment", "GIS", "Policy Analysis", "Communication"],
    nigeriaContext: {
      description: "Critical for addressing Nigeria's environmental challenges. Opportunities in oil & gas, government, and NGOs.",
      teachingStyle: "Fieldwork-intensive with laboratory training. Nigerian environmental issues are emphasized.",
      careerOpportunities: ["Environmental Officer", "EIA Consultant", "Sustainability Manager", "Research Scientist", "Policy Analyst"],
      salaryRange: { min: 1500000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Climate change is creating massive demand. Sustainability roles are growing across all industries.",
      teachingStyle: "Interdisciplinary science with policy focus. Climate science and sustainability are emphasized.",
      careerOpportunities: ["Environmental Consultant", "Climate Scientist", "Sustainability Director", "Green Energy Analyst", "Environmental Lawyer"],
      salaryRange: { min: 55000, max: 130000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Conduct assessments, analyze data, develop policies, advise organizations, and research environmental issues.",
      typicalEmployers: ["Environmental Agencies", "Consulting Firms", "Oil & Gas", "NGOs", "International Organizations"],
    },
    curriculum: {
      year1: ["Biology", "Chemistry", "Environmental Science Intro", "Mathematics"],
      year2: ["Ecology", "Environmental Chemistry", "GIS", "Climate Science"],
      year3: ["Environmental Impact Assessment", "Pollution Control", "Conservation", "Environmental Policy"],
      year4: ["Research Project", "Environmental Management", "Internship", "Contemporary Issues"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Climate tech and sustainability are exploding. Every industry needs environmental expertise.",
      trends: ["Climate Action", "Green Energy", "Circular Economy", "Carbon Markets", "Environmental Justice"],
    },
    successPathway: {
      internships: ["Environmental agencies", "Consulting firms", "NGOs"],
      certifications: ["EIA Certification", "GIS Training", "Sustainability Certifications"],
      projects: ["Environmental assessments", "Research", "Conservation projects"],
      volunteering: ["Environmental advocacy", "Conservation work", "Community education"],
    },
    schools: allSchools,
    interestMatch: ["social-impact", "engineering"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 0 },
  },
  {
    id: "agricultural-science",
    name: "Agricultural Science",
    category: "Social Impact",
    overview: "Agricultural Science studies crop production, animal husbandry, and food systems. Students learn farming techniques, agricultural economics, and food security.",
    coreSkills: ["Crop Science", "Animal Science", "Research", "Farm Management", "Agribusiness", "Problem Solving"],
    nigeriaContext: {
      description: "Vital for Nigeria's food security and agricultural transformation. Opportunities in agribusiness and research.",
      teachingStyle: "Practical farm experience with research training. Nigerian agriculture is the focus.",
      careerOpportunities: ["Agronomist", "Farm Manager", "Agricultural Extension", "Agribusiness Manager", "Research Scientist"],
      salaryRange: { min: 1000000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Food security is a global priority. Agtech and sustainable agriculture are hot areas.",
      teachingStyle: "Technology integration with sustainability focus. Global food systems are covered.",
      careerOpportunities: ["Agtech Founder", "Sustainability Director", "Agricultural Economist", "Food Security Expert", "Research Scientist"],
      salaryRange: { min: 50000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Advise farmers, conduct research, manage farms, develop agribusiness, and contribute to food security.",
      typicalEmployers: ["Agribusiness Companies", "Research Institutions", "Government", "NGOs", "Farm Operations"],
    },
    curriculum: {
      year1: ["Biology", "Chemistry", "Agricultural Science Intro", "Mathematics"],
      year2: ["Crop Production", "Animal Science", "Soil Science", "Agricultural Economics"],
      year3: ["Plant Pathology", "Agricultural Extension", "Farm Management", "Food Science"],
      year4: ["Research Project", "Agribusiness", "Internship", "Contemporary Issues"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Agtech, precision farming, and climate-smart agriculture are transforming the sector.",
      trends: ["Agtech", "Climate-Smart Agriculture", "Vertical Farming", "Food Security", "Sustainable Farming"],
    },
    successPathway: {
      internships: ["Agribusiness companies", "Research farms", "Government extension"],
      certifications: ["Agricultural Extension", "Agribusiness Training", "Organic Certification"],
      projects: ["Farm projects", "Research", "Agribusiness ventures"],
      volunteering: ["Farmer training", "Food security initiatives", "Rural development"],
    },
    schools: allSchools,
    interestMatch: ["social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 0 },
  },
  {
    id: "library-science",
    name: "Library & Information Science",
    category: "Social Impact",
    overview: "Library Science focuses on organizing, preserving, and providing access to information. Students learn information management, digital libraries, and knowledge organization.",
    coreSkills: ["Information Organization", "Research", "Digital Literacy", "Communication", "Technology", "Service Orientation"],
    nigeriaContext: {
      description: "Essential for information access in Nigeria. Opportunities in libraries, archives, and information management.",
      teachingStyle: "Practical training with digital focus. Information management is emphasized.",
      careerOpportunities: ["Librarian", "Information Manager", "Archivist", "Records Manager", "Knowledge Manager"],
      salaryRange: { min: 800000, max: 4000000, currency: "NGN" },
    },
    globalContext: {
      description: "Evolved beyond traditional libraries. Data management, UX research, and information architecture are growing areas.",
      teachingStyle: "Digital-first with data focus. Information architecture and user experience are covered.",
      careerOpportunities: ["Data Librarian", "Information Architect", "UX Researcher", "Digital Asset Manager", "Knowledge Manager"],
      salaryRange: { min: 50000, max: 100000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Manage collections, help users find information, organize resources, and implement information systems.",
      typicalEmployers: ["Libraries", "Universities", "Corporations", "Government", "Tech Companies"],
    },
    curriculum: {
      year1: ["Introduction to LIS", "Information Resources", "Communication", "ICT Basics"],
      year2: ["Cataloging & Classification", "Reference Services", "Information Retrieval", "Research Methods"],
      year3: ["Digital Libraries", "Records Management", "Knowledge Management", "Information Literacy"],
      year4: ["Information Systems", "Thesis", "Internship", "Contemporary Issues"],
    },
    futureOutlook: {
      relevanceToday: 7,
      relevanceIn5Years: 8,
      techImpact: "Digital transformation is reshaping the field. Data literacy and AI are key skills.",
      trends: ["Digital Libraries", "Data Management", "AI in Information", "Open Access", "Information Literacy"],
    },
    successPathway: {
      internships: ["Libraries", "Archives", "Corporate info centers"],
      certifications: ["Digital Library Training", "Records Management", "Data Management"],
      projects: ["Digital projects", "Information systems", "Community access"],
      volunteering: ["Library programs", "Digital literacy", "Community archives"],
    },
    schools: allSchools,
    interestMatch: ["social-impact", "technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: 2 },
  },
  // Additional Technology courses
  {
    id: "statistics",
    name: "Statistics",
    category: "Technology",
    overview: "Statistics is the science of collecting, analyzing, and interpreting data. Students learn probability theory, statistical modeling, and data analysis.",
    coreSkills: ["Statistical Analysis", "Data Visualization", "R/Python", "Mathematical Modeling", "Critical Thinking", "Research"],
    nigeriaContext: {
      description: "Foundation for data roles across industries. Banks, research institutions, and government need statisticians.",
      teachingStyle: "Mathematical rigor with applied focus. Software skills are increasingly emphasized.",
      careerOpportunities: ["Statistician", "Data Analyst", "Research Analyst", "Biostatistician", "Survey Statistician"],
      salaryRange: { min: 1500000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Core skill for data science and research. Statisticians are valued in pharma, tech, and finance.",
      teachingStyle: "Advanced probability and inference. Computational statistics is emphasized.",
      careerOpportunities: ["Senior Statistician", "Data Scientist", "Quantitative Researcher", "Biostatistician", "Academic"],
      salaryRange: { min: 70000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Analyze data, build models, present findings, advise on research design, and support decision-making.",
      typicalEmployers: ["Research Institutions", "Pharmaceutical Companies", "Banks", "Government", "Tech Companies"],
    },
    curriculum: {
      year1: ["Calculus", "Linear Algebra", "Introduction to Statistics", "Programming"],
      year2: ["Probability Theory", "Statistical Inference", "Regression Analysis", "Data Analysis"],
      year3: ["Multivariate Statistics", "Time Series", "Experimental Design", "Sampling Methods"],
      year4: ["Advanced Topics", "Statistical Computing", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "Machine learning relies on statistics. Causal inference and Bayesian methods are growing.",
      trends: ["Machine Learning", "Causal Inference", "Bayesian Statistics", "Big Data", "Statistical Computing"],
    },
    successPathway: {
      internships: ["Research institutions", "Data teams", "Pharmaceutical companies"],
      certifications: ["SAS Certification", "R Programming", "Data Science Certificates"],
      projects: ["Statistical research", "Data competitions", "Applied analysis"],
      volunteering: ["Statistical consulting", "Research support", "Data literacy"],
    },
    schools: allSchools,
    interestMatch: ["technology", "finance-business"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: -1, peopleVsTask: 2, riskVsStability: 1 },
  },
  {
    id: "mathematics",
    name: "Mathematics",
    category: "Technology",
    overview: "Mathematics is the study of numbers, structures, and patterns. Students develop logical thinking and problem-solving skills applicable across many fields.",
    coreSkills: ["Logical Reasoning", "Problem Solving", "Abstract Thinking", "Analysis", "Proof Writing", "Mathematical Modeling"],
    nigeriaContext: {
      description: "Foundation for quantitative careers. Teaching, research, and finance are common paths.",
      teachingStyle: "Theoretical depth with applications. Proof-based learning develops rigorous thinking.",
      careerOpportunities: ["Mathematician", "Teacher", "Actuary", "Quantitative Analyst", "Research Scientist"],
      salaryRange: { min: 1000000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Highly valued in quant finance, tech, and research. Pure math skills are rare and valuable.",
      teachingStyle: "Abstract mathematics with research focus. Applied paths in finance and tech are common.",
      careerOpportunities: ["Quant Trader", "Research Mathematician", "Cryptographer", "Data Scientist", "Professor"],
      salaryRange: { min: 80000, max: 300000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Solve problems, prove theorems, build models, teach concepts, and apply math to real-world challenges.",
      typicalEmployers: ["Universities", "Research Labs", "Finance Firms", "Tech Companies", "Government"],
    },
    curriculum: {
      year1: ["Calculus I & II", "Linear Algebra", "Discrete Math", "Programming"],
      year2: ["Real Analysis", "Abstract Algebra", "Calculus III", "Probability"],
      year3: ["Complex Analysis", "Topology", "Numerical Methods", "Differential Equations"],
      year4: ["Research Project", "Advanced Topics", "Electives", "Thesis"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Mathematical foundations underpin AI and quantum computing. Demand for math skills is increasing.",
      trends: ["Machine Learning Theory", "Cryptography", "Quantum Computing", "Mathematical Finance", "Data Science"],
    },
    successPathway: {
      internships: ["Research labs", "Finance firms", "Tech companies"],
      certifications: ["Actuarial Exams", "Programming Certifications", "Teaching License"],
      projects: ["Research papers", "Math competitions", "Applied modeling"],
      volunteering: ["Math tutoring", "Olympiad coaching", "STEM outreach"],
    },
    schools: allSchools,
    interestMatch: ["technology"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: -1, peopleVsTask: 2, riskVsStability: 0 },
  },
  {
    id: "physics",
    name: "Physics",
    category: "Technology",
    overview: "Physics studies matter, energy, and the fundamental laws of nature. Students learn mechanics, electromagnetism, quantum physics, and mathematical methods.",
    coreSkills: ["Scientific Reasoning", "Mathematical Modeling", "Problem Solving", "Laboratory Skills", "Research", "Critical Thinking"],
    nigeriaContext: {
      description: "Foundation for engineering and technology careers. Research and teaching are common paths.",
      teachingStyle: "Theoretical foundation with laboratory work. Applied physics is increasingly emphasized.",
      careerOpportunities: ["Physicist", "Teacher", "Research Scientist", "Energy Analyst", "Technical Consultant"],
      salaryRange: { min: 1000000, max: 7000000, currency: "NGN" },
    },
    globalContext: {
      description: "Versatile degree valued in tech, finance, and research. Physics PhDs are highly sought in many fields.",
      teachingStyle: "Rigorous theory with experimental training. Research is central to advanced study.",
      careerOpportunities: ["Research Scientist", "Data Scientist", "Quant Analyst", "Engineer", "Professor"],
      salaryRange: { min: 70000, max: 180000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Conduct experiments, analyze data, develop theories, teach concepts, and solve complex problems.",
      typicalEmployers: ["Research Labs", "Universities", "Tech Companies", "Finance Firms", "Energy Companies"],
    },
    curriculum: {
      year1: ["Classical Mechanics", "Calculus", "Lab Physics", "Programming"],
      year2: ["Electromagnetism", "Thermodynamics", "Waves & Optics", "Mathematical Physics"],
      year3: ["Quantum Mechanics", "Statistical Physics", "Electronics", "Advanced Lab"],
      year4: ["Research Project", "Advanced Topics", "Thesis", "Electives"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "Quantum computing and clean energy are physics-driven fields with massive growth.",
      trends: ["Quantum Technology", "Clean Energy", "Materials Science", "Computational Physics", "Space Technology"],
    },
    successPathway: {
      internships: ["Research labs", "Tech companies", "Energy sector"],
      certifications: ["Data Science Certs", "Programming", "Teaching License"],
      projects: ["Research publications", "Physics competitions", "Applied projects"],
      volunteering: ["Science outreach", "Physics tutoring", "STEM education"],
    },
    schools: allSchools,
    interestMatch: ["technology", "engineering"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: 0, peopleVsTask: 2, riskVsStability: 0 },
  },
  {
    id: "chemistry",
    name: "Chemistry",
    category: "Technology",
    overview: "Chemistry studies the composition, structure, and properties of matter. Students learn organic, inorganic, physical, and analytical chemistry.",
    coreSkills: ["Laboratory Skills", "Analytical Thinking", "Research", "Attention to Detail", "Problem Solving", "Scientific Writing"],
    nigeriaContext: {
      description: "Essential for pharmaceuticals, petrochemicals, and manufacturing. Research and quality control are key areas.",
      teachingStyle: "Strong laboratory component with theory. Industrial applications are emphasized.",
      careerOpportunities: ["Chemist", "Quality Control", "Research Scientist", "Lab Manager", "Teacher"],
      salaryRange: { min: 1200000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Core to pharma, materials, and green chemistry. Chemical industry offers stable careers.",
      teachingStyle: "Research-intensive with specialization. Green chemistry and materials are growing areas.",
      careerOpportunities: ["Senior Scientist", "R&D Director", "Patent Agent", "Regulatory Affairs", "Professor"],
      salaryRange: { min: 60000, max: 140000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Conduct experiments, analyze samples, develop products, ensure quality, and research new materials.",
      typicalEmployers: ["Pharmaceutical Companies", "Chemical Companies", "Research Labs", "Quality Control", "Cosmetics"],
    },
    curriculum: {
      year1: ["General Chemistry", "Mathematics", "Physics", "Lab Techniques"],
      year2: ["Organic Chemistry", "Inorganic Chemistry", "Analytical Chemistry", "Physical Chemistry"],
      year3: ["Advanced Organic", "Spectroscopy", "Biochemistry", "Industrial Chemistry"],
      year4: ["Research Project", "Advanced Topics", "Thesis", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "Green chemistry and materials science are driving innovation. AI is accelerating drug discovery.",
      trends: ["Green Chemistry", "Materials Science", "AI Drug Discovery", "Battery Chemistry", "Sustainable Chemicals"],
    },
    successPathway: {
      internships: ["Pharmaceutical companies", "Chemical plants", "Research labs"],
      certifications: ["Lab Certifications", "Quality Management", "Safety Training"],
      projects: ["Research publications", "Process development", "Product development"],
      volunteering: ["Science education", "Environmental chemistry", "Community labs"],
    },
    schools: allSchools,
    interestMatch: ["technology", "health"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: 1 },
  },

  // MECHATRONICS ENGINEERING
  {
    id: "mechatronics-engineering",
    name: "Mechatronics Engineering",
    category: "Engineering",
    overview: "Mechatronics Engineering combines mechanical engineering, electronics, computer science, and control systems to design intelligent products and automated systems. Students learn to create smart machines, robots, and automated manufacturing systems.",
    coreSkills: ["Mechanical Design", "Electronics & Circuits", "Programming (C/C++, Python)", "Control Systems", "Robotics", "Automation", "CAD/CAM"],
    nigeriaContext: {
      description: "Emerging field in Nigeria with demand from manufacturing, oil & gas automation, and smart systems. Pan-Atlantic University is pioneering this program. Growing opportunities in industrial automation and robotics.",
      teachingStyle: "Hands-on approach with lab work, robotics projects, and industry partnerships. Strong emphasis on practical skills and interdisciplinary thinking.",
      careerOpportunities: ["Automation Engineer", "Robotics Engineer", "Control Systems Engineer", "Maintenance Engineer", "Product Design Engineer"],
      salaryRange: { min: 2800000, max: 12000000, currency: "NGN" },
    },
    globalContext: {
      description: "One of the fastest-growing engineering fields globally. Mechatronics engineers design everything from autonomous vehicles to surgical robots, smart factories to consumer electronics.",
      teachingStyle: "Project-based learning with cutting-edge labs. Integration of AI, IoT, and Industry 4.0 concepts. Strong industry collaboration.",
      careerOpportunities: ["Robotics Engineer", "Automation Specialist", "Mechatronics R&D Engineer", "Systems Integration Engineer", "Smart Manufacturing Engineer"],
      salaryRange: { min: 75000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Design and program automated systems, troubleshoot robots, integrate sensors and actuators, collaborate with cross-functional teams, test prototypes, and optimize manufacturing processes.",
      typicalEmployers: ["Manufacturing Companies", "Automotive Industry", "Robotics Firms", "Oil & Gas", "Aerospace", "Consumer Electronics", "Smart Home Tech"],
    },
    curriculum: {
      year1: ["Engineering Mathematics", "Physics", "Introduction to Mechatronics", "Programming Fundamentals", "Engineering Drawing"],
      year2: ["Mechanics of Machines", "Electronics & Circuits", "Digital Systems", "Materials Science", "Control Theory"],
      year3: ["Robotics", "Automation Systems", "Microcontrollers & Embedded Systems", "Sensors & Actuators", "PLC Programming"],
      year4: ["Advanced Robotics", "Industrial Automation", "Capstone Project", "AI in Mechatronics", "Industry Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "Industry 4.0, AI, and IoT are transforming manufacturing. Demand for mechatronics engineers will skyrocket as automation becomes essential across all industries.",
      trends: ["Industry 4.0", "Collaborative Robots (Cobots)", "Smart Manufacturing", "Autonomous Systems", "IoT Integration", "AI-Powered Automation"],
    },
    successPathway: {
      internships: ["Manufacturing plants", "Robotics companies", "Automotive firms", "Research labs", "Tech startups"],
      certifications: ["Certified Automation Professional (CAP)", "FANUC Robotics Certification", "Siemens PLC Certification", "SolidWorks CAD", "Arduino/Raspberry Pi Projects"],
      projects: ["Build a robot from scratch", "Automate a manufacturing process", "Create smart home system", "Drone design and control", "3D printer assembly"],
      volunteering: ["STEM education", "Robotics clubs", "Maker spaces", "Engineering competitions"],
    },
    schools: allSchools,
    interestMatch: ["technology", "building"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: 1, riskVsStability: 0 },
  },

  // DIGITAL MEDIA & COMMUNICATION
  {
    id: "digital-media",
    name: "Digital Media & Communication",
    category: "Arts & Media",
    overview: "Digital Media combines storytelling, technology, and creativity to produce content for digital platforms. Students learn video production, social media strategy, content creation, digital journalism, and multimedia design for the modern media landscape.",
    coreSkills: ["Video Production", "Content Creation", "Social Media Management", "Digital Storytelling", "Graphic Design", "SEO & Analytics", "Multimedia Journalism"],
    nigeriaContext: {
      description: "Booming field in Nigeria with the rise of content creators, digital marketing agencies, and online media. Pan-Atlantic University offers cutting-edge programs. High demand from brands, media houses, and entertainment industry.",
      teachingStyle: "Project-based learning with real client work. Students produce content, manage campaigns, and build portfolios. Strong industry mentorship from leading Nigerian media professionals.",
      careerOpportunities: ["Content Creator", "Social Media Manager", "Digital Journalist", "Video Producer", "Brand Strategist", "Multimedia Designer"],
      salaryRange: { min: 1800000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Digital media professionals are in high demand globally as brands shift to digital-first strategies. Opportunities span entertainment, marketing, journalism, and tech companies worldwide.",
      teachingStyle: "Hands-on production with industry-standard tools (Adobe Creative Suite, Final Cut Pro). Focus on storytelling, analytics, and emerging platforms like TikTok, YouTube, podcasting.",
      careerOpportunities: ["Content Strategist", "Digital Producer", "Social Media Director", "Multimedia Journalist", "UX Content Writer", "Podcast Producer"],
      salaryRange: { min: 50000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Create engaging content, edit videos, manage social media campaigns, analyze metrics, collaborate with creative teams, pitch stories, and stay ahead of digital trends.",
      typicalEmployers: ["Media Houses", "Digital Agencies", "Tech Companies", "Brands", "Entertainment Studios", "News Outlets", "Startups", "Freelance/Self-Employed"],
    },
    curriculum: {
      year1: ["Introduction to Digital Media", "Writing for Digital Platforms", "Photography Basics", "Communication Theory", "Media Ethics"],
      year2: ["Video Production", "Graphic Design", "Social Media Strategy", "Digital Journalism", "Audio Production"],
      year3: ["Advanced Video Editing", "Content Marketing", "Data Analytics", "Multimedia Storytelling", "Brand Communication"],
      year4: ["Portfolio Development", "Media Entrepreneurship", "Emerging Platforms", "Capstone Project", "Industry Internship"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI tools are transforming content creation, but human creativity and storytelling remain irreplaceable. New platforms and formats emerge constantly, creating endless opportunities.",
      trends: ["Short-Form Video (TikTok, Reels)", "AI-Assisted Content Creation", "Podcasting", "Live Streaming", "Interactive Media", "Virtual Production", "Creator Economy"],
    },
    successPathway: {
      internships: ["Media houses", "Digital agencies", "Content studios", "Tech companies", "Influencer agencies"],
      certifications: ["Google Digital Marketing", "HubSpot Content Marketing", "Adobe Certified Professional", "YouTube Creator Academy", "Meta Blueprint"],
      projects: ["Start a YouTube channel/podcast", "Build a content portfolio", "Freelance for local businesses", "Launch a blog/newsletter", "Create viral social campaigns"],
      volunteering: ["Community storytelling", "NGO media work", "Student media organizations", "Film festivals"],
    },
    schools: allSchools,
    interestMatch: ["creative", "communication", "technology"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 1, peopleVsTask: -1, riskVsStability: 1 },
  },

  // ACTUARIAL SCIENCE
  {
    id: "actuarial-science",
    name: "Actuarial Science",
    category: "Finance & Business",
    overview: "Actuarial Science combines mathematics, statistics, and financial theory to assess risk in insurance, finance, and other industries. Actuaries are the mathematicians of the financial world, using data and probability to predict future events and help organizations make informed decisions about risk management, pricing, and financial security.",
    coreSkills: ["Advanced Statistics & Probability", "Risk Modeling & Analysis", "Financial Mathematics", "Data Analysis (R, Python, Excel)", "Insurance Principles", "Econometrics", "Programming & Database Management"],
    nigeriaContext: {
      description: "Nigeria's insurance and pension industries are rapidly growing, creating strong demand for qualified actuaries. UNILAG and OAU offer top programs. Local actuaries work in insurance companies, pension fund administrators, and financial institutions, earning among the highest salaries in the country.",
      teachingStyle: "Theory-heavy with professional exam preparation. Focus on passing international actuarial exams (SOA, IFoA) alongside degree requirements.",
      careerOpportunities: [
        "Actuarial Analyst (Insurance, Pensions)",
        "Risk Management Specialist",
        "Investment Analyst",
        "Data Scientist (Finance/Insurance)",
        "Pension Fund Manager",
        "Underwriting Manager",
        "Consulting Actuary"
      ],
      salaryRange: "NGN 3,600,000 - NGN 18,000,000/year (varies greatly with exam progress and experience)"
    },
    globalContext: {
      description: "Actuaries are in high demand globally, particularly in developed insurance markets. The profession requires passing rigorous international exams (SOA, CAS, IFoA), which can take 5-10 years. Actuaries enjoy excellent job security, high salaries, and intellectual challenge.",
      teachingStyle: "Heavy emphasis on mathematical theory, statistical modeling, and professional exam preparation. Many programs integrate VEE credits and exam prep.",
      careerOpportunities: [
        "Life/Health/Property & Casualty Actuary",
        "Pension Actuary",
        "Enterprise Risk Manager",
        "Quantitative Analyst",
        "Insurance Product Developer",
        "Chief Risk Officer"
      ],
      salaryRange: "USD 70,000 - USD 200,000+/year (depends heavily on exam progress)"
    },
    careerPath: {
      dayToDay: "Analyzing mortality data and claims patterns, building financial models in Excel/R/Python, calculating insurance premiums and reserves, presenting risk assessments to management, studying for professional exams (evenings/weekends), collaborating with underwriters and product teams.",
      typicalEmployers: ["Insurance companies (Life, Health, P&C)", "Consulting firms (EY, Deloitte, Milliman)", "Pension administrators", "Investment banks", "Government regulatory bodies", "Rating agencies"]
    },
    curriculum: {
      year1: ["Calculus I & II", "Linear Algebra", "Probability Theory", "Statistics I", "Economics I & II", "Introduction to Actuarial Science"],
      year2: ["Advanced Probability", "Statistical Inference", "Life Contingencies I", "Financial Mathematics", "Risk Theory", "Exam P/1 Preparation"],
      year3: ["Life Contingencies II", "Survival Models", "Financial Economics", "Time Series Analysis", "Stochastic Processes", "Exam FM/2 Preparation"],
      year4: ["Credibility Theory", "Loss Models", "Pension Mathematics", "Advanced Financial Models", "Capstone Project", "Professional Exam Prep"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "AI and machine learning are augmenting actuarial work, not replacing it. Actuaries who master data science tools (Python, R, SQL) will be even more valuable. The core judgment and regulatory expertise remain irreplaceable.",
      trends: ["Predictive Analytics & Machine Learning", "Climate Risk Modeling", "Cyber Insurance", "Pandemic Risk Assessment", "ESG Risk Integration", "Automated Modeling Tools", "Big Data in Insurance"]
    },
    successPathway: {
      internships: ["Insurance companies (actuarial departments)", "Pension administrators", "Consulting firms", "Central Bank/NAICOM"],
      certifications: ["SOA Exams (ASA, FSA)", "IFoA Exams (UK)", "CAS Exams (Property & Casualty)", "VEE Credits", "Excel/R/Python Certifications"],
      projects: ["Build mortality/claims models", "Pricing projects for insurance products", "Pension fund valuation exercises", "Risk simulation studies", "Kaggle competitions"],
      volunteering: ["Financial literacy programs", "Math tutoring", "Actuarial society events", "Mentoring pre-actuarial students"]
    },
    schools: allSchools,
    interestMatch: ["finance", "analytical", "technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: -1 }
  },

  // MARINE BIOLOGY
  {
    id: "marine-biology",
    name: "Marine Biology",
    category: "Science & Research",
    overview: "Marine Biology is the scientific study of ocean life, ecosystems, and marine environments. Students explore marine organisms from microscopic plankton to massive whales, coral reef ecology, oceanography, conservation, and the impact of human activity on marine ecosystems. This field combines biology, chemistry, ecology, and environmental science.",
    coreSkills: ["Marine Ecology & Biodiversity", "Oceanography", "Fish Biology & Aquaculture", "Marine Conservation", "Scuba Diving & Field Research", "Data Collection & Analysis", "Environmental Impact Assessment"],
    nigeriaContext: {
      description: "Nigeria has over 850km of coastline with rich marine biodiversity, fisheries, and oil/gas activities affecting marine environments. UNILAG's marine biology program is the premier option. Careers focus on fisheries management, environmental consulting for oil/gas companies, aquaculture, and conservation NGOs.",
      teachingStyle: "Combination of lectures, lab work, and field trips to Lagos lagoon, coastal areas, and marine research stations. Emphasis on practical skills in fish identification, water quality testing, and ecosystem surveys.",
      careerOpportunities: [
        "Fisheries Officer (Federal/State Ministries)",
        "Environmental Consultant (Oil & Gas)",
        "Marine Conservation Officer (NGOs)",
        "Aquaculture Manager",
        "Marine Research Scientist",
        "Environmental Impact Assessor",
        "Marine Park Ranger"
      ],
      salaryRange: "NGN 1,800,000 - NGN 8,000,000/year"
    },
    globalContext: {
      description: "Marine biologists work worldwide studying ocean life, climate change impacts, conservation, and sustainable fisheries. Top opportunities exist in research institutions, environmental agencies, aquariums, and conservation organizations. Many careers require graduate degrees (MSc, PhD).",
      teachingStyle: "Hands-on learning with extensive fieldwork, scuba diving certifications, research vessel expeditions, and laboratory analysis. Strong emphasis on research methods and scientific writing.",
      careerOpportunities: [
        "Marine Research Scientist",
        "Oceanographer",
        "Fisheries Biologist",
        "Conservation Biologist",
        "Aquarium Curator",
        "Marine Policy Advisor",
        "Coastal Zone Manager"
      ],
      salaryRange: "USD 45,000 - USD 100,000/year"
    },
    careerPath: {
      dayToDay: "Conducting fieldwork (boat surveys, diving, sampling), analyzing water/tissue samples in the lab, tagging and tracking fish/turtles, monitoring coral reef health, writing research reports, collaborating with fishermen and coastal communities, presenting findings at conferences.",
      typicalEmployers: ["Research institutions (universities, NIOMR)", "Environmental consulting firms", "Oil and gas companies", "NGOs (WWF, Oceana, local conservation groups)", "Government fisheries departments", "Aquaculture companies", "Marine parks and aquariums"]
    },
    curriculum: {
      year1: ["General Biology", "Chemistry for Biologists", "Physics", "Mathematics/Statistics", "Introduction to Oceanography", "Cell Biology"],
      year2: ["Marine Ecology", "Fish Biology", "Marine Invertebrates", "Organic Chemistry", "Genetics", "Scuba Diving Certification"],
      year3: ["Oceanography", "Marine Mammals", "Coral Reef Ecology", "Fisheries Science", "Marine Conservation", "Aquaculture", "Research Methods"],
      year4: ["Marine Pollution & Toxicology", "Coastal Zone Management", "Advanced Marine Ecology", "Research Project", "Field Course", "Environmental Impact Assessment"]
    },
    futureOutlook: {
      relevanceToday: 7,
      relevanceIn5Years: 8,
      techImpact: "Technology is revolutionizing marine research through satellite tracking, DNA barcoding, underwater drones (ROVs), and big data analysis. Climate change research is driving demand.",
      trends: ["Climate Change & Ocean Acidification Research", "Marine Protected Areas Expansion", "Sustainable Aquaculture", "Blue Economy", "Ocean Plastic Pollution", "Deep Sea Exploration", "Marine Genomics"]
    },
    successPathway: {
      internships: ["NIOMR (Nigerian Institute for Oceanography and Marine Research)", "Environmental consulting firms", "Conservation NGOs", "Aquaculture farms", "Oil company environmental departments"],
      certifications: ["PADI/SSI Scuba Diving (Open Water to Rescue Diver)", "GIS for Conservation", "Marine First Aid", "Boat Handling", "Scientific Diving"],
      projects: ["Species surveys in Lagos lagoon", "Fish breeding experiments", "Coral restoration projects", "Water quality monitoring", "Publish in student research journals"],
      volunteering: ["Beach cleanups", "Turtle conservation projects", "Community fisheries education", "Marine science outreach to schools"]
    },
    schools: allSchools,
    interestMatch: ["environment", "science", "research"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 1, peopleVsTask: 0, riskVsStability: 0 }
  },

  // MEDICAL RADIOGRAPHY
  {
    id: "medical-radiography",
    name: "Medical Radiography & Radiation Science",
    category: "Health & Medicine",
    overview: "Medical Radiography (also called Diagnostic Imaging or Radiologic Technology) trains professionals to use X-rays, CT scans, MRI, ultrasound, and other imaging technologies to help diagnose diseases and injuries. Radiographers are vital members of healthcare teams, working closely with doctors to produce high-quality medical images for diagnosis and treatment planning.",
    coreSkills: ["Medical Imaging Techniques (X-ray, CT, MRI, Ultrasound)", "Radiation Safety & Protection", "Patient Care & Positioning", "Anatomy & Physiology", "Image Quality & Analysis", "Equipment Operation & Maintenance", "Medical Ethics & Communication"],
    nigeriaContext: {
      description: "Nigeria has a critical shortage of trained radiographers, with only ~3,000 professionals serving 200+ million people. UNILAG offers Nigeria's premier radiography program. Radiographers are in very high demand in hospitals nationwide, with excellent job security and opportunities to specialize (CT, MRI, ultrasound, interventional radiology).",
      teachingStyle: "Balanced theory and clinical practice. Students spend 50% of training in hospital radiology departments, learning hands-on with real patients and equipment. Strong focus on radiation safety and patient care.",
      careerOpportunities: [
        "Diagnostic Radiographer (Hospitals)",
        "CT/MRI Technologist",
        "Ultrasound Specialist (Sonographer)",
        "Interventional Radiographer",
        "Radiation Therapist",
        "Equipment Application Specialist",
        "Radiology Manager"
      ],
      salaryRange: "NGN 2,400,000 - NGN 9,600,000/year"
    },
    globalContext: {
      description: "Radiographers are in demand globally, particularly in UK, Canada, Australia, Middle East, and USA. The profession offers work-life balance, job security, and good salaries. Many countries have shortage occupation lists including radiographers. Licensing/registration required in most countries.",
      teachingStyle: "Heavy clinical training (60-70% of program) in hospital settings, learning all imaging modalities. Theory covers anatomy, pathology, physics of imaging, and radiation safety.",
      careerOpportunities: [
        "Diagnostic Radiographer",
        "MRI/CT Specialist",
        "Interventional Radiology Technologist",
        "Nuclear Medicine Technologist",
        "Mammography Specialist",
        "Radiation Therapist",
        "PACS Administrator"
      ],
      salaryRange: "USD 55,000 - USD 90,000/year"
    },
    careerPath: {
      dayToDay: "Explaining procedures to patients and positioning them correctly, operating X-ray/CT/MRI machines, ensuring radiation safety protocols, capturing high-quality diagnostic images, collaborating with radiologists and doctors, maintaining equipment, managing electronic records (PACS), handling emergency trauma cases.",
      typicalEmployers: ["Hospitals (public and private)", "Diagnostic imaging centers", "Cancer treatment centers", "Medical equipment companies", "Sports medicine clinics", "Mobile imaging services", "Research institutions"]
    },
    curriculum: {
      year1: ["Human Anatomy & Physiology", "Radiographic Physics", "Introduction to Radiography", "Patient Care", "Medical Terminology", "Basic Life Support"],
      year2: ["Radiographic Techniques I (X-ray)", "Radiation Protection", "Pathology", "Clinical Practice I", "Image Quality & Evaluation", "Medical Ethics"],
      year3: ["Advanced Imaging (CT, MRI)", "Fluoroscopy & Interventional Procedures", "Ultrasound Basics", "Clinical Practice II", "Radiographic Techniques II", "Equipment Maintenance"],
      year4: ["Specialized Imaging Techniques", "Radiation Therapy Basics", "Quality Assurance", "Clinical Practice III", "Research Project", "Professional Practice"]
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI is assisting with image analysis and initial screening, but human radiographers remain essential for patient care, positioning, quality control, and specialized procedures. New technologies (3D imaging, hybrid scanners) create opportunities.",
      trends: ["AI-Assisted Image Analysis", "3D & 4D Imaging", "Point-of-Care Ultrasound", "Interventional Radiology Growth", "Dose Reduction Technologies", "Portable Imaging Devices", "Tele-Radiology"]
    },
    successPathway: {
      internships: ["Teaching hospital radiology departments", "Private diagnostic centers", "Cancer treatment centers", "Equipment vendors (Siemens, GE, Philips)"],
      certifications: ["ARRT (American Registry)", "SOR (UK Society of Radiographers)", "SONM (Nigeria)", "CT/MRI Specialization", "Ultrasound Certification", "BLS/ACLS"],
      projects: ["Image quality improvement studies", "Radiation dose optimization research", "Patient satisfaction initiatives", "Equipment evaluation reports"],
      volunteering: ["Health screening outreaches", "Cancer awareness campaigns", "Medical missions to underserved areas", "Professional association activities"]
    },
    schools: allSchools,
    interestMatch: ["health", "technology", "helping-others"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: -1 }
  },

  // SYSTEMS ENGINEERING
  {
    id: "systems-engineering",
    name: "Systems Engineering",
    category: "Engineering",
    overview: "Systems Engineering is an interdisciplinary field focused on designing, integrating, and managing complex systems over their life cycles. Systems engineers take a holistic view, ensuring all components (hardware, software, people, processes) work together effectively. This field is critical in aerospace, defense, telecommunications, energy, and large-scale infrastructure projects.",
    coreSkills: ["Systems Thinking & Analysis", "Requirements Engineering", "Systems Architecture & Design", "Integration & Testing", "Project Management", "Risk & Reliability Engineering", "Modeling & Simulation (MATLAB, Simulink)"],
    nigeriaContext: {
      description: "Systems Engineering is relatively new in Nigeria but growing rapidly due to complex infrastructure projects (power, telecom, transportation). UNILAG is pioneering this field. Opportunities exist in telecommunications companies, oil & gas megaprojects, infrastructure development, and defense. Systems engineers command premium salaries due to rarity.",
      teachingStyle: "Project-based learning focused on real-world complex systems. Heavy emphasis on teamwork, communication, and multidisciplinary collaboration. Students learn to integrate mechanical, electrical, software, and human factors.",
      careerOpportunities: [
        "Systems Integration Engineer",
        "Telecommunications Systems Engineer",
        "Oil & Gas Project Systems Engineer",
        "Infrastructure Development Specialist",
        "Defense Systems Engineer",
        "Quality Assurance Engineer",
        "Engineering Project Manager"
      ],
      salaryRange: "NGN 3,600,000 - NGN 15,000,000/year"
    },
    globalContext: {
      description: "Systems engineers are highly sought after for complex projects: spacecraft, aircraft, autonomous vehicles, smart cities, military systems, and large IT infrastructures. Top employers include NASA, Boeing, Lockheed Martin, tech giants, and consulting firms. The field offers excellent career growth and very high salaries.",
      teachingStyle: "Interdisciplinary approach integrating engineering fundamentals with management, economics, and decision science. Heavy use of case studies from aerospace, defense, and tech industries. Emphasis on standards (ISO 15288, INCOSE).",
      careerOpportunities: [
        "Aerospace Systems Engineer",
        "Defense Systems Engineer",
        "Automotive Systems Engineer (Autonomous Vehicles)",
        "Smart City/IoT Systems Architect",
        "Enterprise Systems Integration Consultant",
        "Chief Technology Officer",
        "Engineering Program Manager"
      ],
      salaryRange: "USD 80,000 - USD 160,000/year"
    },
    careerPath: {
      dayToDay: "Defining system requirements with stakeholders, creating system architectures and interface specifications, coordinating across engineering teams (software, hardware, mechanical), conducting integration testing and verification, managing technical risk, leading design reviews, creating simulation models, ensuring projects meet performance, cost, and schedule targets.",
      typicalEmployers: ["Aerospace companies (Boeing, Airbus, NASA)", "Defense contractors (Lockheed Martin, Northrop Grumman)", "Telecommunications (MTN, Airtel, Nokia, Ericsson)", "Oil & gas companies", "Automotive (Tesla, GM)", "Consulting firms (Booz Allen, Accenture)", "Tech giants (Google, Amazon, Microsoft)"]
    },
    curriculum: {
      year1: ["Engineering Mathematics", "Physics", "Chemistry", "Introduction to Systems Engineering", "Programming (Python/C++)", "Engineering Drawing"],
      year2: ["Systems Thinking", "Requirements Engineering", "Circuits & Electronics", "Mechanics", "Statistics", "Engineering Economics"],
      year3: ["Systems Architecture & Design", "Control Systems", "Operations Research", "Reliability Engineering", "Project Management", "Modeling & Simulation"],
      year4: ["Systems Integration & Testing", "Risk Management", "Human Factors Engineering", "Capstone Systems Project", "Professional Practice", "Advanced Topics"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "The complexity of modern systems (autonomous vehicles, smart cities, space missions, AI systems) is increasing demand exponentially. Systems engineers who understand AI/ML integration, cybersecurity, and sustainability will be invaluable.",
      trends: ["Autonomous Systems (Vehicles, Drones)", "Digital Twins & Simulation", "System-of-Systems Engineering", "Model-Based Systems Engineering (MBSE)", "AI/ML System Integration", "Cybersecurity for Complex Systems", "Sustainable Systems Design"]
    },
    successPathway: {
      internships: ["Telecommunications companies", "Oil & gas engineering departments", "Aerospace/defense contractors", "Consulting firms", "Government infrastructure agencies"],
      certifications: ["INCOSE Certifications (ASEP, CSEP)", "PMP (Project Management)", "Six Sigma", "MATLAB/Simulink Certification", "Cloud Architecture Certifications"],
      projects: ["Design a complex system (satellite, drone, smart building)", "Capstone multidisciplinary team projects", "Simulation modeling exercises", "Hackathons focused on system integration"],
      volunteering: ["STEM education outreach", "Engineering competition mentoring", "Professional society activities (INCOSE chapter)"]
    },
    schools: allSchools,
    interestMatch: ["technology", "engineering", "problem-solving"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: -1 }
  },

  // GEOPHYSICS
  {
    id: "geophysics",
    name: "Geophysics",
    category: "Science & Engineering",
    overview: "Geophysics applies physics principles to study the Earth's structure, composition, and processes. Geophysicists use seismic waves, magnetic fields, gravity, and electrical methods to explore what lies beneath the Earth's surface. This field is critical for oil and gas exploration, mining, earthquake studies, groundwater detection, and environmental assessment.",
    coreSkills: ["Seismic Data Acquisition & Interpretation", "Gravity & Magnetic Surveying", "Electrical & Electromagnetic Methods", "Geophysical Data Processing (MATLAB, Python)", "Well Logging & Reservoir Analysis", "GIS & Remote Sensing", "Geology Fundamentals"],
    nigeriaContext: {
      description: "Nigeria's oil and gas industry creates massive demand for geophysicists. Programs at UNILAG, OAU, FUTA, and UNILORIN produce graduates who work for oil majors (Shell, Chevron, ExxonMobil), service companies (Schlumberger, Halliburton), and exploration firms. Geophysicists are among the highest-paid STEM graduates. Opportunities also exist in mining, groundwater exploration, and seismic hazard assessment.",
      teachingStyle: "Strong theoretical foundation in physics and mathematics, combined with hands-on fieldwork and computer-based data processing. Students conduct seismic surveys, gravity measurements, and use industry-standard software.",
      careerOpportunities: [
        "Exploration Geophysicist (Oil & Gas)",
        "Seismic Data Processor/Interpreter",
        "Reservoir Geophysicist",
        "Mining Geophysicist",
        "Groundwater/Environmental Geophysicist",
        "Geophysical Surveyor",
        "Research Scientist (Earthquakes, Earth Structure)"
      ],
      salaryRange: "NGN 3,600,000 - NGN 18,000,000/year (oil & gas pays highest)"
    },
    globalContext: {
      description: "Geophysicists work globally in energy (oil, gas, renewables), mining, environmental consulting, and research. The energy transition is creating new opportunities in geothermal energy, carbon capture monitoring, and offshore wind site surveys. Strong demand in Canada, USA, Australia, Middle East, and Latin America.",
      teachingStyle: "Field-intensive with camps for seismic surveys, gravity/magnetic measurements, and electrical resistivity studies. Heavy computational work with specialized software (Petrel, Kingdom, OpendTect). Research-focused at graduate level.",
      careerOpportunities: [
        "Exploration Geophysicist",
        "Seismic Imaging Specialist",
        "Geothermal Resource Analyst",
        "Mining Exploration Geophysicist",
        "Earthquake Seismologist",
        "Carbon Sequestration Specialist",
        "Geophysics Professor/Researcher"
      ],
      salaryRange: "USD 70,000 - USD 150,000/year"
    },
    careerPath: {
      dayToDay: "Analyzing seismic data to locate oil/gas reservoirs or mineral deposits, planning and conducting geophysical surveys in the field, processing data using specialized software, interpreting results and creating 3D subsurface models, presenting findings to exploration teams, collaborating with geologists and engineers, optimizing drilling locations.",
      typicalEmployers: ["Oil & gas companies (Shell, Chevron, Total, independents)", "Service companies (Schlumberger, Halliburton, Baker Hughes)", "Mining companies", "Environmental consulting firms", "Geothermal energy companies", "Research institutions", "Government geological surveys"]
    },
    curriculum: {
      year1: ["Physics I & II", "Mathematics (Calculus, Vectors)", "General Geology", "Chemistry", "Introduction to Geophysics", "Computer Programming"],
      year2: ["Geophysical Field Methods", "Potential Fields (Gravity & Magnetics)", "Electrical Methods", "Mathematics for Geophysics", "Structural Geology", "Mineralogy"],
      year3: ["Seismic Exploration", "Well Logging", "Geophysical Data Processing", "Seismology", "Petroleum Geology", "Field Camp"],
      year4: ["Seismic Interpretation", "Reservoir Geophysics", "Environmental Geophysics", "Advanced Data Analysis", "Research Project", "Integrated Geoscience"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 8,
      techImpact: "AI and machine learning are revolutionizing seismic interpretation and data processing, but expert geophysicists are still needed to validate results and make critical decisions. New applications in renewable energy (geothermal, offshore wind) and carbon storage are emerging.",
      trends: ["AI/ML for Seismic Interpretation", "Geothermal Energy Exploration", "Carbon Capture & Storage Monitoring", "4D Seismic for Reservoir Monitoring", "Fiber Optic Sensing (DAS)", "Offshore Wind Site Characterization", "Critical Minerals Exploration"]
    },
    successPathway: {
      internships: ["Oil & gas companies (intern geophysicist)", "Service companies (field/office roles)", "Geological surveys", "Mining companies", "Research institutions"],
      certifications: ["Professional Geophysicist (APEGN)", "Petrel/Kingdom Software", "Python/MATLAB for Geophysics", "HSE Certifications", "GIS Certification"],
      projects: ["Seismic data interpretation projects", "Gravity/magnetic surveys", "Groundwater exploration studies", "Publish in geophysics journals", "Competition teams (SEG challenges)"],
      volunteering: ["Science education outreach", "Geohazard awareness campaigns", "Geophysical society activities"]
    },
    schools: allSchools,
    interestMatch: ["science", "technology", "analytical"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: 0 }
  },

  // METEOROLOGY AND CLIMATE SCIENCE
  {
    id: "meteorology-climate-science",
    name: "Meteorology & Climate Science",
    category: "Science & Environment",
    overview: "Meteorology is the study of weather and atmospheric phenomena, while climate science examines long-term climate patterns and changes. Students learn to forecast weather, understand climate systems, analyze atmospheric data, and assess climate change impacts. This field combines physics, mathematics, computer modeling, and environmental science.",
    coreSkills: ["Weather Forecasting & Analysis", "Climate Modeling", "Atmospheric Physics", "Remote Sensing & Satellite Data", "Statistical Climate Analysis", "Programming (Python, R, Fortran)", "Data Visualization & Communication"],
    nigeriaContext: {
      description: "UNILAG and FUTA offer meteorology programs. Nigeria's vulnerability to climate variability (floods, droughts, extreme heat) drives demand for meteorologists. Career paths include NIMET (Nigerian Meteorological Agency), aviation weather services, agricultural meteorology, climate consulting, and environmental agencies. Growing opportunities in climate change adaptation and renewable energy forecasting.",
      teachingStyle: "Combination of theoretical atmospheric science, computer modeling, and practical forecasting exercises. Students learn to use weather stations, radiosondes, satellite imagery, and numerical weather prediction models.",
      careerOpportunities: [
        "Weather Forecaster (NIMET, Aviation)",
        "Climate Analyst/Consultant",
        "Agricultural Meteorologist",
        "Environmental Impact Assessor",
        "Renewable Energy Analyst (Solar/Wind)",
        "Broadcast Meteorologist",
        "Research Scientist (Climate Change)"
      ],
      salaryRange: "NGN 2,400,000 - NGN 9,600,000/year"
    },
    globalContext: {
      description: "Meteorologists work in government weather services, aviation, military, media (TV/online weather presenters), renewable energy companies, and climate research. Climate scientists are increasingly important in policy, sustainability consulting, and disaster preparedness. Strong growth due to climate change urgency.",
      teachingStyle: "Heavy computational focus using weather/climate models (WRF, GCMs), satellite data processing, and programming. Fieldwork includes launching weather balloons and operating weather stations. Graduate programs emphasize specialized research.",
      careerOpportunities: [
        "Operational Meteorologist (National Weather Service equivalents)",
        "Climate Scientist/Researcher",
        "Broadcast Meteorologist",
        "Aviation Meteorologist",
        "Renewable Energy Forecaster",
        "Climate Risk Analyst (Finance/Insurance)",
        "Environmental Consultant"
      ],
      salaryRange: "USD 50,000 - USD 110,000/year"
    },
    careerPath: {
      dayToDay: "Analyzing weather data from satellites, radar, and ground stations, running computer forecast models, issuing weather forecasts and warnings, creating weather graphics and maps, briefing pilots or emergency managers, conducting climate research, communicating with media or public, analyzing climate trends for reports.",
      typicalEmployers: ["National meteorological agencies", "Aviation authorities (airports, airlines)", "Military weather services", "TV stations and media companies", "Renewable energy companies", "Agricultural agencies", "Climate consulting firms", "Research institutions"]
    },
    curriculum: {
      year1: ["Physics I & II", "Calculus & Differential Equations", "Chemistry", "Introduction to Atmospheric Science", "Programming (Python)", "Statistics"],
      year2: ["Atmospheric Thermodynamics", "Atmospheric Dynamics", "Synoptic Meteorology I", "Remote Sensing", "Numerical Methods", "Climatology"],
      year3: ["Weather Forecasting", "Atmospheric Physics", "Climate Modeling", "Tropical Meteorology", "Radar & Satellite Meteorology", "Field Methods"],
      year4: ["Severe Weather & Mesoscale Meteorology", "Climate Change Science", "Air Quality & Atmospheric Chemistry", "Advanced Forecasting", "Research Project", "Operational Meteorology"]
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "AI and machine learning are improving weather forecast accuracy and climate predictions. However, human expertise is critical for communicating risk, interpreting model uncertainties, and advising on weather-sensitive decisions. Climate change is driving unprecedented demand.",
      trends: ["AI/ML Weather Forecasting", "Climate Change Impact Assessment", "Renewable Energy Forecasting", "Climate Risk for Finance", "Extreme Weather Early Warning Systems", "Urban Heat Island Studies", "Agricultural Weather Services"]
    },
    successPathway: {
      internships: ["NIMET (forecasting divisions)", "Aviation weather services", "Climate research institutes", "Environmental consulting firms", "TV weather departments"],
      certifications: ["American Meteorological Society (AMS) Seal", "WMO Training", "Remote Sensing Certifications", "Python for Atmospheric Science", "GIS for Climate Analysis"],
      projects: ["Weather forecasting exercises", "Climate trend analysis for Nigeria", "Renewable energy site assessments", "Extreme weather case studies", "Publish research papers"],
      volunteering: ["Climate awareness campaigns", "School weather education programs", "Disaster preparedness outreach", "Environmental NGO activities"]
    },
    schools: allSchools,
    interestMatch: ["science", "environment", "technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: -1 }
  },

  // CYBER SECURITY
  {
    id: "cyber-security",
    name: "Cyber Security",
    category: "Technology",
    overview: "Cyber Security is the practice of protecting computer systems, networks, programs, and data from digital attacks, unauthorized access, and damage. Students learn ethical hacking, network security, cryptography, incident response, security architecture, and risk management. This field is critical as cyber threats grow exponentially worldwide.",
    coreSkills: ["Ethical Hacking & Penetration Testing", "Network Security", "Cryptography", "Security Operations (SOC)", "Incident Response & Forensics", "Security Compliance (ISO 27001, NIST)", "Programming (Python, C, Assembly)"],
    nigeriaContext: {
      description: "Cyber threats are surging in Nigeria with increased digital banking, fintech, and e-commerce. FUTA is pioneering dedicated cyber security programs. Massive demand from banks, telcos, fintech companies, and government agencies. Cyber security professionals command premium salaries due to critical shortage. Many work remotely for international companies.",
      teachingStyle: "Hands-on labs with Kali Linux, virtual hacking environments, capture-the-flag competitions, and real-world security tools. Strong emphasis on ethical hacking certifications (CEH, OSCP) alongside degree.",
      careerOpportunities: [
        "Security Analyst/Engineer",
        "Penetration Tester (Ethical Hacker)",
        "Security Operations Center (SOC) Analyst",
        "Information Security Manager",
        "Cyber Forensics Investigator",
        "Cloud Security Specialist",
        "Chief Information Security Officer (CISO)"
      ],
      salaryRange: "NGN 3,600,000 - NGN 24,000,000/year (top talent earns significantly more)"
    },
    globalContext: {
      description: "Cyber security is one of the fastest-growing and highest-paying tech fields globally. Chronic talent shortage worldwide creates opportunities. Remote work is common. Top professionals earn 6-7 figures. Strong career growth potential from analyst to CISO. Certifications are highly valued, sometimes more than degrees.",
      teachingStyle: "Heavy practical focus with labs, simulations, bug bounty programs, and hands-on projects. Industry certifications integrated into curriculum. Emphasis on staying current with evolving threats.",
      careerOpportunities: [
        "Security Engineer/Analyst",
        "Penetration Tester",
        "Security Architect",
        "Incident Response Specialist",
        "Threat Intelligence Analyst",
        "Application Security Engineer",
        "Compliance/GRC Specialist"
      ],
      salaryRange: "USD 80,000 - USD 250,000+/year"
    },
    careerPath: {
      dayToDay: "Monitoring security alerts and logs, conducting vulnerability assessments and penetration tests, analyzing malware and security incidents, implementing security controls and patches, configuring firewalls and intrusion detection systems, writing security policies and procedures, conducting security awareness training, responding to breaches, staying updated on latest threats and tools.",
      typicalEmployers: ["Banks and fintech companies", "Telecommunications companies", "Consulting firms (Big 4, Accenture)", "Tech companies (Google, Microsoft, Meta)", "Cyber security vendors (Palo Alto, CrowdStrike)", "Government agencies (NSA, GCHQ, DSS)", "Cyber insurance companies"]
    },
    curriculum: {
      year1: ["Programming (Python, C)", "Networking Fundamentals", "Operating Systems (Linux, Windows)", "Mathematics & Discrete Structures", "Computer Architecture", "Introduction to Cyber Security"],
      year2: ["Network Security", "Cryptography", "Web Application Security", "Secure Programming", "Database Security", "Ethical Hacking Basics"],
      year3: ["Penetration Testing", "Digital Forensics", "Malware Analysis", "Security Operations", "Cloud Security", "Mobile Security"],
      year4: ["Advanced Penetration Testing", "Incident Response", "Security Architecture", "Threat Intelligence", "Capstone Security Project", "Legal & Ethical Issues"]
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI is being used both by attackers and defenders. Cyber security professionals who combine traditional skills with AI/ML knowledge will be unstoppable. Quantum computing threatens current encryption, creating new challenges. Demand will only increase.",
      trends: ["AI/ML for Threat Detection", "Zero Trust Architecture", "Cloud Security (AWS, Azure, GCP)", "DevSecOps", "IoT/OT Security", "Ransomware Defense", "Supply Chain Security", "Quantum-Safe Cryptography"]
    },
    successPathway: {
      internships: ["Bank security teams", "Cyber security consulting firms", "SOC analyst internships", "Bug bounty programs", "Government cyber units"],
      certifications: ["CEH (Certified Ethical Hacker)", "OSCP (Offensive Security)", "CompTIA Security+", "CISSP", "AWS/Azure Security", "GIAC Certifications"],
      projects: ["Capture The Flag (CTF) competitions", "Bug bounty hunting", "Build a home lab", "Security research blog", "Contribute to open-source security tools", "Hack The Box rankings"],
      volunteering: ["Cyber security awareness for SMEs", "School cybersafety programs", "NGO security audits", "Security conference volunteering"]
    },
    schools: allSchools,
    interestMatch: ["technology", "problem-solving", "analytical"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 1, peopleVsTask: 1, riskVsStability: 0 }
  },

  // MARINE SCIENCE AND TECHNOLOGY
  {
    id: "marine-science-technology",
    name: "Marine Science & Technology",
    category: "Science & Engineering",
    overview: "Marine Science & Technology is an interdisciplinary field combining oceanography, marine engineering, maritime technology, and marine resource management. Students learn about ocean systems, marine vessels, offshore structures, underwater technology, fisheries, and sustainable ocean resource exploitation. This field supports the blue economy.",
    coreSkills: ["Oceanography & Marine Systems", "Marine Engineering & Naval Architecture", "Offshore Technology", "Marine Resource Management", "Underwater Robotics (ROVs, AUVs)", "GIS & Remote Sensing", "Maritime Operations"],
    nigeriaContext: {
      description: "Nigeria's extensive coastline, offshore oil/gas industry, and growing maritime sector create demand for marine science professionals. FUTA's program is unique in Nigeria. Opportunities in offshore engineering, maritime shipping, fisheries management, environmental monitoring for oil companies, and navy/maritime security. Growing blue economy initiatives.",
      teachingStyle: "Combination of marine science theory, engineering principles, and practical maritime skills. Field trips to ports, offshore platforms, and coastal areas. Training in ship operations, diving, and marine instrumentation.",
      careerOpportunities: [
        "Marine Engineer (Offshore/Maritime)",
        "Oceanographic Surveyor",
        "Offshore Installation Manager",
        "Maritime Operations Officer",
        "Fisheries Resource Manager",
        "Marine Environmental Consultant",
        "Naval Architect"
      ],
      salaryRange: "NGN 3,000,000 - NGN 15,000,000/year (offshore roles pay highest)"
    },
    globalContext: {
      description: "The blue economy is expanding globally with offshore wind, deep-sea mining, aquaculture, and ocean conservation. Marine professionals work on ships, oil rigs, research vessels, and coastal management. Strong demand in maritime nations, offshore energy hubs, and island nations. Often involves working at sea for extended periods.",
      teachingStyle: "Integrated marine science and engineering with strong practical component: sea time on vessels, diving certifications, ROV operations, and offshore safety training. Emphasis on international maritime standards (IMO, SOLAS).",
      careerOpportunities: [
        "Offshore Engineer (Oil/Gas/Wind)",
        "Oceanographer",
        "Subsea Engineer",
        "Maritime Surveyor",
        "ROV Pilot/Technician",
        "Marine Renewable Energy Specialist",
        "Ocean Policy Advisor"
      ],
      salaryRange: "USD 60,000 - USD 140,000/year (offshore premium pay)"
    },
    careerPath: {
      dayToDay: "Operating or maintaining marine equipment and vessels, conducting oceanographic surveys and data collection, designing or managing offshore installations, monitoring marine environmental conditions, operating underwater robots (ROVs), analyzing ocean data, ensuring maritime safety compliance, coordinating with ship crews and engineers, troubleshooting marine systems.",
      typicalEmployers: ["Oil & gas companies (offshore operations)", "Maritime shipping companies", "Offshore engineering contractors", "Research institutions (oceanography)", "Environmental consulting firms", "Navy and coast guard", "Renewable energy companies (offshore wind)", "Port authorities"]
    },
    curriculum: {
      year1: ["Physics", "Mathematics", "Chemistry", "Introduction to Marine Science", "Engineering Drawing", "Computer Programming"],
      year2: ["Oceanography", "Fluid Mechanics", "Marine Engineering I", "Naval Architecture Basics", "Marine Instrumentation", "Fishing Gear Technology"],
      year3: ["Offshore Structures", "Marine Propulsion Systems", "Underwater Acoustics", "Marine Resources Management", "ROV/AUV Technology", "Marine Safety", "Field Course"],
      year4: ["Advanced Marine Engineering", "Subsea Technology", "Marine Renewable Energy", "Coastal Engineering", "Research Project", "Maritime Operations"]
    },
    futureOutlook: {
      relevanceToday: 7,
      relevanceIn5Years: 9,
      techImpact: "Autonomous vessels, underwater drones, AI for ocean monitoring, and offshore renewable energy are transforming the field. Climate change is increasing focus on ocean sustainability and coastal resilience.",
      trends: ["Offshore Wind Energy", "Autonomous Ships & ROVs", "Deep-Sea Mining", "Ocean Plastic Cleanup Technology", "Blue Carbon & Marine Conservation", "Aquaculture Technology", "Digital Twins for Maritime"]
    },
    successPathway: {
      internships: ["Offshore oil/gas companies", "Maritime shipping lines", "Navy maritime engineering", "Oceanographic research institutes", "Port engineering firms"],
      certifications: ["STCW (Standards of Training, Certification and Watchkeeping)", "Offshore Safety (BOSIET, HUET)", "ROV Pilot Certification", "Diving Certifications", "Marine Engineering Licenses"],
      projects: ["Design a marine vessel/structure", "Oceanographic data analysis", "ROV mission simulations", "Marine conservation projects", "Maritime safety research"],
      volunteering: ["Beach and ocean cleanups", "Marine conservation NGOs", "Maritime safety awareness", "School STEM programs"]
    },
    schools: allSchools,
    interestMatch: ["engineering", "environment", "adventure"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 1 }
  },

  // MINING ENGINEERING
  {
    id: "mining-engineering",
    name: "Mining Engineering",
    category: "Engineering",
    overview: "Mining Engineering involves the extraction of minerals, metals, and coal from the earth in a safe, efficient, and environmentally responsible manner. Mining engineers design mines, plan extraction operations, ensure worker safety, manage environmental impacts, and optimize mineral processing. This field combines geology, engineering, and business.",
    coreSkills: ["Mine Design & Planning", "Rock Mechanics & Blasting", "Mineral Processing", "Mine Safety & Ventilation", "Surveying & Geospatial Technology", "Mining Equipment & Operations", "Environmental Management"],
    nigeriaContext: {
      description: "Nigeria has vast untapped mineral resources (gold, tin, coal, limestone, lead-zinc) but mining is underdeveloped compared to oil/gas. FUTA offers the leading mining engineering program. Government is pushing mining diversification, creating opportunities. Mining engineers work in solid minerals mining, quarrying, cement companies, and exploration. Opportunities to pioneer Nigeria's mining sector growth.",
      teachingStyle: "Strong geological foundation combined with engineering principles. Field trips to mines and quarries. Focus on both small-scale and large-scale mining operations relevant to Nigeria's context.",
      careerOpportunities: [
        "Mine Engineer/Manager",
        "Exploration Geologist/Engineer",
        "Quarry Manager",
        "Mineral Processing Engineer",
        "Mining Equipment Specialist",
        "Mine Safety Officer",
        "Mining Consultant"
      ],
      salaryRange: "NGN 2,400,000 - NGN 12,000,000/year"
    },
    globalContext: {
      description: "Mining is a global industry with strong demand for engineers in Australia, Canada, South Africa, Chile, and other resource-rich nations. The energy transition is creating huge demand for critical minerals (lithium, cobalt, rare earths) for batteries and renewables. High salaries, often in remote locations with fly-in/fly-out schedules.",
      teachingStyle: "Comprehensive coverage of surface and underground mining, blasting, mineral processing, and mine safety. Extensive use of mine planning software. Internships at operating mines are essential. Focus on sustainable mining practices.",
      careerOpportunities: [
        "Mining Engineer",
        "Mine Planning Engineer",
        "Blasting Engineer",
        "Metallurgist/Mineral Processor",
        "Mine Geologist",
        "Environmental Mining Engineer",
        "Mining Consultant"
      ],
      salaryRange: "USD 70,000 - USD 150,000/year"
    },
    careerPath: {
      dayToDay: "Planning mine layouts and extraction sequences, designing blasting patterns and supervising blasting operations, ensuring mine safety and regulatory compliance, managing mine ventilation and drainage, operating or overseeing heavy mining equipment, analyzing ore grades and processing efficiency, coordinating with geologists on ore body mapping, managing mine rehabilitation and closure.",
      typicalEmployers: ["Mining companies (gold, coal, metals)", "Quarrying and aggregates companies", "Cement manufacturers", "Mining equipment manufacturers", "Consulting firms", "Government mining ministries", "Exploration companies"]
    },
    curriculum: {
      year1: ["Mathematics", "Physics", "Chemistry", "Engineering Drawing", "Geology Basics", "Introduction to Mining"],
      year2: ["Rock Mechanics", "Mine Surveying", "Mineral Processing I", "Mining Methods (Surface)", "Engineering Mechanics", "Thermodynamics"],
      year3: ["Underground Mining", "Mine Ventilation", "Blasting Technology", "Mine Equipment", "Mine Safety", "Environmental Mining", "Mineral Processing II"],
      year4: ["Mine Planning & Design", "Mine Economics", "Advanced Mining Technology", "Geotechnical Engineering", "Capstone Mine Design Project", "Mine Management"]
    },
    futureOutlook: {
      relevanceToday: 7,
      relevanceIn5Years: 9,
      techImpact: "Automation (autonomous haul trucks, drills), AI for ore optimization, and remote operations are transforming mining. The green energy transition is driving huge demand for battery minerals, creating a mining boom for lithium, cobalt, and rare earths.",
      trends: ["Critical Minerals for EV Batteries", "Automation & Autonomous Mining", "Sustainable Mining Practices", "Deep-Sea Mining Exploration", "Mine Electrification (Reducing Diesel)", "AI for Ore Grade Prediction", "Mine Closure & Rehabilitation"]
    },
    successPathway: {
      internships: ["Mining companies (operations/planning)", "Quarries and cement plants", "Exploration companies", "Mining consultancies", "Government mining agencies"],
      certifications: ["Mine Safety Certifications", "Blasting Licenses", "Mining Software (Surpac, MineSched, Vulcan)", "First Aid & Emergency Response", "Environmental Impact Assessment"],
      projects: ["Mine design capstone projects", "Blast optimization studies", "Mineral processing experiments", "Mine safety audits", "Sustainability assessments"],
      volunteering: ["Mining safety awareness campaigns", "Community engagement for mining areas", "STEM outreach", "Environmental restoration projects"]
    },
    schools: allSchools,
    interestMatch: ["engineering", "environment", "problem-solving"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: 0 }
  },

  // INDUSTRIAL DESIGN
  {
    id: "industrial-design",
    name: "Industrial Design",
    category: "Creative & Design",
    overview: "Industrial Design (also called Product Design) is the art and science of creating mass-produced products that are functional, aesthetically pleasing, user-friendly, and manufacturable. Industrial designers combine creativity, engineering, business, and user research to design everything from smartphones and furniture to cars and medical devices. This field bridges art and engineering.",
    coreSkills: ["3D Modeling & CAD (SolidWorks, Rhino, Fusion 360)", "Sketching & Rendering", "Prototyping & Model Making", "User-Centered Design & Ergonomics", "Materials & Manufacturing Processes", "Design Thinking", "Adobe Creative Suite"],
    nigeriaContext: {
      description: "Industrial design is emerging in Nigeria with growth in manufacturing, consumer goods, and product development. FUTA is one of the few universities offering this program. Opportunities in manufacturing companies, furniture makers, consumer electronics, automotive, and design consultancies. Many Nigerian designers work remotely for international clients or start their own product design studios.",
      teachingStyle: "Studio-based learning with hands-on projects. Students design actual products, build prototypes using workshops and fabrication labs, and present to industry critiques. Balance of aesthetics, functionality, and manufacturability.",
      careerOpportunities: [
        "Product Designer",
        "Furniture Designer",
        "Automotive Designer",
        "Consumer Electronics Designer",
        "Packaging Designer",
        "UX/Industrial Design Hybrid",
        "Design Entrepreneur"
      ],
      salaryRange: "NGN 1,800,000 - NGN 9,600,000/year"
    },
    globalContext: {
      description: "Industrial designers are vital in tech companies (Apple, Google, Samsung), automotive (Tesla, BMW), furniture (IKEA, Herman Miller), consumer goods (Nike, P&G), and consultancies (IDEO, Frog Design). Strong portfolios matter more than grades. Many work freelance or start design studios. High demand for sustainable and inclusive design.",
      teachingStyle: "Project-intensive with design studios, prototyping labs (3D printing, CNC, woodshop), and industry collaborations. Heavy emphasis on portfolio development, user research, and design process over final aesthetics alone.",
      careerOpportunities: [
        "Product Designer (Consumer Electronics, Furniture, etc.)",
        "Automotive Designer",
        "Design Researcher",
        "Design Director",
        "Industrial Design Consultant",
        "Entrepreneur (Product Startups)",
        "Design Educator"
      ],
      salaryRange: "USD 55,000 - USD 130,000/year"
    },
    careerPath: {
      dayToDay: "Researching user needs and market trends, sketching product concepts by hand and digitally, creating 3D CAD models and renderings, building physical prototypes and testing them, collaborating with engineers and marketers, selecting materials and finishes, presenting design concepts to clients or stakeholders, refining designs based on feedback, preparing manufacturing specifications.",
      typicalEmployers: ["Consumer electronics companies (Apple, Samsung, Google)", "Automotive companies (Tesla, GM, Toyota)", "Furniture manufacturers", "Product design consultancies (IDEO, Frog, Pentagram)", "Startups (hardware/IoT)", "Toy companies", "Medical device companies"]
    },
    curriculum: {
      year1: ["Design Fundamentals", "Drawing & Sketching", "2D Design (Adobe Suite)", "Materials Science", "Workshop Practice", "Design History"],
      year2: ["3D Modeling (CAD)", "Prototyping Techniques", "Ergonomics & Human Factors", "Manufacturing Processes", "Color & Form Theory", "Design Projects I"],
      year3: ["Advanced CAD & Rendering", "User-Centered Design", "Product Development Process", "Sustainable Design", "Furniture/Product Design Projects", "Portfolio Development"],
      year4: ["Design for Manufacturing", "Design Entrepreneurship", "Advanced Prototyping (3D Printing, CNC)", "Capstone Product Design Project", "Professional Practice", "Internship"]
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "AI tools (Midjourney, generative design) are accelerating ideation, but human designers are still needed for user empathy, strategic thinking, and refinement. 3D printing and rapid prototyping are democratizing product development. Sustainability is a major focus.",
      trends: ["Sustainable & Circular Design", "AI-Assisted Design Tools", "3D Printing & Additive Manufacturing", "Smart Products & IoT Design", "Inclusive & Accessible Design", "Biomimicry", "Direct-to-Consumer Brands"]
    },
    successPathway: {
      internships: ["Product design consultancies", "Manufacturing companies", "Consumer electronics firms", "Furniture makers", "Automotive design studios"],
      certifications: ["CAD Software Certifications (SolidWorks, Rhino)", "UX Design Certifications", "3D Printing & Fabrication", "Adobe Creative Certifications"],
      projects: ["Build a strong portfolio (10-15 diverse projects)", "Enter design competitions (Core77, Red Dot)", "Design products and sell online (Etsy, Kickstarter)", "Collaborate with engineering students", "Freelance design work"],
      volunteering: ["Design for social good projects", "Assistive technology for disabled communities", "STEM/design education", "Sustainability initiatives"]
    },
    schools: allSchools,
    interestMatch: ["creative", "technology", "problem-solving"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: 0 }
  },

  // OPTOMETRY
  {
    id: "optometry",
    name: "Optometry",
    category: "Health & Medicine",
    overview: "Optometry is a healthcare profession focused on eye and vision care. Optometrists (Doctors of Optometry) examine eyes, diagnose vision problems and eye diseases, prescribe corrective lenses (glasses/contacts), detect systemic diseases (diabetes, hypertension) through eye exams, and provide pre/post-operative care for eye surgeries. This field combines healthcare, patient interaction, and small business management.",
    coreSkills: ["Eye Examination & Diagnosis", "Vision Testing & Refraction", "Contact Lens Fitting", "Ocular Disease Detection & Management", "Low Vision Rehabilitation", "Pediatric & Geriatric Eye Care", "Clinical Instrumentation (Autorefractors, OCT, Fundus Cameras)"],
    nigeriaContext: {
      description: "Nigeria has a critical shortage of optometrists with an estimated 1 optometrist per 50,000+ people (WHO recommends 1:10,000). UNILORIN is a leading optometry school. Optometrists enjoy excellent job security, high income, and respect. Many own private practices, work in hospitals, or join optical retail chains. Vision problems are widespread but undertreated, creating massive opportunity.",
      teachingStyle: "Clinical training-heavy program (60-70% clinical) with rotations in hospitals, eye clinics, and community outreach. Students examine hundreds of patients, learning refraction, disease diagnosis, and patient management. Theory covers ocular anatomy, physiology, pathology, and pharmacology.",
      careerOpportunities: [
        "Private Practice Optometrist (Own Clinic)",
        "Hospital Optometrist",
        "Optical Retail Manager/Optometrist",
        "Pediatric Optometry Specialist",
        "Contact Lens Specialist",
        "Low Vision Specialist",
        "Optometry Lecturer/Researcher"
      ],
      salaryRange: "NGN 3,000,000 - NGN 18,000,000/year (private practice owners earn more)"
    },
    globalContext: {
      description: "Optometry is a well-established, recession-proof profession globally. Strong demand in developed countries due to aging populations and digital eye strain. Optometrists enjoy work-life balance, autonomy (many own practices), and good income. Licensing exams required in most countries. Growing specializations in myopia management, dry eye, and sports vision.",
      teachingStyle: "Doctorate-level clinical programs (OD or equivalent) with extensive patient care training. Students gain competency in comprehensive eye exams, contact lenses, and ocular disease. Research and evidence-based practice emphasized.",
      careerOpportunities: [
        "Private Practice Optometrist",
        "Ophthalmology Co-Management",
        "Pediatric/Geriatric Specialist",
        "Cornea & Contact Lens Specialist",
        "Vision Therapy Specialist",
        "Refractive Surgery Consultant",
        "Optometry Educator"
      ],
      salaryRange: "USD 100,000 - USD 200,000/year"
    },
    careerPath: {
      dayToDay: "Conducting comprehensive eye exams (visual acuity, refraction, eye health), diagnosing conditions (myopia, glaucoma, cataracts, diabetic retinopathy), prescribing glasses and contact lenses, fitting specialty lenses, educating patients on eye health, referring complex cases to ophthalmologists, managing practice operations (if owner), staying updated on new technologies and treatments.",
      typicalEmployers: ["Private practice (self-employed or group)", "Hospitals and eye clinics", "Optical retail chains (Vision Express, etc.)", "Government health facilities", "NGOs (vision screening programs)", "Optical manufacturers", "Universities (teaching/research)"]
    },
    curriculum: {
      year1: ["Ocular Anatomy & Physiology", "General Physiology", "Biochemistry", "Physics of Vision", "Geometrical Optics", "Introduction to Clinical Optometry"],
      year2: ["Visual Optics", "Ocular Pharmacology", "Microbiology & Immunology", "Clinical Refraction I", "Contact Lenses I", "Patient Care Basics"],
      year3: ["Ocular Disease I (Anterior Segment)", "Binocular Vision & Pediatric Optometry", "Clinical Refraction II", "Contact Lenses II", "Low Vision", "Clinical Rotations I"],
      year4: ["Ocular Disease II (Posterior Segment)", "Systemic Diseases & The Eye", "Advanced Clinical Optometry", "Community Optometry", "Practice Management", "Clinical Rotations II"],
      year5: ["Specialty Clinics (Pediatrics, Low Vision, Contact Lens)", "Research Project", "Comprehensive Clinical Rotations", "Professional Practice & Ethics"]
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Technology (tele-optometry, AI-assisted diabetic retinopathy screening, advanced imaging) enhances but doesn't replace optometrists. Growing screen time increases vision problems (digital eye strain, myopia epidemic in children), driving demand. Aging populations need more eye care.",
      trends: ["Myopia Control (Specialty Lenses, Atropine)", "Tele-Optometry & Remote Consultations", "AI Retinal Screening", "Dry Eye Management (IPL, MGD Treatments)", "Scleral Contact Lenses", "Sports Vision Training", "Integrative Healthcare (Co-Management with MDs)"]
    },
    successPathway: {
      internships: ["Teaching hospital eye clinics", "Private optometry practices", "Optical retail chains", "Vision screening NGOs", "Eye research institutes"],
      certifications: ["Optometry Council of Nigeria License", "Specialty Certifications (Contact Lens, Low Vision)", "Practice Management", "CPR/First Aid", "Advanced Imaging (OCT, Fundus Photography)"],
      projects: ["Community vision screening outreaches", "Clinical case presentations", "Research on eye disease prevalence", "Business plan for optometry practice"],
      volunteering: ["Free eye screening camps", "Vision for schools programs", "World Sight Day activities", "Diabetic eye care awareness"]
    },
    schools: allSchools,
    interestMatch: ["health", "helping-others", "entrepreneurship"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: -1 }
  },

  // PHYSIOTHERAPY
  {
    id: "physiotherapy",
    name: "Physiotherapy (Physical Therapy)",
    category: "Health & Medicine",
    overview: "Physiotherapy is a healthcare profession focused on restoring and maintaining physical function, mobility, and quality of life through movement, exercise, manual therapy, education, and modalities. Physiotherapists treat injuries, chronic conditions, disabilities, and help with rehabilitation after surgery or illness. This field combines clinical knowledge, hands-on skills, and patient education.",
    coreSkills: ["Musculoskeletal Assessment & Treatment", "Therapeutic Exercise Prescription", "Manual Therapy Techniques", "Electrotherapy & Modalities", "Neurological Rehabilitation", "Cardiopulmonary Physiotherapy", "Patient Education & Motivation"],
    nigeriaContext: {
      description: "Physiotherapy is growing rapidly in Nigeria with increasing awareness of non-surgical treatment options. UNILORIN, UNILAG, and OAU offer top programs. Physiotherapists work in hospitals, sports teams, private clinics, and rehabilitation centers. Growing sports industry and aging population drive demand. Many start successful private practices. Excellent job prospects and respect.",
      teachingStyle: "Balanced theory and clinical practice (50/50). Students learn anatomy in detail, practice hands-on techniques on classmates, and do clinical rotations in hospitals treating real patients (orthopedics, neurology, pediatrics, sports). Heavy practical skills emphasis.",
      careerOpportunities: [
        "Hospital Physiotherapist (Orthopedics, Neurology, ICU)",
        "Sports Physiotherapist (Football Clubs, Athletics)",
        "Private Practice Owner",
        "Rehabilitation Center Specialist",
        "Occupational Health Physiotherapist",
        "Pediatric Physiotherapist",
        "Geriatric Care Specialist"
      ],
      salaryRange: "NGN 2,400,000 - NGN 12,000,000/year (private practice and sports physios earn more)"
    },
    globalContext: {
      description: "Physiotherapists are in demand worldwide, especially in aging societies (Europe, North America, Australia). The profession offers excellent work-life balance, job security, and satisfaction from helping people recover. Many countries have shortage occupation lists including physiotherapists. Specializations in sports, pediatrics, and neurology are lucrative.",
      teachingStyle: "Doctorate or Masters entry-level programs in many countries. Extensive clinical placements (1000+ hours) across diverse settings. Evidence-based practice, research skills, and autonomous decision-making emphasized. Many programs include sports rotations.",
      careerOpportunities: [
        "Hospital Physiotherapist",
        "Sports Team Physiotherapist",
        "Private Practice Owner",
        "Orthopedic/Manual Therapy Specialist",
        "Neurological Rehabilitation Specialist",
        "Pediatric Physiotherapist",
        "Researcher/Educator"
      ],
      salaryRange: "USD 60,000 - USD 110,000/year"
    },
    careerPath: {
      dayToDay: "Assessing patients (taking history, physical examination, functional tests), diagnosing movement problems and creating treatment plans, providing hands-on manual therapy (joint mobilization, soft tissue massage), designing and supervising therapeutic exercises, using modalities (ultrasound, electrical stimulation, heat/cold), educating patients on injury prevention and self-management, tracking progress and adjusting treatments, collaborating with doctors and other healthcare professionals.",
      typicalEmployers: ["Hospitals (orthopedics, neurology, ICU, outpatient)", "Sports teams (football, basketball, athletics)", "Private physiotherapy clinics", "Rehabilitation centers", "Nursing homes and geriatric facilities", "Corporate wellness programs", "Universities (research/teaching)"]
    },
    curriculum: {
      year1: ["Anatomy (Musculoskeletal, Neurological)", "Physiology", "Biochemistry", "Biomechanics", "Introduction to Physiotherapy", "Communication Skills"],
      year2: ["Kinesiology", "Pathology", "Therapeutic Exercise", "Electrotherapy", "Manual Therapy Basics", "Clinical Practice I (Musculoskeletal)"],
      year3: ["Neurological Physiotherapy", "Cardiopulmonary Physiotherapy", "Pediatric Physiotherapy", "Sports Physiotherapy", "Clinical Practice II", "Research Methods"],
      year4: ["Advanced Musculoskeletal Therapy", "Geriatric Physiotherapy", "Occupational Health", "Evidence-Based Practice", "Clinical Practice III (Diverse Rotations)", "Professional Practice"],
      year5: ["Specialized Clinical Rotations", "Capstone Research Project", "Advanced Manual Therapy", "Community Physiotherapy", "Internship"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "Technology (tele-physiotherapy, wearable sensors, VR rehabilitation) is enhancing physiotherapy but hands-on skills remain irreplaceable. Aging populations, sports growth, and chronic disease increase demand. AI may assist with assessment but human touch and motivation are essential.",
      trends: ["Tele-Physiotherapy & Remote Monitoring", "Virtual Reality Rehabilitation", "Concussion Management", "Chronic Pain Management (Biopsychosocial Approach)", "Women's Health Physiotherapy", "Geriatric & Fall Prevention Programs", "Sports Performance Optimization"]
    },
    successPathway: {
      internships: ["Hospital physiotherapy departments", "Sports team shadowing", "Private clinics", "Rehabilitation centers", "Community health centers"],
      certifications: ["Medical Rehabilitation Therapists Board License", "Sports Physiotherapy Certification", "Manual Therapy Courses (Maitland, Mulligan)", "Dry Needling/Acupuncture", "CPR/First Aid"],
      projects: ["Clinical case presentations", "Community health screening", "Sports injury prevention programs", "Research on treatment outcomes", "Volunteer rehabilitation camps"],
      volunteering: ["Free physiotherapy clinics for underserved", "Disability sports programs", "Elderly care homes", "School posture education", "Marathon/sports event coverage"]
    },
    schools: allSchools,
    interestMatch: ["health", "helping-others", "sports"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: -1 }
  },

  // FOOD ENGINEERING
  {
    id: "food-engineering",
    name: "Food Engineering & Technology",
    category: "Engineering",
    overview: "Food Engineering applies engineering principles to the production, processing, preservation, packaging, and distribution of food. Food engineers design food processing plants, develop new food products, ensure food safety and quality, optimize production efficiency, and create sustainable food systems. This field combines chemical engineering, biology, nutrition, and business.",
    coreSkills: ["Food Processing & Preservation", "Food Chemistry & Microbiology", "Process Engineering (Heat, Mass Transfer)", "Food Safety & Quality Control", "Food Product Development", "Food Packaging Technology", "Plant Design & Optimization"],
    nigeriaContext: {
      description: "Nigeria's food processing industry is booming with local manufacturing of beverages, dairy, snacks, and packaged foods. UNILORIN and FUTA lead in food engineering. Food engineers work for multinationals (Nestle, Unilever, Coca-Cola), local food companies, and startups. Excellent entrepreneurship opportunities creating packaged foods, snacks, and beverages. Strong job market and good salaries.",
      teachingStyle: "Combination of engineering fundamentals, food science, and practical processing. Students use pilot plants for juice processing, baking, canning, and fermentation. Industry visits and internships at food factories are essential. Focus on local food crops and Nigerian market needs.",
      careerOpportunities: [
        "Food Process Engineer (Beverage, Dairy, Snacks)",
        "Food Product Developer (R&D)",
        "Quality Assurance/Control Manager",
        "Production Manager (Food Factory)",
        "Food Safety Specialist",
        "Food Entrepreneur (Packaged Foods Startup)",
        "Agricultural Processing Engineer"
      ],
      salaryRange: "NGN 2,400,000 - NGN 12,000,000/year"
    },
    globalContext: {
      description: "Food engineers are needed globally as the world demands safe, nutritious, sustainable, and convenient food. Opportunities exist in food giants (Nestle, Unilever, PepsiCo), startups, consulting, and government food safety agencies. Growing focus on plant-based foods, food waste reduction, and sustainable packaging creates new opportunities.",
      teachingStyle: "Strong engineering curriculum (thermodynamics, fluid mechanics, process control) applied to food systems. Hands-on pilot plant training, food analysis labs, and product development projects. Emphasis on food safety regulations (FDA, HACCP) and quality management.",
      careerOpportunities: [
        "Food Process Engineer",
        "Product Development Scientist",
        "Quality Assurance Manager",
        "Food Plant Manager",
        "Food Safety Engineer",
        "R&D Manager (Food Company)",
        "Food Technology Consultant"
      ],
      salaryRange: "USD 60,000 - USD 120,000/year"
    },
    careerPath: {
      dayToDay: "Designing or optimizing food processing operations (pasteurization, drying, fermentation), developing new food products (formulation, testing, scaling up), ensuring food safety and quality (HACCP, quality audits), troubleshooting production issues, conducting sensory tests and shelf-life studies, managing production schedules and efficiency, collaborating with marketing and supply chain teams, researching new technologies (freeze-drying, high-pressure processing).",
      typicalEmployers: ["Food & beverage companies (Nestle, Coca-Cola, Unilever, Dangote)", "Bakeries and confectioneries", "Dairy processors", "Breweries and distilleries", "Food equipment manufacturers", "Government food agencies (NAFDAC)", "Research institutions"]
    },
    curriculum: {
      year1: ["Mathematics & Engineering Math", "Chemistry", "Physics", "Introduction to Food Engineering", "Biology/Microbiology", "Engineering Drawing"],
      year2: ["Food Chemistry", "Food Microbiology", "Thermodynamics", "Fluid Mechanics", "Unit Operations I", "Food Analysis"],
      year3: ["Food Processing I (Thermal, Drying)", "Food Preservation", "Heat & Mass Transfer", "Process Control", "Food Product Development", "Food Safety & HACCP"],
      year4: ["Food Processing II (Fermentation, Baking)", "Food Packaging", "Food Plant Design", "Quality Management", "Capstone Design Project", "Industrial Training"]
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "AI and automation are optimizing food production, but food engineers are needed to design, manage, and innovate. Plant-based meat, personalized nutrition, and food waste reduction are creating new opportunities. Sustainability is becoming critical.",
      trends: ["Plant-Based & Alternative Proteins", "Food Waste Reduction Technologies", "Sustainable Packaging (Biodegradable, Edible)", "Precision Fermentation", "3D Food Printing", "Cold Chain Optimization", "Clean Label & Natural Ingredients"]
    },
    successPathway: {
      internships: ["Food processing companies (production/R&D)", "Beverage manufacturers", "Quality control labs", "NAFDAC", "Food startups"],
      certifications: ["HACCP Certification", "Six Sigma (Quality Management)", "Food Safety Certifications", "GMP (Good Manufacturing Practice)", "Lean Manufacturing"],
      projects: ["Design a food processing line", "Develop a new food product", "Food safety audit projects", "Packaging optimization studies", "Start a small food business (garri, zobo, chin-chin)"],
      volunteering: ["Food safety awareness campaigns", "Community nutrition programs", "School STEM education", "Food waste initiatives"]
    },
    schools: allSchools,
    interestMatch: ["science", "entrepreneurship", "problem-solving"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: -1 }
  },

  // QUANTITY SURVEYING
  {
    id: "quantity-surveying",
    name: "Quantity Surveying",
    category: "Engineering & Construction",
    overview: "Quantity Surveying (also called Construction Cost Management) is the profession of managing all costs related to building and civil engineering projects. Quantity surveyors prepare cost estimates, manage budgets, handle contracts, conduct valuations, and ensure value for money throughout a project's lifecycle. They are the financial experts of the construction industry.",
    coreSkills: ["Cost Estimation & Budgeting", "Contract Administration", "Project Management", "Construction Technology & Methods", "Valuation & Measurement", "Cost Control & Value Engineering", "Construction Law & Procurement"],
    nigeriaContext: {
      description: "Nigeria's massive infrastructure deficit and construction boom create huge demand for quantity surveyors. OAU, FUTA, and UNILAG offer top programs. QS professionals work on building projects, roads, bridges, oil/gas facilities, and real estate developments. They are essential for preventing budget overruns and corruption in public projects. High demand with excellent salaries.",
      teachingStyle: "Combination of construction technology, cost analysis, and contractual/legal studies. Students learn industry-standard measurement methods (NRM, CESMM), estimating software, and contract types (JCT, FIDIC). Site visits and practical case studies are integral.",
      careerOpportunities: [
        "Quantity Surveyor (Construction Firms)",
        "Cost Estimator/Planner",
        "Contract Administrator",
        "Project Quantity Surveyor",
        "Procurement Specialist",
        "Facilities Manager",
        "Construction Project Manager"
      ],
      salaryRange: "NGN 2,400,000 - NGN 15,000,000/year"
    },
    globalContext: {
      description: "Quantity surveyors are in demand globally, particularly in UK, Australia, Canada, Middle East, and growing Asian markets. The profession offers excellent career progression, work-life balance, and diverse project types. Professional chartership (RICS, CIQS, AIQS) greatly enhances career prospects and earning potential.",
      teachingStyle: "Focus on commercial management, cost planning throughout project lifecycle (RIBA stages), and risk management. Heavy use of BIM (Building Information Modeling) for cost extraction. Case studies from mega-projects. Professional accreditation pathways integrated.",
      careerOpportunities: [
        "Quantity Surveyor/Cost Consultant",
        "Commercial Manager",
        "Contract Manager",
        "Project Manager",
        "Cost Engineer (Oil & Gas, Infrastructure)",
        "Building Surveyor",
        "Forensic Delay Analyst"
      ],
      salaryRange: "USD 60,000 - USD 140,000/year"
    },
    careerPath: {
      dayToDay: "Preparing cost estimates and bills of quantities, measuring completed work and preparing valuations for payment, negotiating with contractors and suppliers, managing project budgets and cash flow, reviewing design changes and assessing cost impacts, administering contracts and resolving disputes, conducting feasibility studies, preparing tender documents, attending site meetings.",
      typicalEmployers: ["Construction companies (Julius Berger, RCC)", "QS consultancies", "Real estate developers", "Oil & gas companies (project departments)", "Government ministries (works, housing)", "Banks (project finance/valuation)", "International contractors"]
    },
    curriculum: {
      year1: ["Building Construction I", "Mathematics for Construction", "Engineering Drawing", "Introduction to Quantity Surveying", "Construction Materials", "Economics"],
      year2: ["Building Construction II", "Measurement & Quantification I", "Construction Technology", "Contract Law", "Building Services", "Structural Elements"],
      year3: ["Advanced Measurement & Quantification", "Cost Planning & Control", "Contract Administration", "Construction Management", "Estimating & Tendering", "Project Management"],
      year4: ["Construction Economics", "Advanced Contractual Procedures", "Facilities Management", "Professional Practice", "Capstone Project (Full QS for a building)", "Valuation & Development Appraisal"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "BIM and digital tools are transforming quantity surveying, automating measurements and improving accuracy. However, QS professionals are still needed for judgment, negotiation, risk assessment, and commercial strategy. Sustainability (green building cost analysis) is growing.",
      trends: ["BIM & 5D Cost Modeling", "Sustainable Construction Costing", "Modular & Off-Site Construction", "Digital Tendering Platforms", "Data Analytics for Cost Benchmarking", "Carbon Costing", "Infrastructure Megaprojects"]
    },
    successPathway: {
      internships: ["QS consultancies", "Construction companies", "Real estate developers", "Government project agencies", "Engineering firms"],
      certifications: ["RICS (Royal Institution of Chartered Surveyors)", "NIQS (Nigerian Institute of Quantity Surveyors)", "BIM Certifications", "Project Management (PMP)", "Construction Software (CostX, Bluebeam)"],
      projects: ["Prepare bills of quantities for real buildings", "Cost estimate case studies", "Contract administration simulations", "Site measurement exercises", "Tender document preparation"],
      volunteering: ["Community building projects (costing/management)", "Construction industry associations", "STEM mentoring", "Public procurement transparency advocacy"]
    },
    schools: allSchools,
    interestMatch: ["analytical", "business", "construction"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 0, riskVsStability: -1 }
  },

  // DENTISTRY
  {
    id: "dentistry",
    name: "Dentistry & Dental Surgery",
    category: "Health & Medicine",
    overview: "Dentistry is the branch of medicine focused on the diagnosis, prevention, and treatment of diseases and conditions of the oral cavity (teeth, gums, mouth, jaw). Dentists perform procedures like tooth extractions, fillings, root canals, crowns, orthodontics (braces), and cosmetic dentistry. They also educate patients on oral hygiene and preventive care.",
    coreSkills: ["Clinical Diagnosis & Treatment Planning", "Dental Procedures (Restorative, Endodontics, Periodontics)", "Oral Surgery", "Dental Radiology & Imaging", "Patient Management & Communication", "Manual Dexterity & Precision", "Infection Control & Sterilization"],
    nigeriaContext: {
      description: "Nigeria has a severe shortage of dentists (~3,000 for 200+ million people). OAU, UNILAG, UI, and UNN have dental schools. Dentists enjoy very high demand, excellent salaries, flexible work arrangements, and the option to run private clinics. Unlike medicine, dentists often work regular hours with less emergency stress. Specialization opportunities exist (orthodontics, oral surgery, pediatric dentistry).",
      teachingStyle: "First 2-3 years are medical foundation (anatomy, physiology, pathology), then intensive dental-specific training in dental school clinics. Students treat real patients under supervision, performing hundreds of procedures before graduation. Strong emphasis on manual skills and patient care.",
      careerOpportunities: [
        "General Dental Practitioner",
        "Specialist (Orthodontist, Oral Surgeon, Periodontist, Prosthodontist, Pediatric Dentist)",
        "Public Health Dentist",
        "Dental Consultant (Teaching Hospitals)",
        "Forensic Odontologist",
        "Dental Practice Owner",
        "Dental Product Sales/Training"
      ],
      salaryRange: "NGN 3,600,000 - NGN 24,000,000+/year (private practice earns most)"
    },
    globalContext: {
      description: "Dentists are in demand globally and enjoy excellent quality of life, high income, and job security. The profession offers work-life balance rare in healthcare. Many dentists own their practices and have entrepreneurial freedom. Licensing required in each country, but pathways exist for international dentists.",
      teachingStyle: "Rigorous clinical training with simulated practice (phantom heads) before treating patients. Students must complete minimum procedure requirements. Balance of science, clinical skills, and business/practice management. Continuing education is mandatory throughout career.",
      careerOpportunities: [
        "General Dentist",
        "Specialist (Orthodontics, Oral Surgery, Endodontics, etc.)",
        "Cosmetic Dentist",
        "Dental Practice Owner",
        "Academic Dentist/Researcher",
        "Corporate Dentistry (Chains)",
        "Public Health Dentist"
      ],
      salaryRange: "USD 120,000 - USD 300,000+/year"
    },
    careerPath: {
      dayToDay: "Examining patients' teeth and gums, diagnosing dental issues (cavities, gum disease, oral cancer), performing treatments (fillings, extractions, root canals, crowns), taking and interpreting X-rays, educating patients on oral hygiene, referring complex cases to specialists, managing dental clinic operations, working with dental assistants and hygienists.",
      typicalEmployers: ["Private dental clinics (own or employed)", "Teaching hospitals", "Government hospitals and health centers", "Military/police medical services", "Dental chains/franchises", "NGOs (dental outreach programs)", "Dental product companies"]
    },
    curriculum: {
      year1: ["Anatomy", "Physiology", "Biochemistry", "Dental Anatomy", "Introduction to Dentistry", "Medical Ethics"],
      year2: ["Pathology", "Pharmacology", "Microbiology", "Oral Biology", "Dental Materials Science", "Pre-clinical Dentistry (Phantom Practice)"],
      year3: ["Operative Dentistry", "Oral Pathology", "Periodontology", "Endodontics", "Prosthodontics I", "Community Dentistry", "Clinical Practice Begins"],
      year4: ["Oral & Maxillofacial Surgery", "Orthodontics", "Pediatric Dentistry", "Prosthodontics II", "Dental Radiology", "Extensive Clinical Practice"],
      year5: ["Advanced Clinical Rotations", "Oral Medicine", "Anesthesia in Dentistry", "Practice Management", "Research Project", "Final Clinical Competency Exams"]
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Technology (digital X-rays, CAD/CAM crowns, 3D printing, laser dentistry) is enhancing dentistry, not replacing dentists. AI can assist diagnosis, but the hands-on clinical work and patient relationship remain irreplaceable. Cosmetic dentistry and implants are growing rapidly.",
      trends: ["Digital Dentistry (CAD/CAM, 3D Printing)", "Dental Implants", "Clear Aligners (Invisalign)", "Laser Dentistry", "Teledentistry", "Cosmetic Dentistry Boom", "Minimally Invasive Techniques", "AI Diagnostic Tools"]
    },
    successPathway: {
      internships: ["Dental hospital rotations (part of curriculum)", "Community dental outreach", "Private clinic attachments", "Dental public health programs"],
      certifications: ["MDCN (Medical & Dental Council of Nigeria) Registration", "Specialty Training (3-5 years post-DDS)", "BLS/ACLS", "Dental Software (Dentrix, Eaglesoft)", "Implantology Courses"],
      projects: ["Clinical case presentations", "Community oral health campaigns", "Dental research publications", "Dental practice business plans"],
      volunteering: ["Free dental outreach to underserved communities", "School oral health education", "Mission trips", "Professional association activities"]
    },
    schools: allSchools,
    interestMatch: ["health", "helping-others", "precision-work"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: -1 }
  },

  // MEDICAL REHABILITATION
  {
    id: "medical-rehabilitation",
    name: "Medical Rehabilitation Sciences",
    category: "Health & Medicine",
    overview: "Medical Rehabilitation (also called Rehabilitation Sciences or Allied Health) encompasses professions that help patients recover function and independence after illness, injury, or disability. This includes Physiotherapy, Occupational Therapy, Prosthetics & Orthotics, and Speech-Language Pathology. Rehabilitation professionals work with stroke patients, accident victims, athletes, children with developmental delays, and elderly patients.",
    coreSkills: ["Patient Assessment & Diagnosis", "Therapeutic Exercise & Manual Therapy", "Assistive Technology & Adaptive Equipment", "Neurological Rehabilitation", "Musculoskeletal Treatment", "Patient Education & Counseling", "Interdisciplinary Teamwork"],
    nigeriaContext: {
      description: "Nigeria has a critical shortage of rehabilitation professionals. OAU is a leader in Medical Rehabilitation training. Growing awareness of stroke rehabilitation, sports injuries, pediatric developmental issues, and geriatric care is driving demand. Opportunities in hospitals, specialized rehabilitation centers, sports teams, schools for children with disabilities, and private practice.",
      teachingStyle: "Balanced clinical and theoretical training. Students spend significant time in teaching hospital rehabilitation departments, treating patients under supervision. Hands-on practice with therapeutic techniques, equipment (wheelchairs, prosthetics), and patient management.",
      careerOpportunities: [
        "Physiotherapist",
        "Occupational Therapist",
        "Prosthetist & Orthotist",
        "Speech-Language Pathologist",
        "Sports Rehabilitation Specialist",
        "Rehabilitation Center Manager",
        "Academic/Researcher in Rehabilitation"
      ],
      salaryRange: "NGN 2,400,000 - NGN 9,600,000/year"
    },
    globalContext: {
      description: "Rehabilitation professionals are in high demand globally, particularly in aging populations (USA, Canada, UK, Australia). The profession offers excellent work-life balance, diverse work settings, and the satisfaction of helping people regain independence. Licensing required but pathways exist for internationally trained therapists.",
      teachingStyle: "Evidence-based practice with focus on functional outcomes. Extensive clinical placements across diverse settings (hospitals, schools, nursing homes, outpatient clinics, sports facilities). Strong emphasis on patient-centered care and cultural competence.",
      careerOpportunities: [
        "Physical Therapist",
        "Occupational Therapist",
        "Speech-Language Pathologist",
        "Rehabilitation Counselor",
        "Hand Therapist",
        "Neurological Rehabilitation Specialist",
        "Pediatric Therapist"
      ],
      salaryRange: "USD 60,000 - USD 100,000/year"
    },
    careerPath: {
      dayToDay: "Assessing patients' physical/cognitive abilities and limitations, designing individualized treatment plans, conducting therapy sessions (exercises, manual therapy, functional training), teaching patients how to use assistive devices (crutches, wheelchairs, communication boards), educating families on home care, documenting progress and adjusting treatment plans, collaborating with doctors, nurses, and other therapists.",
      typicalEmployers: ["Hospitals (rehabilitation departments)", "Specialized rehabilitation centers", "Sports clubs and fitness centers", "Schools (special needs programs)", "Nursing homes and geriatric care facilities", "Home health agencies", "Private practice"]
    },
    curriculum: {
      year1: ["Anatomy & Physiology", "Kinesiology", "Psychology", "Introduction to Rehabilitation", "Medical Terminology", "First Aid & CPR"],
      year2: ["Neuroanatomy", "Pathology", "Therapeutic Exercise", "Assessment Techniques", "Modalities (Heat, Cold, Ultrasound, Electrical Stimulation)", "Clinical Practice I"],
      year3: ["Musculoskeletal Rehabilitation", "Neurological Rehabilitation", "Cardiopulmonary Rehabilitation", "Pediatric Rehabilitation", "Geriatric Rehabilitation", "Clinical Practice II"],
      year4: ["Orthopedics & Sports Rehabilitation", "Advanced Techniques", "Assistive Technology & Prosthetics", "Professional Practice & Ethics", "Research Project", "Clinical Practice III"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "Technology (robotics, virtual reality, AI-powered assessment tools, telehealth) is enhancing rehabilitation, but the hands-on, relationship-based nature of therapy remains irreplaceable. Aging populations globally are driving unprecedented demand.",
      trends: ["Telehealth/Tele-Rehabilitation", "Robotic-Assisted Therapy", "Virtual Reality for Neuro Rehab", "Sports Performance Optimization", "Geriatric Care (Aging Populations)", "Pediatric Developmental Therapy", "Chronic Pain Management"]
    },
    successPathway: {
      internships: ["Hospital rehabilitation departments (rotations part of curriculum)", "Sports clinics", "Special needs schools", "Community rehabilitation centers"],
      certifications: ["Licensed Physiotherapist/OT/SLP (National boards)", "Specialized Certifications (Neurological, Sports, Pediatric)", "BLS/CPR", "Manual Therapy Certifications", "Dry Needling"],
      projects: ["Clinical case studies", "Community rehabilitation outreach", "Research on rehabilitation outcomes", "Assistive device innovation projects"],
      volunteering: ["Disability support organizations", "Free rehabilitation camps", "Sports injury prevention education", "Stroke awareness campaigns"]
    },
    schools: allSchools,
    interestMatch: ["health", "helping-others", "science"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: -1 }
  },

  // FAMILY, NUTRITION AND CONSUMER SCIENCES
  {
    id: "family-nutrition-consumer-sciences",
    name: "Family, Nutrition & Consumer Sciences",
    category: "Health & Social Sciences",
    overview: "This multidisciplinary field combines nutrition science, family studies, consumer economics, and home management. Students learn about human nutrition, dietetics, food science, family dynamics, child development, consumer behavior, textile science, and household resource management. Graduates work to improve family well-being, public health nutrition, consumer protection, and quality of life.",
    coreSkills: ["Nutrition & Dietetics", "Food Science & Safety", "Family & Child Development", "Consumer Education & Protection", "Textile Science & Fashion", "Community Nutrition Programs", "Research & Data Analysis"],
    nigeriaContext: {
      description: "OAU offers the premier program in this field. Growing health awareness (obesity, diabetes, malnutrition) and consumer rights movements are driving demand. Careers span nutrition/dietetics, food industry, consumer advocacy, family counseling, hospitality, fashion/textiles, and education. Many graduates work in hospitals, food companies, NGOs, government agencies, and schools.",
      teachingStyle: "Integrated approach covering nutrition science, family studies, and consumer economics. Practical components include food labs, nutrition counseling simulations, textile workshops, and community outreach projects. Strong emphasis on improving Nigerian family welfare.",
      careerOpportunities: [
        "Dietitian/Nutritionist (Hospitals, Clinics)",
        "Food Product Developer",
        "Nutrition Educator/Public Health Nutritionist",
        "Consumer Affairs Officer",
        "Family Life Educator",
        "Textile/Fashion Entrepreneur",
        "Hospitality Manager"
      ],
      salaryRange: "NGN 1,800,000 - NGN 7,200,000/year"
    },
    globalContext: {
      description: "Globally known as Family & Consumer Sciences or Home Economics (though the field has evolved significantly). Dietitians and nutritionists are in high demand due to obesity epidemics and aging populations. Consumer science graduates work in product testing, consumer advocacy, sustainability, and public health. Strong career opportunities in healthcare, food industry, and education.",
      teachingStyle: "Science-based approach to practical life skills. Heavy emphasis on evidence-based nutrition, consumer research methods, and family systems theory. Clinical rotations for dietetics track. Community engagement and service learning integrated.",
      careerOpportunities: [
        "Registered Dietitian",
        "Nutrition Scientist/Researcher",
        "Public Health Nutritionist",
        "Consumer Scientist",
        "Family & Consumer Sciences Teacher",
        "Food Safety Specialist",
        "Community Nutrition Coordinator"
      ],
      salaryRange: "USD 45,000 - USD 85,000/year"
    },
    careerPath: {
      dayToDay: "Activities vary by specialization: Dietitians assess patients' nutritional needs and create meal plans. Food scientists develop and test new products. Consumer educators teach financial literacy and smart purchasing. Family educators counsel families on parenting, relationships, and household management. Community nutritionists run feeding programs and health education campaigns.",
      typicalEmployers: ["Hospitals (dietetics departments)", "Food companies (Nestlé, Unilever, Dangote)", "Government health/consumer agencies (NAFDAC, FCCPC)", "NGOs (nutrition and family programs)", "Schools (nutrition/family life education)", "Research institutions", "Private practice (nutrition consulting)"]
    },
    curriculum: {
      year1: ["Introduction to Nutrition", "Food Science Basics", "Chemistry & Biochemistry", "Human Anatomy & Physiology", "Family Studies", "Textile Science"],
      year2: ["Nutrition Across Lifespan", "Food Preparation & Processing", "Consumer Economics", "Child Development", "Clothing Construction", "Research Methods"],
      year3: ["Clinical Nutrition & Dietetics", "Community Nutrition", "Consumer Protection & Rights", "Family Counseling", "Fashion & Design", "Food Safety & Quality"],
      year4: ["Medical Nutrition Therapy", "Public Health Nutrition", "Nutrition Education & Counseling", "Entrepreneurship (Food/Fashion)", "Research Project", "Internship/Practicum"]
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 9,
      techImpact: "Technology (apps for nutrition tracking, online counseling, food safety sensors, sustainable textiles) is enhancing the field. Rising health consciousness, personalized nutrition, and sustainability movements are creating new opportunities. Human expertise in counseling and education remains critical.",
      trends: ["Personalized Nutrition & Nutrigenomics", "Plant-Based Diets & Food Innovation", "Sustainable Fashion & Textiles", "Digital Health & Nutrition Apps", "Consumer Sustainability Education", "Functional Foods & Nutraceuticals", "Family Mental Health Awareness"]
    },
    successPathway: {
      internships: ["Hospital dietetics departments", "Food companies (R&D/QC)", "Consumer protection agencies", "Family support NGOs", "School nutrition programs"],
      certifications: ["Registered Dietitian (RD)", "Food Safety Certifications (HACCP)", "Counseling Certifications", "Nutrition Coaching", "Consumer Rights Advocacy"],
      projects: ["Community nutrition assessments", "Food product development", "Family education workshops", "Consumer research studies", "Fashion/textile design portfolios"],
      volunteering: ["Community feeding programs", "Malnutrition screening camps", "Consumer education outreach", "Family counseling centers", "School health programs"]
    },
    schools: allSchools,
    interestMatch: ["health", "helping-others", "science"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: -1 }
  },

  // PETROLEUM ENGINEERING
  {
    id: "petroleum-engineering",
    name: "Petroleum Engineering",
    category: "Engineering",
    overview: "Petroleum Engineering is the engineering discipline focused on finding, extracting, and producing oil and natural gas from underground reservoirs. Petroleum engineers design drilling operations, optimize production, manage reservoirs, and ensure safety and environmental compliance. This field combines geology, physics, chemistry, and engineering to maximize hydrocarbon recovery.",
    coreSkills: ["Reservoir Engineering & Modeling", "Drilling Engineering", "Production Engineering", "Well Design & Completion", "Petroleum Geology", "Fluid Mechanics & Thermodynamics", "Economic Analysis & Project Management"],
    nigeriaContext: {
      description: "Nigeria's economy heavily depends on oil and gas, making petroleum engineering one of the most lucrative and strategic fields. Covenant University and University of Port Harcourt offer top programs. Petroleum engineers work for oil majors (Shell, Chevron, TotalEnergies, ExxonMobil), service companies (Schlumberger, Baker Hughes), and indigenous operators. Salaries are among the highest in Nigeria. The energy transition is creating new challenges but oil/gas will remain vital for decades.",
      teachingStyle: "Strong theoretical foundation in engineering and geology, combined with industry-standard software (Petrel, Eclipse, CMG). Field trips to oil fields, refineries, and offshore platforms. Industry partnerships provide internships and guest lectures. Emphasis on safety and environmental management.",
      careerOpportunities: [
        "Reservoir Engineer",
        "Drilling Engineer",
        "Production Engineer",
        "Petroleum Geologist",
        "Completions Engineer",
        "Facilities Engineer",
        "Petroleum Economist/Project Manager"
      ],
      salaryRange: "NGN 4,800,000 - NGN 24,000,000+/year (offshore and expat roles pay much more)"
    },
    globalContext: {
      description: "Petroleum engineers are in demand globally in oil/gas producing regions: Middle East, North America, Latin America, Russia, and Southeast Asia. Very high salaries, particularly for experienced professionals and those willing to work offshore or in remote locations. The energy transition is shifting some focus to carbon capture, geothermal, and hydrogen, creating new opportunities for petroleum engineers.",
      teachingStyle: "Rigorous engineering fundamentals with specialized courses in drilling, production, and reservoir management. Heavy use of simulation software and economic modeling. Many programs offer co-op/internship semesters with energy companies. Graduate degrees (MS, PhD) are common for research and senior roles.",
      careerOpportunities: [
        "Petroleum Engineer (Upstream)",
        "Reservoir Engineer",
        "Drilling Engineer",
        "Production Optimization Engineer",
        "Enhanced Oil Recovery (EOR) Specialist",
        "Carbon Capture & Storage Engineer",
        "Energy Transition Consultant"
      ],
      salaryRange: "USD 90,000 - USD 200,000+/year"
    },
    careerPath: {
      dayToDay: "Activities vary by specialization: Reservoir engineers analyze well data and run simulations to optimize production. Drilling engineers design well plans and oversee drilling operations. Production engineers troubleshoot wells, design artificial lift systems, and optimize flow rates. All work closely with geologists, geophysicists, and field operators. Significant time using technical software, analyzing data, and solving complex engineering problems.",
      typicalEmployers: ["Oil majors (Shell, Chevron, ExxonMobil, BP, TotalEnergies)", "National oil companies (NNPC, Saudi Aramco, Petronas)", "Service companies (Schlumberger, Halliburton, Baker Hughes)", "Independent producers", "Consulting firms", "Government regulatory agencies", "Energy transition companies (geothermal, CCS)"]
    },
    curriculum: {
      year1: ["Mathematics (Calculus, Differential Equations)", "Physics", "Chemistry", "Engineering Drawing", "Introduction to Petroleum Engineering", "Geology"],
      year2: ["Fluid Mechanics", "Thermodynamics", "Petroleum Geology", "Rock & Fluid Properties", "Engineering Mechanics", "Drilling Engineering I"],
      year3: ["Reservoir Engineering I & II", "Drilling Engineering II", "Well Testing", "Production Engineering", "Natural Gas Engineering", "Petroleum Economics"],
      year4: ["Advanced Reservoir Simulation", "Enhanced Oil Recovery", "Well Completion & Stimulation", "Facilities & Pipeline Engineering", "Petroleum Project Management", "Capstone Design Project"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 7,
      techImpact: "AI and automation are optimizing drilling, production, and reservoir management. Digital oilfields and IoT sensors are transforming operations. While the energy transition will reduce long-term demand for petroleum engineers, their skills are transferable to geothermal, hydrogen, and carbon storage. Oil/gas will remain essential for 30+ years, ensuring career viability.",
      trends: ["Digital Oilfields & Automation", "Enhanced Oil Recovery (EOR)", "Carbon Capture & Storage (CCS)", "Geothermal Energy", "Offshore & Deepwater Development", "Unconventional Resources (Shale, Tight Oil)", "Hydrogen Production from Natural Gas", "Energy Transition"]
    },
    successPathway: {
      internships: ["Oil & gas companies (summer internships critical)", "Service companies (field roles)", "Research institutes", "Regulatory agencies (DPR, NUPRC)"],
      certifications: ["PE (Professional Engineer) License", "SPE Membership", "Well Control Certifications", "HSE Certifications", "Software Certifications (Petrel, CMG, Eclipse)"],
      projects: ["Reservoir simulation projects", "Drilling optimization studies", "Economic analysis of oil field development", "Participate in SPE competitions", "Research on EOR techniques"],
      volunteering: ["Energy education outreach", "Environmental remediation in oil communities", "SPE student chapter activities", "STEM mentoring"]
    },
    schools: allSchools,
    interestMatch: ["engineering", "analytical", "problem-solving"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: 0 }
  },

  // CRIMINOLOGY AND SECURITY STUDIES
  {
    id: "criminology-security-studies",
    name: "Criminology & Security Studies",
    category: "Social Sciences & Law",
    overview: "Criminology & Security Studies examines crime, criminal behavior, law enforcement, security management, and crime prevention. Students study the causes of crime, criminal justice systems, policing strategies, security risk assessment, intelligence analysis, and corrections. This interdisciplinary field combines sociology, psychology, law, and security management to understand and combat crime and security threats.",
    coreSkills: ["Crime Analysis & Investigation", "Security Risk Assessment", "Criminal Law & Justice Systems", "Intelligence & Surveillance", "Cybercrime & Digital Forensics", "Conflict Resolution & Negotiation", "Research & Data Analysis"],
    nigeriaContext: {
      description: "Nigeria's security challenges (insurgency, kidnapping, cybercrime, armed robbery) drive strong demand for criminology and security professionals. Covenant University and UNILORIN offer programs. Graduates work in law enforcement (police, DSS), private security companies, corporate security departments (banks, oil companies), intelligence agencies, and NGOs. Growing field with diverse career paths and increasing importance.",
      teachingStyle: "Multidisciplinary approach combining theory (criminal psychology, sociology of deviance) with practical skills (crime scene investigation, security management, intelligence analysis). Guest lectures from security professionals, case study analysis, and field visits to prisons, police stations, and security installations.",
      careerOpportunities: [
        "Crime Analyst/Intelligence Officer",
        "Security Manager (Corporate/Government)",
        "Private Investigator",
        "Cybercrime Investigator",
        "Corrections Officer/Prison Administrator",
        "Security Consultant",
        "Border & Immigration Officer"
      ],
      salaryRange: "NGN 2,400,000 - NGN 12,000,000/year"
    },
    globalContext: {
      description: "Criminologists and security professionals work in law enforcement, intelligence agencies (FBI, CIA, MI5), private security, corporate security, consulting, and academia. Growing areas include cybercrime, terrorism studies, organized crime, and risk management. Graduate degrees enhance career prospects. Strong job security due to persistent crime and evolving security threats.",
      teachingStyle: "Evidence-based criminology with focus on research methods, statistical analysis of crime data, and policy evaluation. Specialized tracks in areas like forensic psychology, terrorism studies, cybersecurity, or juvenile justice. Internships with law enforcement or security agencies are integral.",
      careerOpportunities: [
        "Criminal Intelligence Analyst",
        "Federal Agent (FBI, DEA, ATF)",
        "Corporate Security Director",
        "Cybersecurity Analyst (Crime-focused)",
        "Forensic Psychologist",
        "Criminology Researcher/Professor",
        "Policy Analyst (Criminal Justice)"
      ],
      salaryRange: "USD 50,000 - USD 120,000/year"
    },
    careerPath: {
      dayToDay: "Activities vary widely: Crime analysts study crime patterns and predict hotspots. Security managers conduct risk assessments and implement protective measures. Investigators interview suspects and witnesses, gather evidence, and build cases. Intelligence officers monitor threats and brief decision-makers. Researchers study crime causation and evaluate intervention programs. Much work involves data analysis, report writing, and collaboration with law enforcement.",
      typicalEmployers: ["Law enforcement (Police, DSS, EFCC, ICPC)", "Private security companies (G4S, Halogen)", "Corporate security departments (banks, oil companies, telcos)", "Intelligence agencies", "Prisons and correctional services", "Border control and immigration", "NGOs (human rights, crime prevention)", "Universities (research/teaching)"]
    },
    curriculum: {
      year1: ["Introduction to Criminology", "Sociology", "Psychology", "Introduction to Law", "Research Methods", "Statistics"],
      year2: ["Criminal Law & Procedure", "Policing & Law Enforcement", "Crime Prevention Strategies", "Victimology", "Deviant Behavior", "Security Management"],
      year3: ["Criminal Investigation", "Cybercrime & Digital Forensics", "Organized Crime & Terrorism", "Intelligence Analysis", "Penology & Corrections", "Forensic Psychology"],
      year4: ["Advanced Criminological Theory", "Security Risk Assessment", "Conflict & Crisis Management", "Comparative Criminal Justice", "Research Project", "Practicum/Internship"]
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 10,
      techImpact: "Technology (AI for crime prediction, facial recognition, digital forensics, big data analytics) is transforming criminology and security. Cybercrime is exploding, creating huge demand for tech-savvy criminologists. However, understanding human behavior, ethical decision-making, and strategic thinking remain irreplaceable.",
      trends: ["Cybercrime & Digital Forensics", "AI for Predictive Policing", "Terrorism & Radicalization Studies", "Organized Crime Networks", "Human Trafficking Prevention", "Private Security Growth", "Restorative Justice Programs", "Evidence-Based Policing"]
    },
    successPathway: {
      internships: ["Police departments (investigative units)", "Security companies", "Intelligence agencies", "Prison/probation services", "Legal aid organizations"],
      certifications: ["Certified Protection Professional (CPP)", "Security+ or CISSP (for cybercrime)", "Forensic Certifications", "Investigation Licenses", "Crisis Management"],
      projects: ["Crime data analysis projects", "Security audits for organizations", "Case study analyses", "Policy research papers", "Community crime prevention initiatives"],
      volunteering: ["Crime victims support services", "Youth mentoring/diversion programs", "Prison education programs", "Neighborhood watch coordination", "Domestic violence awareness"]
    },
    schools: allSchools,
    interestMatch: ["social-justice", "analytical", "problem-solving"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 0, riskVsStability: -1 }
  },
];
