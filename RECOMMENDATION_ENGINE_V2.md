# School Pathfinder Recommendation Engine V2

## Architecture Overview

The recommendation engine uses a **two-stage architecture** designed for scalability, accuracy, and trust:

1. **Stage 1: Eligibility Filtering** — Hard exclusion rules that eliminate unsuitable courses
2. **Stage 2: Scoring & Ranking** — Weighted optimization that ranks eligible courses

This architecture ensures that only genuinely suitable courses are recommended, with transparent scoring that students can trust.

---

## Stage 1: Eligibility Filtering

All courses must pass **four mandatory gates** before being considered for scoring. Courses that fail any gate are immediately excluded.

### Gate 1: Department Gate ✅

**Rule:** Each course belongs to exactly one department (Science, Art, Commercial). Students can only see courses from their department.

**Implementation:**
- Uses authoritative `COURSE_DEPARTMENT_MAP` for department classification
- Strict matching: `user.academicTrack === course.department`
- Conservative approach: Unknown courses are excluded

**Why:** Nigerian university system requires students to declare a department. This ensures recommendations are academically valid and admission-viable.

---

### Gate 2: Interest Gate 🎯

**Rule:** If a student's interest score ≤ 2 for an industry, exclude all courses in that industry.

**Implementation:**
- Interest scores: 1 (lowest) to 5 (highest)
- Threshold: ≤ 2 = explicit disinterest
- Each course maps to one or more industries via `interestMatch[]`
- Course passes if student has >2 interest in **any** of its industries

**Why:** Prevents recommending courses in industries the student explicitly dislikes. A score of 1-2 indicates "not interested" or "dislike."

---

### Gate 3: Academic Viability Gate 📚

**Rule:** Exclude courses where the student's academic strength is below the course's minimum requirement.

**Academic Strength Calculation:**
```
strength = (WAEC score + JAMB confidence + learning style) / 3

WAEC multipliers:
  - Mostly distinctions: 1.0
  - Mix distinctions/credits: 0.75
  - Mostly credits: 0.5

JAMB multipliers:
  - Very confident: 1.0
  - Fairly confident: 0.75
  - Not confident: 0.5

Learning style multipliers:
  - Fast learner: 1.0
  - Moderate learner: 0.85
  - Practical learner: 0.7
```

**Course Difficulty Thresholds:**
- **Low difficulty:** Requires ≥ 0.3 strength (accessible to most)
- **Medium difficulty:** Requires ≥ 0.5 strength (moderate capability)
- **High difficulty:** Requires ≥ 0.7 strength (strong academics needed)

**Why:** Prevents recommending courses that are likely too challenging, reducing dropout risk and setting students up for success.

---

### Gate 4: Global Constraint 🌍

**Rule:** Maximum 5 global-only courses in final recommendations (applied in output stage).

**Implementation:**
- Courses marked `nigerianAvailable = false` are counted as global-only
- Constraint enforced during final output selection
- Nigerian-available courses prioritized

**Why:** Balances aspirational global options with locally accessible opportunities, ensuring recommendations are practical for most Nigerian students.

---

## Stage 2: Scoring & Ranking

Courses that pass all eligibility gates are scored using **five weighted components**:

| Component | Weight | Purpose |
|-----------|--------|---------|
| Interest Match | 35% | Primary driver of motivation and satisfaction |
| Personality Fit | 20% | Cultural and work style compatibility |
| Academic Strength | 15% | Match between capability and demands |
| Future Relevance | 15% | Career sustainability and market demand |
| Financial Feasibility | 15% | Affordability within student's budget |

**Total: 100%**

---

### 1. Interest Match (35%)

**Calculation:**
- Maps course industries to student interest scores (1-5 scale)
- Converts to 0-100: `(interestScore * 20)`
- Averages across all matched industries

**Example:**
```
Course: Computer Science
Industries: ["technology"]
Student interest in technology: 5

Score = 5 * 20 = 100
```

**Why 35%:** Interest is the strongest predictor of student satisfaction and persistence. Passionate students perform better.

---

### 2. Personality Fit (20%)

**Calculation:**
- Compares four personality dimensions (each -2 to +2 scale):
  - Analytical vs Creative
  - Structured vs Flexible
  - People-oriented vs Task-oriented
  - Risk-taking vs Stability-seeking
- Calculates absolute difference for each trait
- Converts to similarity score: `100 - (totalDiff / 16) * 100`

**Example:**
```
Trait              Course  Student  Diff
Analytical/Creative   -1      -2      1
Structured/Flexible   -1       0      1
People/Task            1       0      1
Risk/Stability         0      -1      1

Total difference: 4
Max difference: 16
Score: 100 - (4/16 * 100) = 75
```

**Why 20%:** Personality match reduces burnout and increases long-term satisfaction. Students thrive when work aligns with natural tendencies.

---

### 3. Academic Strength Match (15%)

**Calculation:**
- Uses the same academic strength (0-1) from Gate 3
- Scores based on match between strength and course difficulty:

| Difficulty | Scoring Logic |
|------------|---------------|
| High | Strong students (≥0.9): 100; Good (≥0.8): 90; Moderate (≥0.7): 75 |
| Medium | Strong (≥0.8): 95; Good (≥0.7): 90; Moderate (≥0.6): 85 |
| Low | All students: 85-90 (accessible) |

**Why 15%:** Balances challenge and achievability. Too easy = boredom; too hard = failure risk.

---

### 4. Future Relevance (15%)

**Calculation:**
- Uses course's `futureOutlook.relevanceToday` (1-10) and `relevanceIn5Years` (1-10)
- Weighted average: `(current * 0.4) + (future * 0.6)`
- Converts to 0-100 scale: `score * 10`

**Example:**
```
Course: Data Science
Relevance today: 9
Relevance in 5 years: 10

Score = ((9 * 0.4) + (10 * 0.6)) * 10 = 96
```

**Why 15%:** Future-proofs recommendations. Emphasizes long-term career viability over current trends.

---

### 5. Financial Feasibility (15%)

**Calculation:**
- Finds cheapest school offering the course
- Normalizes tuition to USD (NGN ÷ 1500)
- Compares to student's budget:

| Affordability Ratio | Score |
|---------------------|-------|
| ≥ 1.5× budget | 100 (very affordable) |
| ≥ 1.0× budget | 90 (within budget) |
| ≥ 0.8× budget | 75 (slight stretch) |
| ≥ 0.6× budget | 60 (significant stretch) |
| ≥ 0.4× budget | 40 (challenging) |
| < 0.4× budget | 20 (likely unaffordable) |

**Why 15%:** Financial stress derails academic success. Ensures recommendations are economically viable.

---

## Final Output Rules

After scoring, the system applies **strict output constraints** to produce the final 20 recommendations:

### Constraints

1. **Exactly 20 courses** — No more, no less
2. **Minimum score: 65** — Ensures quality threshold
3. **Max 5 per industry/category** — Ensures diversity
4. **Max 5 global-only courses** — Balances aspiration with practicality
5. **Sorted by score (descending)** — Best matches first

### Selection Algorithm

```
1. Filter: Keep only courses with score ≥ 65
2. Sort: Order by weighted score (highest first)
3. Iterate through sorted list:
   a. Check global-only limit (skip if exceeded)
   b. Check industry limit (skip if exceeded)
   c. Add to final list
   d. Stop when 20 courses selected
```

---

## Key Improvements from V1

| Aspect | V1 | V2 |
|--------|----|----|
| **Location Scoring** | 10% weight | ❌ **REMOVED** |
| **Architecture** | Single-stage | ✅ Two-stage (filter + score) |
| **Interest Gate** | No hard filter | ✅ Excludes disliked industries |
| **Academic Gate** | Scoring only | ✅ Hard minimum requirements |
| **Transparency** | Basic "why fits" | ✅ Full eligibility + scoring breakdown |
| **Explainability** | Limited | ✅ Detailed reason metadata |

### Why Remove Location?

**Problem with V1:** Location preference weighted courses by where they're offered, but:
- Students often don't know which schools offer which programs
- Location preference is about **study destination**, not course selection
- Caused confusion: "Why is Engineering 80% but Law 60%?" → Location bias

**V2 Solution:** Location is now used **after** course selection:
1. Student picks courses based on true fit (interest, personality, career)
2. System shows school options per course, filtered by location preference
3. Clean separation: "What should I study?" vs "Where should I study?"

---

## Explanation Metadata

Every recommendation includes:

### 1. Eligibility Rules Passed
```json
{
  "passedDepartmentGate": true,
  "passedInterestGate": true,
  "passedAcademicGate": true,
  "passedGlobalConstraint": true
}
```

### 2. Scoring Breakdown
```json
{
  "interestMatch": 95,
  "personalityFit": 82,
  "academicStrength": 88,
  "futureRelevance": 96,
  "financialFeasibility": 75,
  "weightedTotal": 88
}
```

### 3. Recommendation Reasons
```json
{
  "recommendationReason": [
    "Strongly aligns with your passion for Technology",
    "Excellent match with your personality and work style",
    "Outstanding career prospects and future growth"
  ],
  "whyFits": "This course strongly aligns with your passion for technology, excellent match with your personality and work style, outstanding career prospects and future growth."
}
```

---

## Extensibility & Future Integration

The V2 architecture is designed for **future ML enhancement**:

### Current: Rule-Based Foundation
- Deterministic, transparent, debuggable
- Handles 100% of cases with clear logic
- Provides baseline quality guarantee

### Future: Hybrid ML Enhancement

**Phase 1: Feature Engineering**
```typescript
// V2 already calculates rich features:
const features = {
  academicStrength: 0.85,
  interestVector: [5, 3, 4, 2, 5, 3, 4],
  personalityVector: [-1, 1, -2, 0],
  // ... etc
};
```

**Phase 2: ML Score Refinement**
```typescript
// ML model learns from student outcomes:
const mlAdjustment = mlModel.predict(features);
const finalScore = (ruleBasedScore * 0.7) + (mlAdjustment * 0.3);
```

**Phase 3: Personalized Weighting**
```typescript
// ML learns optimal weights per student type:
const personalizedWeights = mlModel.getWeights(studentProfile);
const score = calculateWithCustomWeights(course, personalizedWeights);
```

### Why Rule-Based First?

1. **Trust:** Students understand why courses are recommended
2. **Debugging:** Easy to identify and fix issues
3. **Data:** ML requires thousands of labeled examples (student outcomes)
4. **Compliance:** Transparent AI meets regulatory requirements
5. **Fallback:** Rules handle edge cases ML might miss

---

## Performance & Scalability

### Time Complexity
- **Stage 1 Filtering:** O(n) where n = total courses (~100-200)
- **Stage 2 Scoring:** O(m) where m = eligible courses (~40-80)
- **Output Constraints:** O(m log m) for sorting + O(m) for selection
- **Total:** O(n + m log m) ≈ **O(n log n)** — very efficient

### Space Complexity
- **O(n)** — Stores course scores in memory
- Suitable for millions of concurrent users with proper caching

### Optimization Strategies

**1. Course Data Caching**
```typescript
// Preprocess and cache course data on server startup
const preprocessedCourses = courses.map(preprocessCourse);
```

**2. User Profile Validation**
```typescript
// Validate and normalize profile once
const normalizedProfile = validateAndNormalize(rawProfile);
```

**3. Partial Computation**
```typescript
// Stop scoring if we have 100 qualified courses (20 needed)
if (qualifiedCourses.length >= 100) break;
```

**4. Worker Threads (Future)**
```typescript
// Distribute scoring across CPU cores
const scoredCourses = await Promise.all(
  courseChunks.map(chunk => worker.score(chunk, profile))
);
```

---

## Testing & Validation

### Unit Tests (Required)

```typescript
describe('Eligibility Filters', () => {
  test('Department gate excludes wrong department', () => {
    const scienceStudent = { academicTrack: 'science' };
    const artCourse = { id: 'law', ... };
    expect(passesDepartmentGate(artCourse, 'science')).toBe(false);
  });
  
  test('Interest gate excludes low interest industries', () => {
    const profile = { interests: { 'technology': 1 } };
    const techCourse = { interestMatch: ['technology'] };
    expect(passesInterestGate(techCourse, profile)).toBe(false);
  });
});

describe('Scoring Components', () => {
  test('Interest match calculates correctly', () => {
    const profile = { interests: { 'technology': 5 } };
    const course = { interestMatch: ['technology'] };
    expect(scoreInterestMatch(course, profile)).toBe(100);
  });
});

describe('Output Constraints', () => {
  test('Returns exactly 20 courses', () => {
    const recs = calculateRecommendationsV2(profile);
    expect(recs).toHaveLength(20);
  });
  
  test('Enforces max 5 global-only courses', () => {
    const recs = calculateRecommendationsV2(profile);
    const globalOnly = recs.filter(r => r.course.nigerianAvailable === false);
    expect(globalOnly.length).toBeLessThanOrEqual(5);
  });
});
```

### Integration Tests

```typescript
describe('End-to-End Recommendations', () => {
  test('Science student gets science courses only', () => {
    const profile = createMockProfile({ academicTrack: 'science' });
    const recs = calculateRecommendationsV2(profile);
    
    recs.forEach(rec => {
      const dept = COURSE_DEPARTMENT_MAP[rec.course.id];
      expect(dept).toBe('science');
    });
  });
  
  test('Low interest excludes entire industry', () => {
    const profile = createMockProfile({ 
      interests: { 'technology': 1 } // Very low
    });
    const recs = calculateRecommendationsV2(profile);
    
    recs.forEach(rec => {
      expect(rec.course.interestMatch).not.toContain('technology');
    });
  });
});
```

---

## Migration Guide (V1 → V2)

### Step 1: Update Imports
```typescript
// Old
import { calculateRecommendations } from '@/lib/recommendations';

// New
import { calculateRecommendationsV2 } from '@/lib/recommendationsV2';
```

### Step 2: Update Function Call
```typescript
// Function signature unchanged
const recommendations = calculateRecommendationsV2(userProfile);
```

### Step 3: Update UI for Enhanced Metadata
```typescript
// V2 includes additional fields:
recommendations.forEach(rec => {
  console.log('Eligibility:', rec.eligibilityRules);
  console.log('Breakdown:', rec.scoringBreakdown);
  console.log('Reasons:', rec.recommendationReason);
});
```

### Step 4: Remove Location-Based UI Elements
```typescript
// Old: Showing location score
<div>Location Match: {rec.locationScore}%</div>

// New: Location score is 0, don't display
// Instead, filter schools by location preference
```

---

## Troubleshooting

### "Why am I getting fewer than 20 courses?"

**Possible causes:**
1. Too few courses in your department (check `COURSE_DEPARTMENT_MAP`)
2. Very low interest scores excluding many industries
3. Academic strength too low for most courses in your department
4. Too many global-only courses with high scores

**Solution:** Check diagnostic output:
```typescript
const diag = diagnoseRecommendations(profile);
console.log(diag);
// Shows filtering funnel: total → eligible → scored → final
```

### "Why is a course recommended despite low interest?"

**Check:**
- Course may map to multiple industries; only one needs >2 interest
- Example: Computer Science maps to "technology" (interest 5) AND "finance-business" (interest 2)
- Passes if ANY industry has >2

### "Scores seem too high/low?"

**Verify:**
1. Interest scores: Are they realistic (1-5)?
2. Budget: Is it in correct currency (NGN vs USD)?
3. Academic indicators: WAEC/JAMB/learning style set correctly?

**Use breakdown:**
```typescript
recommendations.forEach(rec => {
  console.log(rec.course.name, rec.scoringBreakdown);
});
```

---

## API Reference

### Main Function
```typescript
function calculateRecommendationsV2(
  profile: UserProfile
): EnhancedCourseRecommendation[]
```

### Helper Functions
```typescript
function generatePersonalizedSummaryV2(
  profile: UserProfile,
  recommendations: EnhancedCourseRecommendation[]
): string

function diagnoseRecommendations(
  profile: UserProfile
): DiagnosticInfo
```

### Types
```typescript
interface EnhancedCourseRecommendation extends CourseRecommendation {
  eligibilityRules: {
    passedDepartmentGate: boolean;
    passedInterestGate: boolean;
    passedAcademicGate: boolean;
    passedGlobalConstraint: boolean;
  };
  scoringBreakdown: {
    interestMatch: number;
    personalityFit: number;
    academicStrength: number;
    futureRelevance: number;
    financialFeasibility: number;
    weightedTotal: number;
  };
  recommendationReason: string[];
}
```

---

## Deployment Checklist

- [ ] Unit tests pass (100% coverage on core logic)
- [ ] Integration tests pass (end-to-end scenarios)
- [ ] Performance test: < 100ms for 200 courses
- [ ] Update UI to use `calculateRecommendationsV2`
- [ ] Remove/hide location score from results page
- [ ] Add "Why this course?" expandable section
- [ ] Update help/FAQ to explain new algorithm
- [ ] Run A/B test (V1 vs V2) if possible
- [ ] Monitor error rates and edge cases
- [ ] Gather user feedback on recommendation quality

---

## Support & Contribution

**Questions?** Open an issue in the repository.

**Found a bug?** Include:
- User profile (anonymized)
- Expected vs actual recommendations
- Diagnostic output from `diagnoseRecommendations()`

**Want to improve scoring?** Propose weight adjustments with:
- Rationale (research/data-backed)
- Test cases demonstrating improvement
- Impact analysis on diverse student profiles

---

**Version:** 2.0.0  
**Last Updated:** January 12, 2026  
**Status:** ✅ Production Ready
