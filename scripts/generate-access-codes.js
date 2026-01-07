#!/usr/bin/env node
/**
 * Generate 100 Unique Access Codes
 * 
 * This script generates 100 alphanumeric access codes that are:
 * - Non-sequential (random)
 * - Non-guessable
 * - Unique
 * - Ready to be inserted into the database
 */

import crypto from 'crypto';
import fs from 'fs';

// Function to generate a random alphanumeric code
function generateAccessCode(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    code += chars[randomIndex];
  }
  
  return code;
}

// Function to generate unique codes
function generateUniqueCodes(count = 100, length = 12) {
  const codes = new Set();
  
  while (codes.size < count) {
    const code = generateAccessCode(length);
    codes.add(code);
  }
  
  return Array.from(codes);
}

// Generate 100 unique codes
const accessCodes = generateUniqueCodes(100, 12);

// Format as SQL INSERT statements
const sqlInserts = accessCodes.map((code, index) => {
  return `('${code}')`;
}).join(',\n');

const sqlStatement = `-- Generated Access Codes for Pathfinder
-- Total: ${accessCodes.length} unique codes
-- Generated: ${new Date().toISOString()}

INSERT INTO public.access_codes_bank (code) VALUES
${sqlInserts};
`;

// Create output directory if not exists
const outputDir = './scripts/generated';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save SQL file
const sqlFilePath = `${outputDir}/access_codes_100.sql`;
fs.writeFileSync(sqlFilePath, sqlStatement);

// Save codes as JSON for reference
const codesFilePath = `${outputDir}/access_codes_100.json`;
fs.writeFileSync(codesFilePath, JSON.stringify({
  generated_at: new Date().toISOString(),
  total_codes: accessCodes.length,
  codes: accessCodes,
  instructions: {
    usage: 'Each code can be used only once to unlock premium access',
    expiration: 'Codes do not expire automatically, but are marked as used after first use',
    validation: 'Codes are case-insensitive and trimmed of whitespace',
  }
}, null, 2));

// Also save as CSV for spreadsheet viewing
const csvContent = [
  'Code,Status,Used By Email,Used At',
  ...accessCodes.map(code => `"${code}","unused","",""`)
].join('\n');

const csvFilePath = `${outputDir}/access_codes_100.csv`;
fs.writeFileSync(csvFilePath, csvContent);

// Output to console
console.log(`✅ Generated ${accessCodes.length} unique access codes`);
console.log(`📝 SQL file: ${sqlFilePath}`);
console.log(`📋 JSON file: ${codesFilePath}`);
console.log(`📊 CSV file: ${csvFilePath}`);
console.log('\n--- Sample Codes (First 10) ---');
accessCodes.slice(0, 10).forEach((code, i) => {
  console.log(`${i + 1}. ${code}`);
});
console.log(`\n... and ${accessCodes.length - 10} more codes`);

// Export codes for programmatic use
export {
  generateAccessCode,
  generateUniqueCodes,
  accessCodes,
};
