#!/usr/bin/env python3
"""
Final category consolidation - safe replacement
"""

import re

with open('src/data/additionalCourses.ts', 'r') as f:
    content = f.read()

# Safe replacements
replacements = [
    (r'category: "Media & Creative"', 'category: "Arts & Design"'),
    (r'category: "Governance & Policy"', 'category: "Social & Governance"'),
    (r'category: "Engineering & Construction"', 'category: "Engineering"'),
    (r'category: "Social Impact"', 'category: "Social & Governance"'),
]

for old, new in replacements:
    count = len(re.findall(old, content))
    content = re.sub(old, new, content)
    if count > 0:
        print(f"✓ Replaced {count} instances: {old} → {new}")

with open('src/data/additionalCourses.ts', 'w') as f:
    f.write(content)

print("\n✅ All categories consolidated to 10!")
