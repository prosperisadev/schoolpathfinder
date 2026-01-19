#!/usr/bin/env python3
"""
Course Deduplication Script
Removes duplicate course definitions from course files.
"""

import re

# Define courses to remove with their IDs (we'll search and remove complete course objects)
COURSES_TO_REMOVE = {
    'additionalCourses.ts': [
        'petroleum-engineering',  # First occurrence around line 560 (keep the one at ~3123)
        'biomedical-engineering',  # Around line 648
        'civil-engineering',  # Around line 472  
        'film-television',  # Around line 1267
        'development-studies',  # Around line 1620
        'social-work',  # Around line 1488
        'entrepreneurship',  # Around line 957
    ],
    'newGlobalCourses.ts': [
        'biomedical-engineering',  # Around line 350
        'civil-engineering',  # Around line 1000
        'petroleum-engineering',  # Around line 1046
        'pharmacy',  # Around line 442
        'public-health',  # Around line 396
        'graphic-design',  # Around line 860
        'public-administration',  # Around line 1140
    ]
}

# Special cases where we need to keep the SECOND occurrence
KEEP_SECOND_OCCURRENCE = {
    'additionalCourses.ts': ['physiotherapy', 'dentistry']
}

def find_course_boundaries(content, course_id):
    """
    Find all occurrences of a course and return their start/end positions.
    Returns list of (start_pos, end_pos) tuples.
    """
    occurrences = []
    pattern = rf'^\s*{{\s*\n\s*id:\s*"{course_id}"'
    
    lines = content.split('\n')
    i = 0
    while i < len(lines):
        if re.search(pattern, lines[i] + '\n' + (lines[i+1] if i+1 < len(lines) else '')):
            # Found course start
            start_line = i
            # Find end of this course object (next course start or array end)
            brace_count = 0
            in_course = False
            for j in range(i, len(lines)):
                line = lines[j]
                if '{' in line:
                    brace_count += line.count('{')
                    in_course = True
                if '}' in line:
                    brace_count -= line.count('}')
                    if in_course and brace_count == 0:
                        # End of course object
                        end_line = j + 1  # Include the closing brace line
                        # Also include the trailing comma if present
                        if end_line < len(lines) and lines[end_line].strip() == ',':
                            end_line += 1
                        occurrences.append((start_line, end_line))
                        i = end_line
                        break
            if not occurrences or occurrences[-1][0] != start_line:
                # Didn't find end, skip
                i += 1
        else:
            i += 1
    
    return occurrences

def remove_course_duplicates(file_path, courses_to_remove, keep_second=False):
    """Remove duplicate courses from a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    lines_to_remove = set()
    
    for course_id in courses_to_remove:
        occurrences = find_course_boundaries(content, course_id)
        
        if len(occurrences) > 1:
            if keep_second:
                # Remove first occurrence
                start, end = occurrences[0]
                for line_num in range(start, end):
                    lines_to_remove.add(line_num)
                print(f"  - Removing FIRST occurrence of {course_id} (lines {start+1}-{end})")
            else:
                # Keep first, remove others
                for start, end in occurrences[1:]:
                    for line_num in range(start, end):
                        lines_to_remove.add(line_num)
                    print(f"  - Removing duplicate {course_id} (lines {start+1}-{end})")
        elif len(occurrences) == 1:
            # Only one occurrence - remove it
            start, end = occurrences[0]
            for line_num in range(start, end):
                lines_to_remove.add(line_num)
            print(f"  - Removing {course_id} (lines {start+1}-{end})")
        else:
            print(f"  - WARNING: {course_id} not found!")
    
    # Remove lines
    new_lines = [line for i, line in enumerate(lines) if i not in lines_to_remove]
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    
    print(f"  Removed {len(lines_to_remove)} lines")
    return len(lines_to_remove)

def main():
    import os
    os.chdir(r'C:\Users\ZBOOK 15 G5\Documents\schoolpathfinder\src\data')
    
    total_removed = 0
    
    for filename, courses in COURSES_TO_REMOVE.items():
        print(f"\n\nProcessing {filename}...")
        keep_second = KEEP_SECOND_OCCURRENCE.get(filename, [])
        
        # Handle normal removals
        normal_courses = [c for c in courses if c not in keep_second]
        if normal_courses:
            removed = remove_course_duplicates(filename, normal_courses, keep_second=False)
            total_removed += removed
        
        # Handle special cases where we keep second occurrence
        if keep_second:
            removed = remove_course_duplicates(filename, keep_second, keep_second=True)
            total_removed += removed
    
    print(f"\n\n✅ DEDUPLICATION COMPLETE!")
    print(f"Total lines removed: {total_removed}")

if __name__ == '__main__':
    main()
