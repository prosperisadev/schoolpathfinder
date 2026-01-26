import re

# Read the file
with open('src/data/additionalCourses.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# List of education course IDs and the categories they currently have
education_courses = {
    'adult-education': 'Social Impact',
    'early-childhood-education': 'Social Impact',
    'education-and-biology': 'Social Impact',
    'education-and-chemistry': 'Social Impact',
    'education-and-christian-religious-studies': 'Social Impact',
    'education-and-economics': 'Finance & Business',
    'education-and-english-language': 'Social Impact',
    'education-and-french': 'Social Impact',
    'education-and-geography': 'Social Impact',
    'education-and-history': 'Social Impact',
    'education-and-igbo': 'Social Impact',
    'education-and-integrated-science': 'Social Impact',
    'education-and-islamic-studies': 'Social Impact',
    'education-and-mathematics': 'Technology',
    'education-and-physics': 'Social Impact',
    'education-and-yoruba': 'Social Impact',
    'educational-administration': 'Social Impact',
    'guidance-and-counseling': 'Social Impact',
    'home-economics-and-education': 'Social Impact',
    'teacher-education-science': 'Social Impact',
    'technical-education': 'Social Impact',
}

changes_made = 0
for course_id, old_category in education_courses.items():
    # Pattern to find the course entry and replace its category
    # Looking for: id: "course-id",\n    name: ...\n    category: "old_category",
    pattern = f'(id: "{course_id}",\n[^}}]*?category: )"{old_category}"'
    replacement = f'\\1"Education"'
    
    new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)
    if count > 0:
        content = new_content
        changes_made += count
        print(f"✅ Mapped {course_id}: {old_category} → Education")
    else:
        print(f"⚠️  Could not find {course_id}")

# Write the file back
with open('src/data/additionalCourses.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Total changes made: {changes_made}")
print("📚 All education courses are now mapped to the 'Education' category!")
