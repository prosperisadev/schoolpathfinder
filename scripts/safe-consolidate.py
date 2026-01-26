#!/usr/bin/env python3
"""
Safe and correct category consolidation
"""

with open('src/data/additionalCourses.ts', 'r') as f:
    lines = f.readlines()

replacements = {
    'category: "Science & Research"': 'category: "Science"',
    'category: "Science & Engineering"': 'category: "Science"',
    'category: "Science & Environment"': 'category: "Science"',
    'category: "Health & Medicine"': 'category: "Health"',
    'category: "Health & Social Sciences"': 'category: "Health"',
    'category: "Arts & Media"': 'category: "Arts & Design"',
    'category: "Creative & Design"': 'category: "Arts & Design"',
    'category: "Media & Creative"': 'category: "Arts & Design"',
    'category: "Social Sciences & Law"': 'category: "Social & Governance"',
    'category: "Governance & Policy"': 'category: "Social & Governance"',
    'category: "Social Impact"': 'category: "Social & Governance"',
    'category: "Engineering & Construction"': 'category: "Engineering"',
}

updated_lines = []
changes = 0

for line in lines:
    original_line = line
    for old, new in replacements.items():
        if old in line:
            line = line.replace(old, new)
            if line != original_line:
                changes += 1
    updated_lines.append(line)

with open('src/data/additionalCourses.ts', 'w') as f:
    f.writelines(updated_lines)

print(f"✅ Applied {changes} category consolidations")
print("\n✓ Consolidated categories:")
for cat in ["Science", "Health", "Engineering", "Technology", "Finance & Business", "Arts & Design", "Education", "Social & Governance", "Environmental & Agriculture"]:
    print(f"  - {cat}")
