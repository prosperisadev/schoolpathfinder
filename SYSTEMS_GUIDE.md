# Access Codes & University System Documentation

## 📋 Table of Contents
1. [Access Codes](#access-codes)
2. [University Recommendation System](#university-system)
3. [Department-Based Course Filtering](#departments)
4. [Shareable Links](#shareable-links)

---

## Access Codes

### Overview
100 one-time access codes have been generated for premium access to full results.

### Accessing the Codes

#### From JSON (Structured)
```bash
cat scripts/generated/access_codes_100.json
```
This contains all codes in an array format with metadata.

#### From CSV (Spreadsheet)
```bash
cat scripts/generated/access_codes_100.csv
```
This can be imported into Excel, Google Sheets, or any spreadsheet application.

#### From SQL (Database Insert)
```bash
# In supabase/migrations/
cat 20260107_insert_access_codes.sql
```
Use this to insert all 100 codes into your database.

### Code Properties
- **Format**: 12-character alphanumeric
- **Examples**: `TE3BWHHULREV`, `YTPPQF0TUTR3`, `UF3FI11VRJJ4`
- **Security**: Randomly generated, non-sequential, non-guessable
- **Usage**: One-time per user (enforced in database)
- **Expiration**: 24 hours from first use

### Validation Process
1. User enters code in the app
2. Edge function `validate-access-code` is called
3. System checks:
   - Code exists in database
   - Code hasn't been used
   - Code hasn't expired (if applicable)
4. If valid:
   - Code marked as used
   - User email recorded
   - 24-hour access granted
   - Session expires 24h later

### Database Table Schema
```sql
CREATE TABLE public.access_codes_bank (
  id UUID PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT false,
  used_by_email TEXT,
  used_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## University System

### 11 Nigerian Universities

#### Tier 1: Top-Ranked
1. **University of Lagos (UNILAG)** ⭐ 94.5/100
   - Rank: #1 in Nigeria
   - Specialties: CS, Medicine, Law, Engineering
   - Website: www.unilag.edu.ng

2. **University of Ibadan (UI)** ⭐ 93.8/100
   - Rank: #2 in Nigeria
   - Specialties: Medicine (99/100), Law, Pharmacy
   - Website: www.ui.edu.ng

3. **Covenant University** ⭐ 89.2/100
   - Rank: #3 in Nigeria
   - Specialties: Computer Science, Software Engineering
   - Website: www.covenantuniversity.edu.ng

#### Tier 2: Established & Respected
4. **Ahmadu Bello University (ABU)** - 87.5/100
5. **University of Nigeria, Nsukka (UNN)** - 86.8/100
6. **University of Benin (UNIBEN)** - 85.5/100
7. **Obafemi Awolowo University (OAU)** - 85.2/100
8. **Lagos State University (LASU)** - 82.3/100
9. **University of Ilorin (UNILORIN)** - 81.9/100
10. **Federal University of Technology, Minna (FUTMINNA)** - 80.5/100
11. **Federal University of Technology, Akure (FUTA)** - 80.2/100

### How University Recommendations Work

#### 1. Dynamic Fetching
When a user views results:
- Frontend calls `getUniversitiesForCourse(courseId, location)`
- System queries database for universities offering that course
- Results are ranked by course-specific performance scores

#### 2. Ranking Scores
Two scores are used:
- **Overall University Rank**: General ranking (1-100)
- **Course-Specific Rank**: How strong is this course at this university (1-100)

Example for Computer Science:
- UI: 88/100 overall but only 85/100 for CS
- UNILAG: 94.5/100 overall and 95/100 for CS
- Covenant: 89.2/100 overall and 96/100 for CS (specialist!)

#### 3. Location Filtering
Users can filter by preferred location:
- **Nigeria**: Shows 11 Nigerian universities
- **Africa**: Adds South African universities (Wits, UCT, etc.)
- **Global**: Adds world-class institutions (Oxford, MIT, Stanford)

#### 4. Course Availability
Only universities that offer the specific course are shown:
```typescript
// Example: Only shows universities with this course available
const unis = await getUniversitiesForCourse("computer-science", "nigeria");
// Returns: [UNILAG, Covenant, ABU, etc.] if they offer CS
```

### Database Tables

#### universities_comprehensive
```sql
CREATE TABLE universities_comprehensive (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  region TEXT,
  global_rank INTEGER,
  country_rank INTEGER,
  ranking_score DECIMAL(5,2),
  website TEXT,
  established_year INTEGER
);
```

#### university_course_offerings
```sql
CREATE TABLE university_course_offerings (
  id UUID PRIMARY KEY,
  university_id UUID,
  course_id TEXT,
  is_available BOOLEAN,
  course_ranking_score DECIMAL(5,2),
  program_strength TEXT,
  year_established INTEGER,
  UNIQUE(university_id, course_id)
);
```

---

## Departments

### Three Academic Departments

All courses are mapped to exactly one department:

#### 1. SCIENCE Department (45+ courses)
Examples:
- Computer Science
- Medicine & Surgery
- Engineering (all types)
- Nursing
- Data Science
- Pharmacy
- Biology, Chemistry, Physics
- Agriculture

**Who can take these**: Students with "science" track

#### 2. ART Department (35+ courses)
Examples:
- Law
- Mass Communication
- English
- History
- Psychology
- Sociology
- Fine Arts
- Philosophy
- Theatre Arts

**Who can take these**: Students with "art" track

#### 3. COMMERCIAL Department (25+ courses)
Examples:
- Economics
- Accounting
- Banking & Finance
- Business Administration
- Marketing
- Entrepreneurship
- Hospitality Management
- Taxation

**Who can take these**: Students with "commercial" track

### Department Mapping
```typescript
// src/data/universities.ts
export const COURSE_DEPARTMENT_MAP: Record<string, Department> = {
  "computer-science": "science",
  "medicine": "science",
  "law": "art",
  "economics": "commercial",
  // ... 100+ courses mapped
};
```

### Filtering Logic
During assessment:
1. User selects academic track (science/art/commercial)
2. When generating recommendations:
   ```typescript
   const eligibleCourses = courses.filter(course => 
     COURSE_DEPARTMENT_MAP[course.id] === userTrack
   );
   ```
3. User only sees department-appropriate courses
4. Universities are filtered to those offering courses in user's department

---

## Shareable Links

### How They Work

#### 1. Generating a Share Link
```javascript
// User clicks "Share" button
const token = await generateShareToken();
const shareUrl = `https://pathfinder.com/results?share=${token}`;
// Copy link to clipboard
```

#### 2. Backend Storage
Token is stored in database:
```sql
UPDATE assessment_sessions
SET share_token = 'share_1234567890_abc123'
WHERE email = 'user@example.com';
```

#### 3. Direct Link Loading
When someone opens the link:
```typescript
// Results page loads with ?share=TOKEN
useEffect(() => {
  const token = searchParams.get('share');
  // Query: "Find session with this share token"
  const session = await supabase
    .from('assessment_sessions')
    .select('*')
    .eq('share_token', token)
    .single();
  
  // Check expiration (24h from payment)
  // Restore session data
  // Show results
}, [searchParams]);
```

#### 4. Security
- Links are unique (timestamp + random)
- Expire 24 hours after payment
- Require valid share token in header to access
- Database policies enforce access control

### Use Cases
✅ Share results with friends
✅ Email results to self
✅ Share on social media
✅ Compare results with advisor
✅ Save for later viewing

---

## Integration Checklist

### For Developers

- [ ] Run all database migrations in order
- [ ] Deploy `validate-access-code` edge function
- [ ] Test with sample code: `TE3BWHHULREV`
- [ ] Verify university recommendations appear on course cards
- [ ] Test share link with different browsers
- [ ] Verify department filtering works correctly

### For Product Team

- [ ] 100 codes generated ✅
- [ ] Access control working ✅
- [ ] 11 Nigerian universities added ✅
- [ ] Course filtering by department working ✅
- [ ] Share links resilient to reload ✅

### For QA

- [ ] Invalid code shows error
- [ ] Used code shows "already used" error
- [ ] Valid code grants 24h access
- [ ] Share link works on new tab
- [ ] Share link works on new device
- [ ] Science students see science courses only
- [ ] Art students see art courses only
- [ ] Commercial students see commercial courses only
- [ ] Universities display in ranking order

---

## Troubleshooting

### Access Code Issues
**Problem**: Code not found
- Check spelling (case-insensitive)
- Verify code exists in database
- Check if code has already been used

**Problem**: "Code already used"
- This is expected for one-time codes
- Same user can't reuse the code
- Different user can't use a code another user has activated

### University Display Issues
**Problem**: No universities shown
- Fallback hardcoded data should appear
- Check browser console for errors
- Verify course offering data is in database

**Problem**: Wrong universities shown
- Verify course ID is correct
- Check location filter (nigeria vs africa vs global)
- Verify course_offerings table has entries for that course

### Share Link Issues
**Problem**: "Link expired"
- Link is older than 24 hours from payment
- User needs to generate a new link

**Problem**: "Link not found"
- Share token is invalid
- Session was deleted
- Check URL has correct token

---

## Questions?

Refer to:
- `IMPLEMENTATION_COMPLETE.md` - Full implementation details
- `src/lib/universityRecommendations.ts` - University logic
- `src/data/universities.ts` - Course-department mapping
- Database migrations - Schema definitions
