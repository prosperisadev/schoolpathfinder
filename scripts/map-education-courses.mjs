import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of education-related course IDs that should map to "Education" category
const educationCourses = [
  'adult-education',
  'early-childhood-education',
  'education-and-biology',
  'education-and-chemistry',
  'education-and-christian-religious-studies',
  'education-and-economics',
  'education-and-english-language',
  'education-and-french',
  'education-and-geography',
  'education-and-history',
  'education-and-igbo',
  'education-and-integrated-science',
  'education-and-islamic-studies',
  'education-and-mathematics',
  'education-and-physics',
  'education-and-yoruba',
  'educational-administration',
  'guidance-and-counseling',
  'home-economics-and-education',
  'teacher-education-science',
  'technical-education',
];

console.log(`📚 Mapping ${educationCourses.length} courses to "Education" category...`);
console.log('Courses to map:', educationCourses.join(', '));
