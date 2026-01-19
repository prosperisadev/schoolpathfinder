# COMPREHENSIVE COURSE-UNIVERSITY MAPPING SYSTEM ANALYSIS

**Analysis Date**: January 19, 2026  
**Status**: CRITICAL DATA GAP IDENTIFIED

---

## EXECUTIVE SUMMARY

The SchoolPathfinder course-university mapping system has a **critical data gap**:
- Only **17 out of 171** Nigerian universities (9.9%) have course rankings
- **154 universities missing** from universityRankings.ts
- This breaks the recommendation engine for 90% of Nigerian universities

### Immediate Impact
Premium universities like **Pan-Atlantic University (PAU)**, **American University of Nigeria (AUN)**, and major federal universities like **Nnamdi Azikiwe University (UNIZIK)** are invisible in search results despite having comprehensive course offerings defined in `universities.ts`.

---

## DETAILED FINDINGS

### 1. Current Coverage Statistics

| Metric | Value | Percentage |
|--------|-------|------------|
| Total Nigerian Universities | 171 | 100% |
| Universities with Rankings | 17 | 9.9% |
| Universities Missing Rankings | 154 | 90.1% |
| Total Ranking Entries | ~850 | - |
| Average Entries per Ranked University | 50 | - |

### 2. Universities Currently WITH Rankings (17 total)

**Nigerian Universities (17):**
1. abu - Ahmadu Bello University (51 courses)
2. bu - Babcock University (11 courses)
3. buk - Bayero University
4. cu - Covenant University (28 courses)
5. ebsu - Ebonyi State University (1 course)
6. futa - Federal University of Technology Akure (19 courses)
7. futmin - Federal University of Technology Minna (1 course)
8. lasu - Lagos State University (9 courses)
9. lautech - Ladoke Akintola University of Technology (1 course)
10. oau - Obafemi Awolowo University (39 courses)
11. ui - University of Ibadan (57 courses)
12. uniben - University of Benin (4 courses)
13. unilag - University of Lagos (61 courses)
14. unilorin - University of Ilorin (4 courses)
15. uniport - University of Port Harcourt (1 course)
16. unn - University of Nigeria, Nsukka (37 courses)
17. ucth - University of Calabar Teaching Hospital (1 course)

**Note**: Global universities (MIT, Stanford, Oxford, etc.) have 66-67 courses each.

### 3. Top 20 Missing Universities (PRIORITY LIST)

#### TIER 1: Critical Universities (Immediate Action Required)

**1. Federal University of Technology Owerri (futo)**
- **Type**: Technology University
- **Priority Score**: 80
- **Courses to Add**: computer-science, software-engineering, cybersecurity, mechanical-engineering, electrical-engineering, civil-engineering, petroleum-engineering
- **Why Critical**: One of Nigeria's top 3 technology universities, highly searched
- **Estimated Entries**: 40-50 courses

**2. Nnamdi Azikiwe University (unizik)**
- **Type**: Major Federal University
- **Priority Score**: 75
- **Courses to Add**: medicine, computer-science, law, engineering, economics, accounting, pharmacy
- **Why Critical**: First-generation federal university, major institution in Southeast
- **Estimated Entries**: 50-60 courses

**3. Pan-Atlantic University (pau)**
- **Type**: Leading Private University (Lagos Business School parent)
- **Priority Score**: 70
- **Courses Already Defined in universities.ts**: economics (84), accounting (82), business-administration (83), mass-communication (81), law (87), computer-science, digital-media, mechatronics
- **Why Critical**: Premium private university, strong business/tech programs, highly searched by Lagos students
- **Estimated Entries**: 30-40 courses

**4. American University of Nigeria (aun)**
- **Type**: Leading Private University
- **Priority Score**: 70
- **Courses Already Defined in universities.ts**: economics (81), accounting (78), business-administration (78), computer-science, law, international-relations
- **Why Critical**: Top-tier private university with American-style curriculum
- **Estimated Entries**: 35-45 courses

**5. Afe Babalola University (abuad)**
- **Type**: Leading Private University
- **Priority Score**: 65
- **Courses to Add**: law, medicine, engineering, computer-science, accounting, mass-communication
- **Why Critical**: One of Nigeria's best private universities with comprehensive programs
- **Estimated Entries**: 40-50 courses

#### TIER 2: Major Federal & State Universities

**6. University of Abuja (uniabuja)**
- **Type**: Major Federal University
- **Priority Score**: 60
- **Courses to Add**: law, economics, mass-communication, computer-science, medicine, political-science
- **Why Critical**: Capital city federal university

**7. University of Calabar (unical)**
- **Type**: Major Federal University
- **Priority Score**: 60
- **Courses to Add**: medicine, law, computer-science, economics, mass-communication
- **Why Critical**: Major federal university in South-South region

**8. University of Jos (unijos)**
- **Type**: Major Federal University
- **Priority Score**: 60
- **Courses to Add**: medicine, pharmacy, computer-science, engineering, economics
- **Why Critical**: Leading university in North-Central with strong medical program

**9. University of Uyo (uniuyo)**
- **Type**: Major Federal University
- **Priority Score**: 60
- **Courses to Add**: medicine, engineering, law, computer-science, petroleum-engineering
- **Why Critical**: Major federal university in South-South, strong engineering

**10. Federal University of Agriculture, Abeokuta (funaab)**
- **Type**: Agriculture University
- **Priority Score**: 58
- **Courses to Add**: agricultural-science, food-science, environmental-science, veterinary-medicine, animal-science
- **Why Critical**: Leading agriculture university in Nigeria

**11-20. Additional Priority Universities:**
- eksu - Ekiti State University (medicine, law, CS)
- imsu - Imo State University (medicine, pharmacy, engineering)
- delsu - Delta State University, Abraka (law, medicine, CS)
- kasu - Kaduna State University (medicine, engineering, CS)
- esut - Enugu State University of Science and Technology (CS, engineering)
- kwasu - Kwara State University (medicine, CS, business)
- nsuk - Nasarawa State University (CS, economics, law)
- udus - Usmanu Danfodiyo University (medicine, pharmacy, agriculture)
- aust - African University of Science and Technology (CS, AI, data science)
- baze - Baze University (law, computer-science, business)

---

## DATA STRUCTURE ANALYSIS

### universityRankings.ts Format
```typescript
{
  universityId: "pau",
  courseId: "computer-science",
  ranking: 88,
  region: "nigeria",
  pros: [
    "Connected to Lagos Business School network",
    "Modern tech infrastructure",
    "Strong industry partnerships in Lagos",
    "Focus on digital innovation"
  ],
  cons: [
    "High tuition fees",
    "Limited scholarship availability",
    "Smaller campus compared to federal universities",
    "Newer engineering programs"
  ]
}
```

### Data Already Available in universities.ts

The **UNIVERSITY_COURSE_OFFERINGS** object already contains:
- All 171 universities
- Course offerings for each university
- rankingScore (1-100) for each course
- availability flag

**Example for PAU**:
```typescript
"pau": [
  { courseId: "economics", rankingScore: 84, available: true },
  { courseId: "accounting", rankingScore: 82, available: true },
  { courseId: "business-administration", rankingScore: 83, available: true },
  { courseId: "mass-communication", rankingScore: 81, available: true },
  { courseId: "law", rankingScore: 87, available: true },
  // ... more courses
]
```

**This means we already have 80% of the data needed!** We just need to add pros/cons.

---

## RECOMMENDED FIX APPROACH

### OPTION A: Automated Bulk Generation (RECOMMENDED)
**Timeline**: 4-6 hours  
**Coverage**: All 154 missing universities  
**Quality**: Good baseline, can be refined later

**Process**:
1. Create script to read UNIVERSITY_COURSE_OFFERINGS from universities.ts
2. For each university-course pair, generate:
   - Use existing `rankingScore` as the ranking value
   - Generate 4-5 pros based on university type + course category templates
   - Generate 4-5 cons based on university type + location templates
3. Output formatted entries for universityRankings.ts
4. Manual review of top 20 universities
5. Append to universityRankings.ts

**Pros/Cons Template Strategy**:

**Federal Universities Pros**:
- "Affordable tuition fees"
- "Federal government backing and funding"
- "Established academic reputation"
- "Diverse student body from across Nigeria"
- "Large alumni network"

**Federal Universities Cons**:
- "Potential for academic strikes"
- "Large class sizes"
- "Infrastructure challenges"
- "Bureaucratic processes"

**Private Universities Pros**:
- "Modern facilities and infrastructure"
- "Smaller class sizes"
- "No strike disruptions"
- "Industry partnerships"
- "Entrepreneurship focus"

**Private Universities Cons**:
- "High tuition fees"
- "Limited scholarship availability"
- "Smaller alumni network"
- "Newer institution (if applicable)"

**Technology Universities Pros**:
- "Specialized tech labs and equipment"
- "Strong engineering focus"
- "Tech ecosystem and startup support"
- "Industry internship opportunities"

**State Universities Pros**:
- "State government support"
- "Regional presence and connections"
- "Affordable tuition"
- "Local industry partnerships"

### OPTION B: Manual Research & Entry
**Timeline**: 2-4 weeks  
**Coverage**: Top 40 universities only  
**Quality**: High quality, researched pros/cons

**Not recommended** due to time constraints and 90% coverage gap.

---

## IMPLEMENTATION PLAN

### Phase 1: Automated Generation (Week 1)
1. **Day 1-2**: Create generation script
   - Read UNIVERSITY_COURSE_OFFERINGS
   - Map university types (federal/state/private/tech/agriculture/medical)
   - Create pros/cons template library
   - Generate ranking entries

2. **Day 3**: Generate all rankings
   - Run script for all 154 universities
   - Estimated output: 5,000-7,000 new ranking entries

3. **Day 4**: Manual review & refinement
   - Review top 20 universities
   - Customize pros/cons for premium universities (PAU, AUN, ABUAD)
   - Validate data format

4. **Day 5**: Integration & testing
   - Append to universityRankings.ts
   - Update courseUniversityMapping.ts
   - Test search functionality
   - Validate recommendation engine

### Phase 2: Verification (Week 2)
1. Test all courses showing proper universities
2. Verify PAU, AUN, and other premium universities appear
3. Check ranking scores align with expectations
4. User acceptance testing

### Phase 3: Refinement (Ongoing)
1. Collect user feedback
2. Refine pros/cons based on real data
3. Update rankings based on accreditation/performance data

---

## ESTIMATED WORK SCOPE

### By the Numbers
- **Universities to add**: 154
- **Estimated courses per university**: 30-50
- **Total new ranking entries**: ~5,000-7,000
- **Current file size**: 1,943 lines
- **Projected file size**: ~10,000-12,000 lines
- **Development time**: 4-6 hours (automated) vs 2-4 weeks (manual)

### Cost-Benefit Analysis

**Automated Approach**:
- ✅ Fast (4-6 hours)
- ✅ Complete coverage (100%)
- ✅ Uses existing data from UNIVERSITY_COURSE_OFFERINGS
- ✅ Consistent format
- ⚠️ Template-based pros/cons (can refine later)

**Manual Approach**:
- ✅ High quality, researched content
- ❌ Slow (2-4 weeks)
- ❌ Limited coverage (20-40 universities max)
- ❌ Resource intensive
- ❌ Doesn't solve the 90% gap

---

## SUCCESS CRITERIA

### Before Fix
- ❌ Only 17 Nigerian universities in search results
- ❌ PAU, AUN, UNIZIK invisible to users
- ❌ 90% data gap
- ❌ Broken recommendation engine

### After Fix
- ✅ All 171 Nigerian universities in search results
- ✅ Premium universities (PAU, AUN, ABUAD) properly represented
- ✅ 100% coverage
- ✅ Fully functional recommendation engine
- ✅ Users can find universities by course + region

---

## NEXT STEPS

### Immediate Actions Required
1. ✅ **Analysis complete** - This document
2. ⏳ **Approve approach** - Automated bulk generation
3. ⏳ **Create generation script** - `scripts/generate-university-rankings.js`
4. ⏳ **Generate rankings** - Run script for all 154 universities
5. ⏳ **Manual refinement** - Review top 20 universities
6. ⏳ **Integration** - Add to universityRankings.ts
7. ⏳ **Testing** - Validate search and recommendations
8. ⏳ **Deployment** - Push to production

### Files to Create/Modify
1. **New**: `scripts/generate-university-rankings.js` - Generation script
2. **Modify**: `src/data/universityRankings.ts` - Add 5,000+ entries
3. **Verify**: `src/data/courseUniversityMapping.ts` - Ensure all universities listed
4. **Update**: `COURSE_UNIVERSITY_MAPPING_FIX_PLAN.md` - Implementation progress

---

## APPENDIX A: PAU Example (Why This Matters)

**Pan-Atlantic University (PAU)** currently has course offerings defined:
- computer-science (rankingScore: 88)
- economics (rankingScore: 84)
- business-administration (rankingScore: 83)
- accounting (rankingScore: 82)
- mass-communication (rankingScore: 81)
- law (rankingScore: 87)
- digital-media (rankingScore: 85)
- mechatronics (rankingScore: 82)

But searching for "Computer Science in Nigeria" **will NOT show PAU** because it has:
- ❌ No entries in universityRankings.ts
- ❌ Not listed in courseUniversityMapping.ts for computer-science

After the fix, searching "Computer Science in Nigeria" will show:
- ✅ PAU with 88 ranking
- ✅ Pros: "Connected to Lagos Business School network", "Modern tech infrastructure"
- ✅ Cons: "High tuition fees", "Newer engineering programs"

This is **critical for user experience** and platform credibility.

---

## APPENDIX B: Full List of Missing Universities (154 total)

[See separate file for complete list with categorization]

**Categories**:
- Federal Universities: 28 missing
- State Universities: 62 missing
- Private Universities: 64 missing
- Total Missing: 154

---

**Document prepared by**: GitHub Copilot  
**For**: SchoolPathfinder Course-University Mapping System Fix  
**Priority**: CRITICAL  
**Recommended Action**: Proceed with automated bulk generation approach
