#!/usr/bin/env python3
"""
Consolidate 20+ course categories into clean 10 categories
"""

import re

# Read the file
with open('src/data/additionalCourses.ts', 'r') as f:
    content = f.read()

# Define category mapping
category_map = {
    # Science consolidation
    'Science & Research': 'Science',
    'Science & Engineering': 'Science',
    'Science & Environment': 'Science',
    
    # Health consolidation  
    'Health & Medicine': 'Health',
    'Health & Social Sciences': 'Health',
    
    # Arts consolidation
    'Arts & Media': 'Arts & Design',
    'Creative & Design': 'Arts & Design',
    
    # Social & Governance consolidation
    'Social Sciences & Law': 'Social & Governance',
    'Governance & Policy': 'Social & Governance',
    
    # Business (already good, just keep as is)
    # Finance & Business → stays as Finance & Business
    
    # Keep as-is:
    # Technology, Engineering, Finance & Business, Education, 
    # Social Impact, Environmental & Agriculture
}

# Replace each category
for old_cat, new_cat in category_map.items():
    # Match the exact pattern: category: "Old Category"
    pattern = f'category: "{old_cat}"'
    replacement = f'category: "{new_cat}"'
    content = content.replace(pattern, replacement)
    print(f"✓ {old_cat} → {new_cat}")

# Write back
with open('src/data/additionalCourses.ts', 'w') as f:
    f.write(content)

print("\n✅ Category consolidation complete!")
print("\nFinal 10 categories:")
final_categories = [
    "All Categories",
    "Technology", 
    "Engineering",
    "Science",
    "Health",
    "Finance & Business",
    "Arts & Design",
    "Education",
    "Social & Governance",
    "Environmental & Agriculture"
]
for i, cat in enumerate(final_categories, 1):
    print(f"  {i}. {cat}")
