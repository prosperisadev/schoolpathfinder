import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.join(__dirname, '../src/data/universities.ts');
const generatedPath = path.join(__dirname, 'generated_universities.ts');

let targetContent = fs.readFileSync(targetPath, 'utf8');
const generatedContent = fs.readFileSync(generatedPath, 'utf8');

// Extract new blocks
const newUniversitiesMatch = generatedContent.match(/export const nigerianUniversities: School\[\] = (\[[\s\S]*?\]);/);
const newOfferingsMatch = generatedContent.match(/export const UNIVERSITY_COURSE_OFFERINGS: Record<string, UniversityCourseOffering\[\]> = (\{[\s\S]*?\});/);

if (!newUniversitiesMatch || !newOfferingsMatch) {
    console.error('Could not find generated blocks');
    process.exit(1);
}

const newUniversities = newUniversitiesMatch[0]; // Full export statement
const newOfferings = newOfferingsMatch[0]; // Full export statement

// Replace in target
// We need to be careful with regex replacement of large blocks.
// Instead of complex regex for the *target*, let's just find the start of the variables and assume they end at the corresponding closing punctuation logic, 
// OR simpler: find the variable declaration and replace until the next export or end of variable.

// Method: Replace using exact string matching if possible, but we don't know exact old content without reading it.
// We'll use a regex that matches the variable declaration until the semicolon.
// Note: This assumes the file is well-formed and ends with a semicolon.

// Regex for nigerianUniversities
// Matches: export const nigerianUniversities: School[] = [ ... ];
targetContent = targetContent.replace(
    /export const nigerianUniversities: School\[\] = \[[\s\S]*?\];/g,
    newUniversities
);

// Regex for UNIVERSITY_COURSE_OFFERINGS
// Matches: export const UNIVERSITY_COURSE_OFFERINGS: Record<string, UniversityCourseOffering[]> = { ... };
targetContent = targetContent.replace(
    /export const UNIVERSITY_COURSE_OFFERINGS: Record<string, UniversityCourseOffering\[\]> = \{[\s\S]*?\};/g,
    newOfferings
);

fs.writeFileSync(targetPath, targetContent);
console.log('Successfully updated universities.ts');
