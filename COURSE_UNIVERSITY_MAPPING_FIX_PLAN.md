# Course-University Mapping System Fix Plan

## Problem Analysis

### Current State
- **Total Nigerian Universities**: 171 (deduplicated to ~166 unique)
- **Universities with Rankings in universityRankings.ts**: Only 17 Nigerian universities
  - abu, bu, buk, cu, ebsu, futa, futmin, lasu, lautech, oau, ui, uniben, unilag, unilorin, uniport, unn, ucth
- **Universities Missing Rankings**: **~150 universities** (88% of all Nigerian universities)

### Impact
The recommendation engine depends on `universityRankings.ts` to provide:
- Course-specific rankings (1-100 scale)
- Pros and cons for each university-course combination
- Regional filtering (nigeria/africa/global)

Without rankings, universities like:
- **Pan-Atlantic University (pau)** - offers Computer Science, Digital Media, Mechatronics
- **American University of Nigeria (aun)** - leading private university
- **Afe Babalola University (abuad)** - comprehensive private university
- **Federal University of Technology Owerri (futo)** - major tech university
- **Nnamdi Azikiwe University (unizik)** - major federal university

...cannot appear in search results properly, breaking the user experience.

---

## TOP 20 PRIORITY UNIVERSITIES FOR IMMEDIATE RANKING ADDITION

### Tier 1: Critical Federal & Technology Universities (Priority Score: 75-85)

1. **Enugu State University of Science and Technology (esut)**
   - Category: Leading State University with Tech Focus
   - Priority Score: 85
   - Suggested Courses: computer-science, software-engineering, cybersecurity, mechanical-engineering, electrical-engineering, civil-engineering
   - Why: Science & Technology focus, state flagship

2. **Federal University of Technology Owerri (futo)**
   - Category: Technology University
   - Priority Score: 80
   - Suggested Courses: computer-science, software-engineering, cybersecurity, mechanical-engineering, electrical-engineering, civil-engineering, petroleum-engineering
   - Why: One of Nigeria's premier tech universities, missing from rankings despite being widely recognized

3. **Federal University of Agriculture, Abeokuta (funaab)**
   - Category: Agriculture University
   - Priority Score: 75
   - Suggested Courses: agricultural-science, food-science, environmental-science, veterinary-medicine, animal-science
   - Why: Leading agriculture university, critical for agriculture-related courses

### Tier 2: Leading Private & Specialized Universities (Priority Score: 40-70)

4. **African University of Science and Technology (aust)**
   - Category: Leading Private University
   - Priority Score: 70
   - Suggested Courses: computer-science, software-engineering, artificial-intelligence, data-science, cybersecurity
   - Why: Premium tech-focused private university in Abuja

5. **American University of Nigeria (aun)**
   - Category: Leading Private University
   - Priority Score: 65
   - Suggested Courses: computer-science, business-administration, economics, law, mass-communication, international-relations
   - Why: Top-tier private university, American-style curriculum

6. **Afe Babalola University (abuad)**
   - Category: Leading Private University
   - Priority Score: 65
   - Suggested Courses: law, medicine, engineering, computer-science, accounting, mass-communication
   - Why: One of Nigeria's best private universities with comprehensive programs

7. **Pan-Atlantic University (pau)**
   - Category: Leading Private University (Lagos Business School parent)
   - Priority Score: 60
   - Suggested Courses: business-administration, economics, accounting, computer-science, digital-media, mechatronics
   - Why: Connected to LBS, strong business and tech programs

8. **Landmark University (lu)**
   - Category: Leading Private University
   - Priority Score: 55
   - Suggested Courses: agricultural-science, computer-science, engineering, business-administration
   - Why: Known for agriculture and tech, tuition-free model

9. **Redeemer's University (run)**
   - Category: Leading Private University
   - Priority Score: 50
   - Suggested Courses: computer-science, economics, mass-communication, law
   - Why: Well-established private university

10. **Mountain Top University (mtu)**
    - Category: Leading Private University
    - Priority Score: 50
    - Suggested Courses: computer-science, business-administration, mass-communication
    - Why: Growing private university with modern facilities

### Tier 3: Major Federal Universities (Priority Score: 45-55)

11. **Nnamdi Azikiwe University (unizik)**
    - Category: Major Federal University
    - Priority Score: 50
    - Suggested Courses: computer-science, medicine, law, engineering, economics, accounting
    - Why: One of first-generation universities, major federal institution

12. **University of Abuja (uniabuja)**
    - Category: Major Federal University
    - Priority Score: 50
    - Suggested Courses: law, economics, mass-communication, computer-science, medicine
    - Why: Capital city federal university

13. **University of Calabar (unical)**
    - Category: Major Federal University
    - Priority Score: 50
    - Suggested Courses: medicine, law, computer-science, economics
    - Why: Major federal university in South-South

14. **University of Jos (unijos)**
    - Category: Major Federal University
    - Priority Score: 50
    - Suggested Courses: medicine, pharmacy, computer-science, engineering
    - Why: Leading university in North-Central

15. **University of Uyo (uniuyo)**
    - Category: Major Federal University
    - Priority Score: 50
    - Suggested Courses: medicine, engineering, law, computer-science
    - Why: Major federal university in South-South

16. **Usmanu Danfodiyo University (udus)**
    - Category: Major Federal University
    - Priority Score: 50
    - Suggested Courses: medicine, pharmacy, agriculture, computer-science
    - Why: Major northern federal university

### Tier 4: Leading State Universities (Priority Score: 35-55)

17. **Delta State University, Abraka (delsu)**
    - Category: Leading State University
    - Priority Score: 55
    - Suggested Courses: computer-science, law, medicine, accounting, mass-communication
    - Why: Well-established state university

18. **Ekiti State University (eksu)**
    - Category: Leading State University
    - Priority Score: 55
    - Suggested Courses: medicine, law, computer-science, economics
    - Why: Leading state university in Southwest

19. **Imo State University (imsu)**
    - Category: Leading State University
    - Priority Score: 55
    - Suggested Courses: medicine, pharmacy, engineering, computer-science
    - Why: Major state university in Southeast

20. **Kaduna State University (kasu)**
    - Category: Leading State University
    - Priority Score: 55
    - Suggested Courses: computer-science, medicine, engineering, economics
    - Why: Leading state university in Northwest

---

## Data Structure Analysis

### universityRankings.ts Structure
```typescript
export interface UniversityRanking {
  universityId: string;
  courseId: string;
  ranking: number; // 1-100 scale
  pros: string[];
  cons: string[];
  region: "nigeria" | "africa" | "global";
}
```

### UNIVERSITY_COURSE_OFFERINGS in universities.ts
Each university already has course offerings defined with:
- courseId
- available: boolean
- rankingScore: 1-100

**Example for PAU (from universities.ts line ~7xxx):**
- computer-science (rankingScore: 88)
- digital-media (rankingScore: 85)
- mechatronics (rankingScore: 82)
- economics (rankingScore: 80)
- accounting (rankingScore: 82)

---

## Recommended Fix Approach

### Option 1: Automated Bulk Generation (FASTEST - Recommended)
**Time**: 2-4 hours
**Coverage**: All 150 missing universities

**Process**:
1. Read `UNIVERSITY_COURSE_OFFERINGS` from universities.ts (already has all course-university mappings)
2. For each university-course pair, generate:
   - ranking score (use existing rankingScore from UNIVERSITY_COURSE_OFFERINGS)
   - pros (template-based on university type + course category)
   - cons (template-based on university type + location)
3. Auto-generate 3-5 pros/cons per university based on:
   - University type (federal/state/private)
   - Location (urban/rural, region)
   - Specialization (tech/agriculture/medical/general)
   - Course fit

**Pros Template Categories**:
- Federal Universities: "Affordable tuition", "Federal government backing", "Established reputation"
- Private Universities: "Modern facilities", "Smaller class sizes", "Industry partnerships"
- Tech Universities: "Specialized tech labs", "Strong engineering focus", "Tech ecosystem"
- State Universities: "State government support", "Regional presence", "Local industry connections"

**Cons Template Categories**:
- Public Universities: "Potential strikes", "Large class sizes", "Infrastructure challenges"
- New Universities: "Limited alumni network", "Newer institution", "Growing reputation"
- Rural Location: "Remote location", "Limited urban amenities", "Fewer internship opportunities"

### Option 2: Manual High-Priority Addition (TARGETED)
**Time**: 1-2 days per batch of 10 universities
**Coverage**: Top 20-40 universities

**Process**:
1. Research each university individually
2. Write custom pros/cons based on real data
3. Manually assign ranking scores
4. Review and validate

**Recommendation**: Start with Option 1 automated approach for full coverage, then refine top 20 manually if needed.

---

## Implementation Steps

### Step 1: Extract Existing Course-University Data
```bash
# Extract all university course offerings
grep -A 200 '"unizik":\|"pau":\|"aun":' src/data/universities.ts
```

### Step 2: Create Generation Script
Create `scripts/generate-missing-rankings.js`:
- Read UNIVERSITY_COURSE_OFFERINGS
- For each university-course pair, generate ranking entry
- Use intelligent templates for pros/cons
- Output to universityRankings.ts format

### Step 3: Generate Rankings
```bash
node scripts/generate-missing-rankings.js > generated-rankings.ts
```

### Step 4: Merge & Validate
- Append generated rankings to universityRankings.ts
- Remove duplicates
- Validate format
- Test with sample queries

### Step 5: Update courseUniversityMapping.ts
- Ensure all universities with rankings are listed in course mappings
- This file drives which universities appear for each course

---

## Expected Outcomes

### Before Fix
- 17 Nigerian universities with course rankings
- Users searching for courses see limited options
- Premium universities like PAU, AUN missing from results
- Recommendation engine incomplete

### After Fix
- 171 Nigerian universities with course rankings
- Comprehensive search results
- All major universities properly represented
- Fully functional recommendation engine

---

## Next Steps

1. **Confirm approach**: Automated bulk generation vs manual entry
2. **Create generation script**: Build intelligent ranking generator
3. **Generate rankings**: Run script for all 150 missing universities
4. **Test & validate**: Ensure data quality and format
5. **Deploy**: Update universityRankings.ts and courseUniversityMapping.ts

---

## Files to Modify

1. `src/data/universityRankings.ts` - Add 1000+ new ranking entries
2. `src/data/courseUniversityMapping.ts` - Ensure all universities listed per course
3. New file: `scripts/generate-university-rankings.js` - Automated generation script

---

## Estimated Impact

- **User Experience**: 10x more universities in search results
- **Data Completeness**: 88% → 100% coverage
- **Recommendation Quality**: Much more accurate with full dataset
- **Development Time**: 4-8 hours total for automated approach

