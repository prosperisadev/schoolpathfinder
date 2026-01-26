/**
 * Mapping of course categories to industries for recommendation system
 * Each category maps to one or more industries for interest matching
 */

export const CATEGORY_TO_INDUSTRY_MAP: Record<string, string[]> = {
  "Technology": ["technology"],
  "Health": ["health"],
  "Engineering": ["engineering"],
  "Finance & Business": ["finance-business"],
  "Media & Creative": ["media-creative"],
  "Governance & Policy": ["governance-policy"],
  "Social Impact": ["social-impact"],
  "Education": ["education"],
};

/**
 * Get industries for a given course category
 */
export function getIndustriesForCategory(category: string): string[] {
  return CATEGORY_TO_INDUSTRY_MAP[category] || [];
}
