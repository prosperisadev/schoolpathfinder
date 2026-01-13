import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'universities_data.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const universities = JSON.parse(rawData);

const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-') 
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

const getCourses = (uni) => {
  const name = uni.name.toLowerCase();
  const type = uni.type.toLowerCase();
  
  let courses = [
    { courseId: "economics", rankingScore: 80 },
    { courseId: "accounting", rankingScore: 80 },
    { courseId: "business-administration", rankingScore: 80 },
    { courseId: "political-science", rankingScore: 75 },
    { courseId: "sociology", rankingScore: 75 },
    { courseId: "mass-communication", rankingScore: 78 }
  ];

  if (name.includes('technology') || name.includes('science') || name.includes('polytechnic') || name.includes('agriculture')) {
    courses.push(
      { courseId: "computer-science", rankingScore: 85 },
      { courseId: "mechanical-engineering", rankingScore: 85 },
      { courseId: "electrical-engineering", rankingScore: 85 },
      { courseId: "civil-engineering", rankingScore: 82 },
      { courseId: "biochemistry", rankingScore: 80 },
      { courseId: "microbiology", rankingScore: 80 },
      { courseId: "architecture", rankingScore: 78 }
    );
  }

  if (name.includes('agriculture')) {
    courses.push(
      { courseId: "agricultural-science", rankingScore: 90 },
      { courseId: "food-science", rankingScore: 88 }
    );
  }

  if (name.includes('medical') || name.includes('health') || 
     (type === 'federal' && !name.includes('technology')) || 
     (type === 'state' && !name.includes('technology'))) {
     courses.push(
       { courseId: "medicine", rankingScore: 85 },
       { courseId: "pharmacy", rankingScore: 82 },
       { courseId: "nursing", rankingScore: 80 },
       { courseId: "medical-lab-science", rankingScore: 78 }
     );
  }

  if (!name.includes('technology') && !name.includes('agriculture') && !name.includes('medical') && !name.includes('science')) {
      courses.push({ courseId: "law", rankingScore: 85 });
  }

  return courses.map(c => ({
      ...c,
      available: true,
      rankingScore: Math.floor(c.rankingScore + (Math.random() * 10) - 5)
  }));
};

const processedUniversities = universities.map(uni => {
  const id = uni.abbreviation 
      ? uni.abbreviation.toLowerCase().replace(/[^a-z0-9]/g, '') 
      : slugify(uni.name);
  
  const isPrivate = uni.type === 'Private';
  const tuitionRange = isPrivate 
      ? { min: 300000, max: 2500000, currency: "NGN" }
      : { min: 50000, max: 150000, currency: "NGN" };
  
  const pros = isPrivate 
      ? ["Modern facilities", "No strikes", "Faster academic calendar"]
      : ["Affordable tuition", "Established reputation", "Diverse student body"];
      
  const cons = isPrivate 
      ? ["Expensive tuition", "Strict rules"]
      : ["Potential strikes", "Infrastructure challenges", "Large class sizes"];
  
  return {
    id: id,
    name: uni.name,
    location: "nigeria",
    country: "Nigeria",
    tuitionRange,
    scholarshipAvailable: isPrivate,
    pros,
    cons,
    ranking: 0,
    admissionRequirements: {
      waecSubjects: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
      minimumWaecGrade: "5 credits including English and Mathematics",
      jambScore: isPrivate ? 160 : 180,
      jambSubjects: ["Use of English", "3 relevant subjects"],
      postUtme: !isPrivate,
    },
    _type: uni.type, 
    _courses: getCourses(uni)
  };
});

processedUniversities.forEach((u, i) => u.ranking = i + 1);

const uniString = `export const nigerianUniversities: School[] = ${JSON.stringify(processedUniversities.map(u => {
  const { _type, _courses, ...rest } = u;
  return rest;
}), null, 2)};`;

const offeringsMap = {};
processedUniversities.forEach(u => {
    offeringsMap[u.id] = u._courses;
});

const offeringsString = `export const UNIVERSITY_COURSE_OFFERINGS: Record<string, UniversityCourseOffering[]> = ${JSON.stringify(offeringsMap, null, 2)};`;

fs.writeFileSync(path.join(__dirname, 'generated_universities.ts'), uniString + '\n\n' + offeringsString);
