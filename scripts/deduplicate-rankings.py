import re
import json

# Read the current universityRankings.ts file
with open('src/data/universityRankings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the rankings array
array_match = re.search(r'export const UNIVERSITY_COURSE_RANKINGS: UniversityRanking\[\] = \[(.*?)\];', content, re.DOTALL)
if not array_match:
    print("Could not find rankings array!")
    exit(1)

array_content = array_match.group(1)

# Parse all existing rankings
rankings = []
pattern = r'\{\s*universityId:\s*"([^"]+)",\s*courseId:\s*"([^"]+)",\s*ranking:\s*(\d+),\s*region:\s*"([^"]+)",\s*pros:\s*(\[.*?\]),\s*cons:\s*(\[.*?\])\s*\}'

for match in re.finditer(pattern, array_content, re.DOTALL):
    uni_id, course_id, rank, region, pros, cons = match.groups()
    rankings.append({
        'universityId': uni_id,
        'courseId': course_id,
        'ranking': int(rank),
        'region': region,
        'pros': pros.strip(),
        'cons': cons.strip()
    })

print(f"Found {len(rankings)} existing rankings")

# Deduplicate: keep only unique (universityId, courseId) pairs
seen = {}
deduped = []
for r in rankings:
    key = (r['universityId'], r['courseId'])
    if key not in seen:
        seen[key] = True
        deduped.append(r)

print(f"After deduplication: {len(deduped)} rankings")

# Count rankings per university
from collections import defaultdict
uni_counts = defaultdict(int)
for r in deduped:
    uni_counts[r['universityId']] += 1

print("\nRankings per university:")
for uni, count in sorted(uni_counts.items()):
    print(f"  {uni}: {count}/66")

# All courses
all_courses = [
    "accounting", "agricultural-science", "ai-machine-learning", "architecture", "banking-finance",
    "biochemistry", "biomedical-engineering", "blockchain-web3", "business-administration", "chemical-engineering",
    "civil-engineering", "climate-sustainability", "cloud-computing", "computer-science", "cybersecurity",
    "data-science", "dentistry", "digital-marketing", "economics", "education",
    "electrical-engineering", "entrepreneurship", "environmental-science", "estate-management", "fashion-design",
    "film-television", "finance", "fintech", "game-development", "graphic-design",
    "health-informatics", "human-resource-management", "information-technology", "international-relations", "investment-banking",
    "law", "marketing", "mass-communication", "mathematics", "mechanical-engineering",
    "medical-laboratory", "medicine", "microbiology", "music", "music-production",
    "nursing", "nutrition-dietetics", "petroleum-engineering", "pharmacy", "physics",
    "physiotherapy", "political-science", "product-management", "psychology", "public-administration",
    "public-health", "renewable-energy-engineering", "social-work", "sociology", "software-engineering",
    "statistics", "supply-chain-logistics", "theatre-arts", "tourism-hospitality", "ux-ui-design",
    "veterinary-medicine"
]

# University templates
uni_templates = {
    "uct": {"ranking": 98, "region": "africa", "pros": '["Top-ranked in Africa", "World-class research", "Strong partnerships", "High employability"]', "cons": '["Very expensive", "Competitive admission", "High cost of living", "Visa requirements"]'},
    "wits": {"ranking": 96, "region": "africa", "pros": '["Excellent research", "Industry links", "Modern facilities", "Urban location"]', "cons": '["High tuition", "Safety concerns", "Competitive entry", "Expensive living"]'},
    "cambridge": {"ranking": 99, "region": "global", "pros": '["World-class academics", "College system", "Research excellence", "Gates Cambridge"]', "cons": '["Highly competitive", "Very expensive", "Intense workload", "Weather"]'},
    "stanford": {"ranking": 99, "region": "global", "pros": '["Silicon Valley location", "Innovation culture", "Top programs", "Entrepreneurship"]', "cons": '["Extremely competitive", "Very expensive", "Intense environment", "Cost of living"]'},
    "mit": {"ranking": 100, "region": "global", "pros": '["Best STEM globally", "Innovation hub", "Research excellence", "Career opportunities"]', "cons": '["Extremely competitive", "Very expensive", "Intense pressure", "Difficult admission"]'},
    "oxford": {"ranking": 99, "region": "global", "pros": '["Historic excellence", "Tutorial system", "Global network", "Rhodes Scholarship"]', "cons": '["Extremely competitive", "Very expensive", "Cultural adjustment", "Cold weather"]'},
    "harvard": {"ranking": 100, "region": "global", "pros": '["World\'s most prestigious", "Unmatched network", "Need-blind", "Diverse opportunities"]', "cons": '["4% acceptance rate", "Very expensive", "Intense competition", "High pressure"]'},
    "toronto": {"ranking": 96, "region": "global", "pros": '["Top Canadian university", "Post-study work visa", "Diverse city", "Research excellence"]', "cons": '["Cold weather", "High tuition", "Large classes", "Expensive living"]'},
    "melbourne": {"ranking": 97, "region": "global", "pros": '["Top Australian university", "Post-study work visa", "Great quality of life", "Research focus"]', "cons": '["Far from home", "Very expensive", "High cost of living", "Distance"]'},
    "eth": {"ranking": 98, "region": "global", "pros": '["Top European tech", "Very affordable tuition", "High quality of life", "Strong STEM"]', "cons": '["German language", "High cost of living", "Entrance exam", "Cultural adjustment"]'},
    "nus": {"ranking": 97, "region": "global", "pros": '["Top Asian university", "Industry links", "Safe environment", "Gateway to Asia"]', "cons": '["Competitive", "Strict regulations", "Hot climate", "High pressure"]'},
}

# Add missing rankings for incomplete universities
added = 0
for uni_id, template in uni_templates.items():
    if uni_counts[uni_id] < 66:
        # Find missing courses
        existing_courses = set(r['courseId'] for r in deduped if r['universityId'] == uni_id)
        missing_courses = set(all_courses) - existing_courses
        
        for course in missing_courses:
            deduped.append({
                'universityId': uni_id,
                'courseId': course,
                'ranking': template['ranking'],
                'region': template['region'],
                'pros': template['pros'],
                'cons': template['cons']
            })
            added += 1
            uni_counts[uni_id] += 1

print(f"\nAdded {added} missing rankings")
print("\nFinal rankings per university:")
for uni, count in sorted(uni_counts.items()):
    status = "✓" if count == 66 else "✗"
    print(f"  {status} {uni}: {count}/66")

# Rebuild the array content
new_array_lines = []
for r in deduped:
    line = f'  {{ universityId: "{r["universityId"]}", courseId: "{r["courseId"]}", ranking: {r["ranking"]}, region: "{r["region"]}", pros: {r["pros"]}, cons: {r["cons"]} }},'
    new_array_lines.append(line)

new_array_content = '\n'.join(new_array_lines)

# Replace in the original content
new_content = content.replace(array_match.group(0), f'export const UNIVERSITY_COURSE_RANKINGS: UniversityRanking[] = [\n{new_array_content}\n];')

# Write back
with open('src/data/universityRankings.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\n✓ Successfully updated universityRankings.ts")
print(f"  Total rankings: {len(deduped)}")
