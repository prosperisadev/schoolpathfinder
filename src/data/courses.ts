import { Course, School } from "@/types";
import { additionalCourses } from "./additionalCourses";
import { newGlobalCourses } from "./newGlobalCourses";
import { NIGERIAN_AVAILABLE_COURSES } from "./courseAvailability";
import { nigerianUniversities, africanUniversities, globalUniversities } from "./universities";

// Use the comprehensive universities from universities.ts
const nigerianSchools: School[] = nigerianUniversities;
const africanSchools: School[] = africanUniversities;
const globalSchools: School[] = globalUniversities;

export const courses: Course[] = [
  {
    id: "computer-science",
    name: "Computer Science",
    category: "Technology",
    overview: "Computer Science is the study of computation, algorithms, and the design of software systems. Students learn to solve complex problems through programming, develop applications, and understand how technology shapes the modern world.",
    coreSkills: ["Programming", "Problem Solving", "Algorithm Design", "Data Structures", "Software Engineering", "Critical Thinking"],
    nigeriaContext: {
      description: "In Nigeria, Computer Science graduates are highly sought after by banks, telecoms, and the growing tech startup ecosystem. The field offers opportunities to work with local tech hubs in Lagos, Abuja, and other cities.",
      teachingStyle: "Theoretical foundation with increasing practical exposure. Many universities are partnering with tech companies for internships.",
      careerOpportunities: ["Software Developer", "Data Analyst", "IT Consultant", "System Administrator", "FinTech Specialist"],
      salaryRange: { min: 2400000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, Computer Science graduates work at top tech companies like Google, Microsoft, and Amazon, or join innovative startups. The field offers remote work opportunities and high mobility.",
      teachingStyle: "Project-based learning with cutting-edge research. Strong emphasis on innovation and entrepreneurship.",
      careerOpportunities: ["Software Engineer", "Machine Learning Engineer", "Product Manager", "Tech Entrepreneur", "Research Scientist"],
      salaryRange: { min: 70000, max: 200000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll spend your days writing code, debugging software, collaborating with teams, attending meetings, and continuously learning new technologies. Work can range from building mobile apps to designing AI systems.",
      typicalEmployers: ["Google", "Microsoft", "Meta", "Amazon", "Flutterwave", "Paystack", "Andela", "Banks", "Consulting Firms"],
    },
    curriculum: {
      year1: ["Introduction to Programming", "Calculus", "Discrete Mathematics", "Computer Systems"],
      year2: ["Data Structures", "Algorithms", "Database Systems", "Object-Oriented Programming"],
      year3: ["Software Engineering", "Operating Systems", "Computer Networks", "Web Development"],
      year4: ["Machine Learning", "Capstone Project", "Electives", "Industry Internship"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "AI and automation will transform the field, making CS skills even more valuable. New specializations in AI, blockchain, and quantum computing are emerging.",
      trends: ["Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Remote Work", "Low-Code Development"],
    },
    successPathway: {
      internships: ["Google Summer of Code", "Microsoft Intern", "Local Tech Startups", "Bank IT Departments"],
      certifications: ["AWS Certified", "Google Cloud Professional", "Microsoft Azure", "Meta Frontend Developer"],
      projects: ["Build a mobile app", "Contribute to open source", "Create a personal portfolio", "Develop a SaaS product"],
      volunteering: ["Teach coding to kids", "Tech mentorship programs", "Community tech hubs"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["technology"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "medicine",
    name: "Medicine & Surgery",
    category: "Health",
    overview: "Medicine is the science and practice of diagnosing, treating, and preventing disease. Medical students learn anatomy, physiology, pharmacology, and clinical skills to become doctors who care for patients.",
    coreSkills: ["Clinical Reasoning", "Patient Care", "Communication", "Anatomy Knowledge", "Empathy", "Decision Making"],
    nigeriaContext: {
      description: "Medicine in Nigeria offers opportunities in public hospitals, private practice, and growing healthcare startups. There's high demand for doctors, though the sector faces infrastructure challenges.",
      teachingStyle: "Rigorous 6-year program with clinical rotations. Strong emphasis on practical experience in teaching hospitals.",
      careerOpportunities: ["General Practitioner", "Specialist Doctor", "Hospital Administrator", "Health Consultant", "Medical Researcher"],
      salaryRange: { min: 3600000, max: 25000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, doctors have opportunities to specialize, conduct research, and practice in well-equipped healthcare systems. Many Nigerian doctors pursue further training abroad.",
      teachingStyle: "Evidence-based medicine with access to cutting-edge technology and research. Strong emphasis on specialization.",
      careerOpportunities: ["Surgeon", "Pediatrician", "Cardiologist", "Research Physician", "Global Health Specialist"],
      salaryRange: { min: 150000, max: 500000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "Your days will involve seeing patients, making diagnoses, prescribing treatments, performing procedures, and collaborating with healthcare teams. Long hours and high responsibility are common.",
      typicalEmployers: ["Teaching Hospitals", "Private Hospitals", "Clinics", "WHO", "NGOs", "Research Institutions"],
    },
    curriculum: {
      year1: ["Anatomy", "Biochemistry", "Physiology", "Cell Biology"],
      year2: ["Pathology", "Pharmacology", "Microbiology", "Immunology"],
      year3: ["Clinical Medicine I", "Surgery Basics", "Internal Medicine", "Pediatrics Introduction"],
      year4: ["Obstetrics & Gynecology", "Psychiatry", "Ophthalmology", "Clinical Rotations"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Telemedicine and AI diagnostics are changing healthcare delivery. Doctors who embrace technology will thrive.",
      trends: ["Telemedicine", "AI Diagnostics", "Personalized Medicine", "Global Health", "Mental Health Focus"],
    },
    successPathway: {
      internships: ["Hospital rotations", "Community health centers", "Research labs"],
      certifications: ["MDCN Registration", "Specialty Board Certifications", "BLS/ACLS"],
      projects: ["Research publications", "Health awareness campaigns", "Community health initiatives"],
      volunteering: ["Medical outreach", "Health education", "Disaster response"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["health"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: 1 },
  },
  {
    id: "law",
    name: "Law",
    category: "Governance & Policy",
    overview: "Law studies the rules and regulations that govern society. Students learn legal reasoning, constitutional law, criminal law, and advocacy skills to become lawyers who uphold justice.",
    coreSkills: ["Legal Research", "Critical Analysis", "Advocacy", "Writing", "Negotiation", "Public Speaking"],
    nigeriaContext: {
      description: "Law in Nigeria offers diverse paths from litigation to corporate law. Lawyers work in courts, law firms, banks, and government. The Nigerian Bar Association regulates practice.",
      teachingStyle: "Case-based learning with moot courts. Strong emphasis on Nigerian legal system and common law traditions.",
      careerOpportunities: ["Barrister", "Solicitor", "Corporate Counsel", "Judge", "Legal Consultant"],
      salaryRange: { min: 1800000, max: 20000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, lawyers specialize in international law, corporate transactions, and human rights. Top law firms offer high salaries but demand long hours.",
      teachingStyle: "Socratic method with emphasis on legal reasoning. Opportunities for international law and comparative studies.",
      careerOpportunities: ["International Lawyer", "Corporate Attorney", "Human Rights Advocate", "Legal Academic", "Policy Advisor"],
      salaryRange: { min: 80000, max: 300000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll research cases, draft legal documents, meet clients, appear in court, negotiate settlements, and advise on legal matters. Work can be high-pressure with tight deadlines.",
      typicalEmployers: ["Law Firms", "Courts", "Banks", "Government Agencies", "NGOs", "International Organizations"],
    },
    curriculum: {
      year1: ["Constitutional Law", "Legal Methods", "Contract Law", "Criminal Law I"],
      year2: ["Property Law", "Tort Law", "Equity", "Criminal Law II"],
      year3: ["Company Law", "Evidence", "Family Law", "Administrative Law"],
      year4: ["Nigerian Legal System", "Legal Practice", "Electives", "Law Clinic"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 8,
      techImpact: "Legal tech is automating routine tasks. Lawyers who embrace technology and specialize in tech law will have advantages.",
      trends: ["Legal Tech", "Cybersecurity Law", "Intellectual Property", "Alternative Dispute Resolution", "ESG Compliance"],
    },
    successPathway: {
      internships: ["Law firm clerkships", "Court internships", "Corporate legal departments"],
      certifications: ["Nigerian Bar", "LLM Specializations", "Mediation Certifications"],
      projects: ["Moot court competitions", "Law review publications", "Pro bono work"],
      volunteering: ["Legal aid clinics", "Human rights organizations", "Community legal education"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["governance-policy"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: -1, riskVsStability: 1 },
  },
  {
    id: "economics",
    name: "Economics",
    category: "Finance & Business",
    overview: "Economics studies how societies allocate scarce resources. Students learn to analyze markets, policy impacts, and economic behavior using mathematical and statistical tools.",
    coreSkills: ["Quantitative Analysis", "Economic Modeling", "Policy Analysis", "Statistics", "Critical Thinking", "Research"],
    nigeriaContext: {
      description: "Economics graduates in Nigeria work in banks, consulting firms, government agencies, and research institutions. The field offers insights into Nigeria's developing economy.",
      teachingStyle: "Balance of theory and applied economics. Growing emphasis on data analysis and econometrics.",
      careerOpportunities: ["Economist", "Financial Analyst", "Policy Advisor", "Consultant", "Research Analyst"],
      salaryRange: { min: 2000000, max: 12000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, economists work at central banks, international organizations, and top consulting firms. The field offers opportunities in policy-making and financial markets.",
      teachingStyle: "Quantitative focus with research opportunities. Strong ties to finance and public policy programs.",
      careerOpportunities: ["Investment Banker", "Central Bank Economist", "IMF/World Bank Analyst", "Data Scientist", "Academic Researcher"],
      salaryRange: { min: 60000, max: 180000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll analyze data, build economic models, write reports, present findings, and advise on policy or business decisions. Work often involves research and strategic thinking.",
      typicalEmployers: ["Central Bank", "Commercial Banks", "Consulting Firms", "Government", "International Organizations", "Think Tanks"],
    },
    curriculum: {
      year1: ["Microeconomics", "Macroeconomics", "Mathematics for Economics", "Statistics"],
      year2: ["Econometrics", "Development Economics", "Monetary Economics", "International Trade"],
      year3: ["Public Finance", "Labor Economics", "Research Methods", "Economic History"],
      year4: ["Advanced Econometrics", "Thesis Project", "Electives", "Internship"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Big data and machine learning are transforming economic analysis. Computational economics is a growing field.",
      trends: ["Data Science in Economics", "Behavioral Economics", "Climate Economics", "Digital Currencies", "Inequality Studies"],
    },
    successPathway: {
      internships: ["Central Bank internships", "Consulting firms", "Research institutions"],
      certifications: ["CFA", "FRM", "Data Analytics Certifications"],
      projects: ["Economic research papers", "Data analysis projects", "Policy briefs"],
      volunteering: ["Economic education", "Financial literacy programs", "Research assistance"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: 0, peopleVsTask: 1, riskVsStability: 0 },
  },
  {
    id: "mass-communication",
    name: "Mass Communication",
    category: "Media & Creative",
    overview: "Mass Communication studies how information is created, distributed, and consumed through various media channels. Students learn journalism, broadcasting, public relations, and digital media.",
    coreSkills: ["Writing", "Storytelling", "Video Production", "Social Media", "Public Speaking", "Research"],
    nigeriaContext: {
      description: "Nigeria has a vibrant media landscape with opportunities in TV, radio, digital media, and advertising. The industry is growing with the rise of digital platforms.",
      teachingStyle: "Practical focus with studio training. Strong emphasis on Nigerian media landscape and ethics.",
      careerOpportunities: ["Journalist", "PR Specialist", "Content Creator", "Broadcaster", "Social Media Manager"],
      salaryRange: { min: 1200000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, media professionals work at major news organizations, tech platforms, and creative agencies. Digital skills are increasingly important.",
      teachingStyle: "Multimedia approach with global perspective. Strong industry connections and internship opportunities.",
      careerOpportunities: ["Digital Journalist", "Documentary Producer", "Communications Director", "Media Strategist", "Podcast Host"],
      salaryRange: { min: 45000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll research stories, conduct interviews, write content, produce videos, manage social media, and collaborate with creative teams. Deadlines are common and work can be fast-paced.",
      typicalEmployers: ["TV Stations", "Newspapers", "Digital Media Companies", "Advertising Agencies", "NGOs", "Corporate Communications"],
    },
    curriculum: {
      year1: ["Introduction to Mass Communication", "Writing for Media", "Media History", "Photography"],
      year2: ["Broadcast Journalism", "Public Relations", "Advertising", "Digital Media"],
      year3: ["Media Law and Ethics", "Documentary Production", "Strategic Communication", "Research Methods"],
      year4: ["Media Management", "Capstone Project", "Internship", "Electives"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "AI is changing content creation and distribution. Journalists must adapt to new platforms and formats.",
      trends: ["Digital Journalism", "Podcasting", "Video Content", "Social Media Influence", "Data Journalism"],
    },
    successPathway: {
      internships: ["Media houses", "PR agencies", "Digital startups"],
      certifications: ["Google Digital Marketing", "HubSpot Content Marketing", "Adobe Certifications"],
      projects: ["Personal blog/podcast", "Documentary project", "Social media portfolio"],
      volunteering: ["Community journalism", "Media literacy education", "Non-profit communications"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["media-creative"],
    personalityMatch: { analyticalVsCreative: 1, structuredVsFlexible: 1, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    category: "Engineering",
    overview: "Mechanical Engineering applies physics and materials science to design, analyze, and manufacture mechanical systems. Students learn thermodynamics, mechanics, and CAD design.",
    coreSkills: ["CAD Design", "Problem Solving", "Mathematics", "Physics", "Project Management", "Technical Writing"],
    nigeriaContext: {
      description: "Mechanical engineers in Nigeria work in manufacturing, oil & gas, automotive, and power sectors. The field offers opportunities in Nigeria's industrialization efforts.",
      teachingStyle: "Strong theoretical foundation with workshop practice. Emphasis on local industry needs.",
      careerOpportunities: ["Design Engineer", "Maintenance Engineer", "Manufacturing Engineer", "Oil & Gas Engineer", "Quality Control"],
      salaryRange: { min: 2400000, max: 15000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, mechanical engineers work in aerospace, automotive, robotics, and renewable energy. The field offers diverse specialization opportunities.",
      teachingStyle: "Research-intensive with access to advanced labs. Strong industry partnerships and co-op programs.",
      careerOpportunities: ["Aerospace Engineer", "Robotics Engineer", "Automotive Designer", "Energy Consultant", "R&D Engineer"],
      salaryRange: { min: 70000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll design components, run simulations, oversee manufacturing, troubleshoot equipment, and collaborate with multidisciplinary teams. Work combines office design with hands-on testing.",
      typicalEmployers: ["Manufacturing Companies", "Oil & Gas Companies", "Automotive Firms", "Aerospace Companies", "Consulting Firms"],
    },
    curriculum: {
      year1: ["Engineering Mathematics", "Physics", "Engineering Drawing", "Introduction to Engineering"],
      year2: ["Mechanics of Materials", "Thermodynamics", "Fluid Mechanics", "CAD/CAM"],
      year3: ["Machine Design", "Heat Transfer", "Control Systems", "Manufacturing Processes"],
      year4: ["Capstone Design Project", "Electives", "Industrial Training", "Professional Ethics"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Automation and green energy are reshaping mechanical engineering. Skills in robotics and sustainable design are increasingly valuable.",
      trends: ["Robotics", "Electric Vehicles", "Renewable Energy", "3D Printing", "Smart Manufacturing"],
    },
    successPathway: {
      internships: ["Manufacturing plants", "Oil & gas companies", "Engineering firms"],
      certifications: ["PMP", "Six Sigma", "AutoCAD Certification", "SolidWorks"],
      projects: ["Design competitions", "Prototype development", "Research projects"],
      volunteering: ["Engineers Without Borders", "STEM education", "Sustainable engineering projects"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["engineering"],
    personalityMatch: { analyticalVsCreative: -1, structuredVsFlexible: -1, peopleVsTask: 1, riskVsStability: 1 },
  },
  {
    id: "international-relations",
    name: "International Relations",
    category: "Governance & Policy",
    overview: "International Relations studies the interactions between nations, international organizations, and global issues. Students learn diplomacy, conflict resolution, and global governance.",
    coreSkills: ["Diplomacy", "Research", "Critical Analysis", "Writing", "Languages", "Cultural Awareness"],
    nigeriaContext: {
      description: "Nigeria's role in African affairs creates opportunities in diplomacy, foreign affairs, and international organizations. Graduates work in government, NGOs, and think tanks.",
      teachingStyle: "Case studies of African and global politics. Emphasis on Nigeria's foreign policy and regional dynamics.",
      careerOpportunities: ["Diplomat", "Foreign Affairs Officer", "Policy Analyst", "NGO Program Manager", "Journalist"],
      salaryRange: { min: 1800000, max: 10000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, IR graduates work at the UN, embassies, international NGOs, and multinational corporations. The field offers opportunities for global mobility.",
      teachingStyle: "Multidisciplinary approach with language requirements. Strong focus on research and debate.",
      careerOpportunities: ["UN Official", "Foreign Service Officer", "International Consultant", "Human Rights Advocate", "Think Tank Researcher"],
      salaryRange: { min: 50000, max: 150000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll research global issues, write policy briefs, attend meetings, negotiate agreements, and represent organizations. Work often involves travel and cross-cultural communication.",
      typicalEmployers: ["Ministry of Foreign Affairs", "United Nations", "African Union", "Embassies", "International NGOs", "Think Tanks"],
    },
    curriculum: {
      year1: ["Introduction to IR", "Political Science", "World History", "Research Methods"],
      year2: ["International Law", "Diplomatic History", "International Organizations", "African Politics"],
      year3: ["Security Studies", "International Political Economy", "Conflict Resolution", "Regional Studies"],
      year4: ["Foreign Policy Analysis", "Thesis", "Internship", "Electives"],
    },
    futureOutlook: {
      relevanceToday: 8,
      relevanceIn5Years: 8,
      techImpact: "Digital diplomacy and cybersecurity are reshaping international relations. Understanding technology's global impact is crucial.",
      trends: ["Cyber Diplomacy", "Climate Governance", "Migration", "China-Africa Relations", "Regional Integration"],
    },
    successPathway: {
      internships: ["Embassies", "UN agencies", "NGOs", "Think tanks"],
      certifications: ["Language certifications", "Project Management", "Mediation training"],
      projects: ["Model UN", "Policy research papers", "International conferences"],
      volunteering: ["Refugee support", "Peace building", "Cultural exchange programs"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["governance-policy", "social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 0, peopleVsTask: -1, riskVsStability: 0 },
  },
  {
    id: "psychology",
    name: "Psychology",
    category: "Social Impact",
    overview: "Psychology is the scientific study of mind and behavior. Students learn about cognitive processes, mental health, human development, and therapeutic techniques.",
    coreSkills: ["Empathy", "Research Methods", "Communication", "Critical Thinking", "Observation", "Counseling"],
    nigeriaContext: {
      description: "Psychology in Nigeria is growing as awareness of mental health increases. Opportunities exist in healthcare, education, HR, and private practice.",
      teachingStyle: "Mix of theory and clinical exposure. Growing emphasis on culturally-relevant approaches to mental health.",
      careerOpportunities: ["Clinical Psychologist", "Counselor", "HR Specialist", "School Psychologist", "Researcher"],
      salaryRange: { min: 1500000, max: 8000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, psychologists work in diverse settings from hospitals to tech companies. Mental health awareness is driving demand for psychological services.",
      teachingStyle: "Evidence-based approach with research opportunities. Strong clinical training and specialization options.",
      careerOpportunities: ["Clinical Psychologist", "UX Researcher", "Organizational Psychologist", "Therapist", "Academic Researcher"],
      salaryRange: { min: 50000, max: 130000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll conduct assessments, provide therapy, design interventions, run research studies, and consult with organizations. Work is often confidential and emotionally demanding.",
      typicalEmployers: ["Hospitals", "Mental Health Centers", "Schools", "Corporations", "Research Institutions", "Private Practice"],
    },
    curriculum: {
      year1: ["Introduction to Psychology", "Research Methods", "Biological Psychology", "Statistics"],
      year2: ["Developmental Psychology", "Social Psychology", "Cognitive Psychology", "Personality Theory"],
      year3: ["Abnormal Psychology", "Clinical Psychology", "Industrial Psychology", "Counseling Techniques"],
      year4: ["Practicum", "Research Project", "Advanced Electives", "Ethics"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 9,
      techImpact: "Digital mental health tools and AI-assisted therapy are emerging. Psychologists who understand technology will have advantages.",
      trends: ["Digital Mental Health", "Workplace Wellbeing", "Neuroscience Integration", "Cultural Psychology", "AI in Therapy"],
    },
    successPathway: {
      internships: ["Mental health facilities", "Schools", "HR departments"],
      certifications: ["Licensed Professional Counselor", "Certified Psychological Tester", "Therapy certifications"],
      projects: ["Research studies", "Community mental health programs", "Awareness campaigns"],
      volunteering: ["Crisis hotlines", "Mental health advocacy", "Community support groups"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["social-impact", "health"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: 1, peopleVsTask: -2, riskVsStability: 1 },
  },
  {
    id: "accounting",
    name: "Accounting",
    category: "Finance & Business",
    overview: "Accounting is the language of business. Students learn financial reporting, auditing, taxation, and management accounting to help organizations track and optimize their finances.",
    coreSkills: ["Financial Analysis", "Attention to Detail", "Excel", "Communication", "Ethics", "Problem Solving"],
    nigeriaContext: {
      description: "Accounting is one of the most in-demand professions in Nigeria. Graduates work in audit firms, banks, corporations, and government agencies.",
      teachingStyle: "Technical training with professional certification focus. Strong emphasis on Nigerian tax law and financial regulations.",
      careerOpportunities: ["Auditor", "Tax Consultant", "Financial Controller", "Bank Officer", "CFO"],
      salaryRange: { min: 1800000, max: 12000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, accountants work at Big 4 firms, multinational corporations, and financial institutions. The profession offers clear career progression.",
      teachingStyle: "Standardized curriculum aligned with global certifications. Strong focus on IFRS and international standards.",
      careerOpportunities: ["Big 4 Auditor", "Investment Analyst", "Forensic Accountant", "Management Consultant", "Finance Director"],
      salaryRange: { min: 55000, max: 160000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll prepare financial statements, analyze data, conduct audits, advise on tax matters, and ensure compliance. Work involves spreadsheets, meetings, and deadline-driven projects.",
      typicalEmployers: ["Big 4 Firms", "Banks", "Corporations", "Government", "Consulting Firms", "Startups"],
    },
    curriculum: {
      year1: ["Financial Accounting I", "Business Mathematics", "Economics", "Business Law"],
      year2: ["Financial Accounting II", "Cost Accounting", "Taxation", "Auditing Principles"],
      year3: ["Management Accounting", "Financial Management", "Corporate Finance", "Advanced Taxation"],
      year4: ["Advanced Auditing", "Accounting Information Systems", "Project", "Professional Ethics"],
    },
    futureOutlook: {
      relevanceToday: 9,
      relevanceIn5Years: 8,
      techImpact: "Automation is changing routine accounting tasks. Accountants must focus on analysis, strategy, and technology skills.",
      trends: ["Cloud Accounting", "Data Analytics", "Sustainability Reporting", "Blockchain", "Advisory Services"],
    },
    successPathway: {
      internships: ["Audit firms", "Banks", "Corporate finance departments"],
      certifications: ["ICAN", "ACCA", "CPA", "CFA"],
      projects: ["Financial modeling", "Tax planning", "Audit simulations"],
      volunteering: ["Financial literacy education", "Non-profit accounting", "Student organizations"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["finance-business"],
    personalityMatch: { analyticalVsCreative: -2, structuredVsFlexible: -2, peopleVsTask: 1, riskVsStability: 2 },
  },
  {
    id: "nursing",
    name: "Nursing Science",
    category: "Health",
    overview: "Nursing is a healthcare profession focused on patient care, health promotion, and disease prevention. Nurses are essential to healthcare systems worldwide.",
    coreSkills: ["Patient Care", "Clinical Skills", "Communication", "Empathy", "Critical Thinking", "Teamwork"],
    nigeriaContext: {
      description: "Nigeria has a shortage of nurses, creating high demand. Nurses work in hospitals, clinics, and community health centers with opportunities for specialization.",
      teachingStyle: "Clinical focus with hospital rotations. Strong emphasis on practical skills and patient interaction.",
      careerOpportunities: ["Registered Nurse", "Midwife", "Nurse Educator", "Community Health Nurse", "Hospital Administrator"],
      salaryRange: { min: 1200000, max: 6000000, currency: "NGN" },
    },
    globalContext: {
      description: "Globally, nurses are in high demand with opportunities for international work. Advanced practice nurses take on expanded roles.",
      teachingStyle: "Evidence-based practice with simulation labs. Strong pathway to advanced degrees and specializations.",
      careerOpportunities: ["Nurse Practitioner", "ICU Nurse", "Travel Nurse", "Nurse Manager", "Clinical Researcher"],
      salaryRange: { min: 60000, max: 120000, currency: "USD" },
    },
    careerPath: {
      dayToDay: "You'll assess patients, administer medications, coordinate care, educate patients and families, and work closely with doctors and other healthcare professionals.",
      typicalEmployers: ["Hospitals", "Clinics", "Nursing Homes", "Schools", "Community Health Centers", "International Organizations"],
    },
    curriculum: {
      year1: ["Anatomy & Physiology", "Fundamentals of Nursing", "Microbiology", "Health Assessment"],
      year2: ["Pharmacology", "Medical-Surgical Nursing", "Maternal Nursing", "Nutrition"],
      year3: ["Pediatric Nursing", "Mental Health Nursing", "Community Health", "Research Methods"],
      year4: ["Nursing Management", "Clinical Practicum", "Specialty Rotations", "Capstone Project"],
    },
    futureOutlook: {
      relevanceToday: 10,
      relevanceIn5Years: 10,
      techImpact: "Technology is enhancing nursing practice through telehealth and digital health records. Nurses must adapt to new care delivery models.",
      trends: ["Telehealth Nursing", "Specialized Nursing", "Global Health", "Community-Based Care", "Nursing Leadership"],
    },
    successPathway: {
      internships: ["Hospital rotations", "Community health placements", "International health programs"],
      certifications: ["NMC Registration", "BLS/ACLS", "Specialty Certifications"],
      projects: ["Quality improvement", "Patient education materials", "Research participation"],
      volunteering: ["Health outreach", "Disaster response", "Community education"],
    },
    schools: [...nigerianSchools, ...africanSchools, ...globalSchools],
    interestMatch: ["health", "social-impact"],
    personalityMatch: { analyticalVsCreative: 0, structuredVsFlexible: -1, peopleVsTask: -2, riskVsStability: 1 },
  },
];

// Combine all courses including new global courses
// Filter duplicates: if a course ID appears in multiple arrays, keep the first occurrence
// Add nigerianAvailable flag based on verified source data
const coursesMap = new Map<string, Course>();

[...courses, ...additionalCourses, ...newGlobalCourses].forEach(course => {
  if (!coursesMap.has(course.id)) {
    // Add nigerianAvailable flag from verification data
    const nigerianAvailable = NIGERIAN_AVAILABLE_COURSES[course.id as keyof typeof NIGERIAN_AVAILABLE_COURSES];
    coursesMap.set(course.id, {
      ...course,
      nigerianAvailable: nigerianAvailable !== undefined ? nigerianAvailable : true, // Default true for legacy courses
    });
  }
});

export const allCourses: Course[] = Array.from(coursesMap.values());

export function getCoursById(id: string): Course | undefined {
  return allCourses.find(course => course.id === id);
}

export function getCoursesByCategory(category: string): Course[] {
  return allCourses.filter(course => course.category === category);
}
