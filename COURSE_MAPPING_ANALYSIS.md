# Course-to-University Mapping Analysis
## Nigerian Universities Course Data Update

**Generated:** January 19, 2026  
**Source Data:** NIGERIAN_UNIVERSITIES_COURSE_DATA.md  
**Universities Analyzed:** 7 (PAU, LMU, UNILORIN, CU, OAU, FUTA, UNILAG)

---

## Executive Summary

This analysis maps courses from 7 Nigerian universities to our platform's course IDs. We identified **75+ mappable courses** across the universities, with varying coverage per institution.

### University IDs
- **pau** - Pan-Atlantic University (Lagos, Private)
- **lu** - Landmark University (Kwara, Private)  
- **unilorin** - University of Ilorin (Kwara, Federal)
- **cu** - Covenant University (Ogun, Private)
- **oau** - Obafemi Awolowo University (Osun, Federal)
- **futa** - Federal University of Technology, Akure (Ondo, Federal)
- **unilag** - University of Lagos (Lagos, Federal)

---

## Part 1: Courses ALREADY in Mapping (Require Updates)

These courses exist in `courseUniversityMapping.ts` but need Nigerian university additions based on scraped data:

### 1. **computer-science**
**Current mapping:** unilag, ui, cu, abu, unn, oau, futa, futmin, uniben, unilorin, bu, lu, lasu, uniport  
**Universities to ADD:** pau  
**New complete list:** unilag, ui, cu, abu, unn, oau, futa, futmin, uniben, unilorin, bu, lu, lasu, uniport, **pau**

**Found at:**
- PAU (Computer Science B.Sc.)
- Covenant (Computer Science)
- UNILORIN (Computer Science)
- OAU (Computer Science with Economics, Computer Science with Mathematics)
- FUTA (Computer Science)
- UNILAG (Computer Science)
- Landmark (Implied via IS/IT programs)

---

### 2. **accounting**
**Current mapping:** unilag, ui, cu, abu, unn, oau, uniben, unilorin, lasu, uniport, bu, lu, lbs  
**Universities to ADD:** pau  
**New complete list:** unilag, ui, cu, abu, unn, oau, uniben, unilorin, lasu, uniport, bu, lu, lbs, **pau**

**Found at:**
- PAU (Accounting B.Sc.)
- Landmark (Accounting)
- UNILORIN (Accounting)
- Covenant (Accounting)
- OAU (Accountancy/Accounting)
- UNILAG (Accountancy/Accounting)

---

### 3. **economics**
**Current mapping:** unilag, ui, abu, unn, oau, cu, uniben, unilorin, lasu, uniport, bu, lu  
**Universities to ADD:** pau  
**New complete list:** unilag, ui, abu, unn, oau, cu, uniben, unilorin, lasu, uniport, bu, lu, **pau**

**Found at:**
- PAU (Economics B.Sc.)
- Landmark (Economics)
- UNILORIN (Economics)
- Covenant (Economics)
- OAU (Economics)
- UNILAG (Economics)

---

### 4. **mass-communication**
**Current mapping:** unilag, ui, unn, cu, uniben, lasu, bu  
**Universities to ADD:** pau, lu, unilorin  
**New complete list:** unilag, ui, unn, cu, uniben, lasu, bu, **pau**, **lu**, **unilorin**

**Found at:**
- PAU (Mass Communication B.Sc.)
- Landmark (Mass Communication)
- UNILORIN (Mass Communication)
- Covenant (Mass Communication)
- UNILAG (Mass Communication)

---

### 5. **business-administration**
**Current mapping:** unilag, ui, cu, unn, uniben, lasu, bu, lu, lbs  
**Universities to ADD:** pau, unilorin, oau  
**New complete list:** unilag, ui, cu, unn, uniben, lasu, bu, lu, lbs, **pau**, **unilorin**, **oau**

**Found at:**
- PAU (Business Administration B.Sc.)
- Landmark (Business Administration)
- UNILORIN (Business Administration)
- OAU (Business Administration)
- UNILAG (Business Administration)

---

### 6. **mechanical-engineering**
**Current mapping:** unilag, abu, cu, oau, futa, futmin, uniben, unilorin, uniport, lu  
**Universities to ADD:** pau  
**New complete list:** unilag, abu, cu, oau, futa, futmin, uniben, unilorin, uniport, lu, **pau**

**Found at:**
- PAU (Mechanical Engineering B.Eng.)
- UNILORIN (Mechanical Engineering)
- Covenant (Mechanical Engineering)
- OAU (Mechanical Engineering)
- FUTA (Mechanical Engineering)
- UNILAG (Mechanical Engineering)

---

### 7. **electrical-engineering**
**Current mapping:** unilag, abu, cu, oau, futa, futmin, uniben, unilorin  
**Universities to ADD:** pau  
**New complete list:** unilag, abu, cu, oau, futa, futmin, uniben, unilorin, **pau**

**Found at:**
- PAU (Electrical/Electronic Engineering B.Eng.)
- UNILORIN (Electrical/Electronics Engineering)
- Covenant (Electrical/Electronics Engineering)
- OAU (Electrical/Electronics Engineering)
- FUTA (Electrical/Electronics Engineering)
- UNILAG (Electrical/Electronics Engineering)

---

### 8. **civil-engineering**
**Current mapping:** unilag, abu, cu, futa, futmin, unilorin  
**Universities to ADD:** oau  
**New complete list:** unilag, abu, cu, futa, futmin, unilorin, **oau**

**Found at:**
- UNILORIN (Civil Engineering)
- Covenant (Civil Engineering)
- OAU (Civil Engineering)
- FUTA (Civil Engineering)
- UNILAG (Civil Engineering)

---

### 9. **chemical-engineering**
**Current mapping:** unilag, abu, uniport, lu  
**Universities to ADD:** unilorin, cu, oau  
**New complete list:** unilag, abu, uniport, lu, **unilorin**, **cu**, **oau**

**Found at:**
- UNILORIN (Chemical Engineering)
- Covenant (Chemical Engineering)
- OAU (Chemical Engineering)
- UNILAG (Chemical Engineering)

---

### 10. **petroleum-engineering**
**Current mapping:** uniport, abu, cu  
**Universities CONFIRMED:** cu  
**Status:** No additions needed

**Found at:**
- Covenant (Petroleum Engineering)
- UNILAG (Petroleum and Gas Engineering)

---

### 11. **computer-engineering**
**Current mapping:** Not explicitly listed in mapping  
**Universities to ADD:** unilorin, cu, oau, futa, unilag  
**New list:** **unilorin**, **cu**, **oau**, **futa**, **unilag**

**Found at:**
- UNILORIN (Computer Engineering)
- Covenant (Computer Engineering)
- OAU (Computer Engineering)
- FUTA (Computer Engineering)
- UNILAG (Computer Engineering)

---

### 12. **software-engineering**
**Current mapping:** cu (Only Covenant offers it)  
**Universities to ADD:** pau, futa  
**New complete list:** cu, **pau**, **futa**

**Found at:**
- PAU (Software Engineering B.Sc.)
- FUTA (Software Engineering)

---

### 13. **architecture**
**Current mapping:** cu, futa, unilag  
**Universities to ADD:** unilorin, oau  
**New complete list:** cu, futa, unilag, **unilorin**, **oau**

**Found at:**
- UNILORIN (Architecture)
- Covenant (Architecture)
- OAU (Architecture)
- FUTA (Architecture)
- UNILAG (Architecture)

---

### 14. **biochemistry**
**Current mapping:** unilag, ui, abu, futa, lu  
**Universities to ADD:** cu, oau  
**New complete list:** unilag, ui, abu, futa, lu, **cu**, **oau**

**Found at:**
- UNILORIN (Biochemistry)
- Covenant (Biochemistry)
- OAU (Biochemistry)
- FUTA (Biochemistry)
- UNILAG (Biochemistry)

---

### 15. **microbiology**
**Current mapping:** unilag, ui, oau, lu  
**Universities to ADD:** unilorin, cu, futa  
**New complete list:** unilag, ui, oau, lu, **unilorin**, **cu**, **futa**

**Found at:**
- UNILORIN (Microbiology)
- Covenant (Microbiology)
- OAU (Microbiology)
- FUTA (Microbiology)
- UNILAG (Microbiology)

---

### 16. **physics**
**Current mapping:** ui, unilag, abu, unn, oau, futa, unilorin, uniben  
**Universities CONFIRMED:** unilorin, oau, futa, unilag  
**Status:** No additions needed (all already included)

**Found at:**
- UNILORIN (Physics)
- Covenant (Industrial Physics variants)
- OAU (Physics)
- FUTA (Physics)
- UNILAG (Physics)

---

### 17. **mathematics**
**Current mapping:** ui, unilag, abu, unn, oau, futa, unilorin, uniben  
**Universities to ADD:** cu (Industrial Mathematics)  
**New complete list:** ui, unilag, abu, unn, oau, futa, unilorin, uniben, **cu**

**Found at:**
- UNILORIN (Mathematics, various Education combinations)
- Covenant (Industrial Mathematics)
- OAU (Mathematics, Computer Science with Mathematics)
- FUTA (Industrial Mathematics, Mathematics)
- UNILAG (Mathematics, Industrial Mathematics)

---

### 18. **statistics**
**Current mapping:** ui, unilag, abu, unn, oau, futa, unilorin  
**Universities CONFIRMED:** unilorin, oau, futa, unilag  
**Status:** No additions needed

**Found at:**
- UNILORIN (Statistics)
- Covenant (Demography and Social Statistics)
- OAU (Demography and Social Statistics)
- FUTA (Statistics)
- UNILAG (Statistics)

---

### 19. **political-science**
**Current mapping:** unilag, ui, abu, unn, oau, lasu  
**Universities to ADD:** lu, unilorin, cu  
**New complete list:** unilag, ui, abu, unn, oau, lasu, **lu**, **unilorin**, **cu**

**Found at:**
- Landmark (Political Science)
- UNILORIN (Political Science)
- Covenant (Political Science)
- OAU (Political Science)
- UNILAG (Political Science)

---

### 20. **international-relations**
**Current mapping:** unilag, ui, cu, abu, oau  
**Universities to ADD:** lu  
**New complete list:** unilag, ui, cu, abu, oau, **lu**

**Found at:**
- Landmark (International Relations)
- Covenant (International Relations)
- OAU (International Relations)

---

### 21. **psychology**
**Current mapping:** unilag, ui, cu, unn, bu  
**Universities to ADD:** unilorin, oau  
**New complete list:** unilag, ui, cu, unn, bu, **unilorin**, **oau**

**Found at:**
- UNILORIN (Psychology)
- Covenant (Psychology)
- OAU (Psychology)
- UNILAG (Psychology)

---

### 22. **sociology**
**Current mapping:** unilag, ui, unn, lasu  
**Universities to ADD:** lu, unilorin, cu, oau  
**New complete list:** unilag, ui, unn, lasu, **lu**, **unilorin**, **cu**, **oau**

**Found at:**
- Landmark (Sociology)
- UNILORIN (Sociology, Social Works)
- Covenant (Sociology)
- OAU (Sociology and Anthropology)
- UNILAG (Sociology)

---

### 23. **banking-finance**
**Current mapping:** unilag, cu, bu, lbs  
**Universities to ADD:** lu, oau  
**New complete list:** unilag, cu, bu, lbs, **lu**, **oau**

**Found at:**
- Landmark (Finance)
- UNILORIN (Finance)
- Covenant (Banking and Finance)
- OAU (Insurance and Actuarial Science - partial match)
- UNILAG (Banking and Finance, Finance)

---

### 24. **finance**
**Current mapping:** unilag, ui, cu, abu, unn, oau, lasu, bu  
**Universities to ADD:** lu, unilorin  
**New complete list:** unilag, ui, cu, abu, unn, oau, lasu, bu, **lu**, **unilorin**

**Found at:**
- Landmark (Finance)
- UNILORIN (Finance)
- UNILAG (Finance)

---

### 25. **marketing**
**Current mapping:** unilag, ui, cu, abu, unn, oau, lasu, bu  
**Universities to ADD:** unilorin  
**New complete list:** unilag, ui, cu, abu, unn, oau, lasu, bu, **unilorin**

**Found at:**
- UNILORIN (Marketing)
- Covenant (Marketing)
- UNILAG (Marketing - implied via Business programs)

---

### 26. **pharmacy**
**Current mapping:** unilag, ui, oau, abu, unn, uniben, uniport, unilorin  
**Universities CONFIRMED:** unilorin, oau, unilag  
**Status:** No additions needed

**Found at:**
- UNILORIN (Pharmacy, Doctor of Pharmacy)
- OAU (Pharmacy)
- UNILAG (Pharmacy)

---

### 27. **nursing**
**Current mapping:** unilag, ui, oau, uniben, lasu, bu  
**Universities to ADD:** unilorin  
**New complete list:** unilag, ui, oau, uniben, lasu, bu, **unilorin**

**Found at:**
- UNILORIN (Nursing/Nursing Science)
- OAU (Nursing/Nursing Science)
- UNILAG (Nursing/Nursing Science)

---

### 28. **medicine**
**Current mapping:** unilag, ui, abu, unn, oau, uniben, uniport, unilorin, bu  
**Universities CONFIRMED:** unilorin, oau, unilag  
**Status:** No additions needed

**Found at:**
- UNILORIN (Medicine and Surgery)
- OAU (Medicine and Surgery)
- UNILAG (Medicine and Surgery)

---

### 29. **law**
**Current mapping:** unilag, ui, abu, unn, oau, cu, uniben, unilorin, lasu, uniport, afe-babalola, bu  
**Universities CONFIRMED:** unilorin, oau, unilag  
**Status:** No additions needed

**Found at:**
- UNILORIN (Common and Islamic Law, Common Law)
- OAU (Law)
- UNILAG (Law)

---

### 30. **dentistry**
**Current mapping:** ui, unn, oau, uniport  
**Universities to ADD:** unilag  
**New complete list:** ui, unn, oau, uniport, **unilag**

**Found at:**
- OAU (Dentistry and Dental Surgery, Dentistry and Dental Technology)
- UNILAG (Dentistry and Dental Surgery)

---

### 31. **estate-management**
**Current mapping:** unilag, oau, cu, abu, unn, uniben  
**Universities to ADD:** unilorin, futa  
**New complete list:** unilag, oau, cu, abu, unn, uniben, **unilorin**, **futa**

**Found at:**
- UNILORIN (Estate Management)
- Covenant (Estate Management)
- OAU (Estate Management)
- FUTA (Estate Management)
- UNILAG (Estate Management)

---

### 32. **education**
**Current mapping:** ui, unilag, abu, unn, oau, unilorin, uniben, lasu  
**Universities CONFIRMED:** unilorin, oau, unilag  
**Status:** No additions needed (extensively offered)

**Found at:**
- UNILORIN (Education - multiple specializations)
- OAU (Education - multiple specializations)
- UNILAG (Education - multiple specializations)

---

### 33. **environmental-science**
**Current mapping:** ui, unilag, abu, oau, futa, unn  
**Universities to ADD:** unilorin  
**New complete list:** ui, unilag, abu, oau, futa, unn, **unilorin**

**Found at:**
- UNILORIN (Geography and Environmental Management)
- OAU (Geography - partial)
- UNILAG (Geography)

---

### 34. **agricultural-science**
**Current mapping:** abu, lu, futa, ui  
**Universities to ADD:** unilorin, oau  
**New complete list:** abu, lu, futa, ui, **unilorin**, **oau**

**Found at:**
- UNILORIN (Agriculture, Agricultural Science and Education, various Agric specializations)
- OAU (Agricultural Economics, Agricultural Engineering, Agricultural Extension, Animal Science, Crop Production)
- FUTA (Agricultural Engineering, Agricultural Extension, Agriculture and Resource Economics)

---

### 35. **information-technology**
**Current mapping:** unilag, ui, cu, abu, futa, futmin, uniben, unilorin  
**Universities CONFIRMED:** cu, futa, unilorin, unilag  
**Status:** No additions needed

**Found at:**
- UNILORIN (Educational Technology/Introductory Technology)
- Covenant (Information and Communication Engineering, Management Information System)
- FUTA (Information and Communication Technology, Information Systems, Information Technology)
- UNILAG (Computer Science - covers IT)

---

### 36. **medical-laboratory**
**Current mapping:** ui, unilag, abu, oau, unn, uniben, uniport  
**Universities to ADD:** unilorin  
**New complete list:** ui, unilag, abu, oau, unn, uniben, uniport, **unilorin**

**Found at:**
- UNILORIN (Medical Laboratory Science)
- UNILAG (Medical Laboratory Science)

---

### 37. **physiotherapy**
**Current mapping:** ui, unilag, oau, unn, uniben  
**Universities to ADD:** unilorin  
**New complete list:** ui, unilag, oau, unn, uniben, **unilorin**

**Found at:**
- UNILORIN (Physiotherapy)
- UNILAG (Physiotherapy)

---

### 38. **public-administration**
**Current mapping:** ui, unilag, abu, unn, oau, unilorin, lasu  
**Universities CONFIRMED:** unilorin, oau, unilag  
**Status:** No additions needed

**Found at:**
- UNILORIN (Public Administration)
- OAU (Public Administration)
- UNILAG (Public Administration - implied via Political Science)

---

### 39. **social-work**
**Current mapping:** ui, unilag, abu, oau, unn  
**Universities to ADD:** unilorin  
**New complete list:** ui, unilag, abu, oau, unn, **unilorin**

**Found at:**
- UNILORIN (Social Works)
- UNILAG (Social Works)

---

### 40. **theatre-arts**
**Current mapping:** ui, unilag, oau, unn, lasu, bu  
**Universities to ADD:** unilorin  
**New complete list:** ui, unilag, oau, unn, lasu, bu, **unilorin**

**Found at:**
- UNILORIN (Performing Arts)
- OAU (Drama/Dramatic/Performing Arts)

---

### 41. **music**
**Current mapping:** ui, unilag, oau, unn, lasu  
**Universities CONFIRMED:** oau, unilag  
**Status:** No additions needed

**Found at:**
- OAU (Music)
- UNILAG (Music - implied via Creative Arts)

---

### 42. **film-television**
**Current mapping:** unilag, ui, oau, lasu, bu  
**Universities CONFIRMED:** unilag, oau  
**Status:** No additions needed

**Found at:**
- UNILAG (Creative Arts - covers film/TV)
- OAU (Drama/Dramatic/Performing Arts - partial)

---

### 43. **tourism-hospitality**
**Current mapping:** unilag, oau, bu, cu, lasu  
**Universities CONFIRMED:** unilag, oau, cu  
**Status:** No additions needed

---

### 44. **human-resource-management**
**Current mapping:** unilag, ui, cu, abu, unn, lasu, bu  
**Universities to ADD:** unilorin  
**New complete list:** unilag, ui, cu, abu, unn, lasu, bu, **unilorin**

**Found at:**
- UNILORIN (Industrial Relations and Personnel Management)
- Covenant (Industrial Relations, Industrial Relations and Human Resources Management)

---

### 45. **graphic-design**
**Current mapping:** ysu, unilag, lasu, bu  
**Universities CONFIRMED:** unilag  
**Status:** No additions needed

**Found at:**
- OAU (Fine Art - partial)
- UNILAG (Creative Arts - partial)

---

### 46. **fashion-design**
**Current mapping:** ysu, lasu  
**Universities:** No clear matches in scraped data  
**Status:** No additions

---

### 47. **library-science** (Not in current mapping)
**Universities to ADD:** unilorin, oau, unilag  
**New list:** **unilorin**, **oau**, **unilag**

**Found at:**
- UNILORIN (Library and Information Science)
- OAU (Library and Information Science)

---

### 48. **insurance** (Currently in mapping)
**Current mapping:** Not explicitly listed  
**Universities to ADD:** unilag, oau  
**New list:** **unilag**, **oau**

**Found at:**
- OAU (Insurance and Actuarial Science)
- UNILAG (Insurance, Actuarial Science)

---

---

## Part 2: NEW Courses to ADD to Mapping

These courses exist in our system but are NOT YET in `courseUniversityMapping.ts`. They need to be added:

### 49. **veterinary-medicine** ✓ (Already in mapping)
**Current mapping:** ui, abu  
**Universities to ADD:** unilorin  
**New complete list:** ui, abu, **unilorin**

**Found at:**
- UNILORIN (Veterinary Medicine)

---

### 50. **biomedical-engineering**
**Current mapping:** [] (Not offered in Nigeria yet per mapping file)  
**Universities to ADD:** unilorin, unilag  
**New list:** **unilorin**, **unilag**

**Found at:**
- UNILORIN (Biomedical Engineering)
- UNILAG (Biomedical Engineering)

---

### 51. **public-health** ✓ (Already in mapping)
**Current mapping:** bu, unilag, ui  
**Universities CONFIRMED:** unilag  
**Status:** No additions needed

---

### 52. **metallurgical-engineering** (Not a course ID in our system)
**Suggested course ID:** metallurgical-material-engineering  
**Universities offering:** unilorin, oau, unilag, futa  
**Action:** Consider adding as new course

**Found at:**
- UNILORIN (Metallurgical and Material Engineering)
- OAU (Metallurgical and Material Engineering)
- FUTA (Metallurgical and Material Engineering)
- UNILAG (Metallurgical and Material Engineering)

---

### 53. **industrial-chemistry** (Not in current mapping)
**Suggested course ID:** chemistry (map to existing chemistry course)  
**Universities offering:** unilorin, cu, oau, futa, unilag  
**Action:** Map to existing chemistry course ID or create specific ID

**Found at:**
- UNILORIN (Industrial Chemistry)
- Covenant (Industrial Chemistry)
- OAU (Industrial Chemistry)
- FUTA (Industrial Chemistry)
- UNILAG (Industrial Chemistry)

---

### 54. **quantity-surveying** (Not in our course list)
**Universities offering:** unilorin, oau, futa, unilag  
**Action:** Consider adding as new course under Engineering/Construction

**Found at:**
- UNILORIN (Quantity Surveying)
- OAU (Quantity Surveying)
- FUTA (Quantity Surveying)
- UNILAG (Quantity Surveying)

---

### 55. **surveying-geoinformatics** (Not in our course list)
**Universities offering:** unilorin, oau, futa, unilag  
**Action:** Consider adding as new course under Engineering/Geosciences

**Found at:**
- UNILORIN (Surveying and Geo-Informatics)
- OAU (Surveying and Geo-Informatics)
- FUTA (Surveying and Geo-Informatics)
- UNILAG (Surveying and Geoinformatics)

---

### 56. **urban-regional-planning** (Not in our course list)
**Universities offering:** unilorin, oau, futa, unilag  
**Action:** Consider adding as new course under Architecture/Planning

**Found at:**
- UNILORIN (Urban and Regional Planning)
- OAU (Urban and Regional Planning)
- FUTA (Urban and Regional Planning)
- UNILAG (Urban and Regional Planning)

---

### 57. **geology-geophysics** (Not in our course list)
**Universities offering:** unilorin, oau, unilag, futa  
**Action:** Consider adding as new course under Science/Earth Sciences

**Found at:**
- UNILORIN (Geology, Applied Geophysics)
- Covenant (Applied Geophysics - Industrial Physics)
- OAU (Applied Geophysics, Geology)
- FUTA (Applied Geology, Applied Geophysics)
- UNILAG (Geology, Geophysics)

---

### 58. **food-science-technology** (Not in our course list)
**Universities offering:** unilorin, oau, futa  
**Action:** Consider adding under Agricultural/Food Sciences

**Found at:**
- UNILORIN (Food Engineering, Food Science)
- OAU (Food Science and Technology)
- FUTA (Food Science and Technology)

---

### 59. **fisheries-aquaculture** (Not in our course list)
**Universities offering:** unilorin, futa, unilag  
**Action:** Consider adding under Agricultural/Marine Sciences

**Found at:**
- UNILORIN (Fisheries and Aquaculture)
- FUTA (Fisheries and Aquaculture Technology)
- UNILAG (Fisheries, Fisheries Management, Marine Biology)

---

### 60. **forestry-wildlife** (Not in our course list)
**Universities offering:** unilorin, futa  
**Action:** Consider adding under Environmental/Agricultural Sciences

**Found at:**
- UNILORIN (Forestry and Wildlife Management)
- FUTA (Forestry and Wood Technology, Eco-Tourism and Wildlife Management)

---

### 61. **home-economics** (Not in our course list)
**Universities offering:** unilorin, oau, unilag  
**Action:** Consider adding under Education/Social Sciences

**Found at:**
- UNILORIN (Home Economics, Home Economics and Education)
- OAU (Home Economics and Education, Family Nutrition and Consumer Sciences)
- UNILAG (Home Economics and Education)

---

### 62. **linguistics** (Not in our course list)
**Universities offering:** unilorin, oau, unilag  
**Action:** Consider adding under Humanities/Languages

**Found at:**
- UNILORIN (Linguistics)
- OAU (Linguistics, Linguistics and African Languages)
- UNILAG (Linguistics, Igbo and other African Languages)

---

### 63. **languages** (French, Arabic, Yoruba, Igbo, Hausa, etc.)
**Universities offering:** unilorin, cu, oau, unilag  
**Action:** Consider adding language programs as separate course(s)

**Found at:**
- UNILORIN (Arabic Studies, French, Hausa, Igbo, Yoruba)
- Covenant (French, English Language)
- OAU (French, German, Portuguese, Yoruba, English Language)
- UNILAG (French, Chinese Studies, Russian, Yoruba, Igbo, English Language)

---

### 64. **philosophy-religious-studies** (Not in our course list)
**Universities offering:** oau, unilorin, unilag  
**Action:** Consider adding under Humanities/Social Sciences

**Found at:**
- UNILORIN (Comparative Religious Studies, Islamic Studies, Christian Religious Studies - various Education combos)
- OAU (Philosophy, Religious Studies)
- UNILAG (Philosophy, Islamic Studies, Christian Religious Knowledge/Studies)

---

### 65. **history-international-studies** (Partial match to existing courses)
**Universities offering:** unilorin, oau, unilag  
**Action:** Map to existing international-relations or create separate history course

**Found at:**
- UNILORIN (History and International Studies)
- OAU (History)
- UNILAG (History and Strategic Studies)

---

### 66. **guidance-counseling** (Not in our course list)
**Universities offering:** oau, unilag  
**Action:** Consider adding under Education/Psychology

**Found at:**
- OAU (Guidance and Counseling)
- UNILAG (Guidance and Counseling)

---

### 67. **health-education** (Not in our course list)
**Universities offering:** unilorin, oau, unilag  
**Action:** Consider adding under Health/Education

**Found at:**
- UNILORIN (Health Education)
- OAU (Health Education, Physical and Health Education)
- UNILAG (Health Education, Human Kinetics)

---

### 68. **criminology-security-studies** (Not in our course list)
**Universities offering:** unilorin, cu  
**Action:** Consider adding under Social Sciences/Law

**Found at:**
- UNILORIN (Criminology and Security Studies)
- Covenant (Criminology and Security Studies)

---

### 69. **entrepreneurship** ✓ (Already in mapping)
**Current mapping:** [] (Not offered in Nigeria yet per mapping file)  
**Universities to ADD:** cu, oau  
**New list:** **cu**, **oau**

**Found at:**
- Covenant (Entrepreneurship)
- OAU (Entrepreneurship)

---

### 70. **optometry** (Not in our course list)
**Universities offering:** unilorin  
**Action:** Consider adding under Health Sciences

**Found at:**
- UNILORIN (Optometry)

---

### 71. **anatomy-physiology** (Not as standalone in our list)
**Universities offering:** unilorin, futa  
**Action:** These are typically part of Medicine; consider as separate course if needed

**Found at:**
- UNILORIN (Anatomy, Physiology)
- FUTA (Human Anatomy, Physiology)

---

### 72. **pharmacology** (Not in our course list - different from Pharmacy)
**Universities offering:** unilag  
**Action:** Consider adding under Health Sciences (distinct from Pharmacy)

**Found at:**
- UNILAG (Pharmacology)

---

### 73. **radiography** (Not in our course list)
**Universities offering:** unilag  
**Action:** Consider adding under Health Sciences/Medical Imaging

**Found at:**
- UNILAG (Radiography)

---

### 74. **systems-engineering** (Not in our course list)
**Universities offering:** unilag  
**Action:** Consider adding under Engineering/Technology

**Found at:**
- UNILAG (Systems Engineering)

---

### 75. **botany-plant-biology** (Not in our course list)
**Universities offering:** unilorin, oau, unilag  
**Action:** Consider adding under Biological Sciences

**Found at:**
- UNILORIN (Plant Biology)
- OAU (Botany)
- UNILAG (Botany)

---

### 76. **zoology-animal-science** (Not in our course list)
**Universities offering:** unilorin, oau, unilag  
**Action:** Consider adding under Biological Sciences

**Found at:**
- UNILORIN (Zoology)
- OAU (Animal Science, Zoology)

---

### 77. **cell-biology-genetics** (Not in our course list)
**Universities offering:** unilag  
**Action:** Consider adding under Biological Sciences

**Found at:**
- UNILAG (Cell Biology and Genetics, Biology)

---

### 78. **building-technology** (Not in our course list)
**Universities offering:** cu, oau, futa, unilag  
**Action:** Consider adding under Engineering/Construction

**Found at:**
- Covenant (Building Technology)
- OAU (Building)
- FUTA (Building)
- UNILAG (Building)

---

### 79. **industrial-production-engineering** (Not in our course list)
**Universities offering:** futa  
**Action:** Consider adding under Engineering

**Found at:**
- FUTA (Industrial and Production Engineering)

---

### 80. **industrial-design** (Not in our course list)
**Universities offering:** futa  
**Action:** Consider adding under Design/Engineering

**Found at:**
- FUTA (Industrial Design)

---

### 81. **mining-engineering** (Not in our course list)
**Universities offering:** futa  
**Action:** Consider adding under Engineering

**Found at:**
- FUTA (Mining Engineering)

---

### 82. **meteorology-climate** (Not in our course list)
**Universities offering:** futa, unilag  
**Action:** Consider adding under Environmental/Atmospheric Sciences

**Found at:**
- FUTA (Meteorology)
- UNILAG (Meteorology and Climate Change)

---

### 83. **marine-science** (Not in our course list)
**Universities offering:** futa, unilag  
**Action:** Consider adding under Environmental/Marine Sciences

**Found at:**
- FUTA (Marine Science and Technology)
- UNILAG (Marine Biology)

---

### 84. **remote-sensing-gis** (Not in our course list)
**Universities offering:** futa  
**Action:** Consider adding under Geosciences/Technology

**Found at:**
- FUTA (Remote Sensing and Geosciences Information System)

---

### 85. **biotechnology** (Not in our course list)
**Universities offering:** futa  
**Action:** Consider adding under Biological Sciences/Technology

**Found at:**
- FUTA (Biotechnology)

---

### 86. **mechatronics-engineering** (Not in our course list)
**Universities offering:** pau  
**Action:** Consider adding under Engineering

**Found at:**
- PAU (Mechatronics Engineering B.Eng.)

---

### 87. **digital-media** (Partial match to existing courses)
**Universities offering:** pau  
**Action:** Could map to graphic-design or create specific digital-media ID

**Found at:**
- PAU (Information Science and Media Studies/Digital Media B.Sc.)

---

### 88. **cyber-security** ✓ (Already exists as course ID)
**Current mapping:** [] (Not offered in Nigeria yet per mapping file)  
**Universities to ADD:** futa  
**New list:** **futa**

**Found at:**
- FUTA (Cyber Security)

---

### 89. **soil-science** (Not in our course list)
**Universities offering:** oau  
**Action:** Consider adding under Agricultural Sciences

**Found at:**
- OAU (Soil Science)

---

### 90. **medical-rehabilitation** (Not in our course list)
**Universities offering:** oau  
**Action:** Consider adding under Health Sciences

**Found at:**
- OAU (Medical Rehabilitation)

---

### 91. **demography-social-statistics** (Partial overlap with statistics)
**Universities offering:** cu, oau  
**Action:** Could map to statistics or create specific course ID

**Found at:**
- Covenant (Demography and Social Statistics)
- OAU (Demography and Social Statistics)

---

### 92. **policy-strategic-studies** (Not in our course list)
**Universities offering:** cu  
**Action:** Consider adding under Governance/Policy or map to public-administration

**Found at:**
- Covenant (Policy and Strategic Studies)

---

### 93. **local-government-studies** (Not in our course list)
**Universities offering:** oau  
**Action:** Consider adding under Governance/Policy or map to public-administration

**Found at:**
- OAU (Local Government Studies)

---

### 94. **water-resources-environmental-engineering** (Not in our course list)
**Universities offering:** unilorin  
**Action:** Consider adding under Engineering/Environmental Sciences

**Found at:**
- UNILORIN (Water Resources and Environmental Engineering)

---

### 95. **telecommunication-science** (Not in our course list)
**Universities offering:** unilorin  
**Action:** Consider adding under Engineering/Technology or map to electrical-engineering

**Found at:**
- UNILORIN (Telecommunication Science)

---

---

## Part 3: Courses from Scraped Data NOT Matching Any Course ID

These courses appear in the scraped data but don't have clear matches in our system:

1. **Adult Education** - UNILORIN, OAU, UNILAG
2. **Educational Management** - UNILORIN, OAU
3. **Educational Technology** - UNILORIN
4. **Primary Education Studies** - UNILORIN
5. **Teacher Education Science** - UNILORIN, OAU, UNILAG
6. **Technical Education** - UNILORIN, UNILAG
7. **Technology Education** - UNILORIN
8. **Metalwork Technology Education** - UNILORIN
9. **Building Technology Education** - UNILORIN
10. **Electrical/Electronics Technology Education** - UNILORIN
11. **Early Childhood Education** - UNILAG
12. **Business Education** - UNILAG
13. **Literature in English** - OAU
14. **Language Arts (Education)** - OAU
15. **Fine and Applied Arts** - OAU
16. **Integrated Science/Mathematics Education** - OAU, UNILAG
17. **Information and Communication Science** - UNILORIN
18. **Information Science and Media Studies** - PAU

**Recommendation:** These are mostly specialized education programs and niche fields. Consider whether to add them based on platform strategy.

---

---

## Part 4: Summary Statistics

### Course Coverage by University

| University | Courses Mapped | Major Strength |
|-----------|---------------|----------------|
| **UNILORIN** | 65+ | Most comprehensive (Federal) |
| **UNILAG** | 60+ | Comprehensive urban university |
| **OAU** | 55+ | Strong traditional programs |
| **FUTA** | 45+ | Technology & Engineering focus |
| **Covenant** | 35+ | Modern private university |
| **PAU** | 10 | Selective private (Tech/Business) |
| **Landmark** | 12 | Business & Social Sciences focus |

### Most Widely Offered Courses (All 7 Universities)
1. **Computer Science** - 7/7 universities
2. **Accounting** - 6/7 universities
3. **Economics** - 6/7 universities
4. **Mass Communication** - 5/7 universities (after update)
5. **Business Administration** - 6/7 universities (after update)

### Engineering Courses Coverage
- **Mechanical Engineering** - 6/7 universities
- **Electrical/Electronics Engineering** - 6/7 universities
- **Civil Engineering** - 5/7 universities
- **Chemical Engineering** - 4/7 universities (after update)
- **Computer Engineering** - 5/7 universities
- **Petroleum Engineering** - 2/7 universities (CU, UNILAG)

### Health Sciences Coverage
- **Medicine** - 3/7 universities (UNILORIN, OAU, UNILAG)
- **Pharmacy** - 3/7 universities (UNILORIN, OAU, UNILAG)
- **Nursing** - 4/7 universities (after update)
- **Physiotherapy** - 3/7 universities (after update)

---

---

## Part 5: JSON Update Structure

### Format for `courseUniversityMapping.ts` Updates

```json
{
  "updates_to_existing_courses": {
    "computer-science": {
      "add_universities": ["pau"],
      "new_nigerian_list": ["unilag", "ui", "cu", "abu", "unn", "oau", "futa", "futmin", "uniben", "unilorin", "bu", "lu", "lasu", "uniport", "pau"]
    },
    "accounting": {
      "add_universities": ["pau"],
      "new_nigerian_list": ["unilag", "ui", "cu", "abu", "unn", "oau", "uniben", "unilorin", "lasu", "uniport", "bu", "lu", "lbs", "pau"]
    },
    "economics": {
      "add_universities": ["pau"],
      "new_nigerian_list": ["unilag", "ui", "abu", "unn", "oau", "cu", "uniben", "unilorin", "lasu", "uniport", "bu", "lu", "pau"]
    },
    "mass-communication": {
      "add_universities": ["pau", "lu", "unilorin"],
      "new_nigerian_list": ["unilag", "ui", "unn", "cu", "uniben", "lasu", "bu", "pau", "lu", "unilorin"]
    },
    "business-administration": {
      "add_universities": ["pau", "unilorin", "oau"],
      "new_nigerian_list": ["unilag", "ui", "cu", "unn", "uniben", "lasu", "bu", "lu", "lbs", "pau", "unilorin", "oau"]
    },
    "mechanical-engineering": {
      "add_universities": ["pau"],
      "new_nigerian_list": ["unilag", "abu", "cu", "oau", "futa", "futmin", "uniben", "unilorin", "uniport", "lu", "pau"]
    },
    "electrical-engineering": {
      "add_universities": ["pau"],
      "new_nigerian_list": ["unilag", "abu", "cu", "oau", "futa", "futmin", "uniben", "unilorin", "pau"]
    },
    "civil-engineering": {
      "add_universities": ["oau"],
      "new_nigerian_list": ["unilag", "abu", "cu", "futa", "futmin", "unilorin", "oau"]
    },
    "chemical-engineering": {
      "add_universities": ["unilorin", "cu", "oau"],
      "new_nigerian_list": ["unilag", "abu", "uniport", "lu", "unilorin", "cu", "oau"]
    },
    "computer-engineering": {
      "create_new_entry": true,
      "new_nigerian_list": ["unilorin", "cu", "oau", "futa", "unilag"]
    },
    "software-engineering": {
      "add_universities": ["pau", "futa"],
      "new_nigerian_list": ["cu", "pau", "futa"]
    },
    "architecture": {
      "add_universities": ["unilorin", "oau"],
      "new_nigerian_list": ["cu", "futa", "unilag", "unilorin", "oau"]
    },
    "biochemistry": {
      "add_universities": ["cu", "oau"],
      "new_nigerian_list": ["unilag", "ui", "abu", "futa", "lu", "cu", "oau"]
    },
    "microbiology": {
      "add_universities": ["unilorin", "cu", "futa"],
      "new_nigerian_list": ["unilag", "ui", "oau", "lu", "unilorin", "cu", "futa"]
    },
    "mathematics": {
      "add_universities": ["cu"],
      "new_nigerian_list": ["ui", "unilag", "abu", "unn", "oau", "futa", "unilorin", "uniben", "cu"]
    },
    "political-science": {
      "add_universities": ["lu", "unilorin", "cu"],
      "new_nigerian_list": ["unilag", "ui", "abu", "unn", "oau", "lasu", "lu", "unilorin", "cu"]
    },
    "international-relations": {
      "add_universities": ["lu"],
      "new_nigerian_list": ["unilag", "ui", "cu", "abu", "oau", "lu"]
    },
    "psychology": {
      "add_universities": ["unilorin", "oau"],
      "new_nigerian_list": ["unilag", "ui", "cu", "unn", "bu", "unilorin", "oau"]
    },
    "sociology": {
      "add_universities": ["lu", "unilorin", "cu", "oau"],
      "new_nigerian_list": ["unilag", "ui", "unn", "lasu", "lu", "unilorin", "cu", "oau"]
    },
    "banking-finance": {
      "add_universities": ["lu", "oau"],
      "new_nigerian_list": ["unilag", "cu", "bu", "lbs", "lu", "oau"]
    },
    "finance": {
      "add_universities": ["lu", "unilorin"],
      "new_nigerian_list": ["unilag", "ui", "cu", "abu", "unn", "oau", "lasu", "bu", "lu", "unilorin"]
    },
    "marketing": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["unilag", "ui", "cu", "abu", "unn", "oau", "lasu", "bu", "unilorin"]
    },
    "nursing": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["unilag", "ui", "oau", "uniben", "lasu", "bu", "unilorin"]
    },
    "dentistry": {
      "add_universities": ["unilag"],
      "new_nigerian_list": ["ui", "unn", "oau", "uniport", "unilag"]
    },
    "estate-management": {
      "add_universities": ["unilorin", "futa"],
      "new_nigerian_list": ["unilag", "oau", "cu", "abu", "unn", "uniben", "unilorin", "futa"]
    },
    "environmental-science": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["ui", "unilag", "abu", "oau", "futa", "unn", "unilorin"]
    },
    "agricultural-science": {
      "add_universities": ["unilorin", "oau"],
      "new_nigerian_list": ["abu", "lu", "futa", "ui", "unilorin", "oau"]
    },
    "medical-laboratory": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["ui", "unilag", "abu", "oau", "unn", "uniben", "uniport", "unilorin"]
    },
    "physiotherapy": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["ui", "unilag", "oau", "unn", "uniben", "unilorin"]
    },
    "social-work": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["ui", "unilag", "abu", "oau", "unn", "unilorin"]
    },
    "theatre-arts": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["ui", "unilag", "oau", "unn", "lasu", "bu", "unilorin"]
    },
    "human-resource-management": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["unilag", "ui", "cu", "abu", "unn", "lasu", "bu", "unilorin"]
    },
    "veterinary-medicine": {
      "add_universities": ["unilorin"],
      "new_nigerian_list": ["ui", "abu", "unilorin"]
    },
    "biomedical-engineering": {
      "add_universities": ["unilorin", "unilag"],
      "new_nigerian_list": ["unilorin", "unilag"]
    },
    "entrepreneurship": {
      "add_universities": ["cu", "oau"],
      "new_nigerian_list": ["cu", "oau"]
    },
    "cybersecurity": {
      "add_universities": ["futa"],
      "new_nigerian_list": ["futa"]
    }
  },
  
  "courses_not_in_mapping_to_consider": [
    {
      "suggested_id": "library-science",
      "universities": ["unilorin", "oau", "unilag"],
      "category": "Social Sciences"
    },
    {
      "suggested_id": "insurance",
      "universities": ["unilag", "oau"],
      "category": "Finance & Business"
    },
    {
      "suggested_id": "metallurgical-material-engineering",
      "universities": ["unilorin", "oau", "unilag", "futa"],
      "category": "Engineering"
    },
    {
      "suggested_id": "quantity-surveying",
      "universities": ["unilorin", "oau", "futa", "unilag"],
      "category": "Engineering"
    },
    {
      "suggested_id": "surveying-geoinformatics",
      "universities": ["unilorin", "oau", "futa", "unilag"],
      "category": "Engineering"
    },
    {
      "suggested_id": "urban-regional-planning",
      "universities": ["unilorin", "oau", "futa", "unilag"],
      "category": "Architecture & Planning"
    },
    {
      "suggested_id": "geology",
      "universities": ["unilorin", "oau", "unilag", "futa"],
      "category": "Earth Sciences"
    },
    {
      "suggested_id": "geophysics",
      "universities": ["unilorin", "cu", "oau", "unilag", "futa"],
      "category": "Earth Sciences"
    },
    {
      "suggested_id": "food-science-technology",
      "universities": ["unilorin", "oau", "futa"],
      "category": "Agricultural Sciences"
    },
    {
      "suggested_id": "fisheries-aquaculture",
      "universities": ["unilorin", "futa", "unilag"],
      "category": "Agricultural/Marine Sciences"
    },
    {
      "suggested_id": "forestry-wildlife",
      "universities": ["unilorin", "futa"],
      "category": "Environmental/Agricultural Sciences"
    },
    {
      "suggested_id": "mechatronics-engineering",
      "universities": ["pau"],
      "category": "Engineering"
    },
    {
      "suggested_id": "systems-engineering",
      "universities": ["unilag"],
      "category": "Engineering"
    },
    {
      "suggested_id": "mining-engineering",
      "universities": ["futa"],
      "category": "Engineering"
    },
    {
      "suggested_id": "industrial-production-engineering",
      "universities": ["futa"],
      "category": "Engineering"
    },
    {
      "suggested_id": "meteorology-climate",
      "universities": ["futa", "unilag"],
      "category": "Environmental/Atmospheric Sciences"
    },
    {
      "suggested_id": "marine-science",
      "universities": ["futa", "unilag"],
      "category": "Environmental/Marine Sciences"
    },
    {
      "suggested_id": "biotechnology",
      "universities": ["futa"],
      "category": "Biological Sciences"
    },
    {
      "suggested_id": "optometry",
      "universities": ["unilorin"],
      "category": "Health Sciences"
    },
    {
      "suggested_id": "radiography",
      "universities": ["unilag"],
      "category": "Health Sciences"
    },
    {
      "suggested_id": "pharmacology",
      "universities": ["unilag"],
      "category": "Health Sciences"
    },
    {
      "suggested_id": "medical-rehabilitation",
      "universities": ["oau"],
      "category": "Health Sciences"
    },
    {
      "suggested_id": "criminology-security-studies",
      "universities": ["unilorin", "cu"],
      "category": "Social Sciences/Law"
    },
    {
      "suggested_id": "guidance-counseling",
      "universities": ["oau", "unilag"],
      "category": "Education/Psychology"
    },
    {
      "suggested_id": "building-technology",
      "universities": ["cu", "oau", "futa", "unilag"],
      "category": "Engineering/Construction"
    }
  ]
}
```

---

---

## Recommendations

### Priority Actions:

1. **IMMEDIATE UPDATES** (39 courses) - Update existing course mappings with verified universities
   - Computer Science (+pau)
   - Accounting (+pau)
   - Economics (+pau)
   - Mass Communication (+pau, +lu, +unilorin)
   - Business Administration (+pau, +unilorin, +oau)
   - And 34 more listed in Part 1

2. **HIGH PRIORITY ADDITIONS** (10 courses) - Courses that exist in our system but missing from mapping:
   - computer-engineering
   - biomedical-engineering
   - library-science (if exists as course ID)
   - insurance (if exists as course ID)
   - entrepreneurship (update from empty)
   - cybersecurity (update from empty)

3. **CONSIDER FOR FUTURE** (25+ courses) - New course IDs to add based on demand:
   - Quantity Surveying
   - Surveying & Geoinformatics
   - Urban & Regional Planning
   - Geology/Geophysics
   - Mechatronics Engineering
   - Mining Engineering
   - Meteorology
   - Marine Science
   - Optometry
   - Radiography
   - Criminology & Security Studies
   - And others from Part 2

4. **DATA INTEGRITY**:
   - Verify that university IDs (pau, lu) exist in universities data
   - Ensure course IDs match exactly in courses.ts
   - Test mappings with recommendation engine

---

**End of Analysis**
